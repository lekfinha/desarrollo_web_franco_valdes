package com.tarea_web.tarea_web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.tarea_web.tarea_web.services.ActividadService;
import com.tarea_web.tarea_web.repository.ComentarioRepository;
import com.tarea_web.tarea_web.repository.FotoRepository;
import com.tarea_web.tarea_web.models.Actividad;
import com.tarea_web.tarea_web.models.Comentario;
import com.tarea_web.tarea_web.models.Foto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Controller
public class EstadisticasController {

    private final ActividadService actividadService;
    private final ComentarioRepository comentarioRepository;
    private final FotoRepository fotoRepository;

    public EstadisticasController(ActividadService actividadService,
                                ComentarioRepository comentarioRepository,
                                FotoRepository fotoRepository) {
        this.actividadService = actividadService;
        this.comentarioRepository = comentarioRepository;
        this.fotoRepository = fotoRepository;
    }

    @GetMapping("/estadisticas")
    public String mostrarEstadisticas(Model model) {
        List<Actividad> todasActividades = actividadService.getTodas();
        
        // Estadísticas generales
        long totalActividades = todasActividades.size();
        long totalComentarios = comentarioRepository.count();
        long totalFotos = fotoRepository.count();
        
        // Actividades por comuna
        Map<String, Long> actividadesPorComuna = todasActividades.stream()
            .collect(Collectors.groupingBy(
                actividad -> actividad.getComuna().getNombre(),
                Collectors.counting()
            ));
        
        // Actividades por mes
        Map<String, Long> actividadesPorMes = todasActividades.stream()
            .collect(Collectors.groupingBy(
                actividad -> actividad.getDiaHoraInicio().format(DateTimeFormatter.ofPattern("MMMM yyyy")),
                Collectors.counting()
            ));
        
        // Actividades por horario
        Map<String, Long> actividadesPorHorario = todasActividades.stream()
            .collect(Collectors.groupingBy(
                actividad -> {
                    int hora = actividad.getDiaHoraInicio().getHour();
                    if (hora < 12) return "Mañana";
                    else if (hora < 18) return "Tarde";
                    else return "Noche";
                },
                Collectors.counting()
            ));
        
        model.addAttribute("totalActividades", totalActividades);
        model.addAttribute("totalComentarios", totalComentarios);
        model.addAttribute("totalFotos", totalFotos);
        model.addAttribute("actividadesPorComuna", actividadesPorComuna);
        model.addAttribute("actividadesPorMes", actividadesPorMes);
        model.addAttribute("actividadesPorHorario", actividadesPorHorario);
        
        return "estadisticas";
    }

    @GetMapping("/api/estadisticas/actividades-por-dia")
    @ResponseBody
    public List<Map<String, Object>> getActividadesPorDia() {
        List<Actividad> actividades = actividadService.getTodas();
        
        return actividades.stream()
            .collect(Collectors.groupingBy(
                actividad -> actividad.getDiaHoraInicio().toLocalDate(),
                Collectors.counting()
            ))
            .entrySet().stream()
            .map(entry -> {
                Map<String, Object> map = new HashMap<>();
                map.put("fecha", entry.getKey().toString());
                map.put("total", entry.getValue());
                return map;
            })
            .collect(Collectors.toList());
    }

    @GetMapping("/api/estadisticas/actividades-por-tema")
    @ResponseBody
    public List<Map<String, Object>> getActividadesPorTema() {
        List<Actividad> actividades = actividadService.getTodas();
        
        return actividades.stream()
            .collect(Collectors.groupingBy(
                actividad -> actividad.getSector() != null ? actividad.getSector() : "Sin tema",
                Collectors.counting()
            ))
            .entrySet().stream()
            .map(entry -> {
                Map<String, Object> map = new HashMap<>();
                map.put("tema", entry.getKey());
                map.put("total", entry.getValue());
                return map;
            })
            .collect(Collectors.toList());
    }

    @GetMapping("/api/estadisticas/actividades-por-mes-horario")
    @ResponseBody
    public List<Map<String, Object>> getActividadesPorMesHorario() {
        List<Actividad> actividades = actividadService.getTodas();
        
        return actividades.stream()
            .collect(Collectors.groupingBy(
                actividad -> {
                    String mes = actividad.getDiaHoraInicio().format(DateTimeFormatter.ofPattern("MMMM yyyy"));
                    int hora = actividad.getDiaHoraInicio().getHour();
                    String horario = hora < 12 ? "manana" : hora < 18 ? "mediodia" : "tarde";
                    return mes + "|" + horario;
                },
                Collectors.counting()
            ))
            .entrySet().stream()
            .map(entry -> {
                String[] parts = entry.getKey().split("\\|");
                Map<String, Object> map = new HashMap<>();
                map.put("mes", parts[0]);
                map.put(parts[1], entry.getValue());
                return map;
            })
            .collect(Collectors.toList());
    }
} 