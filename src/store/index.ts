import { create } from 'zustand'

interface SiteSettings {
  heroHeadline: string
  heroSubheadline: string
  heroDescription: string
  heroPrimaryCta: string
  heroSecondaryCta: string
}

interface DesignSettings {
  primaryColor: string
  backgroundColor: string
  textColor: string
  accentColor: string
  borderRadius: string
  fontFamily: string
}

interface SiteStore {
  // Settings
  siteSettings: SiteSettings
  designSettings: DesignSettings
  
  // UI State
  isChatOpen: boolean
  isMobileMenuOpen: boolean
  activeSection: string
  
  // Actions
  setSiteSettings: (settings: Partial<SiteSettings>) => void
  setDesignSettings: (settings: Partial<DesignSettings>) => void
  setChatOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  setActiveSection: (section: string) => void
}

const defaultSiteSettings: SiteSettings = {
  heroHeadline: 'I Build Intelligent Systems',
  heroSubheadline: 'Automation Engineer • Systems Builder • Problem Solver',
  heroDescription: 'Transforming complex, time-consuming workflows into elegant, intelligent, high-speed systems that save time and drive results.',
  heroPrimaryCta: 'View My Work',
  heroSecondaryCta: 'Get in Touch',
}

const defaultDesignSettings: DesignSettings = {
  primaryColor: '#0a0a0a',
  backgroundColor: '#ffffff',
  textColor: '#0a0a0a',
  accentColor: '#e5e5e5',
  borderRadius: '0.5rem',
  fontFamily: 'Inter',
}

export const useSiteStore = create<SiteStore>((set) => ({
  siteSettings: defaultSiteSettings,
  designSettings: defaultDesignSettings,
  isChatOpen: false,
  isMobileMenuOpen: false,
  activeSection: 'hero',
  
  setSiteSettings: (settings) =>
    set((state) => ({
      siteSettings: { ...state.siteSettings, ...settings },
    })),
    
  setDesignSettings: (settings) =>
    set((state) => ({
      designSettings: { ...state.designSettings, ...settings },
    })),
    
  setChatOpen: (open) => set({ isChatOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
}))
