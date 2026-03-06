'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers'
import { cn } from '@/lib/utils'

const caseStudies = [
  {
    id: '1',
    slug: 'fortune-500-automation',
    title: 'Fortune 500 Workflow Transformation',
    client: 'Global Financial Services',
    industry: 'Finance',
    summary: 'Transformed manual compliance reporting from a 2-week process to a 4-hour automated workflow.',
    metrics: [
      { icon: Clock, value: '95%', label: 'Time Reduction' },
      { icon: TrendingUp, value: '3M+', label: 'Annual Savings' },
      { icon: Users, value: '50+', label: 'Hours Saved Weekly' },
    ],
  },
  {
    id: '2',
    slug: 'healthcare-document-ai',
    title: 'Healthcare Document Intelligence',
    client: 'Regional Hospital Network',
    industry: 'Healthcare',
    summary: 'AI-powered document processing system handling 50,000+ medical records daily with 99.5% accuracy.',
    metrics: [
      { icon: Clock, value: '99.5%', label: 'Accuracy Rate' },
      { icon: TrendingUp, value: '50K+', label: 'Daily Documents' },
      { icon: Users, value: '80%', label: 'Staff Reallocation' },
    ],
  },
]

export function CaseStudiesSection() {
  const { t, isRTL } = useLanguage()
  
  return (
    <section id="case-studies" className="py-32">
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
            {t('section.caseStudies.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('section.caseStudies.subtitle')}
          </p>
        </motion.div>
        
        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/case-study/${study.slug}`}>
                <Card className="group overflow-hidden border-border hover:border-foreground/20 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      {/* Content */}
                      <div className="lg:col-span-2 p-8 lg:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            {study.industry}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {study.client}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-semibold mb-4 group-hover:text-muted-foreground transition-colors">
                          {study.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-6 max-w-xl">
                          {study.summary}
                        </p>
                        
                        <Button variant="outline" className="group/btn">
                          Read Case Study
                          <ArrowRight className={cn(
                            "ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1",
                            isRTL && "ml-0 mr-2 rotate-180"
                          )} />
                        </Button>
                      </div>
                      
                      {/* Metrics */}
                      <div className="bg-muted/50 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="space-y-6">
                          {study.metrics.map((metric) => (
                            <div key={metric.label} className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                                <metric.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-xl font-bold">{metric.value}</div>
                                <div className="text-sm text-muted-foreground">{metric.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
