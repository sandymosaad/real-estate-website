"use client";

import { useState } from "react";
import { LEAD_ERROR_MESSAGE, LEAD_SUCCESS_MESSAGE } from "@/lib/constants";
import { leadSchema, type LeadInput } from "@/lib/validation/lead-schema";

type FormStatus = "idle" | "submitting" | "success" | "error";

type UseLeadFormOptions = {
  defaultInterestType: LeadInput["interestType"];
  relatedItemType?: LeadInput["relatedItemType"];
  relatedItemSlug?: string;
};

/** Manages shared lead validation, submission, and feedback states. */
export function useLeadForm(options: UseLeadFormOptions) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function submitLead(input: Omit<LeadInput, "interestType"> & { interestType: LeadInput["interestType"] }) {
    const validationResult = leadSchema.safeParse(input);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, values]) => [key, values?.[0] ?? ""])));
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationResult.data),
      });
      const result = (await response.json()) as { success?: boolean; message?: string; errors?: Record<string, string[]> };
      if (!response.ok) {
        setErrors(Object.fromEntries(Object.entries(result.errors ?? {}).map(([key, values]) => [key, values[0] ?? ""])));
        setMessage(result.message ?? LEAD_ERROR_MESSAGE);
        setStatus("error");
        return;
      }
      setMessage(LEAD_SUCCESS_MESSAGE);
      setStatus("success");
    } catch {
      setMessage(LEAD_ERROR_MESSAGE);
      setStatus("error");
    }
  }

  return { status, errors, message, submitLead, options };
}
