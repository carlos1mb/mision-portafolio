# assets/icons/

Los íconos que usa el sitio (check, wrench, lock, play, menu, close, arrow-up,
external, image, video, document, book, compass) están definidos **en línea**
dentro de `index.html`, como `<symbol>` dentro de un `<svg style="display:none">`
al inicio de `<body>`, y se referencian con `<use href="#icon-nombre">`.

Esto es intencional: si se cargaran desde archivos sueltos con `fetch()`, el
sitio dejaría de funcionar al abrirse localmente con `file://` (los navegadores
bloquean ese tipo de petición por CORS).

Esta carpeta queda disponible para guardar variantes SVG exportadas o íconos
adicionales de referencia, pero ninguno de sus archivos es requerido en tiempo
de ejecución.
