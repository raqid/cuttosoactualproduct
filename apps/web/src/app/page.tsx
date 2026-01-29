import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Star,
  Users,
  Gift,
  Factory,
  Heart,
  Sparkles,
  Zap,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Handcrafted Leather Wallet",
      manufacturer: "Heritage Leather Co.",
      price: 54.99,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      perfectFor: "Dad, Partner, Graduate",
      makerStory: "Third-generation leatherworkers in Austin, TX",
    },
    {
      id: 2,
      name: "Artisan Coffee Mug Set",
      manufacturer: "Mountain Pottery",
      price: 38.0,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      perfectFor: "Coffee Lover, Housewarming",
      makerStory: "Hand-thrown in the Colorado mountains",
    },
    {
      id: 3,
      name: "Premium Wool Blanket",
      manufacturer: "American Textile Works",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      perfectFor: "Newlyweds, New Home",
      makerStory: "Woven from Vermont wool since 1952",
    },
    {
      id: 4,
      name: "Artisan Honey Collection",
      manufacturer: "Golden Valley Apiaries",
      price: 28.0,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      perfectFor: "Foodie, Host Gift",
      makerStory: "Family-run California apiaries",
    },
  ]

  const occasions = [
    { id: "birthday", name: "Birthdays", icon: "🎂", description: "Make their day special", href: "/occasions/birthday" },
    { id: "wedding", name: "Weddings", icon: "💒", description: "Celebrate their love", href: "/occasions/wedding" },
    { id: "housewarming", name: "Housewarmings", icon: "🏠", description: "Welcome them home", href: "/occasions/housewarming" },
    { id: "holiday", name: "Holidays", icon: "🎄", description: "Seasonal celebrations", href: "/occasions/holiday" },
    { id: "thank_you", name: "Thank You", icon: "🙏", description: "Show appreciation", href: "/occasions/thank_you" },
    { id: "just_because", name: "Just Because", icon: "💝", description: "No reason needed", href: "/occasions/just_because" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Give Gifts That Go <span className="text-red-600">Directly to the People</span> Who Made Them
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover thoughtful, handcrafted gifts from American artisans. Create wishlists, share gift ideas with
                friends, and give presents that tell a story worth sharing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/early-access">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Apply for Early Access
                  </Button>
                </Link>
                <Link href="/gift-finder">
                  <Button variant="outline" size="lg" className="border-red-300 bg-transparent text-red-700 hover:bg-red-50">
                    <Gift className="mr-2 h-5 w-5" />
                    Find a Gift
                  </Button>
                </Link>
              </div>
              <div className="flex items-center mt-8 space-x-6">
                <div className="flex items-center">
                  <Factory className="h-5 w-5 text-blue-700 mr-2" />
                  <span className="text-sm text-gray-600">500+ American Makers</span>
                </div>
                <div className="flex items-center">
                  <Gift className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-sm text-gray-600">10,000+ Gifts Given</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Thoughtful gifts from American makers"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Gift Ideas Curated</p>
                    <p className="text-2xl font-bold text-purple-600">By AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Gift Discovery Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to find and share meaningful gifts from American makers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-900">1</span>
                </div>
                <CardTitle className="text-xl">Discover</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse curated gift collections or use our AI Gift Finder to discover the perfect present based on
                  recipient, occasion, and interests.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-700">2</span>
                </div>
                <CardTitle className="text-xl">Learn the Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every gift has a story. Meet the American makers behind each product and discover the craftsmanship
                  that makes each gift meaningful.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-700">3</span>
                </div>
                <CardTitle className="text-xl">Share & Gift</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Add to your wishlist, share gift ideas with friends, or send directly to someone special with a
                  personalized message.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Content Creation and Manufacturer Branding */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Cuttoso AI
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Giving Manufacturers Their Own{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Brand Voice
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We don't just list products; we build brands. Our advanced AI technology analyzes manufacturer data to
                create compelling, unique brand identities that tell their authentic story.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-800/50 flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Content Creation</h3>
                    <p className="text-gray-400">
                      Automatically generates professional product descriptions, brand stories, and marketing copy that
                      resonates with consumers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-800/50 flex items-center justify-center mr-4">
                    <BarChart className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Brand Positioning</h3>
                    <p className="text-gray-400">
                      Our AI analyzes market trends to position each manufacturer's unique strengths, highlighting
                      quality, heritage, and value.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/manufacturers">
                <Button size="lg" className="mt-10 bg-white text-gray-900 hover:bg-gray-100">
                  See AI Branding in Action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-400 font-mono">Cuttoso AI Analysis Engine</div>
                </div>

                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">➜</span>
                    <span>Analyzing manufacturer data...</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">➜</span>
                    <span>Identifying unique selling points...</span>
                  </div>
                  <div className="p-4 bg-gray-900/80 rounded-lg border-l-4 border-purple-500 my-4">
                    <p className="text-gray-300 mb-2 text-xs uppercase tracking-wider text-purple-400">
                      Generated Brand Story
                    </p>
                    <p className="text-white typing-effect">
                      "Heritage Leather Co. isn't just a workshop; it's a legacy of American craftsmanship. Our AI
                      analysis confirms their stitching tensile strength exceeds industry standards by 40%..."
                    </p>
                  </div>
                  <div className="flex items-center text-blue-400">
                    <span className="mr-2">ℹ</span>
                    <span>Brand identity created successfully.</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -right-6 top-10 bg-white text-gray-900 p-3 rounded-lg shadow-xl flex items-center animate-bounce-slow">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-bold">Brand Score: 98/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Gift Ideas</h2>
            <p className="text-xl text-gray-600">
              Handcrafted by American makers, curated for thoughtful giving
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    {product.madeInUSA && <Badge className="bg-blue-900 text-white text-xs">Made in USA</Badge>}
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
                      <Heart className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-blue-700 mb-1">by {product.manufacturer}</p>
                  <p className="text-xs text-gray-500 italic mb-2">{product.makerStory}</p>
                  <div className="flex items-center mb-3">
                    <Gift className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-xs text-gray-600">Perfect for: {product.perfectFor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700" asChild>
                      <Link href="/products">View Gift</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
              >
                Explore All Gift Ideas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Occasion</h2>
            <p className="text-xl text-gray-600">
              Find the perfect gift for any moment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {occasions.map((occasion) => (
              <Link key={occasion.id} href={occasion.href}>
                <Card className="group hover:shadow-lg transition-all cursor-pointer hover:border-red-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{occasion.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{occasion.name}</h3>
                    <p className="text-gray-600 mb-4">{occasion.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-red-50 group-hover:border-red-300 bg-transparent"
                    >
                      Browse Gifts
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/gift-finder">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Gift className="mr-2 h-5 w-5" />
                Use AI Gift Finder
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Gift className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Curated for Gifting</h3>
              <p className="text-sm text-gray-600">Every product selected for its giftability</p>
            </div>
            <div className="flex flex-col items-center">
              <Factory className="h-12 w-12 text-blue-900 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Meet the Maker</h3>
              <p className="text-sm text-gray-600">Know the story behind every gift</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">American Crafted</h3>
              <p className="text-sm text-gray-600">Supporting US makers and their communities</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Share with Friends</h3>
              <p className="text-sm text-gray-600">Create and share wishlists easily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-red-200" />
          <h2 className="text-4xl font-bold mb-4">Create Your Gift Wishlist</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Save your favorite finds, organize by occasion, and share with friends and family so they always know what
            you'd love to receive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wishlist/new">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Heart className="mr-2 h-5 w-5" />
                Start Your Wishlist
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Gift className="mr-2 h-5 w-5" />
                Browse Gift Ideas
              </Button>
            </Link>
          </div>
          <p className="text-sm text-red-200 mt-4">Free to create and share with anyone</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Factory className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Cuttoso</span>
              </div>
              <p className="text-gray-400 mb-4">
                Discover meaningful gifts handcrafted by American makers. Create wishlists, share ideas, and give
                presents that tell a story.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Discover</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/gift-finder" className="hover:text-white">
                    AI Gift Finder
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white">
                    Browse All Gifts
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-white">
                    Gift Collections
                  </Link>
                </li>
                <li>
                  <Link href="/manufacturers" className="hover:text-white">
                    Meet the Makers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/insurance" className="hover:text-white">
                    Product Insurance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Cuttoso. All rights reserved. Made with ❤️ in America.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
