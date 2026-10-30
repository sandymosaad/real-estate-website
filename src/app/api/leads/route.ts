import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import {
  LEAD_ERROR_MESSAGE,
  LEAD_RATE_LIMIT_MESSAGE,
} from "@/lib/constants";
import { isRateLimited } from "@/lib/rate-limit";
import { leadSchema } from "@/lib/validation/lead-schema";
import { LeadModel } from "@/models/Lead";

function getClientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/** Validates and stores a website lead while keeping internal errors private. */
export async function POST(request: NextRequest): Promise<NextResponse> {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json({ success: false, message: LEAD_RATE_LIMIT_MESSAGE }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "البيانات المرسلة مش مفهومة." }, { status: 400 });
  }

  const validationResult = leadSchema.safeParse(payload);
  if (!validationResult.success) {
    return NextResponse.json(
      { success: false, errors: validationResult.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  if (validationResult.data.website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  try {
    await connectToDatabase();
    await LeadModel.create(validationResult.data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    console.error("تعذر حفظ طلب التواصل:", error);
    return NextResponse.json({ success: false, message: LEAD_ERROR_MESSAGE }, { status: 500 });
  }
}
