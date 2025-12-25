import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Kiosque Paludisme | Système de Triage Intelligent",
  description: "Outil d'aide au diagnostic et d'orientation pour le paludisme. Basé sur les protocoles de l'OMS.",
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9488",
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${plusJakarta.variable} font-sans antialiased h-full bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
