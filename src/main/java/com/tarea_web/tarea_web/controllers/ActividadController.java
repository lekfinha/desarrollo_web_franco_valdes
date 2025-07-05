package com.tarea_web.tarea_web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.tarea_web.tarea_web.services.ActividadService;
import com.tarea_web.tarea_web.models.Actividad;
import com.tarea_web.tarea_web.repository.FotoRepository;
import com.tarea_web.tarea_web.models.Foto;

import java.util.List;

@Controller
public class ActividadController {
    private final ActividadService actividadService;
    private final FotoRepository fotoRepository;

    public ActividadController(ActividadService actividadService, FotoRepository fotoRepository) {
        this.actividadService = actividadService;
        this.fotoRepository = fotoRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        System.out.println("=== DEBUG: Accediendo a la ruta / ===");
        List<Actividad> actividades = actividadService.getUltimasActividades();
        
        // Para cada actividad, obtener sus fotos
        for (Actividad actividad : actividades) {
            List<Foto> fotos = fotoRepository.findByActividadId(actividad.getId());
            actividad.setFotos(fotos);
        }
        
        model.addAttribute("actividades", actividades);
        return "index";
    }

    @GetMapping("/agregar")
    public String mostrarFormulario(Model model) {
        model.addAttribute("actividadForm", new Actividad());
        // Agrega comunas, regiones, etc. al modelo si es necesario
        return "agregar";
    }

    @PostMapping("/agregar")
    public String agregarActividad(@ModelAttribute Actividad actividad) {
        actividadService.guardarActividad(actividad);
        return "redirect:/";
    }

    @GetMapping("/detalle/{id}")
    public String mostrarDetalle(@PathVariable Integer id, Model model) {
        Actividad actividad = actividadService.getPorId(id);
        if (actividad == null) {
            return "redirect:/";
        }
        
        // Obtener las fotos de la actividad
        List<Foto> fotos = fotoRepository.findByActividadId(id);
        actividad.setFotos(fotos);
        
        model.addAttribute("actividad", actividad);
        return "detalle";
    }
}
