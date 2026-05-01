import type { Metadata } from 'next'
import { Anton, DM_Sans, Space_Mono } from 'next/font/google'
import { CartDrawer } from '@/components/cart-drawer'
import './globals.css'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Central de Hamburguesas | Sabor que Manda',
  description:
    'Hamburguesas craft premium en CDMX. Ingredientes frescos, recetas exclusivas, y ese sabor que solo nosotros tenemos. ¡Ordena ya!',
  keywords: ['hamburguesas', 'CDMX', 'craft', 'burger', 'delivery', 'WhatsApp'],
  openGraph: {
    title: 'Central de Hamburguesas | Sabor que Manda',
    description:
      'Hamburguesas craft premium en CDMX. Ingredientes frescos, recetas exclusivas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${anton.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="font-body bg-cream text-accent antialiased">
        {children}
        <CartDrawer />
      </body>
    </html>
  )
}