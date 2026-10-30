import type { LucideIcon } from "lucide-react";

export type Listing = {
  id: string;
  type: "apartment" | "union";
  title: string;
  district: string;
  price: number;
  area: number;
  rooms?: number;
  bathrooms?: number;
  seats?: number;
  totalSeats?: number;
  image?: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// MOCK - replace with DB later
export const LATEST_LISTINGS: Listing[] = [
  { id: "1", type: "apartment", title: "شقة واسعة في شارع الجمهورية", district: "أسيوط", price: 1850000, area: 145, rooms: 3, bathrooms: 2 },
  { id: "2", type: "union", title: "مشروع بيت العيلة", district: "أسيوط الجديدة", price: 950000, area: 120, seats: 6, totalSeats: 10 },
  { id: "3", type: "apartment", title: "شقة جاهزة للسكن", district: "منفلوط", price: 980000, area: 110, rooms: 2, bathrooms: 1 },
  { id: "4", type: "union", title: "اتحاد ملاك النخيل", district: "أبنوب", price: 720000, area: 100, seats: 8, totalSeats: 12 },
  { id: "5", type: "apartment", title: "شقة عائلية على المفتاح", district: "أبو تيج", price: 1320000, area: 130, rooms: 3, bathrooms: 2 },
  { id: "6", type: "union", title: "مشروع دارنا", district: "ديروط", price: 640000, area: 95, seats: 4, totalSeats: 8 },
];

// MOCK - replace with DB later
export const STATS = [
  { value: "500+", label: "عميل" },
  { value: "320", label: "وحدة مباعة" },
  { value: "12", label: "مركز مغطى" },
  { value: "28", label: "مشروع اتحاد" },
];
