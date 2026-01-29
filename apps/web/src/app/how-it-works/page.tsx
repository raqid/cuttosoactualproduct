import { CheckCircle, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Cuttoso Works</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Connect directly with manufacturers and save money on authentic American-made products.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* For Shoppers */}
            <Card className="border-2 border-blue-100">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">For Shoppers</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Install the Chrome extension or browse Cuttoso</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Shop normally on Amazon, eBay, or Facebook Marketplace</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      Get alerted when the manufacturer sells the same item cheaper on Cuttoso
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Manufacturers */}
            <Card className="border-2 border-green-100">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">For Manufacturers</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Upload your catalog</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Enable AI-generated brand content</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Set pricing rules</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Go live on Cuttoso and the extension</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chrome Extension Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Cuttoso Chrome Extension</h2>
              <p className="text-lg text-gray-600 mb-6">
                Never overpay again. Our browser extension automatically detects products on major marketplaces like
                Amazon and eBay, then finds the direct manufacturer source for you.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Instant price comparison</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>One-click direct purchase links</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Works on 50+ major retail sites</span>
                </li>
              </ul>
              <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
                <Chrome className="mr-2 h-5 w-5" />
                Install Extension
              </Button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div className="font-semibold">Amazon Product Page</div>
                <div className="text-sm text-gray-500">Detected by Cuttoso</div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-blue-900">Cuttoso Found a Better Price!</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Save 40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Direct from Manufacturer</div>
                      <div className="font-bold text-lg">$45.00</div>
                    </div>
                    <Button size="sm" className="bg-blue-900">
                      View Deal
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Using Cuttoso</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of shoppers saving money on American-made products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Browse Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
            >
              Apply as Manufacturer
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
