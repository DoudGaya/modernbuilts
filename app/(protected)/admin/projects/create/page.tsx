// app/(protected)/admin/projects/create/page.tsx
"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { createProject } from "@/actions/project"
import { useFileUpload } from "@/hooks/useFileUpload"
import { Progress } from "@/components/ui/progress"

export default function CreateProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  
  // Use our custom upload hook
  const { uploadFile, uploadMultipleFiles, isUploading, progress, error } = useFileUpload()

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImageFile(file)
      const objectUrl = URL.createObjectURL(file)
      setCoverImagePreview(objectUrl)
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      const objectUrl = URL.createObjectURL(file)
      setVideoPreview(objectUrl)
    }
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const fileArray = Array.from(files)
      setImageFiles([...imageFiles, ...fileArray])
      
      // Create object URLs for previews
      const newPreviewUrls = fileArray.map(file => URL.createObjectURL(file))
      setImagesPreviews([...imagesPreviews, ...newPreviewUrls])
    }
  }
  const handleRemoveImage = (index: number) => {
    const updatedPreviews = [...imagesPreviews]
    const updatedFiles = [...imageFiles]
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index])
    
    updatedPreviews.splice(index, 1)
    updatedFiles.splice(index, 1)    
    setImagesPreviews(updatedPreviews)
    setImageFiles(updatedFiles)
  }
  
  const handleAddFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload all files first
      let coverImageUrl = ""
      let videoUrl = ""
      let projectImageUrls: string[] = []
      
      // Upload cover image if exists
      if (coverImageFile) {
        const result = await uploadFile(coverImageFile, "projects/covers")
        if (result) {
          coverImageUrl = result.fileUrl
        } else {
          throw new Error("Failed to upload cover image")
        }
      }
      
      // Upload video if exists
      if (videoFile) {
        const result = await uploadFile(videoFile, "projects/videos")
        if (result) {
          videoUrl = result.fileUrl
        }
      }
      
      // Upload project images
      if (imageFiles.length > 0) {
        const results = await uploadMultipleFiles(imageFiles, "projects/images")
        projectImageUrls = results.map(result => result.fileUrl)
      }

      // Safely access the form element
      // Make sure we properly handle the event target as a form element
      // This fixes the "parameter 1 is not of type 'HTMLFormElement'" error
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement)
      
      // Add the S3 URLs instead of the actual files
      formData.delete("coverImage")  
      formData.delete("video")
      formData.delete("images")
        formData.append("coverImageUrl", coverImageUrl)
      formData.append("videoUrl", videoUrl)
      formData.append("imageUrls", JSON.stringify(projectImageUrls))
      formData.append("features", JSON.stringify(features))

      // Now submit the form with URLs instead of files
      const result = await createProject(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Project created successfully",
      })

      router.push("/admin/projects")
    } catch (error) {
      console.error("Project creation error:", error)
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clean up object URLs when component unmounts
useEffect(() => {
    return () => {
      if (coverImagePreview) URL.revokeObjectURL(coverImagePreview)
      if (videoPreview) URL.revokeObjectURL(videoPreview)
      imagesPreviews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Create New Project</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Information Card - Unchanged */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>Enter the basic details of the investment project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Same form fields as before */}
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" name="title" placeholder="Enter project title" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter detailed project description"
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                        <SelectItem value="Hospitality">Hospitality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="length">Project Length</Label>
                    <Input id="length" name="length" placeholder="e.g., 24 months" required />
                  </div>
                </div>                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valuation">Total Project Value (₦)</Label>
                    <Input id="valuation" name="valuation" type="number" placeholder="Total value after completion" required />
                    <p className="text-xs text-gray-500">Total value of the project when completed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investmentRequired">Investment Required (₦)</Label>
                    <Input id="investmentRequired" name="investmentRequired" type="number" placeholder="Amount needed to complete project" required />
                    <p className="text-xs text-gray-500">Total funding needed to complete the project</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sharePrice">Share Price (₦)</Label>
                    <Input id="sharePrice" name="sharePrice" type="number" placeholder="Price per share" required />
                    <p className="text-xs text-gray-500">Price per individual share</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roi">Expected ROI (%)</Label>
                    <Input id="roi" name="roi" type="number" placeholder="Expected return" required />
                    <p className="text-xs text-gray-500">Expected return on investment percentage</p>
                  </div>
                </div><div className="space-y-2">
                  <Label htmlFor="duration">Project Duration</Label>
                  <Input id="duration" name="duration" type="date" required />
                </div>
                
                <div className="space-y-4 mt-4">
                  <Label>Project Features</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a feature (e.g., Swimming Pool)"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature())}
                    />
                    <Button type="button" onClick={handleAddFeature}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {features.map((feature, index) => (
                      <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card - Unchanged */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Enter the project location details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Address</Label>
                  <Input id="location" name="location" placeholder="Enter project address" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" placeholder="Enter state" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" placeholder="Enter city" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Card - Enhanced with progress bars */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>Upload project images and video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cover Image Upload */}
                <div className="space-y-4">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {coverImagePreview ? (
                      <div className="relative">
                        <img
                          src={coverImagePreview}
                          alt="Cover preview"
                          className="mx-auto max-h-64 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            URL.revokeObjectURL(coverImagePreview)
                            setCoverImagePreview(null)
                            setCoverImageFile(null)
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Upload cover image</p>
                        <Input
                          id="coverImage"
                          name="coverImage"
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageChange}
                          className="hidden"
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("coverImage")?.click()}
                        >
                          Upload Cover Image
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Video Upload with Preview */}
                <div className="space-y-4">
                  <Label htmlFor="video">Project Video (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {videoPreview ? (
                      <div className="relative">
                        <video
                          src={videoPreview}
                          controls
                          className="mx-auto max-h-64 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            URL.revokeObjectURL(videoPreview)
                            setVideoPreview(null)
                            setVideoFile(null)
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Upload project video</p>
                        <Input
                          id="video"
                          name="video"
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("video")?.click()}
                        >
                          Upload Video
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Multiple Images Upload */}
                <div className="space-y-4">
                  <Label htmlFor="images">Project Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Input
                      id="images"
                      name="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesChange}
                      className="hidden"
                      required={imagesPreviews.length === 0}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("images")?.click()}
                    >
                      Upload Images
                    </Button>
                    
                    {/* Images Preview Grid */}
                    {imagesPreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {imagesPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="h-32 w-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Progress Indicator */}
                {isUploading && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploading files: {progress}%</p>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                
                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Status & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select name="projectStatus" defaultValue="PENDING">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="END">Ended</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                  disabled={isSubmitting || isUploading}
                >
                  {isSubmitting || isUploading ? "Uploading..." : "Create Project"}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

// "use client"
// import { useState } from "react"
// import type React from "react"

// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ArrowLeft, Upload, X } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"
// import { createProject } from "@/actions/project"

// export default function CreateProjectPage() {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
//   const [videoPreview, setVideoPreview] = useState<string | null>(null)
//   const [imagesPreviews, setImagesPreviews] = useState<string[]>([])

//   const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setCoverImagePreview(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setVideoPreview(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files
//     if (files) {
//       const newPreviews: string[] = []
//       Array.from(files).forEach((file) => {
//         const reader = new FileReader()
//         reader.onload = (e) => {
//           newPreviews.push(e.target?.result as string)
//           if (newPreviews.length === files.length) {
//             setImagesPreviews([...imagesPreviews, ...newPreviews])
//           }
//         }
//         reader.readAsDataURL(file)
//       })
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData(e.currentTarget)
//       const result = await createProject(formData)

//       if (result.error) {
//         toast({
//           title: "Error",
//           description: result.error,
//           variant: "destructive",
//         })
//         return
//       }

//       toast({
//         title: "Success",
//         description: "Project created successfully",
//       })

//       router.push("/admin/projects")
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Button variant="outline" size="sm" onClick={() => router.back()}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back
//           </Button>
//           <h1 className="text-3xl font-bold">Create New Project</h1>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Project Information</CardTitle>
//                 <CardDescription>Enter the basic details of the investment project</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Project Title</Label>
//                   <Input id="title" name="title" placeholder="Enter project title" required />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     placeholder="Enter detailed project description"
//                     rows={5}
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="category">Category</Label>
//                     <Select name="category" required>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Residential">Residential</SelectItem>
//                         <SelectItem value="Commercial">Commercial</SelectItem>
//                         <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
//                         <SelectItem value="Hospitality">Hospitality</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="length">Project Length</Label>
//                     <Input id="length" name="length" placeholder="e.g., 24 months" required />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="valuation">Valuation (₦)</Label>
//                     <Input id="valuation" name="valuation" placeholder="Enter project valuation" required />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="sharePrice">Share Price (₦)</Label>
//                     <Input id="sharePrice" name="sharePrice" type="number" placeholder="Price per share" required />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="roi">Expected ROI (%)</Label>
//                     <Input id="roi" name="roi" type="number" placeholder="Expected return" required />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="duration">Project Duration</Label>
//                   <Input id="duration" name="duration" type="date" required />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Location</CardTitle>
//                 <CardDescription>Enter the project location details</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="location">Address</Label>
//                   <Input id="location" name="location" placeholder="Enter project address" required />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="state">State</Label>
//                     <Input id="state" name="state" placeholder="Enter state" required />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="city">City</Label>
//                     <Input id="city" name="city" placeholder="Enter city" required />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Media</CardTitle>
//                 <CardDescription>Upload project images and video</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <Label htmlFor="coverImage">Cover Image</Label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     {coverImagePreview ? (
//                       <div className="relative">
//                         <img
//                           src={coverImagePreview || "/placeholder.svg"}
//                           alt="Cover preview"
//                           className="mx-auto max-h-64 object-contain"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setCoverImagePreview(null)}
//                           className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : (
//                       <>
//                         <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                         <p className="text-sm text-gray-600">Upload cover image</p>
//                         <Input
//                           id="coverImage"
//                           name="coverImage"
//                           type="file"
//                           accept="image/*"
//                           onChange={handleCoverImageChange}
//                           className="hidden"
//                           required
//                         />
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={() => document.getElementById("coverImage")?.click()}
//                         >
//                           Upload Cover Image
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <Label htmlFor="video">Project Video (Optional)</Label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Input
//                       id="video"
//                       name="video"
//                       type="file"
//                       accept="video/*"
//                       onChange={handleVideoChange}
//                       className="hidden"
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => document.getElementById("video")?.click()}
//                     >
//                       Upload Video
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <Label htmlFor="images">Project Images</Label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Input
//                       id="images"
//                       name="images"
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handleImagesChange}
//                       className="hidden"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => document.getElementById("images")?.click()}
//                     >
//                       Upload Images
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Project Status</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Select name="projectStatus" defaultValue="PENDING">
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="PENDING">Pending</SelectItem>
//                     <SelectItem value="ACTIVE">Active</SelectItem>
//                     <SelectItem value="END">Ended</SelectItem>
//                     <SelectItem value="COMPLETED">Completed</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Button
//                   type="submit"
//                   className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Creating..." : "Create Project"}
//                 </Button>
//                 <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
//                   Cancel
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }
