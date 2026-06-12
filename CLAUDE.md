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
├── .gitignore              ← Excluye .claude/, aaa.html
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

## GitHub
- Repositorio: https://github.com/servisolucionesaragon/Metalisteria_Gonzalez
- Rama principal: `main`
- Auth: token PAT de servisolucionesaragon

## Notas de desarrollo
- `aaa.html` es archivo de prueba temporal — ignorar siempre
- Los nombres de los 23 ítems de la categoría "Más" son genéricos; actualizar cuando se conozca el contenido real de cada foto
- Al trabajar desde un PC nuevo: `git pull origin main` para sincronizar antes de editar

## Diseñador
Yorbis Aragón — yorbisaragon.com — Servisoluciones Aragón
