---
title: Inicio
hide:
  - toc
---

<section class="hero-shell" data-reveal>
  <div class="hero-grid">
    <div class="hero-copy">
      <span class="eyebrow">Infraestructura editorial para operadores reales</span>
      <h1>SYSnergia Docs</h1>
      <p>Documentación técnica en español para equipos que necesitan <strong>guías accionables</strong>, <strong>criterio operativo</strong> y una experiencia de lectura que se sienta tan seria como la infraestructura que administran.</p>

      <div class="hero-actions">
        <a class="button-link button-link--primary" href="#plataformas">Explorar plataformas</a>
        <a class="button-link button-link--secondary" href="#arquitectura-editorial">Ver arquitectura editorial</a>
      </div>
    </div>

    <aside class="hero-panel">
      <h3>Qué cambia en esta versión</h3>
      <ul>
        <li>Navegación editorial más clara por plataforma.</li>
        <li>Base visual propia sobre MkDocs Material, no una skin genérica.</li>
        <li>Capa reusable de componentes para crecer sin perder consistencia.</li>
        <li>Preparado para guías de producción, runbooks y playbooks versionados.</li>
      </ul>
    </aside>
  </div>
</section>

<section class="metric-strip" data-reveal>
  <article class="stat-card">
    <span class="stat-card__value">05</span>
    <span class="stat-card__label">Plataformas activas</span>
  </article>
  <article class="stat-card">
    <span class="stat-card__value">08</span>
    <span class="stat-card__label">Dominios técnicos objetivo</span>
  </article>
  <article class="stat-card">
    <span class="stat-card__value">100%</span>
    <span class="stat-card__label">Experiencia responsive</span>
  </article>
  <article class="stat-card">
    <span class="stat-card__value">Beta</span>
    <span class="stat-card__label">Fase editorial actual</span>
  </article>
</section>

<section class="section-block" id="plataformas" data-reveal>
  <div class="section-heading">
    <span class="section-kicker">Plataformas</span>
    <h2>Explora por sistema operativo</h2>
    <p>Cada entrada funciona como un hub editorial: concentra el alcance, el tono técnico y la línea de evolución de las guías por plataforma.</p>
  </div>

  <div class="platform-grid">
    <article class="platform-card">
      <h3>Ubuntu 24.04 LTS</h3>
      <p>Base moderna para stacks web, contenedores, datos y observabilidad en entornos Linux.</p>
      <div class="platform-card__meta">
        <span>Web</span>
        <span>Datos</span>
        <span>Containers</span>
      </div>
      <a class="platform-card__link" href="ubuntu/">Abrir hub</a>
    </article>

    <article class="platform-card">
      <h3>CentOS Stream 9</h3>
      <p>Orientado a servicios de red, seguridad base del sistema, virtualización y operación continua.</p>
      <div class="platform-card__meta">
        <span>DNS / DHCP</span>
        <span>SELinux</span>
        <span>KVM</span>
      </div>
      <a class="platform-card__link" href="centos/">Abrir hub</a>
    </article>

    <article class="platform-card">
      <h3>Debian 12</h3>
      <p>Ruta sobria y estable para despliegues compactos, endurecimiento inicial y servicios esenciales.</p>
      <div class="platform-card__meta">
        <span>Base estable</span>
        <span>Nginx</span>
        <span>Docker</span>
      </div>
      <a class="platform-card__link" href="debian/">Abrir hub</a>
    </article>

    <article class="platform-card">
      <h3>Rocky Linux 9</h3>
      <p>Alternativa enterprise centrada en seguridad, bases de datos y patrones operativos repetibles.</p>
      <div class="platform-card__meta">
        <span>Enterprise</span>
        <span>SQL Server</span>
        <span>Firewalld</span>
      </div>
      <a class="platform-card__link" href="rocky/">Abrir hub</a>
    </article>

    <article class="platform-card">
      <h3>Windows Server 2025</h3>
      <p>Directorio editorial para identidad, archivos, RDP, automatización y operación Microsoft moderna.</p>
      <div class="platform-card__meta">
        <span>AD DS</span>
        <span>IIS</span>
        <span>PowerShell</span>
      </div>
      <a class="platform-card__link" href="windows/">Abrir hub</a>
    </article>
  </div>
</section>

<section class="section-block" data-reveal>
  <div class="section-heading">
    <span class="section-kicker">Experiencia</span>
    <h2>Diseñado para sentirse de alto nivel</h2>
    <p>El objetivo no es solo documentar, sino ofrecer una experiencia de producto editorial con mejor descubrimiento, menos ruido visual y una lectura más confiable.</p>
  </div>

  <div class="signal-grid">
    <article class="signal-card">
      <h3>Jerarquía editorial fuerte</h3>
      <p>Portadas por plataforma, bloques con intención y una narrativa visual que guía sin abrumar.</p>
    </article>
    <article class="signal-card">
      <h3>Arquitectura escalable</h3>
      <p>Componentes reutilizables en Markdown + CSS + JS para crecer sin duplicar decisiones de diseño.</p>
    </article>
    <article class="signal-card">
      <h3>Lenguaje operativo</h3>
      <p>La interfaz se alinea con un producto para administradores: sobrio, rápido, técnico y orientado a producción.</p>
    </article>
  </div>
</section>

<section class="section-block" id="arquitectura-editorial" data-reveal>
  <div class="dual-grid">
    <article class="list-card">
      <span class="section-kicker">Arquitectura editorial</span>
      <h2>Qué encontrará el lector cuando el sitio madure</h2>
      <ul class="list-clean">
        <li>
          <strong>Instalación y bootstrap</strong>
          Desde el sistema base hasta la primera configuración fiable.
        </li>
        <li>
          <strong>Servicios esenciales</strong>
          SSH, DNS, DHCP, NTP, firewalls y endurecimiento inicial.
        </li>
        <li>
          <strong>Servicios de aplicación</strong>
          Web, bases de datos, contenedores, virtualización y automatización.
        </li>
        <li>
          <strong>Verificación y operación</strong>
          Comprobaciones, troubleshooting y criterios para producción.
        </li>
      </ul>
    </article>

    <aside class="section-band">
      <span class="section-kicker">Principios</span>
      <p><strong>Claridad antes que ornamento.</strong> La modernización no sacrifica legibilidad técnica.</p>
      <p><strong>Consistencia antes que volumen.</strong> Cada guía debe seguir un patrón editorial mantenible.</p>
      <p><strong>Escala antes que improvisación.</strong> Esta base ya está preparada para sumar más hubs, más temas y más profundidad.</p>
    </aside>
  </div>
</section>

<section class="section-block" data-reveal>
  <div class="section-heading">
    <span class="section-kicker">Roadmap</span>
    <h2>Próximos hitos para elevar aún más el producto</h2>
  </div>

  <ol class="roadmap-list">
    <li>
      <span class="roadmap-step">01</span>
      <div>
        <strong>Convertir cada hub en un índice vivo</strong>
        Añadir páginas reales por categoría con profundidad operativa y cross-linking entre guías.
      </div>
    </li>
    <li>
      <span class="roadmap-step">02</span>
      <div>
        <strong>Introducir patrones editoriales de producción</strong>
        Secciones fijas de prerrequisitos, validación, rollback y troubleshooting.
      </div>
    </li>
    <li>
      <span class="roadmap-step">03</span>
      <div>
        <strong>Extender la navegación y búsqueda</strong>
        Mejorar discovery por etiquetas, estado, dificultad y familia tecnológica.
      </div>
    </li>
  </ol>
</section>
