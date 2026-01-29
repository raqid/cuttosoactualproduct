import Image from "next/image"
import Link from "next/link"
import { Factory, MapPin, Star, ExternalLink, MessageCircle, CheckCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

export default function ManufacturersPage() {
  const manufacturers = [
    {
      id: 1,
      name: "Heritage Leather Co.",
      location: "Austin, TX",
      founded: "1987",
      employees: "12-25",
      specialty: "Premium Leather Goods",
      rating: 4.8,
      reviews: 156,
      products: 24,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Family-owned leather workshop creating premium wallets, bags, and accessories using traditional techniques passed down through generations.",
      certifications: ["Made in USA", "Sustainable Materials", "Fair Trade"],
      featured: true,
    },
    {
      id: 2,
      name: "Mountain Pottery",
      location: "Boulder, CO",
      founded: "1992",
      employees: "8-15",
      specialty: "Handcrafted Ceramics",
      rating: 4.9,
      reviews: 203,
      products: 18,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Artisan pottery studio creating unique ceramic pieces inspired by the Rocky Mountains. Each piece is hand-thrown and glazed with natural materials.",
      certifications: ["Made in USA", "Eco-Friendly", "Artisan Certified"],
      featured: true,
    },
    {
      id: 3,
      name: "American Textile Works",
      location: "Burlington, VT",
      founded: "1978",
      employees: "25-50",
      specialty: "Wool & Cotton Textiles",
      rating: 4.7,
      reviews: 189,
      products: 32,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Traditional textile mill specializing in premium wool blankets, throws, and home textiles using locally sourced American wool and cotton.",
      certifications: ["Made in USA", "Organic Materials", "Worker Owned"],
      featured: false,
    },
    {
      id: 4,
      name: "Golden Valley Apiaries",
      location: "Napa Valley, CA",
      founded: "2001",
      employees: "5-12",
      specialty: "Artisan Honey & Bee Products",
      rating: 4.8,
      reviews: 124,
      products: 15,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Family-run apiary producing raw, unfiltered honey from California wildflowers. Committed to sustainable beekeeping and bee conservation.",
      certifications: ["Made in USA", "Organic Certified", "Bee Friendly"],
      featured: false,
    },
    {
      id: 5,
      name: "Pure Cotton Mills",
      location: "Asheville, NC",
      founded: "1995",
      employees: "15-30",
      specialty: "Organic Cotton Apparel",
      rating: 4.6,
      reviews: 167,
      products: 28,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Sustainable clothing manufacturer creating comfortable, high-quality apparel from 100% organic cotton grown in the American South.",
      certifications: ["Made in USA", "GOTS Certified", "Carbon Neutral"],
      featured: false,
    },
    {
      id: 6,
      name: "Natural Soap Co.",
      location: "Portland, OR",
      founded: "2005",
      employees: "8-15",
      specialty: "Natural Bath & Body Products",
      rating: 4.5,
      reviews: 98,
      products: 22,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Small-batch soap and skincare manufacturer using only natural, organic ingredients sourced from Pacific Northwest farms.",
      certifications: ["Made in USA", "Organic Ingredients", "Cruelty Free"],
      featured: false,
    },
  ]

  const featuredManufacturers = manufacturers.filter((m) => m.featured)
  const allManufacturers = manufacturers

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">Cuttoso for Manufacturers</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Launch your products as full AI-powered direct-to-consumer brands. Win back margins and own the customer
              relationship.
            </p>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Apply for Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Hub Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Brand Hub on Cuttoso</h2>
            <p className="text-xl text-gray-600 mb-8">
              Every manufacturer gets a dedicated brand home where customers can browse all your products, bundles,
              FAQs, policies, and official listings directly from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="h-6 w-6 text-blue-900" />
                </div>
                <p className="text-gray-700">Centralized product pages with your pricing and branding</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
                <p className="text-gray-700">Higher margins by avoiding marketplace fees</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="bg-blue-900">
                    <CheckCircle className="h-4 w-4" />
                  </Badge>
                </div>
                <p className="text-gray-700">Verified manufacturer badges for trust</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Brand Engine Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-purple-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">AI Builds Your Entire Brand Layer</h2>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Our AI automatically generates high-quality content for every product and collection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-purple-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Smart Product Content</h3>
                <p className="text-sm text-gray-600">
                  Product descriptions, FAQs, comparisons, and SEO text generated automatically
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Intelligent Recommendations</h3>
                <p className="text-sm text-gray-600">Smart bundles, upsells, and cross-sells powered by AI</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Localized Copy</h3>
                <p className="text-sm text-gray-600">AI-generated content adapted for different regions and markets</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chrome Extension Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Convert Marketplace Shoppers Into Your Customers</h2>
            <p className="text-xl text-gray-600 mb-8">
              Cuttoso's Chrome extension compares live prices whenever someone views your products or similar products
              on Amazon, eBay, Walmart, or Facebook Marketplace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-green-100">
              <CardContent className="p-6">
                <div className="text-2xl mb-3">💰</div>
                <p className="text-gray-700">
                  If your Cuttoso price is lower, the extension recommends your official listing
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100">
              <CardContent className="p-6">
                <div className="text-2xl mb-3">🎯</div>
                <p className="text-gray-700">Shoppers get the best deal, you earn more margin</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100">
              <CardContent className="p-6">
                <div className="text-2xl mb-3">🔗</div>
                <p className="text-gray-700">Redirects traffic straight to your brand hub on Cuttoso</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How Onboarding Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Manufacturer Onboarding</h2>
          </div>

          <div className="space-y-4">
            {[
              { step: "1", text: "Upload your catalog or link your ecommerce platform" },
              { step: "2", text: "Set pricing, shipping, and margin preferences" },
              { step: "3", text: "Enable AI content generation" },
              { step: "4", text: "Go live across Cuttoso + the Chrome extension" },
            ].map((item) => (
              <Card key={item.step} className="border-2 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                      {item.step}
                    </div>
                    <p className="text-lg text-gray-800">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Manufacturers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Manufacturers</h2>
            <p className="text-xl text-gray-600">Spotlight on exceptional American craftspeople and their stories</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredManufacturers.map((manufacturer) => (
              <Card
                key={manufacturer.id}
                className="group hover:shadow-xl transition-all border-2 hover:border-blue-200"
              >
                <div className="relative">
                  <Image
                    src={manufacturer.image || "/placeholder.svg"}
                    alt={manufacturer.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-900 text-white">Featured</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900 border">
                      <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                      {manufacturer.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{manufacturer.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{manufacturer.location}</span>
                      </div>
                      <p className="text-sm text-blue-700 font-medium">{manufacturer.specialty}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{manufacturer.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900">Est. {manufacturer.founded}</div>
                      <div className="text-xs text-gray-500">Founded</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{manufacturer.employees}</div>
                      <div className="text-xs text-gray-500">Employees</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{manufacturer.products}</div>
                      <div className="text-xs text-gray-500">Products</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {manufacturer.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-green-300 text-green-700">
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/manufacturers/${manufacturer.id}`} className="flex-1">
                      <Button className="w-full bg-blue-900 hover:bg-blue-800">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Brand
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Manufacturers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Manufacturers</h2>
            <p className="text-xl text-gray-600">Browse our complete directory of verified American manufacturers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allManufacturers.map((manufacturer) => (
              <Card key={manufacturer.id} className="group hover:shadow-lg transition-all">
                <div className="relative">
                  <Image
                    src={manufacturer.image || "/placeholder.svg"}
                    alt={manufacturer.name}
                    width={300}
                    height={150}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  {manufacturer.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-blue-900 text-white text-xs">Featured</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{manufacturer.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="text-xs">{manufacturer.location}</span>
                  </div>
                  <p className="text-xs text-blue-700 mb-2">{manufacturer.specialty}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{manufacturer.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({manufacturer.reviews})</span>
                    </div>
                    <span className="text-xs text-gray-500">{manufacturer.products} products</span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/manufacturers/${manufacturer.id}`} className="flex-1">
                      <Button size="sm" className="w-full text-xs bg-blue-900 hover:bg-blue-800">
                        View Brand
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Manufacturers
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Factory className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">Join the Manufacturer Beta</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're onboarding a limited number of manufacturers.
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            Apply Now
          </Button>
        </div>
      </section>
    </div>
  )
}
