---
title: "Transparencia"
draft: false
description: "page"
---

<!-- SECTION 1: Foundational Documents (Full Width) -->
<div class="container-fluid py-5 px-4 bg-light">
  <h2 class="text-center mb-5">Documentos Fundacionales</h2>
  <div class="row justify-content-center text-center">
    <div class="col-lg-4">
      <svg xmlns='http://www.w3.org/2000/svg' class='feather text-violet feather-big' width="4em" height="4em">
        <use href="{{ `images/feather/feather-sprite.svg#file-text` | relURL }}"/>
      </svg>
      <h3 class="h3 mt-3">Estatutos</h3>
      <p><a href="/docs/estatutos.pdf" class="btn btn-outline-primary btn-sm">Descargar</a></p>
    </div>
    <div class="col-lg-4">
      <svg xmlns='http://www.w3.org/2000/svg' class='feather text-violet feather-big' width="4em" height="4em">
        <use href="{{ `images/feather/feather-sprite.svg#award` | relURL }}"/>
      </svg>
      <h3 class="h3 mt-3">Reglamento Interno</h3>
      <p><a href="/docs/reglamento.pdf" class="btn btn-outline-primary btn-sm">Descargar</a></p>
    </div>
    <div class="col-lg-4">
      <svg xmlns='http://www.w3.org/2000/svg' class='feather text-violet feather-big' width="4em" height="4em">
        <use href="{{ `images/feather/feather-sprite.svg#users` | relURL }}"/>
      </svg>
      <h3 class="h3 mt-3">Código de Ética</h3>
      <p><a href="/docs/codigo_etica.pdf" class="btn btn-outline-primary btn-sm">Descargar</a></p>
    </div>
  </div>
</div>

<!-- SECTION 2: Directory Members (Full Width) -->
<div class="container-fluid py-5 px-4">
  <h2 class="text-center mb-5">Directorio Actual</h2>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          María González <span class="badge bg-primary rounded-pill">Presidenta</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Juan Pérez <span class="badge bg-secondary rounded-pill">Secretario</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Ana López <span class="badge bg-success rounded-pill">Tesorera</span>
        </li>
      </ul>
    </div>
  </div>
</div>

<!-- SECTION 3: Reports Accordion (Full Width) -->
<div class="container-fluid py-5 px-4">
  <h2 class="text-center mb-5">Reportes y Documentos</h2>
  <div class="accordion" id="reportsAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading2025">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2025" aria-expanded="true" aria-controls="collapse2025">
          2025
        </button>
      </h2>
      <div id="collapse2025" class="accordion-collapse collapse show" aria-labelledby="heading2025" data-bs-parent="#reportsAccordion">
        <div class="accordion-body">
          <ul>
            <li><a href="/docs/2025/enero.pdf">Enero 2025 - Reporte Financiero</a></li>
            <li><a href="/docs/2025/febrero.pdf">Febrero 2025 - Acta de Reunión</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading2024">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2024" aria-expanded="false" aria-controls="collapse2024">
          2024
        </button>
      </h2>
      <div id="collapse2024" class="accordion-collapse collapse" aria-labelledby="heading2024" data-bs-parent="#reportsAccordion">
        <div class="accordion-body">
          <ul>
            <li><a href="/docs/2024/diciembre.pdf">Diciembre 2024 - Auditoría</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
