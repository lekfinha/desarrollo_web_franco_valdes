package com.tarea_web.tarea_web.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comentario")
public class Comentario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "nombre", nullable = false, length = 80)
    private String nombre;
    
    @Column(name = "texto", nullable = false, length = 300)
    private String texto;
    
    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;
    
    // Constructor por defecto
    public Comentario() {
        this.fecha = LocalDateTime.now();
    }
    
    // Constructor con parámetros
    public Comentario(String nombre, String texto, Actividad actividad) {
        this.nombre = nombre;
        this.texto = texto;
        this.actividad = actividad;
        this.fecha = LocalDateTime.now();
    }
    
    // Getters y Setters
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getTexto() {
        return texto;
    }
    
    public void setTexto(String texto) {
        this.texto = texto;
    }
    
    public LocalDateTime getFecha() {
        return fecha;
    }
    
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
    
    public Actividad getActividad() {
        return actividad;
    }
    
    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }
}
