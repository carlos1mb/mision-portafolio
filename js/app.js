/**
 * app.js
 * -----------------------------------------------------------------------
 * Lógica del portafolio "Misión: Planear para Enseñar".
 *
 * Responsabilidades: renderizar el contenido de SITE_CONFIG en el DOM,
 * calcular el progreso, controlar los modales, la navegación (menú móvil,
 * scroll, sección activa), el modo presentación y las animaciones de
 * entrada. No depende de librerías externas ni de conexión a internet.
 *
 * Este archivo se carga DESPUÉS de js/config.js.
 * -----------------------------------------------------------------------
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Utilidades cortas                                                   */
  /* ------------------------------------------------------------------ */
  function qs(selector, ctx) { return (ctx || document).querySelector(selector); }
  function qsa(selector, ctx) { return Array.from((ctx || document).querySelectorAll(selector)); }
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ------------------------------------------------------------------ */
  /* Tablas de referencia para estados y tipos de recurso                */
  /* ------------------------------------------------------------------ */
  const STATUS_META = {
    completed: { label: "Completada", icon: "icon-check" },
    building: { label: "En construcción", icon: "icon-wrench" },
    available: { label: "Disponible", icon: "icon-play" },
    locked: { label: "Bloqueada", icon: "icon-lock" },
  };

  const BUTTON_LABEL = {
    completed: "Ver recurso",
    building: "Ver estado",
    available: "Abrir",
    locked: "Bloqueada",
  };

  const TYPE_ICON = {
    video: "icon-video",
    image: "icon-image",
    document: "icon-document",
    external: "icon-external",
  };

  let lastFocusedElement = null;

  /* ------------------------------------------------------------------ */
  /* Cálculo de progreso                                                  */
  /* ------------------------------------------------------------------ */
  function computeResourceStats(resourceIds) {
    const stats = { completed: 0, building: 0, available: 0, locked: 0, total: resourceIds.length };
    resourceIds.forEach((id) => {
      const resource = SITE_CONFIG.resources[id];
      if (resource && stats.hasOwnProperty(resource.status)) stats[resource.status]++;
    });
    stats.percent = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
    return stats;
  }

  function computeMissionStats(missionId) {
    const mission = SITE_CONFIG.missions.find((m) => m.id === missionId);
    return mission ? computeResourceStats(mission.resourceIds) : { completed: 0, building: 0, available: 0, locked: 0, total: 0, percent: 0 };
  }

  function getGlobalStats() {
    return computeResourceStats(Object.keys(SITE_CONFIG.resources));
  }

  function getMissionAggregatedStatus(stats) {
    if (stats.total > 0 && stats.completed === stats.total) return "completed";
    if (stats.total > 0 && stats.locked === stats.total) return "locked";
    return "available"; // mezcla de estados: la misión está en curso
  }

  function determineActiveMission() {
    const overrideId = SITE_CONFIG.progress.activeMissionOverride;
    if (overrideId) {
      const forced = SITE_CONFIG.missions.find((m) => m.id === overrideId);
      if (forced) return forced;
    }
    const inProgress = SITE_CONFIG.missions.find((m) => computeMissionStats(m.id).percent < 100);
    return inProgress || SITE_CONFIG.missions[SITE_CONFIG.missions.length - 1];
  }

  /* ------------------------------------------------------------------ */
  /* Meta tags (título, descripción, favicon, theme-color, Open Graph)   */
  /* Se sincronizan desde SITE_CONFIG.meta para que sea la única fuente  */
  /* editable; el HTML ya trae los mismos valores por defecto para que   */
  /* los rastreadores que no ejecutan JS también los reciban.            */
  /* ------------------------------------------------------------------ */
  function renderMetaTags() {
    const meta = SITE_CONFIG.meta;
    document.title = meta.title;
    const setContent = (selector, value) => {
      const el = qs(selector);
      if (el && value) el.setAttribute("content", value);
    };
    setContent('meta[name="description"]', meta.description);
    setContent('meta[name="theme-color"]', meta.themeColor);
    setContent('meta[property="og:title"]', meta.title);
    setContent('meta[property="og:description"]', meta.description);
    setContent('meta[property="og:image"]', meta.ogImage);
    const favicon = qs('link[rel="icon"]');
    if (favicon && meta.favicon) favicon.setAttribute("href", meta.favicon);
  }

  /* ------------------------------------------------------------------ */
  /* Navegación principal                                                */
  /* ------------------------------------------------------------------ */
  function renderNavigation() {
    const menu = qs("#navMenu");
    if (!menu) return;
    menu.innerHTML = SITE_CONFIG.navigation
      .map((item) => `<li><a class="navbar__link" data-section="${item.id}" href="#${item.id}">${item.label}</a></li>`)
      .join("");
  }

  /* ------------------------------------------------------------------ */
  /* Inicio — Hero                                                       */
  /* ------------------------------------------------------------------ */
  function renderHeroContent() {
    const { project, institution, people } = SITE_CONFIG;

    const tag = qs("#heroTag");
    if (tag) tag.textContent = project.heroTag;

    const title = qs("#heroTitle");
    if (title) {
      title.innerHTML = `
        <span class="hero__title-line">${project.heroTitleLine1}</span>
        <span class="hero__title-line hero__title-line--accent">${project.heroTitleLine2}</span>`;
    }

    const description = qs("#heroDescription");
    if (description) description.textContent = project.heroDescription;

    const authors = people.authors.map((a) => a.name).join(", ");
    const meta = qs("#heroMeta");
    if (meta) {
      meta.innerHTML = `
        <div><dt>Autor(es)</dt><dd>${authors}</dd></div>
        <div><dt>Curso</dt><dd>${institution.course}</dd></div>
        <div><dt>Institución</dt><dd>${institution.name}</dd></div>`;
    }
  }

  function renderConceptQuote() {
    const el = qs("#conceptQuote");
    if (!el) return;
    el.classList.add("reveal");
    el.textContent = `“${SITE_CONFIG.project.heroQuote}”`;
  }

  /* ------------------------------------------------------------------ */
  /* Centro de misiones — Dashboard                                      */
  /* ------------------------------------------------------------------ */
  function renderCurrentMissionStatus() {
    const active = determineActiveMission();
    const stats = computeMissionStats(active.id);
    const container = qs("#currentMissionCard");
    if (!container) return;
    container.innerHTML = `
      <span class="status-card__label">Misión activa</span>
      <span class="status-card__value">${active.number} — ${active.codename.toUpperCase()}</span>
      <p class="status-card__sub">${stats.completed}/${stats.total} recursos completados</p>`;
  }

  function missionCardHTML(mission) {
    const stats = computeMissionStats(mission.id);
    const aggregated = getMissionAggregatedStatus(stats);
    const meta = STATUS_META[aggregated];
    return `
      <article class="mission-card mission-card--${aggregated}">
        <span class="mission-card__number">Misión ${mission.number}</span>
        <h3 class="mission-card__name">${mission.codename}</h3>
        <p class="mission-card__desc">${mission.tagline}</p>
        <span class="status-badge status-badge--${aggregated}">
          <svg class="icon" aria-hidden="true"><use href="#${meta.icon}"></use></svg>${meta.label}
        </span>
        <div class="mission-card__progress">
          <div class="progress-bar progress-bar--mini" role="progressbar" aria-valuemin="0" aria-valuemax="100"
               aria-valuenow="${stats.percent}" aria-label="Progreso de la misión ${mission.codename}">
            <div class="progress-bar__fill" style="width:${stats.percent}%"></div>
          </div>
          <span>${stats.completed}/${stats.total}</span>
        </div>
        <a class="btn btn--ghost" href="#${mission.id}">Entrar a la misión</a>
      </article>`;
  }

  function renderMissionCards() {
    const container = qs("#missionCardsContainer");
    if (!container) return;
    container.classList.add("reveal-stagger");
    container.innerHTML = SITE_CONFIG.missions.map(missionCardHTML).join("");
  }

  function renderProgress() {
    const global = getGlobalStats();

    const fill = qs("#globalProgressFill");
    const bar = qs("#globalProgressBar");
    const ascii = qs("#globalProgressAscii");
    const label = qs("#globalProgressLabel");
    if (fill) fill.style.width = global.percent + "%";
    if (bar) bar.setAttribute("aria-valuenow", String(global.percent));
    if (ascii) ascii.textContent = `${global.percent}%`;
    if (label) label.textContent = `${global.completed} de ${global.total} recursos completados`;

    const resourcesCard = qs("#resourcesCompletedCard");
    if (resourcesCard) {
      resourcesCard.innerHTML = `
        <span class="status-card__label">Recursos completados</span>
        <span class="status-card__value">${global.completed} / ${global.total}</span>
        <p class="status-card__sub">${global.building} en construcción · ${global.locked} bloqueados</p>`;
    }

    // Mini barras de progreso dentro del encabezado de cada misión.
    SITE_CONFIG.missions.forEach((mission) => {
      const stats = computeMissionStats(mission.id);
      const fillEl = qs(`#missionProgressFill-${mission.id}`);
      const barEl = qs(`#missionProgress-${mission.id}`);
      const labelEl = qs(`#missionProgressLabel-${mission.id}`);
      if (fillEl) fillEl.style.width = stats.percent + "%";
      if (barEl) barEl.setAttribute("aria-valuenow", String(stats.percent));
      if (labelEl) labelEl.textContent = `${stats.completed}/${stats.total} completados`;
    });
  }

  /* ------------------------------------------------------------------ */
  /* Secciones de misión (encabezado + grilla de recursos)                */
  /* ------------------------------------------------------------------ */
  function resourceCardHTML(id, resource) {
    const meta = STATUS_META[resource.status];
    const buttonLabel = BUTTON_LABEL[resource.status];
    const disabledAttr = resource.status === "locked" ? "disabled aria-disabled=\"true\"" : "";
    const visual = resource.thumbnail
      ? `<img src="${resource.thumbnail}" alt="Miniatura de ${resource.title}" loading="lazy">`
      : `<svg class="icon resource-card__visual-icon" aria-hidden="true"><use href="#${TYPE_ICON[resource.type] || "icon-document"}"></use></svg>`;

    return `
      <article class="resource-card resource-card--${resource.status}" id="resource-${id}">
        <div class="resource-card__visual" aria-hidden="true">${visual}</div>
        <span class="status-badge status-badge--${resource.status}">
          <svg class="icon" aria-hidden="true"><use href="#${meta.icon}"></use></svg>${meta.label}
        </span>
        <h3 class="resource-card__title">${resource.title}</h3>
        ${resource.subtitle ? `<p class="resource-card__subtitle">${resource.subtitle}</p>` : ""}
        <p class="resource-card__desc">${resource.description}</p>
        <button class="btn btn--card" type="button" data-resource-id="${id}" ${disabledAttr}>${buttonLabel}</button>
      </article>`;
  }

  function renderMissionSections() {
    qsa(".mission-section").forEach((section) => {
      const missionId = section.dataset.missionId;
      const mission = SITE_CONFIG.missions.find((m) => m.id === missionId);
      if (!mission) return;

      const header = section.querySelector(".mission-section__header");
      if (header) {
        header.innerHTML = `
          <div>
            <div class="mission-header__eyebrow">
              <span class="mission-header__number">${mission.number}</span>
              <span class="section-eyebrow">Misión ${mission.number}</span>
            </div>
            <h2 class="mission-header__title" id="${mission.id}-heading">${mission.codename}</h2>
            <p class="mission-header__tagline">${mission.tagline}</p>
          </div>
          <div class="mission-header__progress">
            <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
                 aria-label="Progreso de la misión ${mission.codename}" id="missionProgress-${mission.id}">
              <div class="progress-bar__fill" id="missionProgressFill-${mission.id}"></div>
            </div>
            <div class="progress-bar__meta"><span id="missionProgressLabel-${mission.id}"></span></div>
          </div>`;
      }

      const grid = section.querySelector(".resource-grid");
      if (grid) {
        grid.classList.add("reveal-stagger");
        grid.innerHTML = mission.resourceIds
          .map((id) => resourceCardHTML(id, SITE_CONFIG.resources[id]))
          .join("");
      }
    });
  }

  function renderDiagnosticStats() {
    const container = qs("#diagnosticStats");
    if (!container) return;
    container.classList.add("reveal-stagger");
    container.innerHTML = SITE_CONFIG.diagnostic
      .map(
        (d) => `
      <div class="diagnostic-stat">
        <div class="diagnostic-stat__value">${d.value}%</div>
        <div class="diagnostic-stat__label">${d.label}</div>
        <div class="diagnostic-stat__desc">${d.description}</div>
      </div>`
      )
      .join("");
  }

  function renderInternalMissionsReference() {
    const container = qs("#internalMissionsRef");
    if (!container) return;
    container.innerHTML = `
      <p class="internal-missions__title">Misiones pedagógicas de la investigación (referencia)</p>
      <ul class="internal-missions__list"></ul>`;
    const list = container.querySelector(".internal-missions__list");
    list.classList.add("reveal-stagger");
    list.innerHTML = SITE_CONFIG.internalMissions
      .map((m) => `<li class="internal-missions__item"><strong>${m.number}.</strong> ${m.title}</li>`)
      .join("");
  }

  /* ------------------------------------------------------------------ */
  /* Ficha del trabajo de grado                                           */
  /* ------------------------------------------------------------------ */
  function renderFactSheet() {
    const el = qs("#factSheet");
    if (!el) return;
    const { project, institution, applicationContext, workInfo, people } = SITE_CONFIG;
    const authors = people.authors.map((a) => a.name).join(", ");

    el.classList.add("reveal");
    el.innerHTML = `
      <p class="fact-sheet__title-label">Ficha del trabajo de grado</p>
      <p class="fact-sheet__full-title">${project.fullTitle}</p>
      <dl class="fact-sheet__grid">
        <div><dt>Autores</dt><dd>${authors}</dd></div>
        <div><dt>Tipo de trabajo</dt><dd>${workInfo.type}</dd></div>
        <div><dt>Institución</dt><dd>${institution.name}<br>${institution.center} — ${institution.faculty}<br>${institution.program}</dd></div>
        <div><dt>Directora / asesora</dt><dd>${people.director}</dd></div>
        <div><dt>Docente tutor de la asignatura</dt><dd>${people.tutor}</dd></div>
        <div><dt>Contexto de aplicación</dt><dd>${applicationContext.name} — ${applicationContext.program} (${applicationContext.semester})</dd></div>
        <div><dt>Localización</dt><dd>${workInfo.location}</dd></div>
        <div><dt>Fecha</dt><dd>${workInfo.date}</dd></div>
      </dl>`;
  }

  /* ------------------------------------------------------------------ */
  /* Créditos                                                             */
  /* ------------------------------------------------------------------ */
  function renderCreditsSection() {
    const { credits } = SITE_CONFIG;

    const referencesList = qs("#referencesList");
    if (referencesList) {
      referencesList.classList.add("reveal-stagger");
      referencesList.innerHTML = credits.references.length
        ? credits.references.map((ref) => `<li>${ref}</li>`).join("")
        : `<li class="empty-hint">Referencias en proceso de confirmación (formato APA 7).</li>`;
    }

    const acknowledgementsList = qs("#acknowledgementsList");
    if (acknowledgementsList) {
      acknowledgementsList.classList.add("reveal-stagger");
      acknowledgementsList.innerHTML = credits.acknowledgements.length
        ? credits.acknowledgements.map((a) => `<li>${a}</li>`).join("")
        : `<li class="empty-hint">Agradecimientos por confirmar.</li>`;
    }

    const licenseContent = qs("#licenseContent");
    if (licenseContent) {
      licenseContent.innerHTML = `
        <div class="license-badge">
          <span class="license-badge__icon" aria-hidden="true">CC</span>
          <div>
            <div class="license-badge__name">${credits.license.short}</div>
            <div>${credits.license.name}</div>
            <a class="license-badge__link" href="${credits.license.url}" target="_blank" rel="noopener noreferrer">Ver términos de la licencia ↗</a>
          </div>
        </div>`;
    }

    const aiUsageContent = qs("#aiUsageContent");
    if (aiUsageContent && credits.aiUsage) {
      aiUsageContent.innerHTML = `<p>${credits.aiUsage.text}</p>`;
    }

    const creditsGrid = qs("#creditos .credits-grid");
    if (creditsGrid) creditsGrid.classList.add("reveal-stagger");

    const navMap = qs("#mapa-navegacion");
    if (navMap) navMap.classList.add("reveal");
  }

  function renderFooter() {
    const el = qs("#footerText");
    if (!el) return;
    const authors = SITE_CONFIG.people.authors.map((a) => a.name).join(", ");
    const year = new Date().getFullYear();
    el.textContent = `© ${year} ${SITE_CONFIG.institution.name} — ${authors}. Contenido bajo licencia ${SITE_CONFIG.credits.license.short}.`;
  }

  /* ------------------------------------------------------------------ */
  /* Modal de recursos (imagen / video / documento / enlace externo)     */
  /* ------------------------------------------------------------------ */
  function buildModalContent(resource) {
    if (resource.status === "building") {
      return `<div class="modal-placeholder"><svg class="icon" aria-hidden="true"><use href="#icon-wrench"></use></svg><p>Este recurso está en construcción. Vuelve pronto para consultarlo.</p></div>`;
    }

    switch (resource.type) {
      case "video": {
        const video = resource.video || {};
        if (video.type === "local" && video.src) {
          return `<div class="video-embed-16x9"><video controls preload="metadata" src="${video.src}"></video></div>`;
        }
        if (video.type === "embed" && video.src) {
          return `<div class="video-embed-16x9"><iframe src="${video.src}" title="${resource.title}" allow="autoplay; fullscreen" allowfullscreen></iframe></div>`;
        }
        return `<div class="modal-placeholder"><svg class="icon" aria-hidden="true"><use href="#icon-video"></use></svg><p>El video aún no ha sido incorporado.</p></div>`;
      }
      case "image": {
        if (resource.fullImage) return `<img src="${resource.fullImage}" alt="${resource.title}">`;
        return `<div class="modal-placeholder"><svg class="icon" aria-hidden="true"><use href="#icon-image"></use></svg><p>La imagen aún no ha sido incorporada.</p></div>`;
      }
      case "document": {
        const message = resource.documentPath ? "Documento disponible para consulta." : "El documento aún no ha sido incorporado.";
        return `<div class="modal-placeholder"><svg class="icon" aria-hidden="true"><use href="#icon-document"></use></svg><p>${message}</p></div>`;
      }
      case "external": {
        const message = resource.externalLink ? "Este producto se aloja en un enlace externo." : "El enlace externo aún no ha sido incorporado.";
        return `<div class="modal-placeholder"><svg class="icon" aria-hidden="true"><use href="#icon-external"></use></svg><p>${message}</p></div>`;
      }
      default:
        return "";
    }
  }

  function buildModalFooter(resource) {
    const buttons = [];

    if (resource.type === "image" && resource.fullImage) {
      buttons.push(`<a class="btn btn--secondary" href="${resource.fullImage}" target="_blank" rel="noopener noreferrer">Abrir versión completa</a>`);
    }
    if (resource.type === "document" && resource.documentPath) {
      buttons.push(`<a class="btn btn--secondary" href="${resource.documentPath}" target="_blank" rel="noopener noreferrer">Abrir documento</a>`);
    }
    if (resource.type === "external" && resource.externalLink) {
      buttons.push(`<a class="btn btn--secondary" href="${resource.externalLink}" target="_blank" rel="noopener noreferrer">Abrir enlace externo</a>`);
    }
    if (resource.type === "video" && resource.video && resource.video.type === "external" && resource.video.src) {
      buttons.push(`<a class="btn btn--secondary" href="${resource.video.src}" target="_blank" rel="noopener noreferrer">Ver video externo</a>`);
    }
    // Enlace opcional adicional (ej. abrir el diseño editable en Canva),
    // disponible para cualquier tipo de recurso.
    if (resource.shareLink && resource.shareLink.url) {
      buttons.push(`<a class="btn btn--secondary" href="${resource.shareLink.url}" target="_blank" rel="noopener noreferrer">${resource.shareLink.label || "Ver enlace"}</a>`);
    }

    return buttons.join("");
  }

  function getFocusableElements(container) {
    return qsa('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', container);
  }

  function handleModalKeydown(e) {
    const modal = qs("#resourceModal");
    if (!modal || modal.hidden) return;
    if (e.key === "Escape") {
      closeResourceModal();
      return;
    }
    if (e.key === "Tab") {
      const focusable = getFocusableElements(modal);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openResourceModal(resourceId) {
    const resource = SITE_CONFIG.resources[resourceId];
    if (!resource || resource.status === "locked") return;

    const modal = qs("#resourceModal");
    if (!modal) return;

    lastFocusedElement = document.activeElement;

    const meta = STATUS_META[resource.status];
    const badge = qs("#resourceModalBadge");
    if (badge) {
      badge.className = `status-badge status-badge--${resource.status}`;
      badge.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#${meta.icon}"></use></svg>${meta.label}`;
    }
    const titleEl = qs("#resourceModalTitle");
    if (titleEl) titleEl.textContent = resource.title;
    const descEl = qs("#resourceModalDescription");
    if (descEl) descEl.textContent = resource.description || "";
    const contentEl = qs("#resourceModalContent");
    if (contentEl) contentEl.innerHTML = buildModalContent(resource);
    const footerEl = qs("#resourceModalFooter");
    if (footerEl) footerEl.innerHTML = buildModalFooter(resource);

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleModalKeydown);

    const closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeResourceModal() {
    const modal = qs("#resourceModal");
    if (!modal || modal.hidden) return;

    modal.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleModalKeydown);

    // Vacía el contenido para detener cualquier <video>/<iframe> en reproducción.
    const contentEl = qs("#resourceModalContent");
    if (contentEl) contentEl.innerHTML = "";

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function setupModalGlobalListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-close-modal]")) closeResourceModal();
    });
  }

  function setupResourceCardDelegation() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-resource-id]");
      if (!btn || btn.disabled) return;
      openResourceModal(btn.dataset.resourceId);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Menú móvil                                                           */
  /* ------------------------------------------------------------------ */
  function setupMobileMenu() {
    const toggle = qs("#navToggle");
    const menu = qs("#navMenu");
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function openMenu() {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", () => {
      menu.classList.contains("is-open") ? closeMenu() : openMenu();
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768 && menu.classList.contains("is-open")) closeMenu();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll suave, foco y sección activa                                  */
  /* ------------------------------------------------------------------ */
  function setupSmoothScrollFocus() {
    // El desplazamiento se dispara explícitamente por JS (en vez de dejar el
    // salto de ancla nativo del navegador) para que sea consistente sin
    // importar cuánto haya cambiado la altura de la página por el
    // renderizado dinámico, y para poder mover el foco de forma accesible
    // al terminar.
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      if (history.pushState) history.pushState(null, "", `#${id}`);

      window.setTimeout(
        () => {
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        },
        prefersReducedMotion() ? 0 : 500
      );
    });
  }

  function setupActiveSectionObserver() {
    const navIds = new Set(SITE_CONFIG.navigation.map((n) => n.id));
    const sections = qsa("main > section[id]").filter((s) => navIds.has(s.id));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          qsa(".navbar__link").forEach((link) => {
            const isMatch = link.dataset.section === id;
            link.classList.toggle("navbar__link--active", isMatch);
            if (isMatch) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }

  function setupStickyHeaderShadow() {
    const header = qs("#siteHeader");
    if (!header) return;
    const update = () => header.classList.toggle("site-header--scrolled", window.scrollY > 8);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function setupBackToTop() {
    const button = qs("#backToTop");
    if (!button) return;
    const update = () => button.classList.toggle("is-visible", window.scrollY > 500);
    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
    update();
  }

  /* ------------------------------------------------------------------ */
  /* Modo presentación                                                    */
  /* ------------------------------------------------------------------ */
  function setupPresentationMode() {
    const btn = qs("#presentationToggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const active = document.body.classList.toggle("presentation-mode");
      btn.setAttribute("aria-pressed", String(active));
      btn.textContent = active ? "Salir de presentación" : "Modo presentación";
    });
  }

  /* ------------------------------------------------------------------ */
  /* Animaciones de entrada al hacer scroll                                */
  /* ------------------------------------------------------------------ */
  function setupRevealAnimations() {
    const targets = qsa(".reveal, .reveal-stagger");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* Arranque                                                              */
  /* ------------------------------------------------------------------ */
  function init() {
    renderMetaTags();
    renderNavigation();
    renderHeroContent();
    renderConceptQuote();
    renderCurrentMissionStatus();
    renderMissionCards();
    renderMissionSections();
    renderDiagnosticStats();
    renderInternalMissionsReference();
    renderFactSheet();
    renderCreditsSection();
    renderFooter();
    renderProgress();

    setupMobileMenu();
    setupSmoothScrollFocus();
    setupActiveSectionObserver();
    setupStickyHeaderShadow();
    setupBackToTop();
    setupPresentationMode();
    setupModalGlobalListeners();
    setupResourceCardDelegation();
    setupRevealAnimations();

    document.body.classList.remove("is-loading");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
