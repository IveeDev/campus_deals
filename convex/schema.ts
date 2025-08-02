import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    fullName: v.string(),
    email: v.string(),
    university: v.string(),
    hostel: v.string(),
    profileImageUrl: v.optional(v.string()),
    profileImageStorageId: v.optional(v.id("_storage")), 
    totalListings: v.number(),
    phoneNumber: v.optional(v.string()), // Add this
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  items: defineTable({
    title: v.string(),
    description: v.string(),
    price: v.union(v.number(), v.literal(0)), // Allow zero price for free items
    condition: v.union(
      v.literal("new"),
      v.literal("used"),
      v.literal("damaged")
    ),
    category: v.string(),
    images: v.array(v.string()),
    storageId: v.id("_storage"),
    sellerId: v.id("users"),
    hostel: v.string(),
    university: v.string(),
    location: v.optional(v.object({ latitude: v.number(), longitude: v.number() })), // for map
  })
    .index("by_seller", ["sellerId"])
    .index("by_university", ["university"])
    .index("by_hostel", ["hostel"]),

  services: defineTable({
    serviceType: v.string(), // e.g., "Haircut", "Laundry"
    description: v.optional(v.string()),
    providerId: v.id("users"),
    images: v.array(v.string()),
    hostel: v.string(),
    storageId: v.id("_storage"),
    university: v.string(),
    availability: v.optional(v.string()), // e.g., "Weekends only"
    ratings: v.optional(
      v.array(v.object({ userId: v.id("users"), rating: v.number() }))
    ),
  })
    .index("by_provider", ["providerId"])
    .index("by_university", ["university"])
    .index("by_hostel", ["hostel"]),

  messages: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    content: v.string(),
    sentAt: v.number(),
    listingType: v.optional(v.union(v.literal("item"), v.literal("service"))),
    listingId: v.optional(v.union(v.id("items"), v.id("services"))),
  }).index("by_users", ["senderId", "receiverId"]),

  bookmarks: defineTable({
    userId: v.id("users"),
    listingType: v.union(v.literal("item"), v.literal("service")),
    listingId: v.union(v.id("items"), v.id("services")),
  })
    .index("by_user", ["userId"])
    .index("by_listing", ["listingId"])
    .index("by_user_and_listing", ["userId", "listingId"]),

  reports: defineTable({
    reporterId: v.id("users"),
    targetListingType: v.union(v.literal("item"), v.literal("service")),
    targetListingId: v.union(v.id("items"), v.id("services")),
    reason: v.string(),
  }),

  notifications: defineTable({
    receiverId: v.id("users"),
    senderId: v.id("users"),
    type: v.union(
      v.literal("message"),
      v.literal("bookmark"),
      v.literal("report")
    ),
    listingType: v.optional(v.union(v.literal("item"), v.literal("service"))),
    listingId: v.optional(v.union(v.id("items"), v.id("services"))),
  }).index("by_receiver", ["receiverId"]),

  feedback: defineTable({
    reviewerId: v.id("users"), // who gave the feedback
    targetUserId: v.id("users"), // the seller or provider being reviewed
    listingType: v.union(v.literal("item"), v.literal("service")),
    listingId: v.union(v.id("items"), v.id("services")),
    rating: v.number(), // e.g. 1 to 5
    comment: v.optional(v.string()),
  })
    .index("by_target_user", ["targetUserId"])
    .index("by_listing", ["listingId"]),
});
