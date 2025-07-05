package com.tarea_web.tarea_web.repository;

import com.tarea_web.tarea_web.models.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    
    /**
     * Busca todos los comentarios de una actividad específica
     * ordenados por fecha de creación (más recientes primero)
     */
    List<Comentario> findByActividadIdOrderByFechaDesc(Integer actividadId);
    
    /**
     * Cuenta el número de comentarios de una actividad específica
     */
    long countByActividadId(Integer actividadId);
} 