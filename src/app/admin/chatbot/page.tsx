'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Trash2, TestTube, MessageSquare, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PredefinedResponse {
  id: string
  trigger: string
  triggerType: 'exact' | 'contains' | 'regex'
  response: string
  isActive: boolean
}

export default function ChatbotAdminPage() {
  const [mode, setMode] = useState<'predefined' | 'external_api'>('predefined')
  const [predefinedResponses, setPredefinedResponses] = useState<PredefinedResponse[]>([
    { id: '1', trigger: 'services', triggerType: 'contains', response: 'I offer automation, AI systems, and custom software development.', isActive: true },
    { id: '2', trigger: 'contact', triggerType: 'contains', response: 'You can reach me at hello@salahverse.com', isActive: true },
    { id: '3', trigger: 'hello', triggerType: 'contains', response: 'Hello! How can I help you today?', isActive: true },
  ])
  
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a professional assistant for SalahVerse. Help visitors learn about services, projects, and how to get in touch. Be helpful, concise, and professional.'
  )
  
  const [apiConfig, setApiConfig] = useState({
    endpoint: '',
    apiKey: '',
    method: 'POST',
    headers: '{"Content-Type": "application/json"}',
    payloadMap: '{"message": "{{user_message}}"}',
    responseMap: '{"response": "choices[0].message.content"}',
    timeout: 30000,
    retries: 3,
  })
  
  const [greetingMessage, setGreetingMessage] = useState('Hello! How can I help you today?')
  const [fallbackMessage, setFallbackMessage] = useState("I'm not sure how to help with that. Please contact us directly at hello@salahverse.com")
  
  const addPredefinedResponse = () => {
    const newResponse: PredefinedResponse = {
      id: Date.now().toString(),
      trigger: '',
      triggerType: 'contains',
      response: '',
      isActive: true,
    }
    setPredefinedResponses([...predefinedResponses, newResponse])
  }
  
  const updatePredefinedResponse = (id: string, field: keyof PredefinedResponse, value: string | boolean) => {
    setPredefinedResponses(responses =>
      responses.map(r => (r.id === id ? { ...r, [field]: value } : r))
    )
  }
  
  const deletePredefinedResponse = (id: string) => {
    setPredefinedResponses(responses => responses.filter(r => r.id !== id))
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Chatbot Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure your AI assistant behavior and responses
          </p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
      
      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chatbot Mode</CardTitle>
          <CardDescription>
            Choose how the chatbot generates responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setMode('predefined')}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                mode === 'predefined'
                  ? 'border-foreground bg-muted'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-5 w-5" />
                <span className="font-semibold">Predefined Responses</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Use custom predefined responses for common questions. No external API required.
              </p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setMode('external_api')}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                mode === 'external_api'
                  ? 'border-foreground bg-muted'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Settings className="h-5 w-5" />
                <span className="font-semibold">External AI API</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect to OpenAI, Claude, or custom AI endpoints for dynamic responses.
              </p>
            </motion.button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="responses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="responses">
            {mode === 'predefined' ? 'Predefined Responses' : 'API Configuration'}
          </TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="responses" className="space-y-6">
          {mode === 'predefined' ? (
            <>
              {/* Predefined Responses */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Response Rules</CardTitle>
                    <CardDescription>
                      Define triggers and responses for common queries
                    </CardDescription>
                  </div>
                  <Button onClick={addPredefinedResponse} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {predefinedResponses.map((response, index) => (
                    <motion.div
                      key={response.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg border border-border space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={response.isActive}
                            onCheckedChange={(checked) =>
                              updatePredefinedResponse(response.id, 'isActive', checked)
                            }
                          />
                          <Badge variant={response.isActive ? 'default' : 'secondary'}>
                            {response.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deletePredefinedResponse(response.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Trigger Keyword</Label>
                          <Input
                            value={response.trigger}
                            onChange={(e) =>
                              updatePredefinedResponse(response.id, 'trigger', e.target.value)
                            }
                            placeholder="e.g., services, contact"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Match Type</Label>
                          <Select
                            value={response.triggerType}
                            onValueChange={(value) =>
                              updatePredefinedResponse(response.id, 'triggerType', value as 'exact' | 'contains' | 'regex')
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="exact">Exact Match</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="regex">Regex Pattern</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Response</Label>
                        <Textarea
                          value={response.response}
                          onChange={(e) =>
                            updatePredefinedResponse(response.id, 'response', e.target.value)
                          }
                          placeholder="Enter the response message..."
                          rows={3}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* External API Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Configuration</CardTitle>
                  <CardDescription>
                    Connect to your AI service endpoint
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label>API Endpoint URL</Label>
                      <Input
                        value={apiConfig.endpoint}
                        onChange={(e) => setApiConfig({ ...apiConfig, endpoint: e.target.value })}
                        placeholder="https://api.openai.com/v1/chat/completions"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <Input
                        type="password"
                        value={apiConfig.apiKey}
                        onChange={(e) => setApiConfig({ ...apiConfig, apiKey: e.target.value })}
                        placeholder="sk-..."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>HTTP Method</Label>
                      <Select
                        value={apiConfig.method}
                        onValueChange={(value) => setApiConfig({ ...apiConfig, method: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="GET">GET</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Request Headers (JSON)</Label>
                      <Textarea
                        value={apiConfig.headers}
                        onChange={(e) => setApiConfig({ ...apiConfig, headers: e.target.value })}
                        rows={2}
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Payload Mapping (JSON)</Label>
                      <Textarea
                        value={apiConfig.payloadMap}
                        onChange={(e) => setApiConfig({ ...apiConfig, payloadMap: e.target.value })}
                        rows={3}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use {"{{user_message}}"} as placeholder for user input
                      </p>
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Response Field Mapping (JSONPath)</Label>
                      <Textarea
                        value={apiConfig.responseMap}
                        onChange={(e) => setApiConfig({ ...apiConfig, responseMap: e.target.value })}
                        rows={2}
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Timeout (ms)</Label>
                      <Input
                        type="number"
                        value={apiConfig.timeout}
                        onChange={(e) => setApiConfig({ ...apiConfig, timeout: parseInt(e.target.value) })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Retries</Label>
                      <Input
                        type="number"
                        value={apiConfig.retries}
                        onChange={(e) => setApiConfig({ ...apiConfig, retries: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* System Prompt */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Prompt</CardTitle>
                  <CardDescription>
                    Define the AI's behavior and personality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={6}
                    placeholder="You are a helpful assistant..."
                  />
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-6">
          {/* Behavior Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Behavior Settings</CardTitle>
              <CardDescription>
                Configure how the chatbot interacts with visitors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Greeting Message</Label>
                <Textarea
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Fallback Message</Label>
                <Textarea
                  value={fallbackMessage}
                  onChange={(e) => setFallbackMessage(e.target.value)}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  Shown when the chatbot doesn't understand or can't answer
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="both">Bilingual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Forbidden Topics (comma separated)</Label>
                <Input placeholder="pricing, competitors, legal advice" />
                <p className="text-xs text-muted-foreground">
                  Topics the chatbot should avoid or redirect to contact
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="testing" className="space-y-6">
          {/* Testing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Chatbot</CardTitle>
              <CardDescription>
                Test your chatbot configuration before deploying
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 rounded-lg border border-border bg-muted/30 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chatbot testing interface</p>
                  <p className="text-sm">Send test messages to preview responses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
