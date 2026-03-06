'use client'

import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers'

interface Particle {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  opacity: number
  delay: number
}

export function TransformationSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  useTransform(scrollYProgress, [0, 0.5], [0, 1])
  
  // Generate particles using useMemo
  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = []
    const gridSize = 8
    const spacing = 40
    
    for (let i = 0; i < 60; i++) {
      const gridX = i % gridSize
      const gridY = Math.floor(i / gridSize)
      
      result.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        targetX: 20 + gridX * spacing,
        targetY: 20 + gridY * spacing,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 0.5
      })
    }
    return result
  }, [])
  
  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('section.transformation.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('section.transformation.subtitle')}
          </p>
        </motion.div>
        
        {/* Transformation Visualization */}
        <div className="relative">
          {/* Main Animation Container */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl border border-border bg-card/50 overflow-hidden">
            {/* Chaos Side (Left) */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={isInView ? { opacity: 0.3 } : { opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-center"
            >
              <div className="relative w-48 h-48">
                {particles.slice(0, 30).map((particle) => (
                  <motion.div
                    key={`chaos-${particle.id}`}
                    className="absolute rounded-full bg-muted-foreground"
                    initial={{
                      x: `${particle.x}%`,
                      y: `${particle.y}%`,
                      width: particle.size,
                      height: particle.size,
                      opacity: particle.opacity
                    }}
                    animate={isInView ? {
                      x: [`${particle.x}%`, `${particle.x + 20}%`, `${particle.x - 10}%`],
                      y: [`${particle.y}%`, `${particle.y - 15}%`, `${particle.y + 10}%`],
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: particle.delay
                    }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 text-left"
              >
                <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Before</p>
                <p className="text-lg font-medium mt-1">Chaos & Complexity</p>
              </motion.div>
            </motion.div>
            
            {/* Arrow / Flow Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-border shadow-lg">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-foreground"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
            
            {/* Order Side (Right) */}
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
              transition={{ duration: 1.5 }}
              className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center"
            >
              <div className="relative w-48 h-48">
                {particles.slice(30, 60).map((particle) => (
                  <motion.div
                    key={`order-${particle.id}`}
                    className="absolute rounded-full bg-foreground"
                    initial={{
                      x: '50%',
                      y: '50%',
                      width: 0,
                      height: 0,
                      opacity: 0
                    }}
                    animate={isInView ? {
                      x: particle.targetX,
                      y: particle.targetY,
                      width: particle.size,
                      height: particle.size,
                      opacity: particle.opacity
                    } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.5 + particle.delay,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 right-8 text-right"
              >
                <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">After</p>
                <p className="text-lg font-medium mt-1">Clarity & Order</p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {[
              { value: '10x', label: 'Faster Execution' },
              { value: '80%', label: 'Time Saved' },
              { value: '∞', label: 'Scalability' },
              { value: '0', label: 'Manual Errors' },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Philosophy Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-light italic text-muted-foreground leading-relaxed">
            "The best systems don't just solve problems—they eliminate the need for problems to exist."
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}
