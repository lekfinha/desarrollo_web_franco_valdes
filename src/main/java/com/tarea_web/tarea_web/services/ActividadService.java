package com.tarea_web.tarea_web.services;

import com.tarea_web.tarea_web.models.Actividad;
import com.tarea_web.tarea_web.repository.ActividadRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ActividadService {
    private final ActividadRepository actividadRepository;

    public ActividadService(ActividadRepository actividadRepository) {
        this.actividadRepository = actividadRepository;
    }

    public List<Actividad> getActividadesFinalizadas() {
        // lógica para filtrar actividades finalizadas
        return actividadRepository.findByDiaHoraTerminoBefore(LocalDateTime.now());
    }

    public Actividad guardarActividad(Actividad actividad) {
        // lógica de validación, etc.
        return actividadRepository.save(actividad);
    }

    public List<Actividad> getTodas() {
        return actividadRepository.findAll();
    }

    public Actividad getPorId(Integer id) {
        Optional<Actividad> actividad = actividadRepository.findById(id);
        return actividad.orElse(null);
    }

    public List<Actividad> getUltimasActividades() {
        // Puedes personalizar este método según tu lógica (por ejemplo, devolver las últimas N actividades)
        return actividadRepository.findAll();
    }

    // Otros métodos según tu lógica
}
