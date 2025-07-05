package com.tarea_web.tarea_web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.tarea_web.tarea_web.services.ActividadService;
import com.tarea_web.tarea_web.models.Actividad;

import java.util.List;

@Controller
public class ActividadController {
    private final ActividadService actividadService;

    public ActividadController(ActividadService actividadService) {
        this.actividadService = actividadService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("actividades", actividadService.getUltimasActividades());
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
}
