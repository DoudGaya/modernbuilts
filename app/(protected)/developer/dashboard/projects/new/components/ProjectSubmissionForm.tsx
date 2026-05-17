"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProject } from "@/actions/projects"
import { useToast } from "@/components/ui/use-toast"

const projectCategories = [
  "Residential Apartments",
  "Luxury Homes",
  "Office Buildings", 
  "Shopping Centers",
  "Mixed-Use Developments",
  "Industrial Properties",
  "Hotel/Hospitality",
  "Student Housing",
  "Senior Living",
  "Affordable Housing"
]

const projectStatuses = [
  "Pending",
  "Active", 
  "Completed"
]

interface Props {
  developerId: string
}

export default function ProjectSubmissionForm({ developerId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    
    try {
      const result = await createProject(formData)
      
      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Project submitted successfully!",
        })
        // The createProject action already redirects on success
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>Basic details about your real estate project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Project Title *</Label>
            <Input 
              id="title" 
              name="title" 
              required 
              placeholder="Victoria Island Luxury Towers"
            />
          </div>

          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea 
              id="description" 
              name="description" 
              required 
              placeholder="Describe your project in detail, including key features, target market, and unique selling points..."
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Project Category *</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select project category" />
                </SelectTrigger>
                <SelectContent>
                  {projectCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Project Status *</Label>
              <Select name="status" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select project status" />
                </SelectTrigger>
                <SelectContent>
                  {projectStatuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Project Location *</Label>
            <Input 
              id="location" 
              name="location" 
              required 
              placeholder="Victoria Island, Lagos, Nigeria"
            />
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Details</CardTitle>
          <CardDescription>Investment and return information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalValue">Total Project Value *</Label>
              <Input 
                id="totalValue" 
                name="totalValue" 
                required 
                placeholder="₦500,000,000"
              />
            </div>
            <div>
              <Label htmlFor="minInvestment">Minimum Investment *</Label>
              <Input 
                id="minInvestment" 
                name="minInvestment" 
                required 
                placeholder="₦1,000,000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expectedReturn">Expected Return (%) *</Label>
              <Input 
                id="expectedReturn" 
                name="expectedReturn" 
                required 
                placeholder="15"
                type="number"
                min="1"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="duration">Project Duration *</Label>
              <Input 
                id="duration" 
                name="duration" 
                required 
                placeholder="24 months"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline & Milestones</CardTitle>
          <CardDescription>Key phases and expected completion dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="timeline">Project Timeline</Label>
            <Textarea 
              id="timeline" 
              name="timeline" 
              placeholder="Describe the key milestones and phases of your project with expected dates..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
          <CardDescription>Potential risks and mitigation strategies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="risks">Risk Factors</Label>
            <Textarea 
              id="risks" 
              name="risks" 
              placeholder="Identify and describe potential risks associated with this project..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="mitigation">Risk Mitigation</Label>
            <Textarea 
              id="mitigation" 
              name="mitigation" 
              placeholder="Describe your strategies for mitigating the identified risks..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Legal and Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Compliance</CardTitle>
          <CardDescription>Regulatory approvals and legal documentation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="permits">Permits & Approvals</Label>
            <Textarea 
              id="permits" 
              name="permits" 
              placeholder="List all permits, approvals, and licenses obtained or required for this project..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="legal">Legal Structure</Label>
            <Textarea 
              id="legal" 
              name="legal" 
              placeholder="Describe the legal structure of the investment and ownership details..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full max-w-md"
          size="lg"
        >
          {isSubmitting ? "Submitting..." : "Submit Project for Review"}
        </Button>
      </div>
    </form>
  )
}
