package com.tarea_web.tarea_web.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "actividad")
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;

    private String sector;

    @NotNull
    private String nombre;

    @NotNull
    private String email;

    private String celular;

    @NotNull
    @Column(name = "dia_hora_inicio")
    private LocalDateTime diaHoraInicio;

    @Column(name = "dia_hora_termino")
    private LocalDateTime diaHoraTermino;

    private String descripcion;

    @Transient
    private List<Foto> fotos;
}
