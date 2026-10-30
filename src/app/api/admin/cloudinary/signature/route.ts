import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";

const uploadFolder = "assiut-realestate";
const allowedFormats = ["jpg", "jpeg", "png", "webp"];
const maximumFileSize = 5 * 1024 * 1024;

/** Returns a short-lived Cloudinary signature without exposing the API secret. */
export async function POST(): Promise<NextResponse> {
  await requireAdmin();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { success: false, message: "رفع الصور غير متاح حاليًا." },
      { status: 503 },
    );
  }
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  const timestamp = Math.floor(Date.now() / 1000);
  const parameters = {
    folder: uploadFolder,
    timestamp,
    allowed_formats: allowedFormats.join(","),
    max_file_size: maximumFileSize,
  };
  const signature = cloudinary.utils.api_sign_request(parameters, apiSecret);
  return NextResponse.json({
    signature,
    apiKey,
    cloudName,
    ...parameters,
  });
}
