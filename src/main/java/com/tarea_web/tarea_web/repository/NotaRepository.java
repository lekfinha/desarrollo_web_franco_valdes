package com.tarea_web.tarea_web.repository;

import com.tarea_web.tarea_web.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Integer> {
    
    // Buscar todas las notas de una actividad específica
    List<Nota> findByActividadId(Integer actividadId);
    
    // Calcular el promedio de notas de una actividad
    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.actividad.id = :actividadId")
    Double getPromedioNotasByActividadId(@Param("actividadId") Integer actividadId);
    
    // Contar el número de notas de una actividad
    @Query("SELECT COUNT(n) FROM Nota n WHERE n.actividad.id = :actividadId")
    Long countByActividadId(@Param("actividadId") Integer actividadId);
} 