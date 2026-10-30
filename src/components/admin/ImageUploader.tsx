"use client";

import { useState } from "react";
import Image from "next/image";

const maximumImages = 10;
const maximumFileSize = 5 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

type CloudinarySignature = {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
};

type ImageUploaderProps = {
  initialImages?: string[];
  name?: string;
};

/** Uploads, previews, removes, and reorders listing images. */
export function ImageUploader({
  initialImages = [],
  name = "images",
}: ImageUploaderProps) {
  const [images, setImages] = useState(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function uploadImage(file: File, signature: CloudinarySignature) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signature.apiKey);
    formData.append("timestamp", String(signature.timestamp));
    formData.append("signature", signature.signature);
    formData.append("folder", signature.folder);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
      { method: "POST", body: formData },
    );
    if (!response.ok) throw new Error("تعذر رفع الصورة.");
    const result = (await response.json()) as { secure_url: string };
    return result.secure_url;
  }

  async function handleFiles(files: FileList | null): Promise<void> {
    if (!files) return;
    const selectedFiles = Array.from(files);
    if (images.length + selectedFiles.length > maximumImages) {
      setErrorMessage("الحد الأقصى 10 صور.");
      return;
    }
    const invalidFile = selectedFiles.find(
      (file) => !allowedTypes.includes(file.type) || file.size > maximumFileSize,
    );
    if (invalidFile) {
      setErrorMessage("الصور يجب أن تكون JPG أو PNG أو WEBP وبحجم 5 ميجا كحد أقصى.");
      return;
    }
    setErrorMessage("");
    setIsUploading(true);
    try {
      const signatureResponse = await fetch("/api/admin/cloudinary/signature", {
        method: "POST",
      });
      if (!signatureResponse.ok) throw new Error("تعذر تجهيز رفع الصور.");
      const signature = (await signatureResponse.json()) as CloudinarySignature;
      const uploadedImages = await Promise.all(
        selectedFiles.map((file) => uploadImage(file, signature)),
      );
      setImages((currentImages) => [...currentImages, ...uploadedImages]);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "تعذر رفع الصور.");
    } finally {
      setIsUploading(false);
    }
  }

  function moveImage(index: number, direction: -1 | 1): void {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const nextImages = [...images];
    [nextImages[index], nextImages[targetIndex]] = [
      nextImages[targetIndex],
      nextImages[index],
    ];
    setImages(nextImages);
  }

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-ink">
        صور الإعلان
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          disabled={isUploading}
          onChange={(event) => void handleFiles(event.target.files)}
          className="mt-2 block w-full rounded-xl border p-3"
        />
      </label>
      <input type="hidden" name={name} value={JSON.stringify(images)} />
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
      {isUploading && <p className="mt-2 text-sm text-muted">جاري رفع الصور...</p>}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        {images.map((image, index) => (
          <div key={image} className="rounded-xl border p-2">
            <Image
              src={image}
              alt={`صورة ${index + 1}`}
              width={240}
              height={160}
              className="h-24 w-full rounded-lg object-cover"
            />
            <div className="mt-2 flex justify-between gap-1">
              <button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0} className="text-xs">قبل</button>
              <button type="button" onClick={() => moveImage(index, 1)} disabled={index === images.length - 1} className="text-xs">بعد</button>
              <button type="button" onClick={() => setImages(images.filter((_, imageIndex) => imageIndex !== index))} className="text-xs text-red-600">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
