"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal, X } from "lucide-react"

interface OccasionFiltersProps {
  occasion: string
}

export function OccasionFilters({ occasion }: OccasionFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentMin = parseInt(searchParams.get("minPrice") || "0")
  const currentMax = parseInt(searchParams.get("maxPrice") || "500")
  const hasFilters = searchParams.has("minPrice") || searchParams.has("maxPrice")

  const [range, setRange] = useState([currentMin || 0, currentMax || 500])

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (range[0] > 0) params.set("minPrice", range[0].toString())
    if (range[1] < 500) params.set("maxPrice", range[1].toString())
    router.push(`/occasions/${occasion}${params.toString() ? `?${params}` : ""}`)
  }

  const clearFilters = () => {
    setRange([0, 500])
    router.push(`/occasions/${occasion}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-600" />
          <Label className="font-semibold text-gray-900">Price Range</Label>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Slider
            value={range}
            onValueChange={setRange}
            min={0}
            max={500}
            step={10}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>${range[0]}</span>
            <span>${range[1]}{range[1] >= 500 ? "+" : ""}</span>
          </div>
        </div>
        <Button size="sm" onClick={applyFilters} className="bg-red-600 hover:bg-red-700">
          Apply
        </Button>
      </div>
    </div>
  )
}
