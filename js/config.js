/**
 * config.js
 * -----------------------------------------------------------------------
 * ÚNICA FUENTE DE DATOS del portafolio "MISIÓN: PLANEAR PARA ENSEÑAR".
 *
 * Este archivo se carga ANTES de js/app.js (ver index.html). Ningún dato
 * de autoría, institución, estado de recursos o contenido textual debe
 * escribirse directamente en el HTML: todo se inyecta desde este objeto.
 *
 * Para actualizar el portafolio (agregar autores, cambiar el estado de un
 * recurso, enlazar un video real, etc.) solo se necesita editar este
 * archivo. Ver README.md → "Cómo agregar/actualizar un recurso".
 *
 * Estados válidos para cualquier recurso (campo `status`):
 *   "available"  -> Disponible
 *   "building"   -> En construcción
 *   "completed"  -> Completada
 *   "locked"     -> Bloqueada
 * -----------------------------------------------------------------------
 */

const SITE_CONFIG = {
  /* ---------------------------------------------------------------- */
  /* Metadatos del sitio (SEO, favicon, color de tema)                 */
  /* ---------------------------------------------------------------- */
  meta: {
    lang: "es",
    title: "Misión: Planear para Enseñar | Portafolio RED",
    description:
      "Portafolio digital académico del curso Diseño y Construcción de Recursos Educativos Digitales. Documenta el proceso de planeación didáctica de una secuencia gamificada mediada por Genially, organizada como una ruta de misiones pedagógicas.",
    themeColor: "#0a1128",
    favicon: "assets/img/favicon.svg",
    ogImage: "assets/img/og-image.svg",
    // Placeholder: se completa cuando exista la URL real de GitHub Pages.
    siteUrl: "",
  },

  /* ---------------------------------------------------------------- */
  /* Institución académica (donde se cursa la maestría y esta          */
  /* asignatura) y curso                                                */
  /* ---------------------------------------------------------------- */
  institution: {
    name: "Universidad de Cartagena",
    center: "Centro de Posgrados",
    faculty: "Facultad de Ciencias Sociales y Educación",
    program: "Maestría en Recursos Digitales Aplicados a la Educación",
    course: "Diseño y Construcción de Recursos Educativos Digitales",
  },

  /* ---------------------------------------------------------------- */
  /* Contexto de aplicación: institución donde se desarrolla la        */
  /* propuesta (NO es la institución académica de los autores).        */
  /* ---------------------------------------------------------------- */
  applicationContext: {
    name: "Escuela Normal Superior de Corozal",
    program: "Programa de Formación Complementaria",
    semester: "Segundo semestre",
  },

  /* ---------------------------------------------------------------- */
  /* Datos formales del trabajo de grado (ficha)                       */
  /* ---------------------------------------------------------------- */
  workInfo: {
    type: "Trabajo de grado",
    location: "Corozal, Sucre, Colombia",
    date: "04/06/2026",
  },

  /* ---------------------------------------------------------------- */
  /* Proyecto de investigación de referencia                           */
  /* ---------------------------------------------------------------- */
  project: {
    fullTitle:
      "Secuencia didáctica gamificada en Genially para fortalecer las competencias pedagógicas en la planeación didáctica de los docentes en formación del segundo semestre del Programa de Formación Complementaria de la Escuela Normal Superior de Corozal",
    heroTag: "PORTAFOLIO RED",
    heroTitleLine1: "MISIÓN:",
    heroTitleLine2: "PLANEAR PARA ENSEÑAR",
    heroDescription:
      "Portafolio digital de diseño y construcción de recursos educativos. Un recorrido por las decisiones pedagógicas, los referentes y los productos construidos para fortalecer la planeación didáctica de los docentes en formación.",
    heroQuote:
      "Planear no es llenar un formato: es tomar decisiones pedagógicas con intención.",
  },

  /* ---------------------------------------------------------------- */
  /* Personas — fácil de editar sin tocar el HTML                      */
  /* ---------------------------------------------------------------- */
  people: {
    // Agregar más coautores: { name: "...", role: "Autor" }
    authors: [
      { name: "Carlos I. Martínez", role: "Autor" },
      { name: "Paola Arciniegas", role: "Autor" },
      { name: "David M. Melo", role: "Autor" },
      { name: "Alma X. Lemos", role: "Autor" },
    ],
    // Docente tutor de la asignatura (distinto de la directora de tesis).
    tutor: "Walter José Mejía Valeta",
    director: "Magda Villamil",
  },

  /* ---------------------------------------------------------------- */
  /* Datos del diagnóstico (Misión 01 — Póster)                        */
  /* ---------------------------------------------------------------- */
  diagnostic: [
    {
      value: 66,
      label: "DBA + evidencias + desempeños",
      description: "Dificultad para articular coherencia curricular.",
    },
    {
      value: 65,
      label: "Actividades + evaluación",
      description: "Dificultad para relacionar actividades y evaluación.",
    },
    {
      value: 60,
      label: "Objetivos de aprendizaje",
      description: "Dificultad en la formulación de objetivos.",
    },
    {
      value: 60,
      label: "Uso pedagógico de TIC",
      description: "Uso pedagógico limitado de recursos digitales.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Navegación principal                                              */
  /* ---------------------------------------------------------------- */
  navigation: [
    { id: "inicio", label: "Inicio" },
    { id: "mision-01", label: "Misión 01" },
    { id: "mision-02", label: "Misión 02" },
    { id: "mision-03", label: "Misión 03" },
    { id: "creditos", label: "Créditos" },
  ],

  /* ---------------------------------------------------------------- */
  /* Misiones principales del portafolio (4 secciones del menú)        */
  /* No confundir con `internalMissions` (5 misiones de la investigación) */
  /* ---------------------------------------------------------------- */
  missions: [
    {
      id: "mision-01",
      number: "01",
      codename: "Identificando",
      tagline: "Comprender el reto educativo antes de diseñar la solución.",
      resourceIds: ["avatar1", "avatar2", "poster"],
    },
    {
      id: "mision-02",
      number: "02",
      codename: "Referenciando",
      tagline: "Construir fundamentos para comprender y orientar la propuesta.",
      resourceIds: ["ebook"],
    },
    {
      id: "mision-03",
      number: "03",
      codename: "Diseñando",
      tagline: "Transformar las decisiones pedagógicas en una experiencia de aprendizaje.",
      resourceIds: [
        "unidadDidactica",
        "infografia",
        "disenoInstruccional",
        "productoFinal",
        "videoTutorial",
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Recursos — cada uno pertenece a una misión y tiene un estado.     */
  /* Tipos: "video" | "image" | "document" | "external"                */
  /* ---------------------------------------------------------------- */
  resources: {
    avatar1: {
      title: "Avatar 01",
      type: "video",
      missionId: "mision-01",
      description: "Presentación del título del trabajo de grado, autores y director.",
      status: "completed",
      video: { type: "local", src: "assets/videos/Avatar1.mp4" }, // local | embed | external
    },
    avatar2: {
      title: "Avatar 02",
      type: "video",
      missionId: "mision-01",
      description: "Presentación breve de la problemática y el planteamiento del problema.",
      status: "completed",
      video: { type: "local", src: "assets/videos/Avatar2.mp4" },
    },
    poster: {
      title: "Póster digital — Diagnóstico",
      type: "image",
      missionId: "mision-01",
      description: "Síntesis visual del diagnóstico que motiva la propuesta.",
      status: "completed",
      thumbnail: "assets/posters/poster.png",
      fullImage: "assets/posters/poster.png",
      // Enlace opcional adicional (ej. diseño editable en Canva). Si se
      // define, el modal muestra un botón extra junto a "Abrir versión
      // completa". null = no se muestra.
      // Nota: este enlace de Canva es de solo vista (no editable).
      shareLink: { url: "https://canva.link/sg5jwzoc635ym36", label: "Ver en Canva" },
    },

    ebook: {
      title: "E-book",
      type: "document",
      missionId: "mision-02",
      description: "Fundamentos teóricos que orientan la propuesta didáctica.",
      status: "building",
      documentPath: null,
    },

    unidadDidactica: {
      title: "Unidad didáctica",
      type: "document",
      missionId: "mision-03",
      description: "Planeación de la secuencia didáctica gamificada.",
      status: "locked",
      documentPath: null,
    },
    infografia: {
      title: "Infografía",
      subtitle: "Propuesta metodológica",
      type: "image",
      missionId: "mision-03",
      description: "Síntesis visual de la propuesta metodológica.",
      status: "locked",
      fullImage: null,
    },
    disenoInstruccional: {
      title: "Diseño instruccional",
      type: "document",
      missionId: "mision-03",
      description: "Estructura instruccional de la secuencia gamificada.",
      status: "locked",
      documentPath: null,
    },
    productoFinal: {
      title: "Producto final",
      type: "external",
      missionId: "mision-03",
      description: "Secuencia didáctica gamificada, mediada por Genially.",
      status: "locked",
      externalLink: null,
    },
    videoTutorial: {
      title: "Video tutorial",
      type: "video",
      missionId: "mision-03",
      description: "Guía de uso del producto final.",
      status: "locked",
      video: { type: "embed", src: null },
    },
  },

  /* ---------------------------------------------------------------- */
  /* Referencia secundaria: 5 misiones pedagógicas de la investigación.*/
  /* Se muestran dentro de Misión 03 como contexto, no como navegación.*/
  /* ---------------------------------------------------------------- */
  internalMissions: [
    { number: 1, title: "Formular objetivos" },
    { number: 2, title: "Diseñar actividades coherentes" },
    { number: 3, title: "Construir criterios e instrumentos de evaluación" },
    { number: 4, title: "Seleccionar recursos digitales con intención pedagógica" },
    { number: 5, title: "Adaptar la planeación al contexto" },
  ],

  /* ---------------------------------------------------------------- */
  /* Créditos                                                          */
  /* ---------------------------------------------------------------- */
  credits: {
    // Agregar referencias en formato APA 7 a medida que se confirmen.
    references: [
      'Cevikbas, M., König, J., &amp; Rothland, M. (2024). Empirical research on teacher competence in mathematics lesson planning: Recent developments. <em>ZDM–Mathematics Education</em>, <em>56</em>, 101–113. <a href="https://doi.org/10.1007/s11858-023-01487-2" target="_blank" rel="noopener noreferrer">https://doi.org/10.1007/s11858-023-01487-2</a>',
      'Genially. (s. f.). <em>Free gamification platform: Create game-based materials in minutes</em>. <a href="https://genially.com/features/gamification/" target="_blank" rel="noopener noreferrer">https://genially.com/features/gamification/</a>',
      'Ministerio de Educación Nacional. (2024). <em>Sistema Colombiano de Formación de Educadores</em>. <a href="https://www.mineducacion.gov.co/portal/adelante-maestros/formacion/sistema-colombiano-de-formacion-de-educadores/" target="_blank" rel="noopener noreferrer">mineducacion.gov.co</a>',
      'Sailer, M., &amp; Homner, L. (2020). The gamification of learning: A meta-analysis. <em>Educational Psychology Review</em>, <em>32</em>(1), 77–112. <a href="https://doi.org/10.1007/s10648-019-09498-w" target="_blank" rel="noopener noreferrer">https://doi.org/10.1007/s10648-019-09498-w</a>',
      'UNESCO. (2018). <em>UNESCO ICT competency framework for teachers</em> (Version 3). UNESCO. <a href="https://unesdoc.unesco.org/ark:/48223/pf0000265721" target="_blank" rel="noopener noreferrer">unesdoc.unesco.org</a>',
    ],
    // Fuente de los datos mostrados en el póster/diagnóstico de Misión 01.
    diagnosticSource:
      "Elaboración propia a partir de los resultados del diagnóstico inicial aplicado a 50 docentes en formación del segundo semestre del Programa de Formación Complementaria de la Escuela Normal Superior de Corozal.",
    acknowledgements: [
      "A la comunidad educativa de la Escuela Normal Superior de Corozal por su acompañamiento en este proceso de formación.",
    ],
    license: {
      name: "Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional",
      short: "CC BY-NC-SA 4.0",
      url: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es",
    },
    aiUsage: {
      title: "Uso ético de la Inteligencia Artificial",
      text:
        "El desarrollo técnico de este portafolio (arquitectura, código, identidad visual e interfaz) se elaboró con apoyo de un asistente de inteligencia artificial (Claude, de Anthropic), bajo la dirección, revisión y supervisión permanente del autor. El diagnóstico, las decisiones pedagógicas, el diseño instruccional y los productos educativos del trabajo de grado son autoría y responsabilidad exclusiva de los estudiantes que lo desarrollan. No se utilizó IA para generar datos, resultados de investigación ni contenido académico sustantivo.",
    },
  },

  /* ---------------------------------------------------------------- */
  /* Progreso                                                          */
  /* ---------------------------------------------------------------- */
  progress: {
    // Si se define un id de misión aquí, se fuerza cuál se muestra como activa.
    activeMissionOverride: null,
  },
};
