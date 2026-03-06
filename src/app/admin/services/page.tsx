'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  isActive: boolean
  order: number
}

const initialServices: Service[] = [
  {
    id: '1',
    title: 'Automation Systems',
    description: 'End-to-end automation solutions that eliminate repetitive tasks and accelerate processes.',
    icon: 'Cog',
    features: ['Workflow Automation', 'API Integration', 'Process Mining'],
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    title: 'AI-Powered Systems',
    description: 'Intelligent systems that leverage AI to solve complex business problems.',
    icon: 'Brain',
    features: ['Machine Learning', 'NLP', 'Computer Vision'],
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Custom Software',
    description: 'Tailored software solutions designed for your specific workflow needs.',
    icon: 'Code',
    features: ['Full-Stack Development', 'API Development', 'System Integration'],
    isActive: true,
    order: 3,
  },
  {
    id: '4',
    title: 'Process Optimization',
    description: 'Analysis and restructuring of workflows for maximum efficiency.',
    icon: 'Zap',
    features: ['Process Analysis', 'Optimization Strategy', 'Implementation'],
    isActive: true,
    order: 4,
  },
]

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Cog',
    features: '',
  })
  
  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: service.features.join(', '),
      })
    } else {
      setEditingService(null)
      setFormData({
        title: '',
        description: '',
        icon: 'Cog',
        features: '',
      })
    }
    setIsDialogOpen(true)
  }
  
  const handleSave = () => {
    if (editingService) {
      setServices(services.map(s =>
        s.id === editingService.id
          ? { ...s, ...formData, features: formData.features.split(',').map(f => f.trim()) }
          : s
      ))
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        features: formData.features.split(',').map(f => f.trim()),
        isActive: true,
        order: services.length + 1,
      }
      setServices([...services, newService])
    }
    setIsDialogOpen(false)
  }
  
  const handleToggleActive = (id: string) => {
    setServices(services.map(s =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ))
  }
  
  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id))
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">
            Manage the services displayed on your portfolio
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={!service.isActive ? 'opacity-60' : ''}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      Order: {service.order}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={service.isActive}
                    onCheckedChange={() => handleToggleActive(service.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service title"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service description"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Features (comma separated)</Label>
              <Input
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingService ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
