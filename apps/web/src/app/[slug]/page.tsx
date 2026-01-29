import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function GenericPage({ params }: { params: { slug: string } }) {
  // Convert slug to title case (e.g., "about-us" -> "About Us")
  const title = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-white p-12 rounded-xl shadow-lg">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="h-10 w-10 text-blue-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're currently building this page. Cuttoso is in beta, and we're adding new features and content every day.
          </p>
          <p className="text-gray-500 mb-8">
            If you need immediate assistance, please contact our support team at support@cuttoso.com.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
