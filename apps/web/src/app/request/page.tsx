"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function RequestPage() {
  const searchParams = useSearchParams();
  const asin = searchParams.get("asin") || "";
  const url = searchParams.get("url") || "";

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asin: asin || undefined,
          amazonUrl: url || "https://amazon.com",
          title: title || undefined,
          userEmail: email || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h1>
          <p className="text-gray-600">
            We&apos;ll look for a manufacturer-direct source for this product. If you provided
            your email, we&apos;ll notify you when we find it.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Request a Direct Source</h1>
        <p className="text-gray-600 mb-8">
          Help us find the manufacturer-direct option for this product.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {asin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ASIN</label>
              <input
                type="text"
                value={asin}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Premium Wireless Headphones"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              We&apos;ll notify you when we find a direct source.
            </p>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Request
          </button>
        </form>
      </div>
    </main>
  );
}
