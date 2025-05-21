USE tarea2;

SET FOREIGN_KEY_CHECKS = 0;

-- Actividad 1: Concierto de Jazz en Recoleta (música)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        13028, -- ID de Comuna: Recoleta
        'Barrio Bellavista',
        'Jazz N\' Blues Club',
        'info@jazzblues.cl',
        '+56912345678',
        '2025-05-25 20:00:00',
        '2025-05-25 23:00:00',
        'Noche de Jazz Fusión con la banda "Armonía Urbana". Ven y disfruta de una experiencia musical única.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'música');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/jazz.jpg',
        'jazz.jpg'
    );

-- Actividad 2: Clase de Yoga al Aire Libre en Parque Metropolitano (Santiago) (deporte)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130208, -- ID de Comuna: Santiago
        'Parque Metropolitano',
        'Bienestar Santiago',
        'yoga@bienestarsantiago.cl',
        NULL,
        '2025-05-26 09:30:00',
        '2025-05-26 10:30:00',
        'Clase de yoga para todos los niveles, ideal para empezar el día con energía y paz.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'deporte');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/yoga.jpg',
        'yoga.jpg'
    );

-- Actividad 3: Taller de Robótica para Niños en Providencia (tecnología)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130207, -- ID de Comuna: Providencia
        'Barrio Bustamante',
        'Academia TechKids',
        'contacto@techkids.cl',
        '+56998765432',
        '2025-06-01 15:00:00',
        '2025-06-01 17:00:00',
        'Introducción a la robótica y programación básica para niños de 8 a 12 años.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (
        LAST_INSERT_ID(),
        'tecnología'
    );

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/robots.jpg',
        'robots.jpg'
    );

-- Actividad 4: Festival Gastronómico "Sabores de Chile" en Las Condes (comida)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130204, -- ID de Comuna: Las Condes
        'Parque Araucano',
        'Chile Sabor',
        'info@chilesabor.cl',
        '+56923456789',
        '2025-06-08 11:00:00',
        '2025-06-08 20:00:00',
        'Una muestra de la gastronomía chilena con food trucks y degustaciones.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'comida');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/comida.jpg',
        'comida.jpg'
    );

-- Actividad 5: Torneo de Ajedrez Rápido en Ñuñoa (juegos)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130210, -- ID de Comuna: Ñuñoa
        'Plaza Ñuñoa',
        'Club de Ajedrez Ñuñoa',
        'ajedrez@nunoa.cl',
        NULL,
        '2025-06-15 10:00:00',
        '2025-06-15 14:00:00',
        'Torneo abierto de ajedrez rápido. Inscripciones limitadas.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'juegos');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/ajedrez.jpg',
        'ajedrez.jpg'
    );

-- Actividad 6: Noche de Baile Folclórico en Recoleta (baile)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        13028, -- ID de Comuna: Recoleta
        'Centro Cultural Recoleta',
        'Raíces Chilenas',
        'folclor@recoleta.cl',
        '+56934567890',
        '2025-06-20 19:30:00',
        '2025-06-20 22:00:00',
        'Presentación y taller de danzas folclóricas chilenas.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'baile');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/tinku.jpg',
        'tinku.jpg'
    );

-- Actividad 7: Charla "El Universo Cuántico" en Santiago (ciencias)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130208, -- ID de Comuna: Santiago
        'Universidad Central',
        'Astro Divulgación',
        'contacto@astrodivulgacion.cl',
        NULL,
        '2025-06-28 18:00:00',
        '2025-06-28 19:30:00',
        'Charla sobre los misterios de la mecánica cuántica y su impacto en nuestra comprensión del universo.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'ciencias');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/universo.jpg',
        'universo.jpg'
    );

-- Actividad 8: Bootcamp de Programación Web en Providencia (tecnología)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130207, -- ID de Comuna: Providencia
        'Cowork Providencia',
        'DevMakers',
        'info@devmakers.cl',
        '+56945678901',
        '2025-07-05 09:00:00',
        '2025-07-06 18:00:00',
        'Intenso fin de semana para aprender los fundamentos de la programación web con Python y Flask.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (
        LAST_INSERT_ID(),
        'tecnología'
    );

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/computador.jpg',
        'computador.jpg'
    );

-- Actividad 9: Día de Voluntariado Ambiental en Las Condes (otro: Medio ambiente)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130204, -- ID de Comuna: Las Condes
        'Quebrada de Ramón',
        'Voluntarios Verdes',
        'ambiente@voluntarios.cl',
        '+56956789012',
        '2025-07-12 09:00:00',
        '2025-07-12 13:00:00',
        'Jornada de limpieza y reforestación. Necesitamos tu ayuda para cuidar nuestro entorno.'
    );

INSERT INTO
    actividad_tema (
        actividad_id,
        tema,
        glosa_otro
    )
VALUES (
        LAST_INSERT_ID(),
        'otro',
        'Medio ambiente'
    );

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/medioambiente.jpg',
        'medioambiente.jpg'
    );

-- Actividad 10: Sesión de Lectura de Poesía en Ñuñoa (música)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130210, -- ID de Comuna: Ñuñoa
        'Café Literario',
        'Club de Poesía "Verso Libre"',
        'poesia@versolibre.cl',
        NULL,
        '2025-07-20 19:00:00',
        '2025-07-20 21:00:00',
        'Micrófono abierto para poetas emergentes y consagrados.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'música');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/poesia.jpg',
        'poesia.jpg'
    );

-- Segunda tanda de actividades con nuevas comunas

-- Actividad 11: Ruta en Bicicleta por el Cerro San Fernando (San Fernando) (deporte)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        60301, -- ID de Comuna: San Fernando
        'Cerro San Fernando',
        'Club Ciclista San Fer',
        'cicla.sf@example.com',
        '+56977771111',
        '2025-08-01 08:30:00',
        '2025-08-01 12:00:00',
        'Explorando los senderos del Cerro San Fernando en bicicleta. Nivel intermedio. Traer hidratación.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'deporte');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/bicicleta.jpg',
        'bicicleta.jpg'
    );

-- Actividad 12: Feria Artesanal Mapuche en Temuco (Temuco) (otro: Cultura)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        90205, -- ID de Comuna: Temuco
        'Plaza Aníbal Pinto',
        'Comunidad Ruka Kimun',
        'ruka.kimun@example.com',
        '+56988882222',
        '2025-08-10 10:00:00',
        '2025-08-10 18:00:00',
        'Muestra de arte y cultura Mapuche, con artesanías, música y gastronomía típica.'
    );

INSERT INTO
    actividad_tema (
        actividad_id,
        tema,
        glosa_otro
    )
VALUES (
        LAST_INSERT_ID(),
        'otro',
        'Cultura'
    );

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/mapuche.jpg',
        'mapuche.jpg'
    );

-- Actividad 13: Taller de Fotografía Desértica (Arica) (ciencias)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        10201, -- ID de Comuna: Arica
        'Valle de Azapa',
        'Arica Foto Club',
        'contacto@aricaclub.cl',
        '+56966663333',
        '2025-08-15 16:00:00',
        '2025-08-15 19:00:00',
        'Taller práctico para capturar la belleza del desierto y sus paisajes únicos.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'ciencias');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/arica.jpg',
        'arica.jpg'
    );

-- Actividad 14: Campeonato de Skate en Alto Hospicio (Alto Hospicio) (deporte)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        10307, -- ID de Comuna: Alto Hospicio
        'Skatepark Municipal',
        'Hospicio Street Skate',
        'skate.hospicio@example.com',
        '+56955554444',
        '2025-08-22 14:00:00',
        '2025-08-22 18:00:00',
        'Competencia de skate amateur y profesional con premios y música en vivo.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'deporte');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/skate.jpg',
        'skate.jpg'
    );

-- Actividad 15: Concurso de Cocina Marina en Puerto Montt (Puerto Montt) (comida)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        100306, -- ID de Comuna: Puerto Montt
        'Muelle de Angelmó',
        'Sabores del Sur',
        'sabores.sur@example.com',
        '+56944445555',
        '2025-08-29 12:00:00',
        '2025-08-29 16:00:00',
        'Demostración y concurso de platos con productos del mar de la región.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'comida');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/mariscos.jpg',
        'mariscos.jpg'
    );

-- Actividad 16: Recorrido Histórico por Cerros de Valparaíso (Valparaíso) (otro: Patrimonio)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        50506, -- ID de Comuna: Valparaíso
        'Cerro Alegre',
        'Valpo Patrimonial',
        'patrimonio.valpo@example.com',
        '+56933336666',
        '2025-09-05 10:00:00',
        '2025-09-05 13:00:00',
        'Tour guiado por los cerros de Valparaíso, explorando su arquitectura y murales.'
    );

INSERT INTO
    actividad_tema (
        actividad_id,
        tema,
        glosa_otro
    )
VALUES (
        LAST_INSERT_ID(),
        'otro',
        'Patrimonio'
    );

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/valparaiso.jpg',
        'valparaiso.jpg'
    );

-- Actividad 17: Observación Astronómica en San Fernando (San Fernando) (ciencias)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        60301, -- ID de Comuna: San Fernando
        'Fundo El Boldo',
        'Astroturismo O\'Higgins',
        'cielo.ohiggins@example.com',
        '+56922227777',
        '2025-09-12 21:00:00',
        '2025-09-12 23:00:00',
        'Noche de observación de estrellas y planetas con telescopios. Apto para toda la familia.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'ciencias');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/universo.jpg',
        'universo.jpg'
    );

-- Actividad 18: Festival de Música Chilena en Temuco (Temuco) (música chilena)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        90205, -- ID de Comuna: Temuco
        'Parque Estadio Germán Becker',
        'Temuco Canta',
        'festival.temuco@example.com',
        '+56911118888',
        '2025-09-20 16:00:00',
        '2025-09-20 22:00:00',
        'Conciertos de bandas locales y nacionales de diversos géneros musicales chilenos.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'música');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/cueca.jpg',
        'cueca.jpg'
    );

-- Actividad 19: Clase de Surf en Arica (Arica) (deporte)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        10201, -- ID de Comuna: Arica
        'Playa Chinchorro',
        'Arica Surf Academy',
        'surf.arica@example.com',
        '+56999990000',
        '2025-09-25 10:00:00',
        '2025-09-25 12:00:00',
        'Clase de iniciación al surf con instructores certificados. Incluye equipo.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'deporte');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/surf.jpg',
        'surf.jpg'
    );

-- Actividad 20: Taller de Reparación de Dispositivos Electrónicos en Puerto Montt (Puerto Montt) (tecnología)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        100306, -- ID de Comuna: Puerto Montt
        'Centro Comunitario',
        'ReciclaTech PM',
        'reparatech@example.com',
        '+56900001111',
        '2025-10-01 17:00:00',
        '2025-10-01 19:00:00',
        'Aprende a diagnosticar y reparar pequeños fallos en tus dispositivos electrónicos.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (
        LAST_INSERT_ID(),
        'tecnología'
    );

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/computador.jpg',
        'computador.jpg'
    );

-- Actividad 21: Charla sobre Ética y Sociedad (Santiago - Religión)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130208, -- ID de Comuna: Santiago
        'Centro Cultural',
        'Diálogo y Reflexión',
        'contacto@dialogoyreflexion.cl',
        '+56911223344',
        '2025-10-10 18:30:00',
        '2025-10-10 20:00:00',
        'Exploración de conceptos éticos y morales desde diversas perspectivas religiosas y filosóficas.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'religión');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'png/religion.png',
        'religion.png'
    );

-- Actividad 22: Foro Abierto: Desafíos Políticos Actuales (Providencia - Política)
INSERT INTO
    actividad (
        comuna_id,
        sector,
        nombre,
        email,
        celular,
        dia_hora_inicio,
        dia_hora_termino,
        descripcion
    )
VALUES (
        130207, -- ID de Comuna: Providencia
        'Salón Auditorio Municipal',
        'Ciudadanía Activa',
        'foro.ciudadania@example.com',
        '+56922334455',
        '2025-10-15 19:00:00',
        '2025-10-15 21:00:00',
        'Debate y análisis sobre los principales desafíos políticos que enfrenta el país actualmente.'
    );

INSERT INTO
    actividad_tema (actividad_id, tema)
VALUES (LAST_INSERT_ID(), 'política');

INSERT INTO
    foto (
        actividad_id,
        ruta_archivo,
        nombre_archivo
    )
VALUES (
        LAST_INSERT_ID(),
        'jpg/politica.jpg',
        'politica.jpg'
    );

SET FOREIGN_KEY_CHECKS = 1;