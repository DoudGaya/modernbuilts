"use client"

import { useState, useTransition, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle, AlertCircle, X, FileText } from "lucide-react"
import { toast } from "sonner"
import { submitLandPublic } from "@/actions/land-submission"

export default function LandSubmissionForm() {
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState("")
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: boolean }>({})
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: Array<{ name: string; url: string }> }>({
    documents: [],
    plans: []
  })
  
  const fileInputRefs = {
    documents: useRef<HTMLInputElement>(null),
    plans: useRef<HTMLInputElement>(null)
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    size: "",
    titleType: "",
    currentUse: "",
    description: "",
    developmentPreferences: "",
    agreeToTerms: false,
  })

  const handleFileUpload = async (file: File, type: 'documents' | 'plans') => {
    setUploadingFiles(prev => ({ ...prev, [type]: true }))
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      console.log('Uploading file:', file.name, 'Type:', file.type, 'Size:', file.size)
      
      const response = await fetch('/api/upload/land-documents', {
        method: 'POST',
        body: formData,
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error text:', errorText)
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }
      
      const data = await response.json()
      console.log('Response data:', data)
      
      if (data.success) {
        setUploadedFiles(prev => ({
          ...prev,
          [type]: [...prev[type], { name: data.fileName, url: data.fileUrl }]
        }))
        toast.success(`File uploaded successfully: ${data.fileName}`)
      } else {
        toast.error(data.error || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploadingFiles(prev => ({ ...prev, [type]: false }))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'documents' | 'plans') => {
    const files = e.target.files
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        handleFileUpload(file, type)
      })
    }
    // Reset the input value to allow selecting the same file again
    e.target.value = ''
  }

  const removeFile = (type: 'documents' | 'plans', index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("Form submitted, checking fields...")
    console.log("formData:", formData)
    
    if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.size || !formData.titleType || !formData.description) {
      console.log("Missing required fields")
      toast.error("Please fill in all required fields")
      return
    }

    if (!formData.agreeToTerms) {
      console.log("Terms not agreed")
      toast.error("Please agree to the terms and conditions")
      return
    }

    console.log("All validations passed, starting submission...")

    startTransition(async () => {
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        size: formData.size.trim(),
        titleType: formData.titleType.trim(),
        currentUse: formData.currentUse.trim() || undefined,
        description: formData.description.trim(),
        developmentPreferences: formData.developmentPreferences.trim() || undefined,
        documents: uploadedFiles.documents.map(file => file.url),
        plans: uploadedFiles.plans.map(file => file.url),
      }
      
      // console.log("Submitting data:", JSON.stringify(submissionData, null, 2))
      // console.log("Data types:", Object.entries(submissionData).map(([key, value]) => `${key}: ${typeof value} (${value})`))
      
      try {
        const result = await submitLandPublic(submissionData)
        // console.log("Response from submitLandPublic:", JSON.stringify(result, null, 2))
        // console.log("Result type:", typeof result)
        // console.log("Result keys:", Object.keys(result || {}))
        
        if (!result) {
          console.error("No result returned from submitLandPublic")
          toast.error("No response from server. Please try again.")
          return
        }
        
        if (result.error) {
          // console.error("Submission error:", JSON.stringify(result, null, 2))
          if (result.issues && result.issues.length > 0) {
            // Show specific validation errors
            const errorMessages = result.issues.map((issue: any) => {
              const field = issue.path.join('.')
              return `${field.charAt(0).toUpperCase() + field.slice(1)}: ${issue.message}`
            })
            toast.error(`Please fix the following errors:\n${errorMessages.join('\n')}`)
          } else if (result.details) {
            toast.error(`${result.error}: ${result.details}`)
          } else {
            toast.error(result.error || "Unknown error occurred")
          }
        } else if (result.success) {
          toast.success(result.success)
          setIsSubmitted(true)
          setSubmissionId(result.submissionId || "")
        } else {
          console.error("Unexpected response format:", result)
          toast.error("Unexpected response from server. Please try again.")
        }
      } catch (error) {
        console.error("Submission catch error:", error)
        toast.error(`Submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    })
  }

  const handleChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Submission Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for submitting your land for evaluation. Our team will review your submission and contact you within 3-5 business days.
          </p>
          {submissionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Your submission ID:</p>
              <p className="font-mono text-lg font-semibold">{submissionId}</p>
            </div>
          )}
          <div className="space-y-3 text-sm text-gray-600">
            <p>✓ We'll conduct a thorough evaluation of your land</p>
            <p>✓ Our experts will assess development potential</p>
            <p>✓ You'll receive a detailed proposal within 5 business days</p>
          </div>
          <Button 
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: "",
                email: "",
                phone: "",
                location: "",
                size: "",
                titleType: "",
                currentUse: "",
                description: "",
                developmentPreferences: "",
                agreeToTerms: false,
              })
              setUploadedFiles({ documents: [], plans: [] })
            }}
            variant="outline"
            className="mt-6"
          >
            Submit Another Land
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-poppins">Submit Your Land</CardTitle>
        <CardDescription>Provide detailed information about your land for our evaluation team</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                disabled={isPending}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
                disabled={isPending}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
                disabled={isPending}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Land Size (sqm) *</Label>
              <Input
                id="size"
                type="text"
                value={formData.size}
                onChange={(e) => handleChange("size", e.target.value)}
                placeholder="Enter land size in square meters"
                disabled={isPending}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Land Location *</Label>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Enter complete address including state and LGA (minimum 10 characters)"
              disabled={isPending}
              required
            />
            <p className="text-xs text-gray-500">Please provide a detailed address including street, area, LGA, and state</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="titleType">Land Title Type *</Label>
              <Select value={formData.titleType} onValueChange={(value) => handleChange("titleType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select title type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coo">Certificate of Occupancy (C of O)</SelectItem>
                  <SelectItem value="governors-consent">Governor's Consent</SelectItem>
                  <SelectItem value="deed">Deed of Assignment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentUse">Current Land Use</Label>
              <Select value={formData.currentUse} onValueChange={(value) => handleChange("currentUse", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current use" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacant">Vacant Land</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Land Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the land, its features, accessibility, and any existing structures (minimum 20 characters)"
              rows={4}
              disabled={isPending}
              required
            />
            <p className="text-xs text-gray-500">
              Please provide detailed information about the land features, access roads, utilities, and surroundings
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="developmentPreferences">Development Preferences</Label>
            <Textarea
              id="developmentPreferences"
              value={formData.developmentPreferences}
              onChange={(e) => handleChange("developmentPreferences", e.target.value)}
              placeholder="What type of development would you prefer? (Residential, Commercial, Mixed-use, etc.)"
              rows={3}
              disabled={isPending}
            />
          </div>

          <div className="space-y-4">
            <Label>Upload Documents (Optional)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload Land Title Documents</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => fileInputRefs.documents.current?.click()}
                    disabled={uploadingFiles.documents || isPending}
                  >
                    {uploadingFiles.documents ? "Uploading..." : "Choose Files"}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRefs.documents}
                    onChange={(e) => handleFileSelect(e, 'documents')}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                    multiple
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2">PDF, Word, or Image files (max 10MB each)</p>
                </div>
                
                {uploadedFiles.documents.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Documents:</p>
                    {uploadedFiles.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile('documents', index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload Survey Plans</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => fileInputRefs.plans.current?.click()}
                    disabled={uploadingFiles.plans || isPending}
                  >
                    {uploadingFiles.plans ? "Uploading..." : "Choose Files"}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRefs.plans}
                    onChange={(e) => handleFileSelect(e, 'plans')}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                    multiple
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2">PDF, Word, or Image files (max 10MB each)</p>
                </div>
                
                {uploadedFiles.plans.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Plans:</p>
                    {uploadedFiles.plans.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile('plans', index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="rounded mt-1" 
              checked={formData.agreeToTerms}
              onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
              disabled={isPending}
              required
            />
            <label htmlFor="terms" className="text-sm leading-relaxed">
              I confirm that all information provided is accurate and I agree to StableBricks' terms and conditions. 
              I understand that my land will be evaluated and I may be contacted for additional information.
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit Land for Evaluation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
