'use client'

import { motion } from 'framer-motion'
import { 
  FolderKanban, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Mail,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  { 
    icon: FolderKanban, 
    label: 'Total Projects', 
    value: '12',
    change: '+2 this month'
  },
  { 
    icon: Briefcase, 
    label: 'Services', 
    value: '4',
    change: 'Active'
  },
  { 
    icon: FileText, 
    label: 'Case Studies', 
    value: '3',
    change: 'Published'
  },
  { 
    icon: Mail, 
    label: 'Messages', 
    value: '8',
    change: '3 unread'
  },
]

const recentActivity = [
  { action: 'New project added', item: 'AI Document Processor', time: '2 hours ago' },
  { action: 'Case study updated', item: 'Fortune 500 Automation', time: '1 day ago' },
  { action: 'New message received', item: 'Project inquiry from Tech Co', time: '2 days ago' },
  { action: 'Design settings updated', item: 'Typography changed', time: '3 days ago' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back. Here's an overview of your portfolio.
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left"
              >
                <FolderKanban className="h-5 w-5 mb-2" />
                <p className="font-medium">Add Project</p>
                <p className="text-xs text-muted-foreground">Create new portfolio entry</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left"
              >
                <FileText className="h-5 w-5 mb-2" />
                <p className="font-medium">New Case Study</p>
                <p className="text-xs text-muted-foreground">Document a success story</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left"
              >
                <MessageSquare className="h-5 w-5 mb-2" />
                <p className="font-medium">Chatbot Settings</p>
                <p className="text-xs text-muted-foreground">Configure AI assistant</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left"
              >
                <Mail className="h-5 w-5 mb-2" />
                <p className="font-medium">View Messages</p>
                <p className="text-xs text-muted-foreground">3 unread inquiries</p>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
