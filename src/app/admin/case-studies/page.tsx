'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string
  metrics: { label: string; value: string }[]
  isPublished: boolean
}

const initialCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Fortune 500 Workflow Transformation',
    client: 'Global Financial Services',
    industry: 'Finance',
    challenge: 'Manual compliance reporting taking 2 weeks per cycle',
    solution: 'Implemented end-to-end automation with real-time monitoring',
    results: 'Reduced reporting time by 95%, saving $3M annually',
    metrics: [
      { label: 'Time Reduction', value: '95%' },
      { label: 'Annual Savings', value: '$3M+' },
      { label: 'Hours Saved Weekly', value: '50+' },
    ],
    isPublished: true,
  },
  {
    id: '2',
    title: 'Healthcare Document Intelligence',
    client: 'Regional Hospital Network',
    industry: 'Healthcare',
    challenge: 'Manual processing of 50,000+ documents daily',
    solution: 'AI-powered document processing with ML classification',
    results: '99.5% accuracy, 80% staff reallocation to higher-value tasks',
    metrics: [
      { label: 'Accuracy Rate', value: '99.5%' },
      { label: 'Daily Documents', value: '50K+' },
      { label: 'Staff Reallocation', value: '80%' },
    ],
    isPublished: true,
  },
]

export default function CaseStudiesAdminPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    industry: '',
    challenge: '',
    solution: '',
    results: '',
    metrics: '',
  })
  
  const handleOpenDialog = (study?: CaseStudy) => {
    if (study) {
      setEditingStudy(study)
      setFormData({
        title: study.title,
        client: study.client,
        industry: study.industry,
        challenge: study.challenge,
        solution: study.solution,
        results: study.results,
        metrics: study.metrics.map(m => `${m.label}: ${m.value}`).join('\n'),
      })
    } else {
      setEditingStudy(null)
      setFormData({
        title: '',
        client: '',
        industry: '',
        challenge: '',
        solution: '',
        results: '',
        metrics: '',
      })
    }
    setIsDialogOpen(true)
  }
  
  const handleSave = () => {
    const metrics = formData.metrics.split('\n').map(line => {
      const [label, value] = line.split(':').map(s => s.trim())
      return { label, value }
    }).filter(m => m.label && m.value)
    
    if (editingStudy) {
      setCaseStudies(caseStudies.map(s =>
        s.id === editingStudy.id
          ? { ...s, ...formData, metrics }
          : s
      ))
    } else {
      const newStudy: CaseStudy = {
        id: Date.now().toString(),
        title: formData.title,
        client: formData.client,
        industry: formData.industry,
        challenge: formData.challenge,
        solution: formData.solution,
        results: formData.results,
        metrics,
        isPublished: false,
      }
      setCaseStudies([...caseStudies, newStudy])
    }
    setIsDialogOpen(false)
  }
  
  const handleDelete = (id: string) => {
    setCaseStudies(caseStudies.filter(s => s.id !== id))
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Case Studies</h1>
          <p className="text-muted-foreground mt-1">
            Manage detailed project success stories
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Case Study
        </Button>
      </div>
      
      {/* Case Studies List */}
      <div className="space-y-6">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle>{study.title}</CardTitle>
                    <Badge variant={study.isPublished ? 'default' : 'secondary'}>
                      {study.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{study.client}</span>
                    <span>•</span>
                    <span>{study.industry}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(study)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(study.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Challenge</h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Solution</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Results</h4>
                      <p className="text-muted-foreground">{study.results}</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Key Metrics
                    </h4>
                    <div className="space-y-3">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{metric.label}</span>
                          <span className="font-semibold">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingStudy ? 'Edit Case Study' : 'Add New Case Study'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Case study title"
                />
              </div>
              <div className="space-y-2">
                <Label>Client</Label>
                <Input
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Client name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Industry</Label>
              <Input
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Finance, Healthcare, Retail"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Challenge</Label>
              <Textarea
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="What problem was the client facing?"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Solution</Label>
              <Textarea
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="How was the problem solved?"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Results</Label>
              <Textarea
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                placeholder="What were the outcomes?"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Metrics (one per line, format: Label: Value)</Label>
              <Textarea
                value={formData.metrics}
                onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                placeholder="Time Reduction: 95%&#10;Annual Savings: $3M+"
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingStudy ? 'Save Changes' : 'Create Case Study'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
