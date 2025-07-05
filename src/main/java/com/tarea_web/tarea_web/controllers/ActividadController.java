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
import com.tarea_web.tarea_web.models.Foto;

import java.util.List;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Controller
public class ActividadController {

    private final ActividadService actividadService;
    private final ComunaRepository comunaRepository;
    private final FotoRepository fotoRepository;

    public ActividadController(ActividadService actividadService, 
                             ComunaRepository comunaRepository,
                             FotoRepository fotoRepository) {
        this.actividadService = actividadService;
        this.comunaRepository = comunaRepository;
        this.fotoRepository = fotoRepository;
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
        
        model.addAttribute("actividades", actividades);
        return "index";
    }

    @GetMapping("/actividades")
    public String listarActividades(Model model) {
        List<Actividad> actividades = actividadService.getTodas();
        model.addAttribute("actividades", actividades);
        return "listado";
    }

    @GetMapping("/detalle/{id}")
    public String mostrarDetalle(@PathVariable Integer id, Model model) {
        Actividad actividad = actividadService.getPorId(id);
        if (actividad != null) {
            List<Foto> fotos = fotoRepository.findByActividadId(id);
            model.addAttribute("actividad", actividad);
            model.addAttribute("fotos", fotos);
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
}
