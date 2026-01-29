"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Shield, Gift, Factory, Truck, MessageCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [addInsurance, setAddInsurance] = useState(false)

  const product = {
    id: 1,
    name: "Handcrafted Leather Wallet",
    manufacturer: "Heritage Leather Co.",
    location: "Austin, TX",
    retailPrice: 89.99,
    directPrice: 54.99,
    savings: 39,
    rating: 4.8,
    reviews: 124,
    madeInUSA: true,
    giftWorthy: true,
    category: "Fashion & Accessories",
    description:
      "This premium full-grain leather wallet is handcrafted by skilled artisans in Austin, Texas. Each wallet is made from the finest American leather and features traditional hand-stitching techniques passed down through generations.",
    features: [
      "Full-grain American leather",
      "Hand-stitched construction",
      "RFID blocking technology",
      "6 card slots + 2 hidden pockets",
      "Lifetime craftsmanship guarantee",
    ],
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    manufacturer_info: {
      name: "Heritage Leather Co.",
      founded: "1987",
      employees: "12-25",
      story:
        "Founded by master craftsman John Martinez in 1987, Heritage Leather Co. has been creating premium leather goods in Austin, Texas for over 35 years. We believe in traditional craftsmanship, sustainable practices, and supporting American workers.",
      certifications: ["Made in USA", "Sustainable Materials", "Fair Trade"],
      contact: "hello@heritageleatherco.com",
    },
  }

  const reviews = [
    {
      id: 1,
      name: "Michael R.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely beautiful craftsmanship. The leather quality is exceptional and you can tell this was made with care. Worth every penny!",
      verified: true,
    },
    {
      id: 2,
      name: "Sarah L.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Bought this as a gift for my husband and he loves it. The RFID blocking is a great feature and the wallet feels very premium.",
      verified: true,
    },
    {
      id: 3,
      name: "David K.",
      rating: 4,
      date: "2 months ago",
      comment:
        "Great wallet, exactly as described. Shipping was fast and the packaging was beautiful. Supporting American manufacturers feels good!",
      verified: true,
    },
  ]

  const insuranceCost = 4.99

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                {product.madeInUSA && <Badge className="bg-blue-900 text-white">🇺🇸 Made in USA</Badge>}
                {product.giftWorthy && (
                  <Badge className="bg-red-600 text-white">
                    <Gift className="h-3 w-3 mr-1" />
                    Perfect Gift
                  </Badge>
                )}
                <Badge className="bg-green-600 text-white font-bold">-{product.savings}% OFF</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <Link
                  href={`/manufacturer/${product.manufacturer.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-blue-700 hover:text-blue-900 font-medium"
                >
                  by {product.manufacturer}
                </Link>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{product.location}</span>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price Comparison */}
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Retail Price (Amazon, etc.)</p>
                    <p className="text-2xl font-bold text-gray-500 line-through">${product.retailPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-700 mb-1">Direct from Manufacturer</p>
                    <p className="text-3xl font-bold text-green-600">${product.directPrice}</p>
                  </div>
                </div>
                <div className="bg-green-100 rounded-lg p-3 text-center">
                  <p className="text-green-800 font-semibold">
                    You save ${(product.retailPrice - product.directPrice).toFixed(2)} ({product.savings}%)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Product Insurance */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="insurance" checked={addInsurance} onCheckedChange={(checked) => setAddInsurance(checked === true)} />
                  <div className="flex-1">
                    <Label htmlFor="insurance" className="font-medium cursor-pointer">
                      Add Product Insurance (+${insuranceCost})
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Protect your purchase with full coverage for damage, defects, or dissatisfaction. 30-day
                      money-back guarantee included.
                    </p>
                  </div>
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>

            {/* Purchase Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${(product.directPrice + (addInsurance ? insuranceCost : 0)).toFixed(2)}</span>
              </div>
              <Button size="lg" className="w-full bg-blue-900 hover:bg-blue-800 text-lg py-6">
                Buy Direct from Manufacturer
              </Button>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Secure Checkout
                </div>
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  Free Shipping
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  Authentic Guarantee
                </div>
              </div>
            </div>

            {/* Contact Manufacturer */}
            <Card className="mt-6 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900">Have questions?</p>
                    <p className="text-sm text-blue-700">Contact the manufacturer directly</p>
                  </div>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="manufacturer">Manufacturer</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6">{product.description}</p>
                  <h3 className="font-semibold text-gray-900 mb-4">Features:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manufacturer" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Factory className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.manufacturer_info.name}</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Founded</p>
                          <p className="font-medium">{product.manufacturer_info.founded}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Team Size</p>
                          <p className="font-medium">{product.manufacturer_info.employees} employees</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{product.manufacturer_info.story}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.manufacturer_info.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Manufacturer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Customer Reviews</CardTitle>
                        <CardDescription>
                          {product.rating} out of 5 stars based on {product.reviews} reviews
                        </CardDescription>
                      </div>
                      <Button variant="outline">Write a Review</Button>
                    </div>
                  </CardHeader>
                </Card>

                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="font-medium text-gray-900 mr-2">{review.name}</span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Shipping Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium">Free Standard Shipping</p>
                            <p className="text-sm text-gray-600">5-7 business days</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-green-600 mr-3" />
                          <div>
                            <p className="font-medium">Express Shipping - $12.99</p>
                            <p className="text-sm text-gray-600">2-3 business days</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-red-600 mr-3" />
                          <div>
                            <p className="font-medium">Overnight Shipping - $24.99</p>
                            <p className="text-sm text-gray-600">Next business day</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Returns & Exchanges</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">30-Day Return Policy</p>
                            <p className="text-sm text-gray-600">Full refund or exchange within 30 days</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Award className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">Lifetime Craftsmanship Guarantee</p>
                            <p className="text-sm text-gray-600">Manufacturer warranty against defects</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
