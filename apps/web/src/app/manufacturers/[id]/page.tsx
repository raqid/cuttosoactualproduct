import Image from "next/image"
import { MapPin, Star, Shield, MessageCircle, CheckCircle, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

export default function ManufacturerBrandPage({ params }: { params: { id: string } }) {
  // In a real app, fetch data based on params.id
  const manufacturer = {
    id: params.id,
    name: "Heritage Leather Co.",
    location: "Austin, TX",
    founded: "1987",
    rating: 4.9,
    reviews: 156,
    responseRate: "98%",
    shippingTime: "2-3 days",
    banner: "/placeholder.svg?height=400&width=1200",
    logo: "/placeholder.svg?height=150&width=150",
    description:
      "Heritage Leather Co. has been crafting premium leather goods in Austin, Texas since 1987. We believe in traditional methods, fair wages, and materials that get better with age.",
    aiStory:
      "Using advanced market analysis, our AI has identified Heritage Leather Co. as a top-tier manufacturer for durability and craftsmanship. Their stitching patterns show a 40% higher tensile strength than industry averages, and their sourcing transparency score is in the top 1% of all leather goods manufacturers on Cuttoso.",
    products: [
      {
        id: 1,
        name: "Classic Bifold Wallet",
        price: 54.99,
        retail: 89.99,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 2,
        name: "Weekend Duffle Bag",
        price: 189.99,
        retail: 350.0,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 3,
        name: "Leather Belt",
        price: 45.0,
        retail: 75.0,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 4,
        name: "Laptop Sleeve",
        price: 65.0,
        retail: 110.0,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SiteHeader />

      {/* Brand Banner */}
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={manufacturer.banner || "/placeholder.svg"}
          alt="Brand Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="container mx-auto flex items-end gap-6">
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-xl border-4 border-white bg-white shadow-lg overflow-hidden">
              <Image
                src={manufacturer.logo || "/placeholder.svg"}
                alt={manufacturer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-white mb-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{manufacturer.name}</h1>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {manufacturer.location}
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" /> {manufacturer.rating} Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Brand Story */}
            <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50 shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="h-24 w-24 text-blue-600" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-900">Cuttoso AI Brand Analysis</CardTitle>
                    <p className="text-xs text-blue-600 font-medium">Powered by proprietary market intelligence</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg font-light italic border-l-4 border-blue-300 pl-4">
                  "{manufacturer.aiStory}"
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> Top 1% Quality Score
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                    <CheckCircle className="h-3 w-3 mr-1" /> Verified Authentic Source
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" /> AI Generated Profile
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Catalog</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {manufacturer.products.map((product) => (
                  <Card key={product.id} className="group hover:shadow-md transition-all">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-600">
                          Save {Math.round(((product.retail - product.price) / product.retail) * 100)}%
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <span className="text-lg font-bold text-green-600">${product.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">${product.retail}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manufacturer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium">{manufacturer.founded}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium">{manufacturer.responseRate}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Avg. Shipping</span>
                  <span className="font-medium">{manufacturer.shippingTime}</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-blue-900 hover:bg-blue-800 mb-3">
                    <MessageCircle className="mr-2 h-4 w-4" /> Contact Manufacturer
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Shield className="mr-2 h-4 w-4" /> View Certifications
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Why Buy Direct?</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Support American craftsmanship directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Eliminate middleman markups (save 30%+)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Transparent sourcing and production</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
