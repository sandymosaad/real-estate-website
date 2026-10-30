import { Bath, BedDouble, Layers3, MapPin, Ruler } from "lucide-react";
import type { Apartment } from "@/models/Apartment";
import { formatArea, formatPrice } from "@/lib/format";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "./WhatsAppButton";
import { ApartmentCard } from "./ApartmentCard";

/** Renders the complete apartment detail content. */
export function ApartmentDetail({ apartment, similarApartments }: { apartment: Apartment; similarApartments: Apartment[] }) {
  const message = `عايز أعرف تفاصيل الشقة: ${apartment.title} - https://assiut-realestate.com/apartments/${apartment.slug}`;
  const specifications = [
    { label: "المساحة", value: formatArea(apartment.areaSqm), icon: Ruler },
    { label: "الغرف", value: `${apartment.rooms}`, icon: BedDouble },
    { label: "الحمامات", value: `${apartment.bathrooms}`, icon: Bath },
    { label: "الدور", value: `${apartment.floor}`, icon: Layers3 },
  ];
  return (
    <>
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex min-h-80 items-center justify-center rounded-xl bg-primary-light text-primary">
            {apartment.images[0] ? <span>صورة الوحدة</span> : <span>صورة الوحدة</span>}
          </div>
          <div>
            <p className="font-semibold text-primary">شقة للبيع</p>
            <h1 className="mt-3 text-3xl font-bold text-ink">
              {apartment.title}
            </h1>
            <p className="mt-3 flex items-center gap-1 text-muted">
              <MapPin size={18} aria-hidden="true" />
              {apartment.district} - {apartment.address}
            </p>
            <p className="mt-6 text-3xl font-bold text-primary">
              {formatPrice(apartment.price)}
            </p>
            <div className="mt-6">
              <WhatsAppButton message={message} label="اسأل عن الشقة على واتساب" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="تفاصيل الشقة">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {specifications
          .map(({ label, value, icon: Icon }) => <div key={label} className="rounded-xl border border-border p-4">
              <Icon className="text-primary" size={22} aria-hidden="true" />
              <p className="mt-3 text-sm text-muted">{label}</p>
              <p className="mt-1 font-bold text-ink">{value}</p>
            </div>
          )}    
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink">الوصف</h2>
            <p className="mt-3 leading-8 text-muted">{apartment.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">المميزات</h2>
            <ul className="mt-3 list-disc space-y-2 pe-5 text-muted">
              {apartment.features.map((feature) => 
                <li key={feature}>{feature}</li>
              )}
            </ul>
          </div>
        </div>
      </Section>

      {similarApartments.length > 0 && <Section title="شقق شبهها">
        <div className="grid gap-5 md:grid-cols-3">
          {similarApartments.map((item) => <ApartmentCard key={item.slug} apartment={item} 
        />)}
        </div>
      </Section>}
    </>
  );
}
