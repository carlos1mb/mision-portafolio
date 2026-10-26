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
      type: "external",
      missionId: "mision-02",
      description: "Fundamentos teóricos que orientan la propuesta didáctica.",
      status: "completed",
      thumbnail: "assets/img/ebook-cover.png",
      fullImage: "assets/img/ebook-cover.png",
      externalLink: "https://read.bookcreator.com/IsDTpNs7osTkVH8ZvArfDU4XJl33/gX3EErgGTRC-nTgjjIWmNQ",
      externalLinkLabel: "Abrir e-book en Book Creator",
    },

    unidadDidactica: {
      title: "Unidad didáctica",
      type: "external",
      missionId: "mision-03",
      description: "Planeación de la secuencia didáctica gamificada.",
      status: "completed",
      thumbnail: "assets/img/unidad-didactica-cover.png",
      fullImage: "assets/img/unidad-didactica-cover.png",
      externalLink: "https://canva.link/vos5lz3r39hd50t",
      externalLinkLabel: "Ver unidad didáctica en Canva",
    },
    infografia: {
      title: "Infografía",
      subtitle: "Propuesta metodológica",
      type: "external",
      missionId: "mision-03",
      description: "Síntesis visual de la propuesta metodológica.",
      status: "completed",
      externalLink: "https://view.genially.com/6ac2de4879a0b062bb3613a6",
      externalLinkLabel: "Ver infografía en Genially",
    },
    disenoInstruccional: {
      title: "Diseño instruccional",
      type: "image",
      missionId: "mision-03",
      description: "Estructura instruccional de la secuencia gamificada, basada en el modelo ADDIE.",
      status: "completed",
      thumbnail: "assets/img/addie-model.png",
      fullImage: "assets/img/addie-model.png",
      // La imagen ya se muestra completa en el modal; en vez del botón
      // genérico "Abrir versión completa" (redundante aquí), se oculta y se
      // usa el shareLink de abajo como único botón.
      hideFullImageLink: true,
      extendedInfo:
        "El modelo ADDIE (Analizar, Diseñar, Desarrollar, Implementar, Evaluar) ofrece una ruta sistemática y cíclica para organizar una secuencia didáctica: parte de un diagnóstico real de necesidades, traduce esos hallazgos en objetivos y actividades coherentes, guía la construcción ordenada de los recursos digitales, orienta su aplicación con los docentes en formación y cierra con una evaluación que permite ajustar y mejorar la propuesta. Esta lógica garantiza que cada decisión pedagógica del portafolio esté fundamentada y pueda perfeccionarse de forma continua.",
      // Enlace de referencia para profundizar en el modelo ADDIE.
      shareLink: { url: "https://www.ispring.es/blog/modelo-addie", label: "Consultar más" },
    },
    productoFinal: {
      title: "Producto final",
      type: "external",
      missionId: "mision-03",
      description: "Secuencia didáctica gamificada, mediada por Genially.",
      status: "completed",
      thumbnail: "assets/img/planealab-logo.png",
      fullImage: "assets/img/planealab-logo.png",
      externalLink: "https://view.genially.com/6acd58d6d68e3a889e011cd5",
      externalLinkLabel: "Abrir secuencia en Genially",
      extendedInfo:
        "<p>Recurso educativo digital interactivo desarrollado en Genially, dirigido a docentes en formación del segundo semestre del Programa de Formación Complementaria de la Escuela Normal Superior de Corozal.</p><p>Su diseño propone un recorrido de cinco misiones pedagógicas orientadas a fortalecer la formulación de objetivos, la coherencia entre actividades y evaluación, la selección pertinente de recursos digitales y la contextualización de la planeación didáctica.</p>",
      // Ficha técnica mostrada en un modal aparte (botón "Ficha técnica").
      fichaTecnica: [
        { label: "Nombre del recurso", value: "Misión PlaneaLab — Rescate de la planeación didáctica" },
        { label: "Tipo de recurso", value: "Recurso Educativo Digital (RED) interactivo y gamificado" },
        { label: "Herramienta de autor", value: "Genially" },
        { label: "Autores", value: "Carlos I. Martínez, Paola Arciniegas, David M. Melo, Alma X. Lemos" },
        { label: "Institución", value: "Universidad de Cartagena — Maestría en Recursos Digitales Aplicados a la Educación" },
        {
          label: "Público objetivo",
          value: "Docentes en formación, segundo semestre, Programa de Formación Complementaria, Escuela Normal Superior de Corozal",
        },
        {
          label: "Estructura",
          value:
            "5 misiones pedagógicas: formular objetivos, diseñar actividades coherentes, construir criterios e instrumentos de evaluación, seleccionar recursos digitales con intención pedagógica y adaptar la planeación al contexto",
        },
        { label: "Formato de acceso", value: "En línea (enlace web) y sin conexión (archivo .genially + Genially Viewer)" },
        { label: "Idioma", value: "Español" },
        { label: "Licencia", value: "CC BY-NC-SA 4.0" },
      ],
      // Archivo .genially descargable (alojado en Google Drive, ya que
      // exportar directamente desde Genially requiere un plan de pago).
      // Se usa el enlace de "compartir" tal cual (no el de descarga directa
      // uc?export=download): el archivo pesa 126 MB, así que Drive siempre
      // muestra su página de advertencia por virus con un token de un solo
      // uso; es más confiable dejar que el usuario descargue desde la
      // propia interfaz de Drive.
      downloadFile: {
        url: "https://drive.google.com/file/d/1SIacBpfQ0cNkT0n4cZczTwFIUClCnv7-/view?usp=sharing",
        label: "Descargar archivo (.genially)",
      },
      // Instrucciones para ver el recurso sin conexión con Genially Viewer.
      viewerInfo:
        "El botón anterior abre el archivo en Google Drive (pesa 126 MB, así que Drive puede mostrar un aviso de \"no se puede escanear por virus\"; solo debes elegir \"Descargar de todas formas\"). Luego ábrelo con <strong>Genially Viewer</strong>, la aplicación gratuita de Genially para computador, Android e iOS (búscala como \"Genially Viewer\" en Google Play, App Store o en el sitio oficial de Genially).",
      // Modal aparte (botón "Relación con la investigación") con el texto
      // que vincula este producto con el proyecto de investigación.
      relacionInvestigacion: {
        buttonLabel: "Relación con la investigación",
        title: "Relación con el proyecto de investigación",
        content:
          '<p>El recurso educativo digital <strong>Misión: Planear para Enseñar</strong> surge de la investigación orientada al fortalecimiento de las competencias pedagógicas asociadas a la planeación didáctica en docentes en formación del segundo semestre del Programa de Formación Complementaria de la Escuela Normal Superior de Corozal. La propuesta responde a necesidades detectadas en la formulación de objetivos de aprendizaje, la articulación de actividades con los procesos de evaluación, la elección de recursos pertinentes y la coherencia general de los planes de clase.</p>' +
          '<p>Frente a estas necesidades se diseñó una secuencia gamificada en Genially que plantea retos y experiencias interactivas vinculadas con situaciones pedagógicas. Con ello se busca promover la participación, el análisis y la aplicación de criterios de planeación didáctica en contextos cercanos al ejercicio profesional del normalista superior.</p>' +
          '<p>El recurso constituye el producto de intervención previsto en el proyecto de investigación. Su diseño e implementación se orientan a fortalecer las competencias de planeación; la magnitud de los resultados solo podrá establecerse mediante el análisis de los instrumentos aplicados, por lo que no se anticipan efectos aún no comprobados.</p>' +
          '<h4 class="modal-subheading">Correspondencia entre necesidades y propuesta</h4>' +
          '<div class="modal-table-wrap"><table class="modal-table">' +
          "<thead><tr><th>Necesidad identificada</th><th>Respuesta pedagógica prevista</th></tr></thead>" +
          "<tbody>" +
          "<tr><td>Objetivos de aprendizaje poco articulados</td><td>Retos para analizar y formular objetivos coherentes con el contexto.</td></tr>" +
          "<tr><td>Dificultades al relacionar actividades y evaluación</td><td>Situaciones que requieren conectar actividades, evidencias y criterios evaluativos.</td></tr>" +
          "<tr><td>Selección de recursos sin suficiente justificación</td><td>Actividades de elección de recursos según el propósito didáctico.</td></tr>" +
          "<tr><td>Necesidad de reflexionar sobre decisiones pedagógicas</td><td>Misiones contextualizadas con preguntas y retroalimentación.</td></tr>" +
          "</tbody></table></div>" +
          '<p class="modal-note"><strong>Nota metodológica:</strong> la muestra de trabajo de la investigación fue ajustada a 30 estudiantes; cualquier cifra diagnóstica incluida en el portafolio debe coincidir con los registros definitivos y no extrapolar porcentajes de análisis previos.</p>',
      },
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
      "Elaboración propia a partir de los resultados del diagnóstico inicial aplicado a 30 docentes en formación del segundo semestre del Programa de Formación Complementaria de la Escuela Normal Superior de Corozal.",
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
