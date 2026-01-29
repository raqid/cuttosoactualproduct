import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// Protect wishlist management routes (but NOT /wishlist/share/* which is public)
const isProtectedWishlistRoute = createRouteMatcher([
  "/wishlist",
  "/wishlist/new",
  "/wishlist/:id",
  "/wishlist/:id/edit",
]);

// Protect credit routes (but NOT /credits/redeem/* which allows viewing before sign-in)
const isProtectedCreditsRoute = createRouteMatcher([
  "/credits",
  "/credits/buy",
  "/credits/send",
]);

const isProtectedReferralRoute = createRouteMatcher(["/referral"]);

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req) || isProtectedWishlistRoute(req) || isProtectedCreditsRoute(req) || isProtectedReferralRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/", "/(api|trpc)(.*)"],
};
