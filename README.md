# Central de Hamburguesas - Sitio Web

Una landing page espectacular y urbana para **Central de Hamburguesas**, construida con [Astro](https://astro.build).

## Estructura del Proyecto

```
/
├── public/
│   ├── logo.png              # Logo principal del negocio
│   ├── pattern.svg           # Patrón sutil para el fondo (opcional)
│   ├── characters/           # Carpeta para los personajes
│   │   ├── don-burger.png
│   │   ├── papas-flow.png
│   │   ├── alita-wing.png
│   │   ├── tano-banano.png
│   │   ├── la-crepita.png
│   │   └── picosita.png
│   └── menu/                 # Carpeta para las imágenes del menú
│       ├── hamburguesas.jpg
│       ├── boneless.jpg
│       ├── hotdogs.jpg
│       ├── crepas.jpg
│       ├── platanos.jpg
│       ├── alitas.jpg
│       └── papas.jpg
├── src/
│   ├── components/           # Componentes de Astro
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── Combos.astro
│   │   ├── Menu.astro
│   │   ├── Characters.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
└── README.md
```

## Configuración Inicial

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Agregar tus imágenes:**
    Copia tus imágenes en las carpetas correspondientes dentro de `public/`:
    *   `public/logo.png` - El logo del negocio.
    *   `public/characters/` - Las imágenes de los personajes.
    *   `public/menu/` - Las imágenes del menú.

    > **Nota:** Asegúrate de que los nombres de los archivos coincidan exactamente con los listados arriba, o actualiza las rutas en los archivos `.astro` correspondientes.

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre tu navegador en `http://localhost:4321`.

## Personalización

*   **Colores:** Puedes modificar la paleta de colores en `src/layouts/Layout.astro` dentro de la etiqueta `<style is:global>`.
*   **Combos:** Para actualizar precios o agregar nuevos combos, edita `src/components/Combos.astro`.
*   **Número de WhatsApp:** El número está configurado en varios lugares. Reemplaza `5215519082651` en `src/components/Combos.astro`, `src/components/Hero.astro` y `src/components/Footer.astro`.
*   **Textos:** Todos los textos son estáticos y fáciles de modificar directamente en los archivos `.astro`.

## Construcción para Producción

Para generar la versión estática del sitio:

```bash
npm run build
```

El resultado se encontrará en la carpeta `dist/`.

## Características

*   **Diseño 100% Responsivo:** Se ve increíble en móviles, tablets y computadoras.
*   **Rendimiento Ultra-Rápido:** Construido con Astro para una carga casi instantánea.
*   **Animaciones Suaves:** Efectos de scroll y hover para una experiencia moderna.
*   **SEO Básico:** Meta tags descriptivos incluidos.
*   **Integración Directa con WhatsApp:** Botones de pedido que abren el chat directamente.
