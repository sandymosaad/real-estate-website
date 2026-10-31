import Image from "next/image";
import { UsersRound } from "lucide-react";
import type { AboutTeamMember } from "@/content/about";

/** Displays one customer-facing team role with a reserved image area. */
export function TeamCard({ member }: { member: AboutTeamMember }) {
  return (
    <article className="card-hover flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="card-image relative aspect-[4/3] overflow-hidden bg-primary-light">
        {member.imageSrc ? (
          <Image
            src={member.imageSrc}
            alt={member.imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, 33vw"
            className="object-cover dark:brightness-90"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-primary" aria-label={member.imageAlt}>
            <UsersRound size={40} aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {member.memberName && <p className="text-sm text-muted">{member.memberName}</p>}
        <h3 className="mt-1 text-xl font-bold text-ink">{member.title}</h3>
        <p className="mt-3 leading-7 text-muted">{member.description}</p>
      </div>
    </article>
  );
}
