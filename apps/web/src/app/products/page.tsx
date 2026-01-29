"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Grid, List, Star, Gift, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 500])

  const products = [
    {
      id: 1,
      name: "Handcrafted Leather Wallet",
      manufacturer: "Heritage Leather Co.",
      location: "Austin, TX",
      retailPrice: 89.99,
      directPrice: 54.99,
      savings: 39,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      giftWorthy: true,
      category: "Fashion & Accessories",
      description: "Premium full-grain leather wallet handcrafted by skilled artisans in Texas.",
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      manufacturer: "Pure Cotton Mills",
      location: "North Carolina",
      retailPrice: 34.99,
      directPrice: 19.99,
      savings: 43,
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      giftWorthy: false,
      category: "Fashion & Accessories",
      description: "100% organic cotton t-shirt made from sustainably sourced materials.",
    },
    {
      id: 3,
      name: "Artisan Coffee Mug Set",
      manufacturer: "Mountain Pottery",
      location: "Colorado",
      retailPrice: 65.0,
      directPrice: 38.0,
      savings: 42,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      giftWorthy: true,
      category: "Home & Living",
      description: "Hand-thrown ceramic mugs perfect for your morning coffee ritual.",
    },
    {
      id: 4,
      name: "Premium Wool Blanket",
      manufacturer: "American Textile Works",
      location: "Vermont",
      retailPrice: 149.99,
      directPrice: 89.99,
      savings: 40,
      rating: 4.7,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      giftWorthy: true,
      category: "Home & Living",
      description: "Luxurious wool blanket woven from the finest American wool.",
    },
    {
      id: 5,
      name: "Artisan Honey Collection",
      manufacturer: "Golden Valley Apiaries",
      location: "California",
      retailPrice: 45.0,
      directPrice: 28.0,
      savings: 38,
      rating: 4.8,
      reviews: 92,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      giftWorthy: true,
      category: "Food & Beverages",
      description: "Raw, unfiltered honey from local California wildflowers.",
    },
    {
      id: 6,
      name: "Handmade Soap Set",
      manufacturer: "Natural Soap Co.",
      location: "Oregon",
      retailPrice: 32.0,
      directPrice: 18.0,
      savings: 44,
      rating: 4.5,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=300",
      madeInUSA: true,
      giftWorthy: true,
      category: "Health & Beauty",
      description: "All-natural soap made with organic ingredients and essential oils.",
    },
  ]

  const categories = [
    "All Categories",
    "Fashion & Accessories",
    "Home & Living",
    "Food & Beverages",
    "Health & Beauty",
    "Electronics",
    "Sports & Outdoors",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SiteHeader />

      {/* Why Buy Direct */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Shop on Cuttoso</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <p className="font-semibold text-blue-100">Direct-from-manufacturer pricing</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="font-semibold text-blue-100">Verified brand listings</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚫</div>
              <p className="font-semibold text-blue-100">No marketplace fees added to your price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🔥</div>
                <h3 className="font-bold text-gray-900">Best Prices This Week</h3>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-bold text-gray-900">Top Rated Essentials</h3>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🆕</div>
                <h3 className="font-bold text-gray-900">New Manufacturer Drops</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-80 bg-white rounded-lg p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button variant="ghost" size="sm">
                Clear All
              </Button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Price Range</Label>
              <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="mb-3" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Category</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Filters */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Special Features</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="made-in-usa" defaultChecked />
                  <Label htmlFor="made-in-usa" className="text-sm">
                    🇺🇸 Made in USA
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gift-worthy" />
                  <Label htmlFor="gift-worthy" className="text-sm">
                    🎁 Perfect for Gifting
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="insurance" />
                  <Label htmlFor="insurance" className="text-sm">
                    🛡️ Insurance Available
                  </Label>
                </div>
              </div>
            </div>

            {/* Savings Range */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Minimum Savings</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any savings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any savings</SelectItem>
                  <SelectItem value="20">20% or more</SelectItem>
                  <SelectItem value="30">30% or more</SelectItem>
                  <SelectItem value="40">40% or more</SelectItem>
                  <SelectItem value="50">50% or more</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">American-Made Products</h1>
                  <p className="text-gray-600">Showing {products.length} products • Direct from manufacturers</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Select defaultValue="savings">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Highest Savings</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  🇺🇸 Made in USA
                  <button className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  $0 - $500
                  <button className="ml-2 text-gray-600 hover:text-gray-800">×</button>
                </Badge>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow bg-white">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.madeInUSA && (
                            <Badge className="bg-blue-900 text-white text-xs">🇺🇸 Made in USA</Badge>
                          )}
                          {product.giftWorthy && (
                            <Badge className="bg-red-600 text-white text-xs">
                              <Gift className="h-3 w-3 mr-1" />
                              Perfect Gift
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-600 text-white font-bold">-{product.savings}%</Badge>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="outline" className="bg-white/90 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Insurance
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-blue-700 mb-1">by {product.manufacturer}</p>
                        <p className="text-xs text-gray-500 mb-2">{product.location}</p>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-green-600">${product.directPrice}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">${product.retailPrice}</span>
                          </div>
                          <Link href={`/product/${product.id}`}>
                            <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={120}
                            height={120}
                            className="w-30 h-30 object-cover rounded-lg"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-green-600 text-white font-bold text-xs">
                            -{product.savings}%
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                              <p className="text-sm text-blue-700 mb-1">by {product.manufacturer}</p>
                              <p className="text-xs text-gray-500 mb-2">{product.location}</p>
                              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                              <div className="flex items-center gap-2 mb-2">
                                {product.madeInUSA && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">🇺🇸 Made in USA</Badge>
                                )}
                                {product.giftWorthy && (
                                  <Badge className="bg-red-100 text-red-800 text-xs">🎁 Perfect Gift</Badge>
                                )}
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="mb-2">
                                <span className="text-xl font-bold text-green-600">${product.directPrice}</span>
                                <span className="text-sm text-gray-500 line-through ml-2 block">
                                  ${product.retailPrice}
                                </span>
                              </div>
                              <Link href={`/product/${product.id}`}>
                                <Button className="bg-blue-900 hover:bg-blue-800">View Details</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
