import { z } from "zod";

export const ResolveInput = z.object({
  asin: z.string().min(5).max(16),
  amazonUrl: z.string().url(),
  title: z.string().optional(),
  brandHint: z.string().optional(),
  sessionId: z.string().min(8).optional(),
});

export const ResolveOutput = z.union([
  z.object({ matched: z.literal(true), offerId: z.string() }),
  z.object({ matched: z.literal(false) }),
]);

export const EventInput = z.object({
  type: z.enum([
    "resolve",
    "offer_view",
    "offer_click",
    "gift_view",
    "gift_click",
    "wishlist_view",
    "wishlist_item_purchased",
    "credit_purchased",
    "credit_gift_sent",
    "credit_gift_redeemed",
    "credit_used",
    "share_wishlist",
    "share_purchase",
    "referral_signup",
    "referral_purchase",
  ]),
  offerId: z.string().optional(),
  giftId: z.string().optional(),
  sessionId: z.string().min(8).optional(),
  meta: z.record(z.any()).optional(),
});

export const GiftCreateInput = z.object({
  offerId: z.string(),
  recipientName: z.string().optional(),
  message: z.string().max(500).optional(),
  sessionId: z.string().min(8).optional(),
});

export const RequestCreateInput = z.object({
  asin: z.string().min(5).max(16).optional(),
  amazonUrl: z.string().url(),
  title: z.string().optional(),
  userEmail: z.string().email().optional(),
});

export const RequestResolveInput = z.object({
  requestId: z.string(),
  offerId: z.string(),
});

// Wishlist validation schemas
export const WishlistOccasion = z.enum([
  "birthday",
  "holiday",
  "wedding",
  "housewarming",
  "baby_shower",
  "graduation",
  "other",
]);

export const WishlistPrivacy = z.enum(["public", "private", "link_only"]);

export const WishlistCreateInput = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  occasion: WishlistOccasion.optional(),
  privacy: WishlistPrivacy.default("link_only"),
});

export const WishlistUpdateInput = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  occasion: WishlistOccasion.optional().nullable(),
  privacy: WishlistPrivacy.optional(),
});

export const WishlistItemAddInput = z.object({
  offerId: z.string(),
  note: z.string().max(500).optional(),
  priority: z.number().min(0).max(10).default(0),
});

export const WishlistItemUpdateInput = z.object({
  note: z.string().max(500).optional().nullable(),
  priority: z.number().min(0).max(10).optional(),
});

export const WishlistItemPurchaseInput = z.object({
  purchaserName: z.string().max(100).optional(),
});

// Credit validation schemas
export const CreditPurchaseInput = z.object({
  amountCents: z.number().min(500).max(50000), // $5 - $500
});

export const CreditSendInput = z.object({
  recipientEmail: z.string().email(),
  amountCents: z.number().min(500).max(50000),
  message: z.string().max(500).optional(),
});

export const CreditRedeemInput = z.object({
  token: z.string(),
});

// Referral schemas
export const ReferralTrackInput = z.object({
  referralCode: z.string().min(1),
});

export type ReferralTrackInputType = z.infer<typeof ReferralTrackInput>;

// Type exports
export type ResolveInputType = z.infer<typeof ResolveInput>;
export type ResolveOutputType = z.infer<typeof ResolveOutput>;
export type EventInputType = z.infer<typeof EventInput>;
export type GiftCreateInputType = z.infer<typeof GiftCreateInput>;
export type RequestCreateInputType = z.infer<typeof RequestCreateInput>;
export type RequestResolveInputType = z.infer<typeof RequestResolveInput>;
export type WishlistOccasionType = z.infer<typeof WishlistOccasion>;
export type WishlistPrivacyType = z.infer<typeof WishlistPrivacy>;
export type WishlistCreateInputType = z.infer<typeof WishlistCreateInput>;
export type WishlistUpdateInputType = z.infer<typeof WishlistUpdateInput>;
export type WishlistItemAddInputType = z.infer<typeof WishlistItemAddInput>;
export type WishlistItemUpdateInputType = z.infer<typeof WishlistItemUpdateInput>;
export type WishlistItemPurchaseInputType = z.infer<typeof WishlistItemPurchaseInput>;
export type CreditPurchaseInputType = z.infer<typeof CreditPurchaseInput>;
export type CreditSendInputType = z.infer<typeof CreditSendInput>;
export type CreditRedeemInputType = z.infer<typeof CreditRedeemInput>;
