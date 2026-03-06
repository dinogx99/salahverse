'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/components/providers'
import { cn } from '@/lib/utils'

// Sample projects data
const projects = [
  {
    id: '1',
    slug: 'workflow-automation-system',
    title: 'Enterprise Workflow Automation',
    summary: 'End-to-end automation platform that reduced manual processing time by 85% for a Fortune 500 company.',
    category: 'Automation',
    tags: ['Python', 'API Integration', 'Process Mining'],
    image: '/projects/automation.jpg',
    featured: true,
  },
  {
    id: '2',
    slug: 'ai-document-processor',
    title: 'AI Document Intelligence',
    summary: 'Machine learning system that processes and categorizes 50,000+ documents daily with 99.2% accuracy.',
    category: 'AI Systems',
    tags: ['Machine Learning', 'NLP', 'Cloud'],
    image: '/projects/ai-docs.jpg',
    featured: true,
  },
  {
    id: '3',
    slug: 'real-time-analytics',
    title: 'Real-Time Analytics Dashboard',
    summary: 'Live data visualization platform handling 1M+ events per second for financial trading systems.',
    category: 'Software Engineering',
    tags: ['React', 'WebSocket', 'Redis'],
    image: '/projects/analytics.jpg',
    featured: false,
  },
  {
    id: '4',
    slug: 'ecommerce-automation',
    title: 'E-Commerce Automation Suite',
    summary: 'Complete automation solution for inventory management, pricing, and order fulfillment.',
    category: 'Automation',
    tags: ['Node.js', 'AWS', 'Integration'],
    image: '/projects/ecommerce.jpg',
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  'Automation': 'bg-foreground text-background',
  'AI Systems': 'bg-muted text-foreground border border-border',
  'Software Engineering': 'bg-muted text-foreground border border-border',
}

export function ProjectsSection() {
  const { t, isRTL } = useLanguage()
  
  return (
    <section id="projects" className="py-32 bg-muted/30">
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
            {t('section.projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('section.projects.subtitle')}
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/project/${project.slug}`}>
                <Card className="group overflow-hidden border-border bg-card hover:border-foreground/20 transition-all duration-300 card-hover h-full">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/20" />
                    {/* Placeholder pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={categoryColors[project.category] || ''}>
                        {project.category}
                      </Badge>
                    </div>
                    {/* Hover Arrow */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.summary}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              {t('common.viewAll')}
              <ArrowUpRight className={cn("ml-2 h-4 w-4", isRTL && "ml-0 mr-2")} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
