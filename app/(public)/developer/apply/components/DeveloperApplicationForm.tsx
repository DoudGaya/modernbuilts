"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { submitDeveloperApplication } from "@/actions/developer"
import { useToast } from "@/components/ui/use-toast"

const projectTypes = [
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

const experienceYears = [
  "3-5 years",
  "5-10 years", 
  "10-15 years",
  "15+ years"
]

const companyTypes = [
  "Real Estate Development Company",
  "Construction Company",
  "Property Services Firm",
  "Architectural Firm",
  "Engineering Consultancy",
  "Procurement Vendor",
  "Contractor",
  "Other"
]

interface CompletedProject {
  name: string
  location: string
  value: string
  year: string
}

function DeveloperApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([])
  const [completedProjects, setCompletedProjects] = useState<CompletedProject[]>([
    { name: "", location: "", value: "", year: "" }
  ])
  const [hasInsurance, setHasInsurance] = useState(false)
  const [hasLegalIssues, setHasLegalIssues] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [agreeToDataProcessing, setAgreeToDataProcessing] = useState(false)
  const { toast } = useToast()

  const handleProjectTypeToggle = (type: string) => {
    setSelectedProjectTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const addCompletedProject = () => {
    setCompletedProjects(prev => [...prev, { name: "", location: "", value: "", year: "" }])
  }

  const removeCompletedProject = (index: number) => {
    setCompletedProjects(prev => prev.filter((_, i) => i !== index))
  }

  const updateCompletedProject = (index: number, field: keyof CompletedProject, value: string) => {
    setCompletedProjects(prev => prev.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    ))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      
      const applicationData = {
        // Company Information
        companyName: formData.get("companyName") as string,
        companyType: formData.get("companyType") as string,
        registrationNumber: formData.get("registrationNumber") as string,
        taxNumber: formData.get("taxNumber") as string,
        establishedYear: formData.get("establishedYear") as string,
        companyAddress: formData.get("companyAddress") as string,
        website: formData.get("website") as string,
        
        // Contact Information
        contactPersonName: formData.get("contactPersonName") as string,
        contactPersonTitle: formData.get("contactPersonTitle") as string,
        contactPhone: formData.get("contactPhone") as string,
        contactEmail: formData.get("contactEmail") as string,
        
        // Experience and Expertise
        experienceYears: formData.get("experienceYears") as string,
        projectTypes: selectedProjectTypes,
        totalProjectsCompleted: formData.get("totalProjectsCompleted") as string,
        totalProjectValue: formData.get("totalProjectValue") as string,
        
        // Completed Projects
        completedProjects,
        
        // Financial Information
        annualRevenue: formData.get("annualRevenue") as string,
        hasInsurance,
        insuranceProvider: hasInsurance ? formData.get("insuranceProvider") as string : undefined,
        hasLegalIssues,
        legalIssuesDetails: hasLegalIssues ? formData.get("legalIssuesDetails") as string : undefined,
        
        // Additional Information
        businessDescription: formData.get("businessDescription") as string,
        whyJoinPlatform: formData.get("whyJoinPlatform") as string,
        marketingStrategy: formData.get("marketingStrategy") as string,
        
        // Terms and Conditions
        agreeToTerms,
        agreeToDataProcessing,
      }

      const result = await submitDeveloperApplication(applicationData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: result.success,
        })
        // Reset form or redirect
        window.location.href = "/developer"
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Tell us about your real estate development company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input 
                id="companyName" 
                name="companyName" 
                required 
                placeholder="Your Development Company Ltd"
              />
            </div>
            <div>
              <Label htmlFor="companyType">Company Type *</Label>
              <Select name="companyType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  {companyTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registrationNumber">Company Registration Number *</Label>
              <Input 
                id="registrationNumber" 
                name="registrationNumber" 
                required 
                placeholder="RC123456"
              />
            </div>
            <div>
              <Label htmlFor="taxNumber">Tax Identification Number *</Label>
              <Input 
                id="taxNumber" 
                name="taxNumber" 
                required 
                placeholder="TIN123456789"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="establishedYear">Year Established *</Label>
              <Input 
                id="establishedYear" 
                name="establishedYear" 
                required 
                placeholder="2010"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <Label htmlFor="website">Company Website</Label>
              <Input 
                id="website" 
                name="website" 
                type="url"
                placeholder="https://www.yourcompany.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="companyAddress">Company Address *</Label>
            <Textarea 
              id="companyAddress" 
              name="companyAddress" 
              required 
              placeholder="Enter your complete company address"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Primary contact person for this application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactPersonName">Contact Person Name *</Label>
              <Input 
                id="contactPersonName" 
                name="contactPersonName" 
                required 
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="contactPersonTitle">Title/Position *</Label>
              <Input 
                id="contactPersonTitle" 
                name="contactPersonTitle" 
                required 
                placeholder="Managing Director"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactPhone">Phone Number *</Label>
              <Input 
                id="contactPhone" 
                name="contactPhone" 
                required 
                placeholder="+234 xxx xxx xxxx"
                type="tel"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Email Address *</Label>
              <Input 
                id="contactEmail" 
                name="contactEmail" 
                required 
                placeholder="contact@yourcompany.com"
                type="email"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience and Expertise */}
      <Card>
        <CardHeader>
          <CardTitle>Experience & Expertise</CardTitle>
          <CardDescription>Your development experience and areas of specialization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experienceYears">Years of Experience *</Label>
              <Select name="experienceYears" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceYears.map((years) => (
                    <SelectItem key={years} value={years}>{years}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="totalProjectsCompleted">Total Projects Completed *</Label>
              <Input 
                id="totalProjectsCompleted" 
                name="totalProjectsCompleted" 
                required 
                placeholder="15"
                type="number"
                min="1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="totalProjectValue">Total Value of Projects Completed *</Label>
            <Input 
              id="totalProjectValue" 
              name="totalProjectValue" 
              required 
              placeholder="₦2.5 billion"
            />
          </div>

          <div>
            <Label>Project Types You Specialize In *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {projectTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={selectedProjectTypes.includes(type)}
                    onCheckedChange={() => handleProjectTypeToggle(type)}
                  />
                  <Label htmlFor={type} className="text-sm font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
            {selectedProjectTypes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedProjectTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => handleProjectTypeToggle(type)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Completed Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Completed Projects</CardTitle>
          <CardDescription>Provide details of your most recent and significant projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {completedProjects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Project {index + 1}</h4>
                {completedProjects.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCompletedProject(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Project Name *</Label>
                  <Input 
                    value={project.name}
                    onChange={(e) => updateCompletedProject(index, "name", e.target.value)}
                    placeholder="Victoria Island Towers"
                    required
                  />
                </div>
                <div>
                  <Label>Location *</Label>
                  <Input 
                    value={project.location}
                    onChange={(e) => updateCompletedProject(index, "location", e.target.value)}
                    placeholder="Lagos, Nigeria"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Project Value *</Label>
                  <Input 
                    value={project.value}
                    onChange={(e) => updateCompletedProject(index, "value", e.target.value)}
                    placeholder="₦500 million"
                    required
                  />
                </div>
                <div>
                  <Label>Year Completed *</Label>
                  <Input 
                    value={project.year}
                    onChange={(e) => updateCompletedProject(index, "year", e.target.value)}
                    placeholder="2023"
                    type="number"
                    min="2000"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addCompletedProject}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Project
          </Button>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Information</CardTitle>
          <CardDescription>Financial details and legal compliance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="annualRevenue">Annual Revenue *</Label>
            <Input 
              id="annualRevenue" 
              name="annualRevenue" 
              required 
              placeholder="₦200 million"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasInsurance"
                checked={hasInsurance}
                onCheckedChange={(checked) => setHasInsurance(checked as boolean)}
              />
              <Label htmlFor="hasInsurance">
                Do you have professional indemnity and public liability insurance?
              </Label>
            </div>
            
            {hasInsurance && (
              <div>
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input 
                  id="insuranceProvider" 
                  name="insuranceProvider" 
                  placeholder="Insurance company name"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasLegalIssues"
                checked={hasLegalIssues}
                onCheckedChange={(checked) => setHasLegalIssues(checked as boolean)}
              />
              <Label htmlFor="hasLegalIssues">
                Are there any ongoing legal disputes or regulatory issues with your company?
              </Label>
            </div>
            
            {hasLegalIssues && (
              <div>
                <Label htmlFor="legalIssuesDetails">Please provide details</Label>
                <Textarea 
                  id="legalIssuesDetails" 
                  name="legalIssuesDetails" 
                  placeholder="Describe any legal issues or disputes"
                  rows={3}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Tell us more about your business and goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="businessDescription">Business Description *</Label>
            <Textarea 
              id="businessDescription" 
              name="businessDescription" 
              required 
              placeholder="Describe your business, core competencies, and what sets you apart from other developers"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="whyJoinPlatform">Why do you want to join StableBricks? *</Label>
            <Textarea 
              id="whyJoinPlatform" 
              name="whyJoinPlatform" 
              required 
              placeholder="Explain your motivation for joining our platform and how you plan to use it"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="marketingStrategy">How do you plan to support StableBricks buyers or projects? *</Label>
            <Textarea 
              id="marketingStrategy" 
              name="marketingStrategy" 
              required 
              placeholder="Describe your service delivery, buyer support, procurement, contractor, or project coordination approach"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              required
            />
            <Label htmlFor="agreeToTerms" className="text-sm leading-5">
              I agree to StableBricks&apos; Terms of Service, Privacy Policy, and Developer Agreement. I understand that providing false information may result in rejection or termination of my account.
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToDataProcessing"
              checked={agreeToDataProcessing}
              onCheckedChange={(checked) => setAgreeToDataProcessing(checked as boolean)}
              required
            />
            <Label htmlFor="agreeToDataProcessing" className="text-sm leading-5">
              I consent to the processing of my personal and company data for the purpose of evaluating this application and potential future business relationship.
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button 
          type="submit" 
          disabled={isSubmitting || !agreeToTerms || !agreeToDataProcessing || selectedProjectTypes.length === 0}
          className="w-full max-w-md"
          size="lg"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  )
}

export default DeveloperApplicationForm
