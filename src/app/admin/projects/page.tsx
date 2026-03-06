'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Project {
  id: string
  title: string
  summary: string
  category: string
  status: 'published' | 'draft'
  featured: boolean
  createdAt: string
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Enterprise Workflow Automation',
    summary: 'End-to-end automation platform that reduced manual processing time by 85%.',
    category: 'Automation',
    status: 'published',
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'AI Document Intelligence',
    summary: 'Machine learning system that processes 50,000+ documents daily.',
    category: 'AI Systems',
    status: 'published',
    featured: true,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Real-Time Analytics Dashboard',
    summary: 'Live data visualization platform handling 1M+ events per second.',
    category: 'Software Engineering',
    status: 'draft',
    featured: false,
    createdAt: '2024-01-05',
  },
]

const categories = ['Automation', 'AI Systems', 'Software Engineering', 'Web Development', 'Graphic Design']

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    description: '',
    category: '',
    problem: '',
    solution: '',
    technologies: '',
    status: 'draft' as 'published' | 'draft',
    featured: false,
  })
  
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        summary: project.summary,
        description: '',
        category: project.category,
        problem: '',
        solution: '',
        technologies: '',
        status: project.status,
        featured: project.featured,
      })
    } else {
      setEditingProject(null)
      setFormData({
        title: '',
        summary: '',
        description: '',
        category: '',
        problem: '',
        solution: '',
        technologies: '',
        status: 'draft',
        featured: false,
      })
    }
    setIsDialogOpen(true)
  }
  
  const handleSave = () => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...formData }
          : p
      ))
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title,
        summary: formData.summary,
        category: formData.category,
        status: formData.status,
        featured: formData.featured,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setProjects([newProject, ...projects])
    }
    setIsDialogOpen(false)
  }
  
  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
      
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium">Project</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Featured</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {project.summary}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{project.category}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={project.status === 'published' ? 'default' : 'secondary'}
                      >
                        {project.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {project.featured && (
                        <Badge className="bg-foreground text-background">Featured</Badge>
                      )}
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {project.createdAt}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDialog(project)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects found. Create your first project to get started.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription>
              Fill in the project details below
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief description of the project"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'published' | 'draft') => 
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of the project"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="problem">Problem Statement</Label>
                <Textarea
                  id="problem"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="What problem does this solve?"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="solution">Solution</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="How was the problem solved?"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies (comma separated)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="Python, React, AWS, etc."
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-border"
              />
              <Label htmlFor="featured">Featured project</Label>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
