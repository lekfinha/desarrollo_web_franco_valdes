package com.tarea_web.tarea_web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.tarea_web.tarea_web.services.ActividadService;
import com.tarea_web.tarea_web.models.Actividad;
import com.tarea_web.tarea_web.models.Comuna;
import com.tarea_web.tarea_web.repository.FotoRepository;
import com.tarea_web.tarea_web.repository.ComunaRepository;
import com.tarea_web.tarea_web.repository.NotaRepository;
import com.tarea_web.tarea_web.models.Foto;
import com.tarea_web.tarea_web.models.Comentario;
import com.tarea_web.tarea_web.repository.ComentarioRepository;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.time.LocalDateTime;

@Controller
public class ActividadController {
    
    private final ActividadService actividadService;
    private final ComunaRepository comunaRepository;
    private final FotoRepository fotoRepository;
    private final ComentarioRepository comentarioRepository;
    private final NotaRepository notaRepository;

    public ActividadController(ActividadService actividadService, 
                             ComunaRepository comunaRepository,
                             FotoRepository fotoRepository,
                             ComentarioRepository comentarioRepository,
                             NotaRepository notaRepository) {
        this.actividadService = actividadService;
        this.comunaRepository = comunaRepository;
        this.fotoRepository = fotoRepository;
        this.comentarioRepository = comentarioRepository;
        this.notaRepository = notaRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        System.out.println("=== DEBUG: Accediendo a la ruta / ===");
        List<Actividad> actividades = actividadService.getTodas();
        
        // Para cada actividad, obtener sus fotos
        for (Actividad actividad : actividades) {
            List<Foto> fotos = fotoRepository.findByActividadId(actividad.getId());
            actividad.setFotos(fotos);
        }
        
        // Limitar a las últimas 3 actividades más recientes
        List<Actividad> ultimasActividades = actividades.stream()
            .sorted((a1, a2) -> a2.getDiaHoraInicio().compareTo(a1.getDiaHoraInicio()))
            .limit(3)
            .toList();
        
        model.addAttribute("actividades", ultimasActividades);
        return "index";
    }

    @GetMapping("/actividades")
    public String listarActividades(@RequestParam(defaultValue = "0") int pagina, Model model) {
        List<Actividad> todasActividades = actividadService.getTodas();
        
        // Para cada actividad, obtener sus fotos y calcular el promedio de notas
        for (Actividad actividad : todasActividades) {
            List<Foto> fotos = fotoRepository.findByActividadId(actividad.getId());
            actividad.setFotos(fotos);
            
            // Calcular el promedio de notas
            Double promedio = notaRepository.getPromedioNotasByActividadId(actividad.getId());
            String notaMostrar = promedio != null ? String.format("%.1f", promedio) : "-";
            
            // Crear un mapa con la información de la actividad incluyendo la nota
            Map<String, Object> actividadConNota = new HashMap<>();
            actividadConNota.put("actividad", actividad);
            actividadConNota.put("nota", notaMostrar);
            // Todas las actividades son evaluables
            actividadConNota.put("puedeEvaluar", true);
        }
        
        // Ordenar por fecha más reciente
        List<Actividad> actividadesOrdenadas = todasActividades.stream()
            .sorted((a1, a2) -> a2.getDiaHoraInicio().compareTo(a1.getDiaHoraInicio()))
            .toList();
        
        int actividadesPorPagina = 5;
        int totalActividades = actividadesOrdenadas.size();
        int totalPaginas = (int) Math.ceil((double) totalActividades / actividadesPorPagina);
        
        // Calcular el rango de actividades para la página actual
        int inicio = pagina * actividadesPorPagina;
        int fin = Math.min(inicio + actividadesPorPagina, totalActividades);
        
        List<Actividad> actividadesPagina = actividadesOrdenadas.subList(inicio, fin);
        
        // Crear lista de actividades con notas
        List<Map<String, Object>> actividadesConNotas = actividadesPagina.stream()
            .map(actividad -> {
                Double promedio = notaRepository.getPromedioNotasByActividadId(actividad.getId());
                String notaMostrar = promedio != null ? String.format("%.1f", promedio) : "-";
                
                // Todas las actividades son evaluables
                boolean puedeEvaluar = true;
                
                Map<String, Object> actividadMap = new HashMap<>();
                actividadMap.put("actividad", actividad);
                actividadMap.put("nota", notaMostrar);
                actividadMap.put("puedeEvaluar", puedeEvaluar);
                
                return actividadMap;
            })
            .toList();
        
        model.addAttribute("actividadesConNotas", actividadesConNotas);
        model.addAttribute("paginaActual", pagina);
        model.addAttribute("totalPaginas", totalPaginas);
        model.addAttribute("totalActividades", totalActividades);
        model.addAttribute("actividadesPorPagina", actividadesPorPagina);
        
        return "listado";
    }

    @GetMapping("/detalle/{id}")
    public String mostrarDetalle(@PathVariable Integer id, Model model) {
        Actividad actividad = actividadService.getPorId(id);
        if (actividad != null) {
            List<Foto> fotos = fotoRepository.findByActividadId(id);
            List<Comentario> comentarios = comentarioRepository.findByActividadIdOrderByFechaDesc(id);
            
            // Calcular información de evaluación
            Double notaPromedio = notaRepository.getPromedioNotasByActividadId(id);
            Long totalEvaluaciones = notaRepository.countByActividadId(id);
            
            model.addAttribute("actividad", actividad);
            model.addAttribute("fotos", fotos);
            model.addAttribute("comentarios", comentarios);
            model.addAttribute("nuevoComentario", new Comentario());
            model.addAttribute("notaPromedio", notaPromedio);
            model.addAttribute("totalEvaluaciones", totalEvaluaciones);
            return "detalle";
        }
        return "redirect:/";
    }

    @GetMapping("/agregar")
    public String mostrarFormularioAgregar(Model model) {
        List<Comuna> comunas = comunaRepository.findAll();
        model.addAttribute("actividadForm", new Actividad());
        model.addAttribute("comunas", comunas);
        return "agregar";
    }

    @PostMapping("/agregar")
    public String agregarActividad(@ModelAttribute("actividadForm") Actividad actividad,
                                   @RequestParam("fotos") MultipartFile[] fotos) {
        try {
            // Guardar la actividad primero
            Actividad actividadGuardada = actividadService.guardarActividad(actividad);
            
            // Procesar las fotos
            if (fotos != null && fotos.length > 0) {
                for (MultipartFile foto : fotos) {
                    if (!foto.isEmpty()) {
                        // Generar nombre único para el archivo
                        String nombreArchivo = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();
                        
                        // Guardar el archivo en el sistema de archivos
                        Path directorioUploads = Paths.get("src/main/resources/static/uploads");
                        if (!Files.exists(directorioUploads)) {
                            Files.createDirectories(directorioUploads);
                        }
                        
                        Path rutaArchivo = directorioUploads.resolve(nombreArchivo);
                        Files.copy(foto.getInputStream(), rutaArchivo);
                        
                        // Crear y guardar el registro de foto en la base de datos
                        Foto fotoEntity = new Foto();
                        fotoEntity.setActividad(actividadGuardada);
                        fotoEntity.setRutaArchivo("uploads/" + nombreArchivo);
                        fotoEntity.setNombreArchivo(nombreArchivo);
                        fotoRepository.save(fotoEntity);
                    }
                }
            }
            
            return "redirect:/detalle/" + actividadGuardada.getId();
            
        } catch (IOException e) {
            e.printStackTrace();
            return "redirect:/agregar?error=true";
        }
    }
    
    @PostMapping("/detalle/{id}/comentario")
    public String agregarComentario(@PathVariable Integer id, 
                                   @ModelAttribute("nuevoComentario") Comentario comentario) {
        Actividad actividad = actividadService.getPorId(id);
        if (actividad != null) {
            // Crear un nuevo comentario en lugar de usar el objeto del modelo
            Comentario nuevoComentario = new Comentario();
            nuevoComentario.setNombre(comentario.getNombre());
            nuevoComentario.setTexto(comentario.getTexto());
            nuevoComentario.setActividad(actividad);
            nuevoComentario.setFecha(LocalDateTime.now());
            
            comentarioRepository.save(nuevoComentario);
        }
        return "redirect:/detalle/" + id;
    }
}
