package com.tarea_web.tarea_web.repository;

import com.tarea_web.tarea_web.models.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {
    List<Actividad> findByDiaHoraTerminoBefore(LocalDateTime fecha);
}
