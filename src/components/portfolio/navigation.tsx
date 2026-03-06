'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers'
import { cn } from '@/lib/utils'

const navItems = [
  { key: 'home', href: '#hero' },
  { key: 'projects', href: '#projects' },
  { key: 'services', href: '#services' },
  { key: 'caseStudies', href: '#case-studies' },
  { key: 'contact', href: '#contact' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { locale, setLocale, t, isRTL } = useLanguage()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en')
  }
  
  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'glass border-b border-border/50' 
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-10 flex items-center gap-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold tracking-tight"
            >
              Salah<span className="text-muted-foreground">Verse</span>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="relative"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold">
                {locale.toUpperCase()}
              </span>
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* Contact CTA - Desktop */}
            <Button
              asChild
              className="hidden md:flex btn-premium"
            >
              <Link href="#contact">{t('nav.contact')}</Link>
            </Button>
          </div>
        </nav>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                "absolute top-0 right-0 h-full w-72 bg-background border-l border-border shadow-xl",
                isRTL && "right-auto left-0 border-l-0 border-r"
              )}
            >
              <div className="flex flex-col p-6 pt-20 gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium hover:text-muted-foreground transition-colors"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </motion.div>
                ))}
                <Button className="mt-4 w-full" asChild>
                  <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('nav.contact')}
                  </Link>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
