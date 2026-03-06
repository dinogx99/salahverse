'use client'

import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { useLanguage } from '@/components/providers'

const skillCategories = [
  {
    category: 'Automation & Integration',
    skills: [
      { name: 'Workflow Automation', level: 95 },
      { name: 'API Integration', level: 92 },
      { name: 'Process Mining', level: 88 },
      { name: 'RPA Development', level: 85 },
    ],
  },
  {
    category: 'AI & Machine Learning',
    skills: [
      { name: 'Machine Learning', level: 85 },
      { name: 'NLP & Text Processing', level: 82 },
      { name: 'Computer Vision', level: 78 },
      { name: 'AI Agent Systems', level: 88 },
    ],
  },
  {
    category: 'Software Engineering',
    skills: [
      { name: 'Full-Stack Development', level: 90 },
      { name: 'System Architecture', level: 88 },
      { name: 'Database Design', level: 85 },
      { name: 'Cloud Infrastructure', level: 82 },
    ],
  },
  {
    category: 'Process & Strategy',
    skills: [
      { name: 'Process Optimization', level: 95 },
      { name: 'Technical Problem Solving', level: 92 },
      { name: 'System Design', level: 90 },
      { name: 'Documentation', level: 85 },
    ],
  },
]

export function SkillsSection() {
  const { t } = useLanguage()
  
  return (
    <section id="skills" className="py-32 bg-muted/30">
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
            {t('section.skills.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('section.skills.subtitle')}
          </p>
        </motion.div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-0 left-0 h-full bg-foreground rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
