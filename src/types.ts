export type IssueStatus = "reported" | "in-progress" | "resolved";

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: IssueStatus;
  upvotes: number;
  reportedBy: string; // phone number or name
  createdAt: string;
  imageUrl?: string;
  isUpvoted?: boolean;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  points?: number;
  area?: string;
  role?: "user" | "provider" | "admin";
  isVerified?: boolean;
  avatar?: string;
}

export interface ServiceContact {
  id: string;
  name: string;
  category:
    | "Plumber"
    | "Electrician"
    | "Milkman"
    | "Tailor"
    | "Hospital"
    | "Medical"
    | "Other";
  phone: string;
  rating: number;
}

export interface Shop {
  id: string;
  name: string;
  category: "Grocery" | "Medical" | "Vegetables" | "Other";
  rating: number;
  isOpen: boolean;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  price: number;
  imageUrl?: string;
  isHomemade?: boolean;
  sellerName?: string;
  description?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  badge: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  serviceType: "Silai" | "Makeup" | "Tiffin" | "Tuition" | "Other";
  description: string;
  price: string;
  phone: string;
  rating: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: "Part-time" | "Work from Home" | "Full-time";
  description: string;
  salary: string;
  contact: string;
}

export interface CommunityPost {
  id: string;
  content: string;
  isAnonymous: boolean;
  authorName?: string;
  replies: number;
  createdAt: string;
}

export type ViewState =
  | "login"
  | "home"
  | "dashboard"
  | "report"
  | "directory"
  | "shopping"
  | "leaderboard"
  | "map"
  | "services"
  | "jobs"
  | "community"
  | "profile"
  | "privacy"
  | "terms"
  | "ai-help"
  | "notifications"
  | "admin"
  | "rides";
