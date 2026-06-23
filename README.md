# Metalistería González S.A.S — Sitio Web Corporativo

Sitio web landing page para **Metalistería González S.A.S**, empresa del sector metalmecánico con más de 20 años de experiencia en Medellín, Colombia.

---

## Vista previa

> Dominio: [metalisteriagonzalez.com](https://metalisteriagonzalez.com)

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura y contenido |
| CSS3 + Variables CSS | Estilos y diseño responsivo |
| JavaScript Vanilla | Interactividad (sin frameworks) |
| [AOS 2.3.4](https://michalsnik.github.io/aos/) | Animaciones al hacer scroll |
| [Font Awesome 6.4.0](https://fontawesome.com/) | Íconos |
| [Google Fonts](https://fonts.google.com/) | Rajdhani (títulos) + Inter (cuerpo) |
| [n8n Chat Widget](https://n8n.io/) | Chatbot MetalBot (webhook propio) |
| Schema.org JSON-LD | Datos estructurados para SEO |

---

## Estructura del proyecto

```
Web/
├── index.html              # Página principal
├── galeria.html            # Galería de proyectos
├── construccion.html       # Página "en construcción" (no indexada)
├── CLAUDE.md               # Contexto para Claude Code (IA asistente)
├── robots.txt              # Directivas para crawlers
├── sitemap.xml             # Mapa del sitio (solo páginas indexables)
└── assets/
    ├── css/
    │   ├── style.css       # Estilos principales
    │   └── galeria.css     # Estilos de la galería
    ├── js/
    │   ├── main.js         # Scripts de index.html
    │   └── galeria.js      # Scripts de galeria.html
    └── img/
        ├── Logo.png
        ├── Banner2.png
        ├── og-image.jpg
        ├── favicon/
        └── galeria/
            ├── estructuras/   # 01.jpg – 10.jpg
            ├── pergolas/      # 01.jpg – 10.jpg
            ├── escalas/       # 01.jpg – 10.jpg
            ├── puertas/       # 01.jpg – 10.jpg
            └── Mas/           # 01.jpg – 23.jpg  (M mayúscula)
```

---

## Secciones del sitio

### `index.html`
1. **Navbar** — Logo + menú de navegación + link a Galería
2. **Hero** — Título animado, estadísticas (20+ años, 500+ proyectos)
3. **Ticker** — Banda de servicios en loop
4. **Nosotros** — Misión, visión, propósito
5. **Valores Corporativos** — Servicio, Confianza, Innovación, Calidad
6. **Propuesta de Valor** — 6 diferenciadores clave
7. **Servicios** — Estructuras Metálicas, Carpintería Metálica, Mantenimiento
8. **Proyectos Destacados** — Sectores atendidos + botón a galería
9. **CTA Band** — Llamada a acción hacia WhatsApp
10. **Footer** — Contacto, redes sociales, mapa de navegación

### `galeria.html`
- Filtros por categoría: Todos | Estructuras Metálicas | Pérgolas | Escalas | Puertas | Más
- 63 proyectos fotográficos en total
- Grid responsivo: 4 col (desktop) → 3 col (laptop) → 2 col (tablet) → 1 col (móvil)
- Lightbox con navegación por teclado (← → Esc) y swipe táctil

---

## SEO

- ✅ Meta title y description optimizados
- ✅ Open Graph (Facebook/LinkedIn) + Twitter Card
- ✅ Schema.org: `LocalBusiness`, `WebSite`, `ItemList`, `BreadcrumbList`
- ✅ Canonical URLs
- ✅ `meta robots: index, follow`
- ✅ `sitemap.xml` — solo páginas reales (`/` y `/galeria.html`)
- ✅ `robots.txt` — bloquea `/construccion.html`
- ✅ `lang="es-CO"`
- ✅ Favicon completo (SVG, PNG, ICO, Apple Touch, WebManifest)

---

## Rendimiento

- `loading="lazy"` en imágenes below-the-fold
- `fetchpriority="high"` en imagen hero (LCP)
- `defer` en todos los scripts
- `preconnect` para Google Fonts
- `prefers-reduced-motion` respetado en CSS

---

## Entorno de desarrollo

El proyecto reside en un **NAS** (NAS-YORBIS) accesible desde múltiples equipos con Windows y Mac vía red local.

- **Todas las rutas en el código son relativas** — el proyecto se puede abrir desde cualquier ubicación sin cambios
- El archivo `.code-workspace` usa ruta relativa (`"path": "."`)
- **Nota para Mac:** el sistema de archivos es sensible a mayúsculas. La carpeta `galeria/Mas/` tiene M mayúscula — respetar el nombre exacto en el HTML

Para trabajar con asistencia de IA (Claude Code), ver `CLAUDE.md` en la raíz del proyecto.

---

## Datos de contacto del cliente

| Campo | Valor |
|---|---|
| Empresa | Metalistería González S.A.S |
| Dirección | Calle 58A # 54 – 24, Medellín |
| Teléfono | 604 490 1559 |
| WhatsApp | [+57 323 380 9348](https://wa.me/573233809348) |
| Tel 2 | +57 312 286 4980 |
| Email | metalisteria.gonzalez@gmail.com |
| Instagram | [@metalisteria.gonzalez](https://www.instagram.com/metalisteria.gonzalez) |

---

## Desarrollo

Diseño y desarrollo por **Yorbis Aragón** — [Servisoluciones Aragón](https://ssaragon.com)

---

*Última actualización: junio 2026*
