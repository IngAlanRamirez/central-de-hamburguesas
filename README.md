# Central de Hamburguesas

Landing page con menú interactivo y carrito de compras para **Central de Hamburguesas**, construida con [Next.js](https://nextjs.org) 16.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19 + Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Estado:** Zustand + persist (localStorage)
- **Tipado:** TypeScript estricto
- **Fuentes:** Anton, DM Sans, Space Mono (Google Fonts via `next/font`)

## Estructura

```
src/
  app/
    globals.css        # Estilos globales + variables CSS de marca
    layout.tsx         # Layout raíz con fuentes, metadata, CartDrawer
    page.tsx           # Página principal (Hero + Combos + Menú + Personajes)
    loading.tsx        # Skeleton de carga
    error.tsx          # Pantalla de error con reintento
    not-found.tsx      # Página 404
    sitemap.ts         # Sitemap dinámico para SEO
    robots.ts          # Robots.txt dinámico
components/
  ui/
    button.tsx         # Botón con variantes (primary/secondary) + Framer Motion
    card.tsx           # Card genérica (combo, producto, personaje)
    section.tsx        # Sección con título + subtítulo + fondo
    section-divider.tsx
    animate-on-scroll.tsx
    quantity-pill.tsx
    product-card.tsx   # Card de producto genérica (imagen, badge, ingredientes, carrito)
  navbar.tsx           # Navbar sticky con carrito y theme toggle
  hero.tsx             # Hero principal con parallax
  combos.tsx           # Combos con add-to-cart
  menu.tsx             # Menú por categorías con tabs
  hamburguesas.tsx     # Hamburguesas con selector de carne y extras
  hot-dogs.tsx         # Hot dogs
  boneless.tsx         # Boneless con 7 salsas y papas opcional
  wings.tsx            # Alitas (mismo patrón que boneless)
  crepas.tsx           # Crepas dulces con selector de fruta
  platanos.tsx         # Plátanos con selector de mermelada
  papas.tsx            # Papas con topping toggle y salsa
  costillas.tsx        # Costillas con salsa y papas
  bebidas.tsx          # Sodas italianas
  characters.tsx       # Personajes de la marca
  footer.tsx           # Footer con contacto y WhatsApp
  cart-drawer.tsx      # Drawer del carrito con focus trap
  cart-item.tsx        # Item individual en el carrito
  cart-summary.tsx     # Resumen del carrito (total, WhatsApp, imprimir)
  receipt.tsx          # Ticket imprimible con animación térmica
lib/
  constants.ts         # Constantes compartidas (WhatsApp, salsas)
  data/                # Datos de productos (burgers, hot-dogs, boneless, etc.)
  store/cart.ts        # Store Zustand con persist
  types/cart.ts        # Tipos del carrito
  utils.ts             # Utilidades generales (cn)
  utils/cart-utils.ts  # Utilidades del carrito (mensaje WhatsApp, hydration)
public/
  menu/                # Imágenes de productos (25 JPGs) + combos/ (7 WebP)
  characters/          # PNGs de personajes
  favicon.svg          # Favicon con la C de Central
  manifest.json        # PWA manifest
```

## Desarrollo

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de producción
npm run start    # Servir build
npm run lint     # Linter
```

## Productos disponibles

| Categoría | Productos | Personalización |
|-----------|-----------|----------------|
| Hamburguesas | 4 | Carne (Sirloin/Arrachera/Pollo), extras Hawaiana |
| Hot Dogs | 4 | — |
| Boneless | 1 | 7 salsas, +papas ($30) |
| Wings | 1 | 7 salsas, +papas ($30) |
| Crepas | 5 | Fruta en algunas |
| Plátanos | 3 | Mermelada en algunas |
| Papas | 3 | Solas/con toppings, salsa |
| Costillas | 1 | 7 salsas, +papas ($30) |
| Bebidas | 3 | — |

## Carrito

- Persistencia en localStorage via Zustand
- Envío del pedido por WhatsApp
- Impresión de ticket con animación tipo terminal
