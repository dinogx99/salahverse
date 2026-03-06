'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Locale = 'en' | 'ar'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.caseStudies': 'Case Studies',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.headline': 'I Build Intelligent Systems',
    'hero.subheadline': 'Automation Engineer • Systems Builder • Problem Solver',
    'hero.description': 'Transforming complex, time-consuming workflows into elegant, intelligent, high-speed systems that save time and drive results.',
    'hero.cta.primary': 'View My Work',
    'hero.cta.secondary': 'Get in Touch',
    
    // Sections
    'section.transformation.title': 'From Complexity to Clarity',
    'section.transformation.subtitle': 'Every system I build transforms chaos into order',
    'section.projects.title': 'Selected Work',
    'section.projects.subtitle': 'Projects that deliver measurable impact',
    'section.services.title': 'What I Do',
    'section.services.subtitle': 'Specialized solutions for complex challenges',
    'section.skills.title': 'Expertise',
    'section.skills.subtitle': 'Technologies and methodologies I work with',
    'section.caseStudies.title': 'Case Studies',
    'section.caseStudies.subtitle': 'Deep dives into transformation stories',
    'section.contact.title': 'Let\'s Build Something Great',
    'section.contact.subtitle': 'Ready to transform your workflows?',
    
    // Services
    'service.automation': 'Automation Systems',
    'service.automation.desc': 'End-to-end automation solutions that eliminate repetitive tasks and accelerate processes.',
    'service.ai': 'AI-Powered Systems',
    'service.ai.desc': 'Intelligent systems that leverage AI to solve complex business problems.',
    'service.software': 'Custom Software',
    'service.software.desc': 'Tailored software solutions designed for your specific workflow needs.',
    'service.optimization': 'Process Optimization',
    'service.optimization.desc': 'Analysis and restructuring of workflows for maximum efficiency.',
    
    // Contact
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.company': 'Company (Optional)',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Building the future, one system at a time.',
    
    // Chatbot
    'chat.greeting': 'Hello! How can I help you today?',
    'chat.placeholder': 'Type your message...',
    'chat.send': 'Send',
    
    // Projects
    'project.viewDetails': 'View Details',
    'project.viewProject': 'View Project',
    'project.technologies': 'Technologies Used',
    'project.challenge': 'The Challenge',
    'project.solution': 'The Solution',
    'project.impact': 'Impact & Results',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.success': 'Success!',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.projects': 'المشاريع',
    'nav.services': 'الخدمات',
    'nav.caseStudies': 'دراسات الحالة',
    'nav.about': 'عني',
    'nav.contact': 'تواصل',
    
    // Hero
    'hero.headline': 'أبني أنظمة ذكية',
    'hero.subheadline': 'مهندس أتمتة • باني أنظمة • حلال مشاكل',
    'hero.description': 'تحويل سير العمل المعقد والمستهلك للوقت إلى أنظمة أنيقة وذكية وسريعة توفر الوقت وتحقق النتائج.',
    'hero.cta.primary': 'عرض أعمالي',
    'hero.cta.secondary': 'تواصل معي',
    
    // Sections
    'section.transformation.title': 'من التعقيد إلى الوضوح',
    'section.transformation.subtitle': 'كل نظام أبنيه يحول الفوضى إلى نظام',
    'section.projects.title': 'أعمال مختارة',
    'section.projects.subtitle': 'مشاريع تحقق تأثيراً ملموساً',
    'section.services.title': 'ما أفعله',
    'section.services.subtitle': 'حلول متخصصة للتحديات المعقدة',
    'section.skills.title': 'الخبرات',
    'section.skills.subtitle': 'التقنيات والمنهجيات التي أعمل بها',
    'section.caseStudies.title': 'دراسات الحالة',
    'section.caseStudies.subtitle': 'غوص عميق في قصص التحول',
    'section.contact.title': 'لنبني شيئاً عظيماً',
    'section.contact.subtitle': 'هل أنت مستعد لتحويل سير عملك؟',
    
    // Services
    'service.automation': 'أنظمة الأتمتة',
    'service.automation.desc': 'حلول أتمتة شاملة ت elimine المهام المتكررة وتسرع العمليات.',
    'service.ai': 'أنظمة مدعومة بالذكاء الاصطناعي',
    'service.ai.desc': 'أنظمة ذكية تستخدم الذكاء الاصطناعي لحل مشاكل الأعمال المعقدة.',
    'service.software': 'برمجيات مخصصة',
    'service.software.desc': 'حلول برمجية مصممة خصيصاً لاحتياجات سير عملك.',
    'service.optimization': 'تحسين العمليات',
    'service.optimization.desc': 'تحليل وإعادة هيكلة سير العمل لتحقيق أقصى كفاءة.',
    
    // Contact
    'contact.name': 'اسمك',
    'contact.email': 'البريد الإلكتروني',
    'contact.company': 'الشركة (اختياري)',
    'contact.message': 'رسالتك',
    'contact.send': 'إرسال',
    'contact.sending': 'جاري الإرسال...',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.tagline': 'نبني المستقبل، نظام تلو الآخر.',
    
    // Chatbot
    'chat.greeting': 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
    'chat.placeholder': 'اكتب رسالتك...',
    'chat.send': 'إرسال',
    
    // Projects
    'project.viewDetails': 'عرض التفاصيل',
    'project.viewProject': 'عرض المشروع',
    'project.technologies': 'التقنيات المستخدمة',
    'project.challenge': 'التحدي',
    'project.solution': 'الحل',
    'project.impact': 'التأثير والنتائج',
    
    // Common
    'common.learnMore': 'اعرف المزيد',
    'common.viewAll': 'عرض الكل',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجاح!',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  
  const isRTL = locale === 'ar'
  
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale, isRTL])
  
  const t = (key: string): string => {
    return translations[locale][key] || key
  }
  
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
