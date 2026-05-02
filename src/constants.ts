import {
  Issue,
  ServiceContact,
  Shop,
  Product,
  LeaderboardEntry,
} from "./types";

export const CATEGORIES = [
  "Road & Potholes",
  "Water Supply",
  "Electricity",
  "Garbage & Sanitation",
  "Street Lights",
  "Public Safety",
  "Other",
];

export const INITIAL_ISSUES: Issue[] = [];

export const MOCK_SERVICES: ServiceContact[] = [];

export const MOCK_WOMEN_SERVICES: import("./types").ServiceProvider[] = [];

export const MOCK_JOBS: import("./types").Job[] = [];

export const MOCK_COMMUNITY_POSTS: import("./types").CommunityPost[] = [];

export const MOCK_SHOPS: Shop[] = [];

export const MOCK_PRODUCTS: Product[] = [];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [];
