import { loadEnvConfig } from "@next/env";
import { connectToDatabase } from "../src/lib/db";
import { ApartmentModel } from "../src/models/Apartment";
import { UnionProjectModel } from "../src/models/UnionProject";
import { TransferListingModel } from "../src/models/TransferListing";
import { createSlug } from "../src/lib/slug";

loadEnvConfig(process.cwd());

// MOCK - replace with DB later
const sampleApartments = [
  { title: "شقة واسعة في شارع الجمهورية", slug: createSlug("apartment-asyut-01"), description: "شقة عائلية في موقع حيوي وقريبة من الخدمات.", price: 1850000, district: "أسيوط", address: "شارع الجمهورية", areaSqm: 145, rooms: 3, bathrooms: 2, floor: 4, finishing: "تشطيب كامل", status: "جاهزة", features: ["قريبة من الخدمات", "عدادات مستقلة"], isPublished: true },
  { title: "شقة هادئة في أسيوط الجديدة", slug: createSlug("apartment-asyut-new-01"), description: "مساحة عملية مناسبة لعيلة صغيرة.", price: 1420000, district: "أسيوط الجديدة", address: "الحي الأول", areaSqm: 125, rooms: 3, bathrooms: 2, floor: 2, finishing: "نص تشطيب", status: "جاهزة", features: ["تهوية جيدة", "واجهة مميزة"], isPublished: true },
  { title: "شقة جاهزة للسكن في ديروط", slug: createSlug("apartment-dayrout-01"), description: "اختيار مناسب للسكن في منطقة هادئة.", price: 980000, district: "ديروط", address: "شارع المركز", areaSqm: 110, rooms: 2, bathrooms: 1, floor: 3, finishing: "تشطيب كامل", status: "جاهزة", features: ["قريبة من المواصلات"], isPublished: true },
  { title: "شقة عائلية في القوصية", slug: createSlug("apartment-el-qousiya-01"), description: "شقة بمساحة كبيرة وتوزيع عملي.", price: 1250000, district: "القوصية", address: "منطقة السوق", areaSqm: 135, rooms: 3, bathrooms: 2, floor: 1, finishing: "نص تشطيب", status: "تحت الإنشاء", features: ["مساحة واسعة"], isPublished: true },
  { title: "شقة على المفتاح في منفلوط", slug: createSlug("apartment-manflout-01"), description: "وحدة جاهزة بتشطيب مريح للسكن.", price: 1120000, district: "منفلوط", address: "شارع المدارس", areaSqm: 120, rooms: 3, bathrooms: 1, floor: 2, finishing: "تشطيب كامل", status: "جاهزة", features: ["جاهزة للسكن"], isPublished: true },
  { title: "شقة جديدة في أبنوب", slug: createSlug("apartment-abnoub-01"), description: "وحدة عملية في موقع قريب من الخدمات.", price: 870000, district: "أبنوب", address: "المنطقة الجديدة", areaSqm: 100, rooms: 2, bathrooms: 1, floor: 3, finishing: "على الطوب", status: "تحت الإنشاء", features: ["سعر مناسب"], isPublished: true },
  { title: "شقة عائلية في أبو تيج", slug: createSlug("apartment-abu-tig-01"), description: "شقة مريحة بمساحة مناسبة للعائلات.", price: 1320000, district: "أبو تيج", address: "شارع المحطة", areaSqm: 130, rooms: 3, bathrooms: 2, floor: 4, finishing: "تشطيب كامل", status: "جاهزة", features: ["موقع مميز"], isPublished: true },
  { title: "شقة في ساحل سليم", slug: createSlug("apartment-sahel-selim-01"), description: "اختيار هادئ بمساحة عملية.", price: 760000, district: "ساحل سليم", address: "وسط البلد", areaSqm: 95, rooms: 2, bathrooms: 1, floor: 1, finishing: "نص تشطيب", status: "جاهزة", features: ["إضاءة طبيعية"], isPublished: true },
];

// MOCK - replace with DB later
const sampleUnionProjects = [
  { title: "مشروع بيت العيلة", slug: createSlug("union-project-asyut-01"), description: "مشاركة في تملك وبناء مشروع سكني بتفاصيل واضحة.", district: "أسيوط", landPrice: 2000000, totalProjectCost: 10000000, totalSeats: 10, reservedSeats: 6, landAreaSqm: 600, stage: "تجميع شركاء", isPublished: true },
  { title: "اتحاد ملاك النخيل", slug: createSlug("union-project-asyut-new-01"), description: "مشروع عائلي في موقع هادئ مع متابعة للمراحل.", district: "أسيوط الجديدة", landPrice: 2400000, totalProjectCost: 12000000, totalSeats: 12, reservedSeats: 8, landAreaSqm: 720, stage: "شراء الأرض", isPublished: true },
  { title: "مشروع دارنا", slug: createSlug("union-project-dayrout-01"), description: "اختيار مناسب للشركاء الراغبين في بناء مشروع منظم.", district: "ديروط", landPrice: 1300000, totalProjectCost: 6400000, totalSeats: 8, reservedSeats: 4, landAreaSqm: 480, stage: "تحت البناء", isPublished: true },
  { title: "مشروع العيلة في أبو تيج", slug: createSlug("union-project-abu-tig-01"), description: "مشاركة واضحة في مشروع سكني تحت الإنشاء.", district: "أبو تيج", landPrice: 1800000, totalProjectCost: 9000000, totalSeats: 10, reservedSeats: 7, landAreaSqm: 550, stage: "تجميع شركاء", isPublished: true },
];

const sampleTransferListings = [
  { title: "شقة بالتقسيط في أسيوط الجديدة", slug: createSlug("transfer-asyut-new-01"), description: "وحدة عملية في مشروع سكني قريب من الخدمات.", district: "أسيوط الجديدة", address: "الحي الأول", areaSqm: 125, rooms: 3, bathrooms: 2, floor: 2, status: "جاهزة", sellerCompanyName: "شركة النخبة للتطوير", originalPrice: 1800000, amountPaid: 650000, estimatedMarketPrice: 2200000, transferAmountRequested: 650000, monthlyInstallment: 12000, remainingInstallments: 48, requiresSellerApproval: true, listingStatus: "متاح", isPublished: true, isDocumentsVerified: true },
  { title: "شقة عائلية في أسيوط", slug: createSlug("transfer-asyut-01"), description: "شقة بمساحة مناسبة في موقع حيوي.", district: "أسيوط", address: "شارع الجمهورية", areaSqm: 140, rooms: 3, bathrooms: 2, floor: 4, status: "جاهزة", sellerCompanyName: "شركة العمران", originalPrice: 2100000, amountPaid: 900000, estimatedMarketPrice: 2500000, transferAmountRequested: 950000, monthlyInstallment: 15000, remainingInstallments: 60, requiresSellerApproval: true, listingStatus: "متاح", isPublished: true, isDocumentsVerified: false },
  { title: "وحدة تحت الإنشاء في ديروط", slug: createSlug("transfer-dayrout-01"), description: "اختيار مناسب لمن يفضل السداد على مراحل.", district: "ديروط", address: "منطقة المركز", areaSqm: 110, rooms: 2, bathrooms: 1, floor: 3, status: "تحت الإنشاء", sellerCompanyName: "شركة بداية", originalPrice: 1200000, amountPaid: 300000, estimatedMarketPrice: 1350000, transferAmountRequested: 350000, monthlyInstallment: 8000, remainingInstallments: 72, requiresSellerApproval: true, listingStatus: "متاح", isPublished: true, isDocumentsVerified: true },
  { title: "شقة في أبو تيج بالتقسيط", slug: createSlug("transfer-abu-tig-01"), description: "وحدة بتوزيع عملي للعيلة.", district: "أبو تيج", address: "شارع المحطة", areaSqm: 130, rooms: 3, bathrooms: 2, floor: 1, status: "جاهزة", sellerCompanyName: "شركة بيتنا", originalPrice: 1600000, amountPaid: 550000, estimatedMarketPrice: 1900000, transferAmountRequested: 550000, monthlyInstallment: 10000, remainingInstallments: 55, requiresSellerApproval: true, listingStatus: "متاح", isPublished: true, isDocumentsVerified: false },
  { title: "شقة اقتصادية في منفلوط", slug: createSlug("transfer-manflout-01"), description: "مساحة مناسبة وقسط شهري واضح.", district: "منفلوط", address: "شارع المدارس", areaSqm: 105, rooms: 2, bathrooms: 1, floor: 2, status: "جاهزة", sellerCompanyName: "شركة خطوة", originalPrice: 1050000, amountPaid: 400000, estimatedMarketPrice: 1250000, transferAmountRequested: 430000, monthlyInstallment: 7000, remainingInstallments: 60, requiresSellerApproval: true, listingStatus: "متاح", isPublished: true, isDocumentsVerified: true },
];

async function seedDatabase(): Promise<void> {
  await connectToDatabase();
  await ApartmentModel.deleteMany({});
  await UnionProjectModel.deleteMany({});
  await TransferListingModel.deleteMany({});
  await ApartmentModel.insertMany(sampleApartments);
  await UnionProjectModel.insertMany(sampleUnionProjects);
  await TransferListingModel.insertMany(sampleTransferListings);
  console.log("تم تحميل بيانات تجريبية للعقارات ومشاريع اتحاد الملاك.");
}

seedDatabase()
  .catch((error: unknown) => {
    console.error("فشل تحميل البيانات التجريبية:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    const mongoose = await import("mongoose");
    await mongoose.default.disconnect();
  });
