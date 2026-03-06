'use client'

import { Navigation } from '@/components/portfolio/navigation'
import { HeroSection } from '@/components/portfolio/hero-section'
import { TransformationSection } from '@/components/portfolio/transformation-section'
import { ProjectsSection } from '@/components/portfolio/projects-section'
import { ServicesSection } from '@/components/portfolio/services-section'
import { SkillsSection } from '@/components/portfolio/skills-section'
import { CaseStudiesSection } from '@/components/portfolio/case-studies-section'
import { ContactSection } from '@/components/portfolio/contact-section'
import { Footer } from '@/components/portfolio/footer'
import { Chatbot } from '@/components/portfolio/chatbot'

export default function PortfolioPage() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Transformation Animation Section */}
      <TransformationSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Case Studies Section */}
      <CaseStudiesSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
      
      {/* AI Chatbot */}
      <Chatbot />
    </main>
  )
}
