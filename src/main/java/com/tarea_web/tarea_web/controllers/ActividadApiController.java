package com.tarea_web.tarea_web.controllers;

import com.tarea_web.tarea_web.services.ActividadService;
import com.tarea_web.tarea_web.models.Actividad;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actividades")
public class ActividadApiController {
    private final ActividadService actividadService;

    public ActividadApiController(ActividadService actividadService) {
        this.actividadService = actividadService;
    }

    @GetMapping
    public List<Actividad> getActividades() {
        return actividadService.getTodas();
    }

    @GetMapping("/{id}")
    public Actividad getActividad(@PathVariable Integer id) {
        return actividadService.getPorId(id);
    }
}
