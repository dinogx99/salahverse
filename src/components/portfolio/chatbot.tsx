'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLanguage } from '@/components/providers'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface QuickReply {
  label: string
  value: string
}

const quickReplies: QuickReply[] = [
  { label: 'What services do you offer?', value: 'services' },
  { label: 'How can I contact you?', value: 'contact' },
  { label: 'Tell me about your experience', value: 'experience' },
  { label: 'I have a project idea', value: 'project' },
]

// Predefined responses (Mode A)
const predefinedResponses: Record<string, string> = {
  services: `I offer several specialized services:

• **Automation Systems** - End-to-end automation solutions that eliminate repetitive tasks
• **AI-Powered Systems** - Intelligent systems leveraging AI for complex problem-solving
• **Custom Software** - Tailored software solutions for specific workflow needs
• **Process Optimization** - Analysis and restructuring of workflows for maximum efficiency

Would you like to know more about any specific service?`,
  
  contact: `I'd love to hear from you! You can reach me through:

• **Email**: hello@salahverse.com
• **Response Time**: Typically within 24 hours
• **Location**: Available worldwide (remote)

Feel free to fill out the contact form on this page, or send me an email directly. I'm always happy to discuss new projects!`,
  
  experience: `I have extensive experience in building intelligent systems and automation solutions:

• **10+ years** in software development and automation
• **50+ projects** delivered for clients worldwide
• **Fortune 500** companies among my clients
• **95% average** time reduction in automated workflows

My expertise spans across automation, AI systems, full-stack development, and process optimization. I specialize in transforming complex manual processes into elegant, automated systems.`,
  
  project: `That's great! I'm always excited to work on new projects.

To help me understand your needs better, could you tell me:

1. What type of project are you considering?
2. What's the main problem you're trying to solve?
3. Do you have a timeline in mind?

You can also fill out the contact form below, and I'll get back to you within 24 hours to discuss your project in detail.`,
  
  default: `Hello! I'm the SalahVerse assistant. I can help you learn more about services, projects, or get in touch.

How can I assist you today?`,
}

export function Chatbot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      setMessages([{
        id: '1',
        role: 'assistant',
        content: t('chat.greeting'),
        timestamp: new Date()
      }])
    }
  }, [isOpen, messages.length, t])
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])
  
  const getResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for keywords in predefined responses
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('what do you do')) {
      return predefinedResponses.services
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
      return predefinedResponses.contact
    }
    if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('about you')) {
      return predefinedResponses.experience
    }
    if (lowerMessage.includes('project') || lowerMessage.includes('idea') || lowerMessage.includes('help me')) {
      return predefinedResponses.project
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 How can I help you today? Feel free to ask about my services, experience, or how we can work together."
    }
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with? Feel free to ask more questions or use the contact form to start a conversation."
    }
    
    // Default response
    return predefinedResponses.default
  }
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    
    setIsLoading(true)
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
    
    // Get response
    const response = await getResponse(userMessage)
    
    // Add assistant message
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, assistantMsg])
    
    setIsLoading(false)
  }
  
  const handleQuickReply = (reply: QuickReply) => {
    setInput(reply.label)
    handleSend()
  }
  
  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={cn(
            "w-14 h-14 rounded-full shadow-premium",
            isOpen && "bg-muted text-foreground hover:bg-muted/80"
          )}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]"
          >
            <div className="bg-card border border-border rounded-2xl shadow-premium overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-border bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
                    <Bot className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold">SalahVerse Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always happy to help</p>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="h-80 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3",
                        message.role === 'user' && "flex-row-reverse"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        message.role === 'user' 
                          ? "bg-foreground text-background" 
                          : "bg-muted"
                      )}>
                        {message.role === 'user' 
                          ? <User className="h-4 w-4" />
                          : <Bot className="h-4 w-4" />
                        }
                      </div>
                      <div className={cn(
                        "rounded-2xl px-4 py-2 max-w-[80%]",
                        message.role === 'user'
                          ? "bg-foreground text-background"
                          : "bg-muted"
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply) => (
                      <Button
                        key={reply.value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs"
                      >
                        {reply.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Input */}
              <div className="p-4 border-t border-border">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('chat.placeholder')}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
