import { loadEnvConfig } from "@next/env";
import { connectToDatabase } from "../src/lib/db";
import { ApartmentModel } from "../src/models/Apartment";
import { UnionProjectModel } from "../src/models/UnionProject";

loadEnvConfig(process.cwd());

// MOCK - replace with DB later
const sampleApartments = [
  { title: "شقة واسعة في شارع الجمهورية", slug: "شقة-شارع-الجمهورية", description: "شقة عائلية في موقع حيوي وقريبة من الخدمات.", price: 1850000, district: "أسيوط", address: "شارع الجمهورية", areaSqm: 145, rooms: 3, bathrooms: 2, floor: 4, finishing: "تشطيب كامل", status: "جاهزة", features: ["قريبة من الخدمات", "عدادات مستقلة"] },
  { title: "شقة هادئة في أسيوط الجديدة", slug: "شقة-أسيوط-الجديدة", description: "مساحة عملية مناسبة لعيلة صغيرة.", price: 1420000, district: "أسيوط الجديدة", address: "الحي الأول", areaSqm: 125, rooms: 3, bathrooms: 2, floor: 2, finishing: "نص تشطيب", status: "جاهزة", features: ["تهوية جيدة", "واجهة مميزة"] },
  { title: "شقة جاهزة للسكن في ديروط", slug: "شقة-ديروط", description: "اختيار مناسب للسكن في منطقة هادئة.", price: 980000, district: "ديروط", address: "شارع المركز", areaSqm: 110, rooms: 2, bathrooms: 1, floor: 3, finishing: "تشطيب كامل", status: "جاهزة", features: ["قريبة من المواصلات"] },
  { title: "شقة عائلية في القوصية", slug: "شقة-القوصية", description: "شقة بمساحة كبيرة وتوزيع عملي.", price: 1250000, district: "القوصية", address: "منطقة السوق", areaSqm: 135, rooms: 3, bathrooms: 2, floor: 1, finishing: "نص تشطيب", status: "تحت الإنشاء", features: ["مساحة واسعة"] },
  { title: "شقة على المفتاح في منفلوط", slug: "شقة-منفلوط", description: "وحدة جاهزة بتشطيب مريح للسكن.", price: 1120000, district: "منفلوط", address: "شارع المدارس", areaSqm: 120, rooms: 3, bathrooms: 1, floor: 2, finishing: "تشطيب كامل", status: "جاهزة", features: ["جاهزة للسكن"] },
  { title: "شقة جديدة في أبنوب", slug: "شقة-أبنوب", description: "وحدة عملية في موقع قريب من الخدمات.", price: 870000, district: "أبنوب", address: "المنطقة الجديدة", areaSqm: 100, rooms: 2, bathrooms: 1, floor: 3, finishing: "على الطوب", status: "تحت الإنشاء", features: ["سعر مناسب"] },
  { title: "شقة عائلية في أبو تيج", slug: "شقة-أبو-تيج", description: "شقة مريحة بمساحة مناسبة للعائلات.", price: 1320000, district: "أبو تيج", address: "شارع المحطة", areaSqm: 130, rooms: 3, bathrooms: 2, floor: 4, finishing: "تشطيب كامل", status: "جاهزة", features: ["موقع مميز"] },
  { title: "شقة في ساحل سليم", slug: "شقة-ساحل-سليم", description: "اختيار هادئ بمساحة عملية.", price: 760000, district: "ساحل سليم", address: "وسط البلد", areaSqm: 95, rooms: 2, bathrooms: 1, floor: 1, finishing: "نص تشطيب", status: "جاهزة", features: ["إضاءة طبيعية"] },
];

// MOCK - replace with DB later
const sampleUnionProjects = [
  { title: "مشروع بيت العيلة", slug: "مشروع-بيت-العيلة", description: "مشاركة في تملك وبناء مشروع سكني بتفاصيل واضحة.", district: "أسيوط", landPrice: 2000000, totalProjectCost: 10000000, totalSeats: 10, reservedSeats: 6, landAreaSqm: 600, stage: "تجميع شركاء" },
  { title: "اتحاد ملاك النخيل", slug: "اتحاد-ملاك-النخيل", description: "مشروع عائلي في موقع هادئ مع متابعة للمراحل.", district: "أسيوط الجديدة", landPrice: 2400000, totalProjectCost: 12000000, totalSeats: 12, reservedSeats: 8, landAreaSqm: 720, stage: "شراء الأرض" },
  { title: "مشروع دارنا", slug: "مشروع-دارنا", description: "اختيار مناسب للشركاء الراغبين في بناء مشروع منظم.", district: "ديروط", landPrice: 1300000, totalProjectCost: 6400000, totalSeats: 8, reservedSeats: 4, landAreaSqm: 480, stage: "تحت البناء" },
  { title: "مشروع العيلة في أبو تيج", slug: "مشروع-العيلة-أبو-تيج", description: "مشاركة واضحة في مشروع سكني تحت الإنشاء.", district: "أبو تيج", landPrice: 1800000, totalProjectCost: 9000000, totalSeats: 10, reservedSeats: 7, landAreaSqm: 550, stage: "تجميع شركاء" },
];

async function seedDatabase(): Promise<void> {
  await connectToDatabase();
  await ApartmentModel.deleteMany({});
  await UnionProjectModel.deleteMany({});
  await ApartmentModel.insertMany(sampleApartments);
  await UnionProjectModel.insertMany(sampleUnionProjects);
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
