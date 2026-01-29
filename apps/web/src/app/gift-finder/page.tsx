"use client"

import { useState } from "react"
import Link from "next/link"
import { Gift, Heart, ArrowRight, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { SiteHeader } from "@/components/site-header"

interface OfferResult {
  id: string
  title: string
  priceCents: number | null
  imageUrl: string | null
  description: string | null
  manufacturer: {
    id: string
    name: string
    verified: boolean
    madeInUsa: boolean
  }
}

export default function GiftFinderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<OfferResult[]>([])
  const [isFiltered, setIsFiltered] = useState(true)
  const [giftData, setGiftData] = useState({
    recipient: "",
    occasion: "",
    budget: [50, 200],
    interests: [] as string[],
  })

  const occasions = [
    { id: "birthday", label: "Birthday", icon: "🎂" },
    { id: "wedding", label: "Wedding", icon: "💒" },
    { id: "holiday", label: "Holiday", icon: "🎄" },
    { id: "housewarming", label: "Housewarming", icon: "🏠" },
    { id: "thank_you", label: "Thank You", icon: "🙏" },
    { id: "just_because", label: "Just Because", icon: "💝" },
    { id: "baby_shower", label: "Baby Shower", icon: "👶" },
    { id: "graduation", label: "Graduation", icon: "🎓" },
  ]

  const interests = [
    { id: "cooking", label: "Cooking & Food", icon: "👨‍🍳" },
    { id: "fashion", label: "Fashion & Style", icon: "👗" },
    { id: "home-decor", label: "Home & Decor", icon: "🏡" },
    { id: "outdoors", label: "Outdoors & Sports", icon: "🏔️" },
    { id: "tech", label: "Technology", icon: "📱" },
    { id: "wellness", label: "Health & Wellness", icon: "🧘‍♀️" },
    { id: "art", label: "Art & Crafts", icon: "🎨" },
    { id: "books", label: "Books & Learning", icon: "📚" },
  ]

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Step 4 → Fetch recommendations
      setCurrentStep(5)
      await fetchRecommendations()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const fetchRecommendations = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/offers/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion: giftData.occasion,
          interests: giftData.interests,
          budgetMin: giftData.budget[0],
          budgetMax: giftData.budget[1],
          recipient: giftData.recipient,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setRecommendations(data.offers)
        setIsFiltered(data.isFiltered)
      }
    } catch (err) {
      console.error("Failed to fetch recommendations:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleInterest = (interestId: string) => {
    setGiftData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="h-12 w-12 text-red-600 mr-3" />
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">AI Gift Finder</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Personalized, real products directly from manufacturers.
          </p>
        </div>

        {/* How It Works Section */}
        {currentStep <= 4 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-red-600">
                    1
                  </div>
                  <p className="text-gray-700">Tell us who you're shopping for</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-red-600">
                    2
                  </div>
                  <p className="text-gray-700">Our AI selects products from verified manufacturers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-red-600">
                    3
                  </div>
                  <p className="text-gray-700">You get custom gift recommendations within seconds</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep <= 4 && (
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Step {currentStep} of 4</span>
                <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            <Card className="border-2 border-red-100">
              <CardContent className="p-8">
                {/* Step 1: Recipient */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Who are you shopping for?</h2>
                    <p className="text-gray-600 mb-6">Tell us about the lucky recipient</p>

                    <RadioGroup
                      value={giftData.recipient}
                      onValueChange={(value) => setGiftData((prev) => ({ ...prev, recipient: value }))}
                      className="grid md:grid-cols-2 gap-4"
                    >
                      {[
                        { value: "partner", label: "Partner/Spouse", icon: "💕" },
                        { value: "family", label: "Family Member", icon: "👨‍👩‍👧‍👦" },
                        { value: "friend", label: "Friend", icon: "👫" },
                        { value: "colleague", label: "Colleague", icon: "💼" },
                        { value: "teacher", label: "Teacher", icon: "👩‍🏫" },
                        { value: "myself", label: "Myself", icon: "🙋‍♀️" },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex items-center cursor-pointer">
                            <span className="text-2xl mr-3">{option.icon}</span>
                            <span className="font-medium">{option.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Step 2: Occasion */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">What's the occasion?</h2>
                    <p className="text-gray-600 mb-6">Help us find the perfect gift for the moment</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {occasions.map((occasion) => (
                        <button
                          key={occasion.id}
                          onClick={() => setGiftData((prev) => ({ ...prev, occasion: occasion.id }))}
                          className={`p-4 border-2 rounded-lg text-center transition-all ${
                            giftData.occasion === occasion.id
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-red-300"
                          }`}
                        >
                          <div className="text-3xl mb-2">{occasion.icon}</div>
                          <div className="font-medium text-gray-900">{occasion.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Budget */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your budget?</h2>
                    <p className="text-gray-600 mb-6">Find gifts in your price range from American makers</p>

                    <div className="max-w-md mx-auto">
                      <div className="mb-6">
                        <Label className="text-lg font-medium mb-4 block">Budget Range</Label>
                        <Slider
                          value={giftData.budget}
                          onValueChange={(value) => setGiftData((prev) => ({ ...prev, budget: value }))}
                          max={500}
                          min={10}
                          step={10}
                          className="mb-4"
                        />
                        <div className="flex justify-between text-lg font-semibold text-gray-700">
                          <span>${giftData.budget[0]}</span>
                          <span>${giftData.budget[1]}</span>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Heart className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-green-800">Direct from Makers</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Every dollar goes directly to American manufacturers and artisans.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Interests */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">What are their interests?</h2>
                    <p className="text-gray-600 mb-6">Select all that apply to find the most relevant gifts</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {interests.map((interest) => (
                        <button
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`p-4 border-2 rounded-lg text-center transition-all ${
                            giftData.interests.includes(interest.id)
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-red-300"
                          }`}
                        >
                          <div className="text-3xl mb-2">{interest.icon}</div>
                          <div className="font-medium text-gray-900">{interest.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={
                      (currentStep === 1 && !giftData.recipient) ||
                      (currentStep === 2 && !giftData.occasion) ||
                      (currentStep === 4 && giftData.interests.length === 0)
                    }
                  >
                    {currentStep === 4 ? "Find My Gifts" : "Next"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Section */}
        {currentStep > 4 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isLoading ? "Finding Your Perfect Gifts..." : "Perfect American-Made Gifts for You"}
              </h2>
              {!isLoading && (
                <p className="text-xl text-gray-600">
                  {isFiltered
                    ? "Based on your preferences, here are our top recommendations"
                    : "Showing all available products from American makers"}
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
                <p className="text-gray-600">Our AI is finding the best gifts for you...</p>
              </div>
            ) : recommendations.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No exact matches found
                </h3>
                <p className="text-gray-600 mb-6">
                  We're growing our catalog. Try adjusting your filters or browse all products.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="border-red-600 text-red-600"
                  >
                    Start Over
                  </Button>
                  <Link href="/products">
                    <Button className="bg-red-600 hover:bg-red-700">Browse All Products</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendations.map((offer) => (
                    <Link key={offer.id} href={`/o/${offer.id}`}>
                      <Card className="group hover:shadow-xl transition-all border-2 hover:border-red-200 h-full">
                        <CardContent className="p-4">
                          <div className="flex gap-2 mb-3">
                            {offer.manufacturer.madeInUsa && (
                              <Badge className="bg-blue-900 text-white text-xs">Made in USA</Badge>
                            )}
                            {offer.manufacturer.verified && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">Verified</Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {offer.title}
                          </h3>
                          <p className="text-sm text-blue-700 mb-2">by {offer.manufacturer.name}</p>
                          {offer.description && (
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{offer.description}</p>
                          )}
                          {offer.priceCents && (
                            <p className="text-lg font-bold text-gray-900">
                              ${(offer.priceCents / 100).toFixed(2)}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Start Over
                  </Button>
                  <Link href="/products">
                    <Button size="lg" className="ml-4 bg-blue-900 hover:bg-blue-800">
                      Browse All Products
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
