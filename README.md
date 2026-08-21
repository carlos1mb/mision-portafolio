# Misión: Planear para Enseñar — Portafolio RED

Portafolio electrónico académico del curso **Diseño y Construcción de Recursos
Educativos Digitales**, de la **Escuela Normal Superior de Corozal** (Programa
de Formación Complementaria). Documenta el proceso de planeación didáctica
asociado al proyecto de grado:

> *Secuencia didáctica gamificada en Genially para fortalecer las competencias
> pedagógicas asociadas a la planeación didáctica en los docentes en formación
> del segundo semestre del Programa de Formación Complementaria de la Escuela
> Normal Superior de Corozal.*

El sitio no reemplaza el proyecto de investigación: es el **ecosistema visual**
donde se organizan y exhiben los Recursos Educativos Digitales que se van
produciendo en el curso, bajo la narrativa de una ruta de **misiones
pedagógicas** ("el docente en formación como diseñador de experiencias de
aprendizaje").

---

## Objetivo

Ofrecer una experiencia web en la que cualquier visitante pueda: conocer el
proyecto y sus autores, recorrer las misiones/fases del portafolio, abrir los
recursos producidos (videos, pósteres, e-books, infografías, etc.), entender
visualmente cuánto se ha avanzado, y consultar referencias, créditos y
licenciamiento — todo desde un sitio 100% estático, sin backend ni base de
datos, que funciona igual abriendo `index.html` en el computador o publicado
en GitHub Pages.

---

## Estructura del proyecto

```
actividad1dyc/
├── index.html            # Estructura de toda la página (una sola vista con anclas)
├── README.md              # Este archivo
├── .gitignore
├── css/
│   ├── styles.css         # Variables de diseño, layout, componentes, responsive
│   └── animations.css     # Animaciones de entrada, microinteracciones, reduced-motion
├── js/
│   ├── config.js          # ÚNICA fuente de datos del portafolio (editar aquí)
│   └── app.js              # Renderizado, progreso, modales, navegación, accesibilidad
└── assets/
    ├── icons/              # (los íconos reales están inline en index.html, ver assets/icons/README.md)
    ├── img/                # favicon, imagen Open Graph
    ├── posters/            # Póster del diagnóstico (Misión 01)
    ├── videos/             # Videos locales de los recursos (avatares, tutorial)
    └── documents/           # Documentos (e-book, unidad didáctica, etc.)
```

**Ningún dato de autoría, institución o estado de un recurso está repetido en
el HTML.** Todo se inyecta en tiempo de carga desde `js/config.js`.

---

## Cómo ejecutarlo localmente

No requiere instalación de Node.js, ni servidor, ni build:

1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html` (o ábrelo desde el navegador con `Ctrl+O`).
3. Listo — funciona directamente con el protocolo `file://`.

Si tu navegador restringe algo al usar `file://` (poco común con este
proyecto, ya que no usa `fetch()` ni módulos ES), también puedes servirlo con
cualquier servidor estático simple, por ejemplo:

```powershell
# Con Python instalado
python -m http.server 8000
# Luego abrir http://localhost:8000 en el navegador
```

---

## Cómo agregar o actualizar un recurso

Todo recurso vive en `js/config.js`, dentro del objeto `SITE_CONFIG.resources`.
Pasos:

1. Coloca el archivo real en la carpeta correspondiente de `assets/`
   (`assets/videos/`, `assets/documents/`, `assets/posters/`, etc.).
2. Edita la entrada del recurso en `SITE_CONFIG.resources` con la ruta nueva.
   Por ejemplo, para activar el Avatar 01 con un video local:

   ```js
   avatar1: {
     title: "Avatar 01",
     type: "video",
     missionId: "mision-01",
     description: "Presentación del título del trabajo de grado, autores y director.",
     status: "completed",               // <- cambia el estado
     video: { type: "local", src: "assets/videos/avatar1.mp4" }, // <- ruta real
   },
   ```

3. Guarda y recarga `index.html`. La tarjeta, el modal y las barras de
   progreso se actualizan automáticamente — no hay que tocar el HTML.

Tipos de recurso soportados (campo `type`): `"video"`, `"image"`, `"document"`,
`"external"`. Cada uno admite un video embebido (`video.type: "embed"`, por
ejemplo un iframe de YouTube/Vimeo) o un enlace externo (`video.type:
"external"` o `externalLink`, por ejemplo un enlace a Genially).

### Agregar más autores

Edita el arreglo `SITE_CONFIG.people.authors` en `js/config.js`:

```js
authors: [
  { name: "Carlos I. Martínez", role: "Autor" },
  { name: "Paola Arciniegas", role: "Autor" },
  { name: "Nombre del nuevo autor", role: "Autor" }, // agregar así cuantos falten
],
```

---

## Cómo cambiar el estado de un recurso

Cada recurso tiene un campo `status` con exactamente uno de estos 4 valores:

| Valor        | Etiqueta visible | Efecto                                                    |
|--------------|-------------------|-------------------------------------------------------------|
| `"available"` | Disponible        | Tarjeta activa, botón habilitado ("Abrir").                |
| `"building"`  | En construcción   | Tarjeta activa; el botón abre un modal con aviso de "en construcción". |
| `"completed"` | Completada        | Tarjeta activa; el botón abre el recurso real.             |
| `"locked"`    | Bloqueada         | Tarjeta atenuada; botón deshabilitado.                     |

El progreso global, el progreso por misión y los contadores "X / Y recursos
completados" se recalculan solos a partir de estos valores — no hay que
editar ningún número de porcentaje a mano.

Si en algún momento se quiere forzar cuál misión se muestra como "activa" en
el panel del Centro de Misiones, se puede fijar en:

```js
progress: {
  activeMissionOverride: "mision-02", // o null para que se calcule automáticamente
},
```

---

## Cómo desplegar en GitHub Pages

1. Crea el repositorio en GitHub (o usa uno ya existente) y sube esta carpeta
   a la rama `main`:

   ```powershell
   git init
   git add .
   git commit -m "Primera versión del portafolio"
   git branch -M main
   git remote add origin https://github.com/<usuario>/<repositorio>.git
   git push -u origin main
   ```

2. En GitHub, ve a **Settings → Pages**.
3. En "Build and deployment", selecciona **Deploy from a branch**, rama
   `main` y carpeta `/(root)`.
4. Guarda y espera unos minutos — GitHub mostrará la URL pública
   (`https://<usuario>.github.io/<repositorio>/`).

No es necesario ningún cambio adicional en el código: todas las rutas del
proyecto son **relativas** (`css/...`, `js/...`, `assets/...`, nunca con `/`
inicial), por lo que funcionan igual en local y en GitHub Pages.

---

## Cómo modificar la identidad visual

Todas las variables de color y forma están centralizadas en `:root`, al
inicio de `css/styles.css`:

| Variable               | Uso                                              |
|-------------------------|---------------------------------------------------|
| `--bg-primary`          | Fondo general del sitio (azul noche)              |
| `--bg-secondary`        | Fondo de bloques alternos                         |
| `--panel` / `--panel-hover` | Fondo de tarjetas y paneles                  |
| `--border`              | Bordes y separadores sutiles                      |
| `--text-primary`        | Texto principal (blanco cálido)                   |
| `--text-secondary`      | Texto secundario                                  |
| `--text-muted`          | Metadatos y etiquetas pequeñas                    |
| `--accent-primary`      | Ámbar/dorado — CTA principal, énfasis             |
| `--accent-secondary`    | Cian — enlaces, foco, acentos                     |
| `--state-completed/-building/-available/-locked` | Colores de los 4 estados de recurso |
| `--focus-ring`          | Color del anillo de foco accesible                |

Cambiar cualquiera de estos valores actualiza el sitio completo, sin tocar
HTML ni JavaScript. La tipografía usa una pila de fuentes de sistema
(`--font-body`) para no depender de ninguna conexión externa; si más adelante
se quiere usar una tipografía como Space Grotesk o Sora, se puede
auto-hospedar el `.woff2` en `assets/fonts/` y declarar un `@font-face` al
inicio de `css/styles.css`.

---

## Accesibilidad implementada

- Contraste de color verificado (AA/AAA) entre texto y fondos oscuros.
- `alt` en imágenes, `aria-label` en botones e iconos decorativos marcados
  con `aria-hidden`.
- Navegación completa por teclado (menú, tarjetas, modales).
- Modales con `role="dialog"`, `aria-modal`, foco atrapado y `Escape` para
  cerrar; el foco vuelve al elemento que abrió el modal.
- Barra de progreso con `role="progressbar"` y `aria-valuenow` real; el
  porcentaje visible junto a la barra está marcado `aria-hidden` para no
  duplicar el anuncio ante lectores de pantalla (ya lo cubre `aria-valuenow`).
- `prefers-reduced-motion` respetado: se desactivan animaciones no esenciales.
- Enlace "Saltar al contenido principal" (*skip link*) al inicio de la página.
- `:focus-visible` con anillo de foco visible en todos los elementos
  interactivos.

---

## Licencias

- **Código** del portafolio: puede publicarse bajo licencia MIT (opcional,
  a criterio del autor).
- **Contenido educativo** (textos, recursos, diagnóstico, productos del
  curso): **Creative Commons Atribución-NoComercial-CompartirIgual 4.0
  Internacional (CC BY-NC-SA 4.0)**. El bloque visual de licenciamiento está
  en la sección **Créditos** del sitio y se edita en
  `SITE_CONFIG.credits.license`.

---

## Estado del proyecto / próximos pasos

Esta es la **primera iteración**: se construyó toda la arquitectura visual y
funcional del portafolio (navegación, sistema de estados, progreso, tarjetas,
modales, responsive, mapa de navegación) con datos reales donde se conocían y
placeholders explícitos donde no.

Pendiente para iteraciones siguientes (todo se agrega solo en
`js/config.js` y en las carpetas de `assets/`, sin tocar HTML/CSS/JS):

- Contenido real de Avatar 01, Avatar 02 y video tutorial.
- E-book, unidad didáctica, infografía, diseño instruccional.
- Enlace del producto final (Genially).
- Nombre real del docente tutor y del director del trabajo de grado.
- Referencias bibliográficas en formato APA 7.
- Isotipo/favicon institucional definitivo, si existe uno oficial.

---

## Autoría

- **Carlos I. Martínez**
- **Paola Arciniegas**
- **David M. Melo**
- **Alma X. Lemos**

Universidad de Cartagena — Centro de Posgrados — Facultad de Ciencias Sociales y Educación — Maestría en Recursos Digitales Aplicados a la Educación.
Directora / asesora: Magda Villamil.
