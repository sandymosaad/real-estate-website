export type AboutTeamMember = {
  id: string;
  imageSrc?: string;
  imageAlt: string;
  title: string;
  description: string;
  memberName?: string;
};

export type AboutMilestone = {
  title: string;
  description: string;
};

export const aboutContent = {
  metadataTitle: "قصتنا",
  metadataDescription: "اتعرف على قصة بيتك أسيوط ورؤيتنا لمساعدة أهل أسيوط في رحلتهم العقارية.",
  ctaContext: "التعرف على بيتك أسيوط",
  title: "إحنا موجودين عشان نخلي قرار العقار أوضح",
  subtitle: "بيتك أسيوط بدأ من احتياج حقيقي: معلومات مفهومة وتواصل أسهل لأهل أسيوط.",
  story: "نعرف إن شراء شقة أو الدخول في مشروع مش قرار بسيط. عشان كده بنجمع الاختيارات ونشرحها بلغة قريبة، ونقول لك إيه اللي نعرفه وإيه اللي لازم تراجعه بنفسك.",
  mission: {
    title: "مهمتنا",
    description: "نساعدك تفهم اختياراتك العقارية في أسيوط وتوصل لقرار مناسب ليك، من غير ضغط أو وعود مبالغ فيها.",
  },
  vision: {
    title: "رؤيتنا",
    description: "نبني تجربة محلية موثوقة تخلي الوصول للمعلومة والتواصل مع أهل الخبرة أسهل.",
  },
  valuesTitle: "قيمنا",
  values: [
    { title: "الوضوح", description: "نشرح التفاصيل ببساطة ومن غير كلام كبير." },
    { title: "الأمانة", description: "نقول اللي نعرفه ونكون صريحين في كل خطوة." },
    { title: "القرب", description: "فاهمين مراكز أسيوط واحتياجات أهلها." },
    { title: "المساندة", description: "نفضل جنبك من أول سؤال لحد ما الصورة توضح." },
  ],
  teamTitle: "فريقنا",
  teamMembers: [
    {
      id: "marketing",
      imageSrc: "/images/team/marktig.jpg",
      imageAlt: "فريق التسويق",
      title: "التسويق",
      description: "بنعرّفك على الوحدات والمشاريع المتاحة بشكل واضح وصادق، وبنوصلك بالعرض اللي يناسبك.",
    },
    {
      id: "customer-service",
      imageSrc: "/images/team/customerserves.jpg",
      imageAlt: "فريق خدمة العملاء",
      title: "خدمة العملاء",
      description: "بنرد على أسئلتك وبنشرحلك كل خطوة ببساطة، من أول مكالمة لحد ما تاخد قرارك.",
    },
    {
      id: "follow-up",
      imageSrc: "/images/team/folluw-up.jpg",
      imageAlt: "فريق المتابعة",
      title: "المتابعة",
      description: "بنفضل معاك بعد الاتفاق: ورق، مواعيد، وأي خطوة محتاجة تتابع لحد الإتمام.",
    },
  ] satisfies AboutTeamMember[],
  milestonesTitle: "محطات في الطريق",
  // EDIT: replace or refine with real milestones when available
  milestones: [
    {
      title: "بدأت الفكرة",
      description: "لاحظنا إن شراء شقة أو أرض في أسيوط بقى صعب على كتير من الشباب والأسر، وإن الناس محتاجة حد يوضّحلها الطريق بصدق.",
    },
    {
      title: "دراسة السوق",
      description: "بدأنا نفهم أسعار المراكز المختلفة وطرق الشراء الممكنة، عشان نعرض خيارات واقعية.",
    },
    {
      title: "تجهيز الخدمات",
      description: "طلّعنا 3 خدمات: شقق للبيع، اتحاد ملاك، وتنازل شقق بالتقسيط، كل واحدة بتحل مشكلة حقيقية.",
    },
    {
      title: "إطلاق الموقع",
      description: "فتحنا الموقع عشان تقدر تتصفح وتتواصل معانا بسهولة من أي مكان في محافظة أسيوط.",
    },
    {
      title: "الخطوة الجاية",
      description: "هنفضل نضيف وحدات ومشاريع جديدة ونقرّب أكتر من كل مراكز المحافظة.",
    },
  ] satisfies AboutMilestone[],
} as const;
