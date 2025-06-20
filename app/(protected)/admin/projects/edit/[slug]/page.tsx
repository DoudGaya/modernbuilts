"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, ArrowLeft, Loader2, Upload, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getProjectBySlug, updateProject } from "@/actions/project"
import { toast } from "@/components/ui/use-toast"
import { useFileUpload } from "@/hooks/useFileUpload"

type Project = {
  id: string
  title: string
  slug: string
  coverImage: string
  video: string
  images: string[]
  category: string
  description: string
  duration: Date
  valuation: string
  state: string
  city: string
  location: string
  projectStatus: "PENDING" | "ACTIVE" | "END" | "COMPLETED"
  features: string[]
  sharePrice: number
  roi: number
  length: string
  createdAt: Date
  updatedAt: Date
}

interface EditProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [duration, setDuration] = useState<Date>()
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [slug, setSlug] = useState<string | null>(null)

  // File upload hooks
  const {
    uploadFile: uploadCoverImage,
    isUploading: uploadingCover,
    error: coverError,
  } = useFileUpload()

  const {
    uploadFile: uploadVideo,
    isUploading: uploadingVideo,
    error: videoError,
  } = useFileUpload()

  const {
    uploadFile: uploadImage,
    isUploading: uploadingImage,
    error: imageError,
  } = useFileUpload()

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getSlug()
  }, [params])
  useEffect(() => {
    if (slug) {
      loadProject()
    }    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const loadProject = async () => {
    if (!slug) return
    
    setLoading(true)
    const result = await getProjectBySlug(slug)

    if (result.success && result.project) {
      setProject(result.project)
      setDuration(new Date(result.project.duration))
      setFeatures(result.project.features || [])
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to load project",
        variant: "destructive",
      })
      router.push("/admin/projects")
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!project || !duration) return

    setSaving(true)
    const formData = new FormData(e.currentTarget)
    
    // Add duration and features to form data
    formData.append("duration", duration.toISOString())
    formData.append("features", JSON.stringify(features))

    const result = await updateProject(project.id, formData)

    if (result.success) {
      toast({
        title: "Success",
        description: "Project updated successfully",
      })
      router.push("/admin/projects")
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update project",
        variant: "destructive",
      })
    }
    setSaving(false)
  }

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter(feature => feature !== featureToRemove))
  }
  const handleCoverImageUpload = async (file: File) => {
    const result = await uploadCoverImage(file)
    if (result?.fileUrl && project) {
      setProject({ ...project, coverImage: result.fileUrl })
    }
  }

  const handleVideoUpload = async (file: File) => {
    const result = await uploadVideo(file)
    if (result?.fileUrl && project) {
      setProject({ ...project, video: result.fileUrl })
    }
  }

  const handleImageUpload = async (file: File) => {
    const result = await uploadImage(file)
    if (result?.fileUrl && project) {
      setProject({ ...project, images: [...project.images, result.fileUrl] })
    }
  }

  const removeImage = (indexToRemove: number) => {
    if (project) {
      setProject({
        ...project,
        images: project.images.filter((_, index) => index !== indexToRemove)
      })
    }
  }
  if (loading || !slug) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <Button className="mt-4" onClick={() => router.push("/admin/projects")}>
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-gray-600">Update project details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update project basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={project.title}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={project.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="mixed-use">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={project.description}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="length">Project Length</Label>
                <Input
                  id="length"
                  name="length"
                  defaultValue={project.length}
                  placeholder="e.g., 2 years"
                  required
                />
              </div>

              <div>
                <Label>Duration</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !duration && "text-muted-foreground"
                      )}
                    >                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {duration ? format(duration, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={duration}
                      onSelect={setDuration}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>Update pricing and investment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="valuation">Valuation</Label>
                <Input
                  id="valuation"
                  name="valuation"
                  defaultValue={project.valuation}
                  placeholder="e.g., ₦50,000,000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="sharePrice">Share Price (₦)</Label>
                <Input
                  id="sharePrice"
                  name="sharePrice"
                  type="number"
                  defaultValue={project.sharePrice}
                  min="1000"
                  step="1000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="roi">ROI (%)</Label>
                <Input
                  id="roi"
                  name="roi"
                  type="number"
                  defaultValue={project.roi}
                  min="1"
                  max="100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="projectStatus">Project Status</Label>
                <Select name="projectStatus" defaultValue={project.projectStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="END">Ended</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
              <CardDescription>Update project location information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  defaultValue={project.state}
                  required
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={project.city}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Full Address</Label>
                <Textarea
                  id="location"
                  name="location"
                  defaultValue={project.location}
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Project Features</CardTitle>
              <CardDescription>Add or remove project features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {feature}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0"
                      onClick={() => removeFeature(feature)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Media Section */}
        <Card>
          <CardHeader>
            <CardTitle>Media Files</CardTitle>
            <CardDescription>Update project images and video</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cover Image */}
            <div>
              <Label>Cover Image</Label>
              <div className="flex items-center gap-4 mt-2">
                {project.coverImage && (
                  <img
                    src={project.coverImage}
                    alt="Cover"
                    className="h-20 w-20 object-cover rounded"
                  />
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleCoverImageUpload(file)
                    }}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('cover-upload')?.click()}
                    disabled={uploadingCover}
                  >
                    {uploadingCover ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Update Cover Image
                  </Button>
                  {coverError && (
                    <p className="text-sm text-red-600 mt-1">{coverError}</p>
                  )}
                </div>
              </div>
              <input type="hidden" name="coverImageUrl" value={project.coverImage} />
            </div>

            {/* Video */}
            <div>
              <Label>Project Video</Label>
              <div className="flex items-center gap-4 mt-2">
                {project.video && (
                  <video
                    src={project.video}
                    className="h-20 w-32 object-cover rounded"
                    controls
                  />
                )}
                <div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleVideoUpload(file)
                    }}
                    className="hidden"
                    id="video-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('video-upload')?.click()}
                    disabled={uploadingVideo}
                  >
                    {uploadingVideo ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Update Video
                  </Button>
                  {videoError && (
                    <p className="text-sm text-red-600 mt-1">{videoError}</p>
                  )}
                </div>
              </div>
              <input type="hidden" name="videoUrl" value={project.video} />
            </div>

            {/* Additional Images */}
            <div>
              <Label>Additional Images</Label>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {project.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Project image ${index + 1}`}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <div className="h-20 w-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    disabled={uploadingImage}
                    className="h-full w-full"
                  >
                    {uploadingImage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              {imageError && (
                <p className="text-sm text-red-600 mt-1">{imageError}</p>
              )}
              {/* Hidden inputs for images */}
              {project.images.map((image, index) => (
                <input key={index} type="hidden" name="imageUrls" value={image} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
