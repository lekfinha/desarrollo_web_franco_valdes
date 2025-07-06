package com.tarea_web.tarea_web.controllers;

import com.tarea_web.tarea_web.models.Actividad;
import com.tarea_web.tarea_web.models.Nota;
import com.tarea_web.tarea_web.repository.ActividadRepository;
import com.tarea_web.tarea_web.repository.NotaRepository;
import com.tarea_web.tarea_web.services.ActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Controller
public class EvaluacionController {

    private final ActividadService actividadService;
    private final ActividadRepository actividadRepository;
    private final NotaRepository notaRepository;

    @Autowired
    public EvaluacionController(ActividadService actividadService,
                              ActividadRepository actividadRepository,
                              NotaRepository notaRepository) {
        this.actividadService = actividadService;
        this.actividadRepository = actividadRepository;
        this.notaRepository = notaRepository;
    }

    @GetMapping("/evaluaciones")
    public String mostrarEvaluaciones(Model model) {
        // Obtener todas las actividades que ya terminaron (fecha de término anterior a la actual)
        LocalDateTime ahora = LocalDateTime.now();
        List<Actividad> actividadesTerminadas = actividadService.getTodas().stream()
            .filter(actividad -> actividad.getDiaHoraTermino() != null && 
                               actividad.getDiaHoraTermino().isBefore(ahora))
            .collect(Collectors.toList());

        // Calcular el promedio de notas para cada actividad
        List<Map<String, Object>> actividadesConNotas = actividadesTerminadas.stream()
            .map(actividad -> {
                Double promedio = notaRepository.getPromedioNotasByActividadId(actividad.getId());
                String notaMostrar = promedio != null ? String.format("%.1f", promedio) : "-";
                
                Map<String, Object> actividadMap = new HashMap<>();
                actividadMap.put("id", actividad.getId());
                actividadMap.put("fechaInicio", actividad.getDiaHoraInicio().toLocalDate().toString());
                actividadMap.put("sector", actividad.getSector() != null ? actividad.getSector() : "");
                actividadMap.put("nombre", actividad.getNombre());
                actividadMap.put("tema", actividad.getSector() != null ? actividad.getSector() : "");
                actividadMap.put("nota", notaMostrar);
                
                return actividadMap;
            })
            .collect(Collectors.toList());

        model.addAttribute("actividades", actividadesConNotas);
        return "evaluaciones";
    }

    @PostMapping("/api/evaluaciones/agregar")
    @ResponseBody
    public ResponseEntity<?> agregarEvaluacion(@RequestBody Map<String, Object> request) {
        try {
            Integer actividadId = Integer.valueOf(request.get("actividadId").toString());
            Integer nota = Integer.valueOf(request.get("nota").toString());
            
            // Validar que la nota esté entre 1 y 7
            if (nota < 1 || nota > 7) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "La nota debe estar entre 1 y 7");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // Buscar la actividad
            Actividad actividad = actividadRepository.findById(actividadId)
                .orElseThrow(() -> new RuntimeException("Actividad no encontrada"));
            
            // Crear y guardar la nueva nota
            Nota nuevaNota = new Nota(actividad, nota);
            notaRepository.save(nuevaNota);
            
            // Calcular el nuevo promedio
            Double nuevoPromedio = notaRepository.getPromedioNotasByActividadId(actividadId);
            String notaMostrar = nuevoPromedio != null ? String.format("%.1f", nuevoPromedio) : "-";
            
            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("success", true);
            successResponse.put("nuevaNota", notaMostrar);
            successResponse.put("mensaje", "Evaluación agregada correctamente");
            
            return ResponseEntity.ok(successResponse);
            
        } catch (NumberFormatException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Datos inválidos");
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
} 