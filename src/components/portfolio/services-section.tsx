'use client'

import { motion } from 'framer-motion'
import { Cog, Brain, Code, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/components/providers'

const services = [
  {
    icon: Cog,
    key: 'automation',
    color: 'bg-foreground text-background',
  },
  {
    icon: Brain,
    key: 'ai',
    color: 'bg-muted text-foreground border border-border',
  },
  {
    icon: Code,
    key: 'software',
    color: 'bg-muted text-foreground border border-border',
  },
  {
    icon: Zap,
    key: 'optimization',
    color: 'bg-foreground text-background',
  },
]

export function ServicesSection() {
  const { t } = useLanguage()
  
  return (
    <section id="services" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('section.services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('section.services.subtitle')}
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-border hover:border-foreground/30 transition-all duration-300 group">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${service.color}`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-muted-foreground transition-colors">
                    {t(`service.${service.key}`)}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`service.${service.key}.desc`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
