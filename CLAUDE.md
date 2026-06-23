# Metalistería González S.A.S — Sitio Web

Landing page para empresa del sector metalmecánico con más de 20 años de experiencia (fundada en 2001) en Medellín, Colombia. El objetivo del sitio es captar clientes para sus servicios. Toda cotización va a WhatsApp.

## Datos de la empresa
- Nombre: Metalistería González S.A.S
- Slogan: "Cumplimiento y Calidad"
- Dirección: Calle 58A # 54 – 24, Medellín
- Teléfonos: 4901559 | 3233809348 | 3122864980
- Email: metalisteria.gonzalez@gmail.com
- WhatsApp: https://wa.me/573233809348
- Instagram: @metalisteria.gonzalez
- Facebook: /metalisteria.gonzalez
- Dominio: metalisteriagonzalez.com

## Servicios
1. Estructuras Metálicas — diseño, fabricación e instalación en acero
2. Carpintería Metálica — puertas, rejas, ventanas, pasamanos, cabinas, inoxidable y aluminio
3. Mantenimiento y Reparación — refuerzos, restauración y adecuaciones

## Stack técnico
- HTML5 + CSS3 + JS vanilla (sin frameworks)
- Google Fonts: Rajdhani (títulos), Inter (cuerpo)
- Font Awesome 6.4.0 (CDN)
- AOS (Animate On Scroll) 2.3.4
- n8n Chat widget — MetalBot ("Asesor en línea 24/7")
  - Webhook: https://n8n.ssaragon.com/webhook/3fe19a68-4749-4efb-8916-f8263ff166ef/chat
  - Burbuja dorada via CSS vars
  - Modelo IA: **Groq `llama-3.3-70b-versatile`** (flujo n8n: chatTrigger → AI Agent v2.2 → Groq + memoria). Reemplazó a Gemini (free tier inservible). Backup del flujo: `n8n-workflow-groq.json` (gitignored)

## Paleta de colores
```
--gold:      #D4A017
--gold-dark: #B8860B
--dark:      #2F2F2F
--deep:      #1A1A1A
--bg-light:  #F5F5F5
```

## Estructura de archivos
```
Web/
├── CLAUDE.md
├── index.html              ← Página principal
├── galeria.html            ← Galería con filtros + lightbox
├── construccion.html       ← Página en construcción (countdown 2026-12-31)
├── robots.txt
├── sitemap.xml
├── README.md
├── wrangler.jsonc          ← Config despliegue Cloudflare Workers
├── .gitignore              ← Excluye .claude/, workflows n8n, wrangler
└── assets/
    ├── css/
    │   ├── style.css       ← Estilos principales
    │   └── galeria.css     ← Estilos galería
    ├── js/
    │   ├── main.js         ← Scripts index.html
    │   └── galeria.js      ← Scripts galeria.html
    └── img/
        ├── Logo.png, Banner.png, Banner2.png, og-image.jpg
        ├── favicon/
        └── galeria/
            ├── estructuras/ (01-10.jpg)
            ├── pergolas/    (01-10.jpg)
            ├── escalas/     (01-10.jpg)
            ├── puertas/     (01-10.jpg)
            └── Mas/         (01-23.jpg)
```

## Galería (galeria.html)
- **63 imágenes** en 5 categorías: Estructuras Metálicas, Pérgolas, Escalas, Puertas, Más
- Filtros: `data-filter="all|estructuras|pergolas|escalas|puertas|mas"`
- Grid: 4 col (>1200px) → 3 col (961-1200px) → 2 col (601-960px) → 1 col (≤600px)
- "Todos" = 4 columnas; cualquier categoría = 3 columnas (clase `.grid-cat`)
- Lightbox vanilla JS — teclado (← → Esc) + swipe táctil
- Bug resuelto: AOS invisible al filtrar → `item.classList.add('aos-animate')` en `applyFilter()`
- Lazy load fix: `forceLoadImages()` cambia `loading="lazy"` → `"eager"` al filtrar

### Badges de categoría (galeria.css)
```css
.badge-estructuras → dorado  #B8860B
.badge-pergolas    → verde   #2E9650
.badge-escalas     → azul    #3A82C8
.badge-puertas     → marrón  #B46440
.badge-mas         → violeta #7850C8
```

## index.html — secciones (en orden)
Navbar → Hero → Ticker → Nosotros → Valores → Propuesta de Valor → Servicios → Proyectos → CTA → Footer

## SEO implementado
- `lang="es-CO"`, meta robots index/follow, canonical URLs
- Open Graph completo + Twitter Card en ambas páginas
- Schema.org: LocalBusiness + WebSite + ItemList (index), BreadcrumbList (galería)
- sitemap.xml, robots.txt, favicon completo
- `prefers-reduced-motion` en CSS

## Accesibilidad
- `aria-expanded` en hamburger, `aria-label` en botones/links externos
- `aria-current="page"` en nav activo de galeria.html
- Partículas del hero limitadas a `MAX_PARTICLES=20`

## Despliegue
- **Cloudflare Workers** (assets estáticos) vía `wrangler.jsonc` (`assets.directory: "."`, desde 2026-06-09)
- Deploy: `npx wrangler deploy` (requiere login en Cloudflare)
- ⚠️ `name: "metalisteragonzlez"` tiene typo — revisar si afecta la URL del worker

## GitHub
- Repositorio: https://github.com/servisolucionesaragon/Metalisteria_Gonzalez
- Rama principal: `main`
- Auth: token PAT de servisolucionesaragon

## Entorno de trabajo (NAS + multi-OS)

- El proyecto reside en un **NAS (NAS-YORBIS)** accesible desde múltiples equipos vía red local
- Se trabaja desde **Windows** (ruta UNC `\\NAS-YORBIS\...`) y **Mac** (montaje SMB)
- **Todas las rutas en el código son RELATIVAS** — el proyecto funciona desde cualquier ubicación sin cambios
- El `.code-workspace` usa `"path": "."` (relativo)
- **Sensibilidad a mayúsculas en Mac:** la carpeta `galeria/Mas/` usa M mayúscula — respetar nombre exacto en HTML
- Al trabajar desde un equipo nuevo: `git pull origin main` antes de editar

## Notas de desarrollo
- `aaa.html` es archivo de prueba temporal — ignorar siempre
- Títulos y ubicaciones de la galería = proyectos reales (actualizado 2026-06-18). Estilo: conectores en minúscula (con, de, en, para), resto en Title Case
- `robots.txt` bloquea `/construccion.html` (Disallow)
- `sitemap.xml` incluye solo páginas reales indexables: `/` y `/galeria.html` (los anchors `#section` no se indexan como páginas separadas)

## Diseñador
Yorbis Aragón — yorbisaragon.com — Servisoluciones Aragón
