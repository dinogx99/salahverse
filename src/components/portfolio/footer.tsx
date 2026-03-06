'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { cn } from '@/lib/utils'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@salahverse.com', label: 'Email' },
]

export function Footer() {
  const { t, isRTL } = useLanguage()
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold tracking-tight">
                  Salah<span className="text-muted-foreground">Verse</span>
                </span>
              </Link>
              <p className="text-muted-foreground max-w-sm mb-6">
                {t('footer.tagline')}
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['projects', 'services', 'caseStudies', 'contact'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item}`}
                      className="text-muted-foreground hover:text-foreground transition-colors link-underline"
                    >
                      {t(`nav.${item}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a 
                    href="mailto:hello@salahverse.com" 
                    className="hover:text-foreground transition-colors"
                  >
                    hello@salahverse.com
                  </a>
                </li>
                <li>Available for projects</li>
                <li>Remote / Worldwide</li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} SalahVerse. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
