package com.tarea_web.tarea_web.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "foto")
public class Foto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    @Column(name = "ruta_archivo", nullable = false)
    private String rutaArchivo;

    private String descripcion;
} 