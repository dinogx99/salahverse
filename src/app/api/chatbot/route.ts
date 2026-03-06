import { NextRequest, NextResponse } from 'next/server'

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
  
  pricing: `Project pricing varies based on scope, complexity, and timeline. 

For a detailed quote, I recommend:
1. Filling out the contact form with your project details
2. Scheduling a brief discovery call
3. I'll provide a customized proposal within 48 hours

I offer flexible engagement models including fixed-price projects, hourly consulting, and retainer arrangements.`,
}

const fallbackResponse = `I'm not sure how to help with that specific question. Here are some things I can help with:

• Learn about my services
• Discuss your project needs
• Provide contact information
• Share my experience and expertise

Feel free to ask about any of these, or use the contact form to start a conversation!`

const greetingResponse = "Hello! 👋 I'm the SalahVerse assistant. I can help you learn about services, projects, or how to get in touch. How can I assist you today?"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId } = body
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    const lowerMessage = message.toLowerCase()
    let response = fallbackResponse
    
    // Check for keywords
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('what do you do')) {
      response = predefinedResponses.services
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
      response = predefinedResponses.contact
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('about you')) {
      response = predefinedResponses.experience
    } else if (lowerMessage.includes('project') || lowerMessage.includes('idea') || lowerMessage.includes('help me')) {
      response = predefinedResponses.project
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      response = predefinedResponses.pricing
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = greetingResponse
    } else if (lowerMessage.includes('thank')) {
      response = "You're welcome! Is there anything else I can help you with? Feel free to ask more questions or use the contact form to start a conversation."
    }
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
