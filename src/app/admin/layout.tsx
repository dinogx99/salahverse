'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  FileText,
  Settings,
  Palette,
  MessageSquare,
  Globe,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FolderKanban, label: 'Projects', href: '/admin/projects' },
  { icon: Briefcase, label: 'Services', href: '/admin/services' },
  { icon: FileText, label: 'Case Studies', href: '/admin/case-studies' },
  { icon: MessageSquare, label: 'Chatbot', href: '/admin/chatbot' },
  { icon: Palette, label: 'Design', href: '/admin/design' },
  { icon: Globe, label: 'Translations', href: '/admin/translations' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [pathname, router])
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }
  
  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }
  
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border flex items-center justify-between px-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-muted rounded-lg"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-bold">SalahVerse Admin</span>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </header>
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-card border-r border-border transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20",
          "hidden lg:block"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {isSidebarOpen && (
            <Link href="/admin" className="font-bold text-lg">
              Salah<span className="text-muted-foreground">Verse</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(!isSidebarOpen && "mx-auto")}
          >
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform",
              isSidebarOpen && "rotate-180"
            )} />
          </Button>
        </div>
        
        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
        
        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3",
              !isSidebarOpen && "justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>
      
      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-64 h-full bg-card border-r border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 flex items-center px-4 border-b border-border">
              <Link href="/admin" className="font-bold text-lg">
                Salah<span className="text-muted-foreground">Verse</span>
              </Link>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-foreground text-background"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </ScrollArea>
          </motion.aside>
        </motion.div>
      )}
      
      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 pt-16 lg:pt-0",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
