'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Search, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Translation {
  key: string
  group: string
  en: string
  ar: string
}

const translations: Translation[] = [
  { key: 'hero.headline', group: 'Hero', en: 'I Build Intelligent Systems', ar: 'أبني أنظمة ذكية' },
  { key: 'hero.subheadline', group: 'Hero', en: 'Automation Engineer • Systems Builder • Problem Solver', ar: 'مهندس أتمتة • باني أنظمة • حلال مشاكل' },
  { key: 'hero.description', group: 'Hero', en: 'Transforming complex, time-consuming workflows into elegant, intelligent, high-speed systems.', ar: 'تحويل سير العمل المعقد إلى أنظمة ذكية وسريعة.' },
  { key: 'hero.cta.primary', group: 'Hero', en: 'View My Work', ar: 'عرض أعمالي' },
  { key: 'hero.cta.secondary', group: 'Hero', en: 'Get in Touch', ar: 'تواصل معي' },
  { key: 'section.projects.title', group: 'Sections', en: 'Selected Work', ar: 'أعمال مختارة' },
  { key: 'section.services.title', group: 'Sections', en: 'What I Do', ar: 'ما أفعله' },
  { key: 'section.contact.title', group: 'Sections', en: "Let's Build Something Great", ar: 'لنبني شيئاً عظيماً' },
  { key: 'service.automation', group: 'Services', en: 'Automation Systems', ar: 'أنظمة الأتمتة' },
  { key: 'service.ai', group: 'Services', en: 'AI-Powered Systems', ar: 'أنظمة مدعومة بالذكاء الاصطناعي' },
  { key: 'service.software', group: 'Services', en: 'Custom Software', ar: 'برمجيات مخصصة' },
  { key: 'contact.send', group: 'Contact', en: 'Send Message', ar: 'إرسال' },
  { key: 'footer.tagline', group: 'Footer', en: 'Building the future, one system at a time.', ar: 'نبني المستقبل، نظام تلو الآخر.' },
]

const groups = ['All', 'Hero', 'Sections', 'Services', 'Contact', 'Footer']

export default function TranslationsAdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('All')
  const [editedTranslations, setEditedTranslations] = useState<Record<string, { en: string; ar: string }>>({})
  
  const filteredTranslations = translations.filter(t => {
    const matchesSearch = 
      t.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ar.includes(searchQuery)
    const matchesGroup = selectedGroup === 'All' || t.group === selectedGroup
    return matchesSearch && matchesGroup
  })
  
  const getTranslationValue = (t: Translation, lang: 'en' | 'ar') => {
    return editedTranslations[t.key]?.[lang] ?? t[lang]
  }
  
  const updateTranslation = (key: string, lang: 'en' | 'ar', value: string) => {
    setEditedTranslations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: value,
      }
    }))
  }
  
  const hasChanges = Object.keys(editedTranslations).length > 0
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Translations</h1>
          <p className="text-muted-foreground mt-1">
            Manage multilingual content for your portfolio
          </p>
        </div>
        <Button disabled={!hasChanges}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
          {hasChanges && (
            <Badge variant="secondary" className="ml-2">
              {Object.keys(editedTranslations).length}
            </Badge>
          )}
        </Button>
      </div>
      
      {/* Language Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-lg font-bold">EN</span>
              </div>
              <div>
                <p className="font-semibold">English</p>
                <p className="text-sm text-muted-foreground">
                  {translations.length} translations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-lg font-bold">ع</span>
              </div>
              <div>
                <p className="font-semibold">Arabic</p>
                <p className="text-sm text-muted-foreground">
                  {translations.length} translations • RTL support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search translations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {groups.map((group) => (
            <Button
              key={group}
              variant={selectedGroup === group ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGroup(group)}
            >
              {group}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Translations List */}
      <div className="space-y-4">
        {filteredTranslations.map((t, index) => (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            <Card className={editedTranslations[t.key] ? 'border-foreground' : ''}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Key Info */}
                  <div className="lg:w-64 flex-shrink-0">
                    <code className="text-sm font-mono text-muted-foreground">
                      {t.key}
                    </code>
                    <Badge variant="outline" className="ml-2">
                      {t.group}
                    </Badge>
                  </div>
                  
                  {/* Translations */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <span>English</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">EN</span>
                      </label>
                      <Textarea
                        value={getTranslationValue(t, 'en')}
                        onChange={(e) => updateTranslation(t.key, 'en', e.target.value)}
                        rows={2}
                        className="resize-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <span>Arabic</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">ع</span>
                      </label>
                      <Textarea
                        value={getTranslationValue(t, 'ar')}
                        onChange={(e) => updateTranslation(t.key, 'ar', e.target.value)}
                        rows={2}
                        className="resize-none"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredTranslations.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No translations found matching your search.
        </div>
      )}
    </div>
  )
}
