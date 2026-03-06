import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/components/providers'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SalahVerse | Intelligent Systems Builder',
  description: 'Transforming complex, time-consuming workflows into elegant, intelligent, high-speed systems. Automation engineer, systems builder, and problem solver.',
  keywords: ['automation', 'systems', 'AI', 'workflow optimization', 'software engineering'],
  authors: [{ name: 'SalahVerse' }],
  openGraph: {
    title: 'SalahVerse | Intelligent Systems Builder',
    description: 'Transforming complex workflows into elegant, intelligent systems.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalahVerse | Intelligent Systems Builder',
    description: 'Transforming complex workflows into elegant, intelligent systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
