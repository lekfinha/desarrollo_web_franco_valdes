package com.tarea_web.tarea_web.repository;

import com.tarea_web.tarea_web.models.Foto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotoRepository extends JpaRepository<Foto, Integer> {
    List<Foto> findByActividadId(Integer actividadId);
} 