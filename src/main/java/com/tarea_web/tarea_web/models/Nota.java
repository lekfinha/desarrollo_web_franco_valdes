package com.tarea_web.tarea_web.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nota")
public class Nota {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;
    
    @Column(name = "nota", nullable = false)
    private Integer nota;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    
    // Constructores
    public Nota() {
        this.fechaCreacion = LocalDateTime.now();
    }
    
    public Nota(Actividad actividad, Integer nota) {
        this.actividad = actividad;
        this.nota = nota;
        this.fechaCreacion = LocalDateTime.now();
    }
    
    // Getters y Setters
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Actividad getActividad() {
        return actividad;
    }
    
    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }
    
    public Integer getNota() {
        return nota;
    }
    
    public void setNota(Integer nota) {
        this.nota = nota;
    }
    
    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
    
    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
}
