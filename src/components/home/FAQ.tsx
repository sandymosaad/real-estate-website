"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { homeContent } from "@/content/home";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return <Section title="أسئلة بتتكرر">
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-xl border border-border">
      {homeContent.faq.map(([question, answer], index) => <div key={question}>
        <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-start font-semibold text-ink">
          <span>{question}</span>
          <ChevronDown 
            size={20} 
            className={`shrink-0 text-primary transition-transform ${open === index ? "rotate-180" : ""}`} aria-hidden="true" 
          />
        </button>

        <div className={`faq-answer ${open === index ? "faq-answer-visible" : ""}`}>
          <div className="faq-answer-content">
            <p className="px-5 pb-5 leading-7 text-muted">{answer}</p>
          </div>
        </div>
      </div>)}
    
    
    </div>
  
  </Section>;
}
