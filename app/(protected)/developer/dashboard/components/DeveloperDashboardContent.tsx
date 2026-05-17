"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Plus, 
  TrendingUp, 
  Users, 
  DollarSign,
  BarChart3,
  Settings,
  FileText,
  Eye
} from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string | null
  email: string | null
  role: string
}

interface DeveloperApplication {
  id: string
  companyName: string
  companyType: string
  status: string
  createdAt: Date
}

interface Props {
  user: User
  application: DeveloperApplication
}

export default function DeveloperDashboardContent({ user, application }: Props) {
  // Mock data for now - these would come from the database
  const projectStats = {
    totalProjects: 0,
    activeProjects: 0,
    totalRaised: "₦0",
    totalInvestors: 0
  }

  const recentProjects = [] // Would fetch from database

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {application.companyName}</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/developer/dashboard/projects/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Submit New Project
              </Button>
            </Link>
            <Link href="/developer/dashboard/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">{projectStats.totalProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">{projectStats.activeProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold">{projectStats.totalRaised}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Investors</p>
                <p className="text-2xl font-bold">{projectStats.totalInvestors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/developer/dashboard/projects/new">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Plus className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="font-semibold">Submit New Project</h3>
                  <p className="text-sm text-gray-600">Create a new funding campaign</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/developer/dashboard/projects">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="font-semibold">View Analytics</h3>
                  <p className="text-sm text-gray-600">Track project performance</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/developer/dashboard/profile">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="font-semibold">Update Profile</h3>
                  <p className="text-sm text-gray-600">Manage company information</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest project submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Start by submitting your first project for funding</p>
                <Link href="/developer/dashboard/projects/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Submit First Project
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Projects would be mapped here */}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Profile Completion</p>
                  <p className="text-sm text-gray-600">Complete your profile to attract investors</p>
                </div>
                <Badge variant="secondary">90%</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Verification Status</p>
                  <p className="text-sm text-gray-600">Your developer account is verified</p>
                </div>
                <Badge className="bg-green-600">Verified</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Success Rate</p>
                  <p className="text-sm text-gray-600">Projects successfully funded</p>
                </div>
                <Badge variant="secondary">N/A</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
