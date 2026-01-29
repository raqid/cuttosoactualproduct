import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

// Credit amount limits
export const CREDIT_MIN_CENTS = 500 // $5
export const CREDIT_MAX_CENTS = 50000 // $500

// Format cents to currency string
export function formatCurrency(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100)
}

// Validate credit amount
export function isValidCreditAmount(cents: number): boolean {
  return cents >= CREDIT_MIN_CENTS && cents <= CREDIT_MAX_CENTS
}
