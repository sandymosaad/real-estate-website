import { loadEnvConfig } from "@next/env";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { connectToDatabase } from "../src/lib/db";
import { ADMIN_PASSWORD_COST_FACTOR } from "../src/lib/constants";
import { AdminModel } from "../src/models/Admin";

loadEnvConfig(process.cwd());

const minimumPasswordLength = 12;

async function readValue(
  readline: ReturnType<typeof createInterface>,
  argument: string | undefined,
  prompt: string,
): Promise<string> {
  return argument ?? (await readline.question(prompt));
}

async function createAdmin(): Promise<void> {
  const readline = createInterface({ input, output });
  try {
    const email = (await readValue(readline, process.argv[2], "البريد الإلكتروني: "))
      .trim()
      .toLowerCase();
    const password = await readValue(readline, process.argv[3], "كلمة المرور: ");
    const fullName = await readValue(readline, process.argv[4], "الاسم الكامل: ");
    if (password.length < minimumPasswordLength) {
      throw new Error(`كلمة المرور يجب ألا تقل عن ${minimumPasswordLength} حرفًا.`);
    }
    await connectToDatabase();
    const passwordHash = await bcrypt.hash(password, ADMIN_PASSWORD_COST_FACTOR);
    await AdminModel.create({ email, passwordHash, fullName: fullName.trim() });
    console.log("تم إنشاء حساب الإدارة بنجاح.");
  } finally {
    readline.close();
    const mongoose = await import("mongoose");
    await mongoose.default.disconnect();
  }
}

createAdmin().catch((error: unknown) => {
  console.error("فشل إنشاء حساب الإدارة:", error instanceof Error ? error.message : "خطأ غير معروف.");
  process.exitCode = 1;
});
