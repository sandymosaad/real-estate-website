const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201000000000";

export function FloatingWhatsApp() {
  return <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" aria-label="تواصل معانا على واتساب" className="fixed bottom-5 start-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition-transform hover:scale-105"><span aria-hidden="true">⌕</span></a>;
}
