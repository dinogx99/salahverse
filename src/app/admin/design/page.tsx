'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ColorSetting {
  key: string
  label: string
  value: string
  type: 'color' | 'text'
}

const colorSettings: ColorSetting[] = [
  { key: 'primary', label: 'Primary Color', value: '#0a0a0a', type: 'color' },
  { key: 'background', label: 'Background Color', value: '#ffffff', type: 'color' },
  { key: 'text', label: 'Text Color', value: '#0a0a0a', type: 'color' },
  { key: 'muted', label: 'Muted Color', value: '#737373', type: 'color' },
  { key: 'accent', label: 'Accent Color', value: '#e5e5e5', type: 'color' },
  { key: 'border', label: 'Border Color', value: '#e5e5e5', type: 'color' },
]

export default function DesignAdminPage() {
  const [colors, setColors] = useState<Record<string, string>>(
    colorSettings.reduce((acc, c) => ({ ...acc, [c.key]: c.value }), {})
  )
  
  const [typography, setTypography] = useState({
    headingFont: 'Inter',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    baseSize: 16,
    headingWeight: 600,
  })
  
  const [spacing, setSpacing] = useState({
    sectionPadding: 128,
    cardPadding: 24,
    elementGap: 16,
    borderRadius: 8,
  })
  
  const [sections, setSections] = useState([
    { id: 'hero', label: 'Hero', visible: true, order: 1 },
    { id: 'transformation', label: 'Transformation', visible: true, order: 2 },
    { id: 'projects', label: 'Projects', visible: true, order: 3 },
    { id: 'services', label: 'Services', visible: true, order: 4 },
    { id: 'skills', label: 'Skills', visible: true, order: 5 },
    { id: 'caseStudies', label: 'Case Studies', visible: true, order: 6 },
    { id: 'contact', label: 'Contact', visible: true, order: 7 },
  ])
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Design System</h1>
          <p className="text-muted-foreground mt-1">
            Customize the visual appearance of your portfolio
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Color Palette</CardTitle>
                <CardDescription>
                  Define your brand colors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {colorSettings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <Label>{setting.label}</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="text"
                        value={colors[setting.key]}
                        onChange={(e) => setColors({ ...colors, [setting.key]: e.target.value })}
                        className="w-28 font-mono text-sm"
                      />
                      <Input
                        type="color"
                        value={colors[setting.key]}
                        onChange={(e) => setColors({ ...colors, [setting.key]: e.target.value })}
                        className="w-10 h-10 p-1 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
                <CardDescription>
                  Live preview of your color scheme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="rounded-lg p-6 space-y-4"
                  style={{ backgroundColor: colors.background }}
                >
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: colors.text }}
                  >
                    Heading Preview
                  </div>
                  <p style={{ color: colors.muted }}>
                    This is how your body text will look with the selected colors.
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Primary Button
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: 'transparent',
                        border: `1px solid ${colors.border}`,
                        color: colors.text
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Typography Settings</CardTitle>
              <CardDescription>
                Configure font families and sizes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Heading Font</Label>
                  <Select
                    value={typography.headingFont}
                    onValueChange={(value) => setTypography({ ...typography, headingFont: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="system-ui">System UI</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Body Font</Label>
                  <Select
                    value={typography.bodyFont}
                    onValueChange={(value) => setTypography({ ...typography, bodyFont: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="system-ui">System UI</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Monospace Font</Label>
                  <Select
                    value={typography.monoFont}
                    onValueChange={(value) => setTypography({ ...typography, monoFont: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                      <SelectItem value="Fira Code">Fira Code</SelectItem>
                      <SelectItem value="monospace">System Monospace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Base Font Size: {typography.baseSize}px</Label>
                  <Slider
                    value={[typography.baseSize]}
                    onValueChange={([value]) => setTypography({ ...typography, baseSize: value })}
                    min={14}
                    max={20}
                    step={1}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Heading Weight: {typography.headingWeight}</Label>
                  <Slider
                    value={[typography.headingWeight]}
                    onValueChange={([value]) => setTypography({ ...typography, headingWeight: value })}
                    min={400}
                    max={800}
                    step={100}
                  />
                </div>
              </div>
              
              {/* Typography Preview */}
              <div className="mt-8 p-6 rounded-lg border border-border">
                <h3 style={{ 
                  fontFamily: typography.headingFont, 
                  fontWeight: typography.headingWeight,
                  fontSize: '2rem' 
                }}>
                  Heading Typography
                </h3>
                <p className="mt-2" style={{ fontFamily: typography.bodyFont }}>
                  Body text preview with {typography.bodyFont} font family.
                </p>
                <code className="mt-2 block text-sm" style={{ fontFamily: typography.monoFont }}>
                  const code = "monospace preview";
                </code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="spacing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Spacing & Layout</CardTitle>
              <CardDescription>
                Adjust spacing and border radius
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Padding: {spacing.sectionPadding}px</Label>
                  <Slider
                    value={[spacing.sectionPadding]}
                    onValueChange={([value]) => setSpacing({ ...spacing, sectionPadding: value })}
                    min={64}
                    max={200}
                    step={8}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Card Padding: {spacing.cardPadding}px</Label>
                  <Slider
                    value={[spacing.cardPadding]}
                    onValueChange={([value]) => setSpacing({ ...spacing, cardPadding: value })}
                    min={12}
                    max={48}
                    step={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Element Gap: {spacing.elementGap}px</Label>
                  <Slider
                    value={[spacing.elementGap]}
                    onValueChange={([value]) => setSpacing({ ...spacing, elementGap: value })}
                    min={8}
                    max={32}
                    step={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Border Radius: {spacing.borderRadius}px</Label>
                  <Slider
                    value={[spacing.borderRadius]}
                    onValueChange={([value]) => setSpacing({ ...spacing, borderRadius: value })}
                    min={0}
                    max={24}
                    step={2}
                  />
                </div>
              </div>
              
              {/* Preview */}
              <div className="mt-6 p-6 rounded-lg border border-border">
                <div 
                  className="p-6 bg-muted"
                  style={{ 
                    padding: `${spacing.cardPadding}px`,
                    borderRadius: `${spacing.borderRadius}px`,
                    gap: `${spacing.elementGap}px`
                  }}
                >
                  <p className="text-sm text-muted-foreground">
                    Card preview with {spacing.cardPadding}px padding and {spacing.borderRadius}px border radius
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Section Order & Visibility</CardTitle>
              <CardDescription>
                Control which sections appear and their order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                        {section.order}
                      </span>
                      <span className="font-medium">{section.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={section.visible}
                          onCheckedChange={(checked) => {
                            setSections(sections.map(s => 
                              s.id === section.id ? { ...s, visible: checked } : s
                            ))
                          }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {section.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
