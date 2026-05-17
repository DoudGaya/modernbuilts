import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Eye, Trash2 } from "lucide-react"

const wishlistItems = [
  {
    id: "1",
    title: "Modern 3-Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "₦45,000,000",
    image: "/placeholder.svg?height=100&width=150",
    addedDate: "2024-01-10",
  },
  {
    id: "2",
    title: "Commercial Office Space",
    location: "Victoria Island, Lagos",
    price: "₦85,000,000",
    image: "/placeholder.svg?height=100&width=150",
    addedDate: "2024-01-08",
  },
]

export const UserWishlist = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Wishlist</CardTitle>
            <CardDescription>Properties you're interested in</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.location}</p>
                <p className="text-sm font-semibold text-green-600">{item.price}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="outline" className="h-8 px-2">
                  <Eye className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-2 text-red-600 hover:text-red-700">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
