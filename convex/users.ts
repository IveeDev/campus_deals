import { v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

export const createUser = mutation({
  args: {
    fullName: v.string(),
    university: v.string(),
    hostel: v.string(),
    profileImageUrl: v.string(),
    phoneNumber: v.string(),
    email: v.string(),
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (existingUser) return;

    // create a new user in the users table
    const user = await ctx.db.insert("users", {
      email: args.email,
      clerkId: args.clerkId,
      fullName: args.fullName,
      profileImageUrl: args.profileImageUrl,
      university: args.university,
      phoneNumber: args.phoneNumber,
      hostel: args.hostel,
      totalListings: 0, // Initialize with zero listings
    });
    return user;
  },
});

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const currentUser = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();

  if (!currentUser) throw new Error("User not found in the database");

  return currentUser;
}

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user;
  },
});

export const updateUserProfile = mutation({
  args: {
    fullName: v.string(),
    university: v.string(),
    hostel: v.string(),
    profileImageUrl: v.optional(v.string()),
    phoneNumber: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    if (!user) throw new Error("Unauthorized");

    await ctx.db.patch(user._id, {
      fullName: args.fullName,
      university: args.university,
      hostel: args.hostel,
      profileImageUrl: args.profileImageUrl,
      phoneNumber: args.phoneNumber,
    });
  },
});
