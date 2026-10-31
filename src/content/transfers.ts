import { TRANSFER_LEGAL_NOTICE } from "@/lib/constants";

export type TransferPageContent = {
  hero: {
    title: string;
    subtitle: string;
  };
  audiences: {
    seller: { title: string; description: string; button: string };
    buyer: { title: string; description: string; button: string };
  };
  moneyFlow: {
    buyer: string;
    seller: string;
    sellerPayment: string;
    companyPayment: string;
  };
  steps: string[];
  requiredDocuments: string[];
  sections: {
    moneyFlowTitle: string;
    documentsTitle: string;
    listingsTitle: string;
    emptyListings: string;
    legalNotice: string;
    formTitle: string;
    detailFormTitle: string;
    similarTitle: string;
  };
  detailLabels: {
    contractPrice: string;
    amountPaid: string;
    requestedAmount: string;
    monthlyInstallment: string;
    remainingInstallments: string;
    remainingBalance: string;
    premium: string;
    noPremium: string;
    marketEstimate: string;
    sellerCompany: string;
  };
};

/** Provides editable Egyptian Arabic copy for the installment transfer service. */
export const transferPageContent: TransferPageContent = {
  hero: {
    title: "مش قادر تكمّل أقساطك؟ بيع وحدتك بدون أوفر",
    subtitle:
      "اتنازل عن وحدتك لمشتري جديد يكمّل الأقساط، وإحنا معاك خطوة بخطوة لحد الإتمام.",
  },
  audiences: {
    seller: {
      title: "لو مش قادر تكمّل أقساطك",
      description:
        "بدل ما تخاطر بغرامات الإلغاء (ممكن تصل في بعض العقود لنسبة من سعر الوحدة، حسب بنود عقدك)، بيع وحدتك بدون أوفر واسترد اللي دفعته.",
      button: "عايز اتنازل عن وحدتي",
    },
    buyer: {
      title: "لو بتدوّر على وحدة",
      description:
        "اشتري بسعر التعاقد القديم، وغالباً بيكون أقل من سعر السوق الحالي، وكمّل الأقساط.",
      button: "شوف الوحدات المتاحة",
    },
  },
  moneyFlow: {
    buyer: "المشتري الجديد",
    seller: "البائع الأصلي",
    sellerPayment: "يدفع للبائع المبلغ المدفوع سابقاً",
    companyPayment: "يكمّل الأقساط بنفس سعر التعاقد",
  },
  steps: [
    "عرض الوحدة",
    "مراجعة المستندات",
    "موافقة الجهة البائعة",
    "توثيق عقد التنازل",
    "إتمام وتسليم الأقساط",
  ],
  requiredDocuments: [
    "عقد التعاقد الأصلي",
    "إيصالات السداد",
    "جدول الأقساط",
    "صورة بطاقة المتنازل",
    "موافقة الجهة البائعة",
  ],
  sections: {
    moneyFlowTitle: "الفلوس بتمشي إزاي؟",
    documentsTitle: "المستندات المطلوبة",
    listingsTitle: "الشقق المتاحة",
    emptyListings: "مفيش تنازلات مطابقة حاليًا، جرّب تغيّر الفلاتر أو كلمنا.",
    legalNotice: TRANSFER_LEGAL_NOTICE,
    formTitle: "عايز اتنازل عن شقتي",
    detailFormTitle: "عايز أكمل أقساط الشقة دي",
    similarTitle: "تنازلات مشابهة",
  },
  detailLabels: {
    contractPrice: "سعر التعاقد",
    amountPaid: "المدفوع",
    requestedAmount: "المطلوب للتنازل",
    monthlyInstallment: "القسط الشهري",
    remainingInstallments: "الأقساط المتبقية",
    remainingBalance: "الرصيد المتبقي",
    premium: "الفرق (أوفر)",
    noPremium: "بدون أوفر",
    marketEstimate: "تقدير سعر السوق (تقدير وليس تقييماً رسمياً)",
    sellerCompany: "الجهة البائعة",
  },
};
