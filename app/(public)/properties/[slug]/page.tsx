"use client"

import { useState, useEffect } from "react"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Share2, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { getPropertyBySlug } from "@/actions/property"
import { toast } from "sonner"

export default function PropertyDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const result = await getPropertyBySlug(slug)
        if (result.success) {
          setProperty(result.property)
        }
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [slug])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const handleRequestInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Here you would typically send the data to your backend
    toast.success("Information request sent successfully!")
    
    // Reset form
    e.currentTarget.reset()
  }

  const handleScheduleViewing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time")
      return
    }
    
    // Here you would typically send the data to your backend
    toast.success("Viewing scheduled successfully!")
    
    // Reset form
    e.currentTarget.reset()
    setSelectedDate(undefined)
    setSelectedTime("")
  }

  const handleContactAgent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Here you would typically send the data to your backend
    toast.success("Message sent to agent successfully!")
    
    // Reset form
    e.currentTarget.reset()
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = property?.title || "Check out this property"
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/` // Instagram doesn't support direct URL sharing
    }
    
    if (platform === 'instagram') {
      toast.info("Please copy the URL and share manually on Instagram")
      navigator.clipboard.writeText(url)
      return
    }
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <>
        <PublicNavigations />
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p>Loading property details...</p>
          </div>
        </div>
      </>
    )
  }

  if (!property) {
    return (
      <>
        <PublicNavigations />
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="text-gray-600">The property you're looking for doesn't exist.</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{property.type}</Badge>
              <Badge className="bg-yellow-400 text-black">{property.category.toUpperCase()}</Badge>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(property.price)}
                </div>
              </div>
              
              {/* Share Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share this property</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handleShare('facebook')}
                      className="flex items-center"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleShare('twitter')}
                      className="flex items-center"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleShare('instagram')}
                      className="flex items-center"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card>
                <CardContent className="p-0">
                  <Image
                    src={property.coverImage || "/placeholder.svg"}
                    alt={property.title}
                    width={800}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  
                  {/* Additional Images */}
                  {property.images && property.images.length > 0 && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">More Photos</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {property.images.slice(0, 6).map((image: string, index: number) => (
                          <Image
                            key={index}
                            src={image}
                            alt={`${property.title} - Image ${index + 1}`}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Property Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {property.bedrooms && (
                      <div className="flex flex-col items-center">
                        <Bed className="w-6 h-6 text-yellow-500 mb-2" />
                        <span className="font-semibold">{property.bedrooms}</span>
                        <span className="text-sm text-gray-500">Bedrooms</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex flex-col items-center">
                        <Bath className="w-6 h-6 text-blue-500 mb-2" />
                        <span className="font-semibold">{property.bathrooms}</span>
                        <span className="text-sm text-gray-500">Bathrooms</span>
                      </div>
                    )}
                    {property.area && (
                      <div className="flex flex-col items-center">
                        <Square className="w-6 h-6 text-green-500 mb-2" />
                        <span className="font-semibold">{property.area}</span>
                        <span className="text-sm text-gray-500">Area</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Interested in this property?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Request Info Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Property Information</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleRequestInfo} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input name="firstName" placeholder="First Name" required />
                          <Input name="lastName" placeholder="Last Name" required />
                        </div>
                        <Input name="email" type="email" placeholder="Email Address" required />
                        <Input name="phone" placeholder="Phone Number" required />
                        <Textarea name="message" placeholder="What would you like to know about this property?" />
                        <Button type="submit" className="w-full">Send Request</Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Schedule Viewing Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Schedule Viewing
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Schedule a Property Viewing</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleScheduleViewing} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input name="firstName" placeholder="First Name" required />
                          <Input name="lastName" placeholder="Last Name" required />
                        </div>
                        <Input name="email" type="email" placeholder="Email Address" required />
                        <Input name="phone" placeholder="Phone Number" required />
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Select Date</label>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md border"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Select Time</label>
                          <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Textarea name="notes" placeholder="Any special requirements or notes?" />
                        <Button type="submit" className="w-full">Schedule Viewing</Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Contact Agent Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Agent
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact Our Agent</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleContactAgent} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input name="firstName" placeholder="First Name" required />
                          <Input name="lastName" placeholder="Last Name" required />
                        </div>
                        <Input name="email" type="email" placeholder="Email Address" required />
                        <Input name="phone" placeholder="Phone Number" required />
                        <Select name="subject">
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="viewing">Schedule Viewing</SelectItem>
                            <SelectItem value="pricing">Pricing Information</SelectItem>
                            <SelectItem value="financing">Financing Options</SelectItem>
                            <SelectItem value="negotiation">Price Negotiation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea name="message" placeholder="Your message to the agent" required />
                        <Button type="submit" className="w-full">Send Message</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
