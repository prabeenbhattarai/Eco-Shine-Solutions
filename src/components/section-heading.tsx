import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
  children?: ReactNode;
}) {
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
      {children}
    </Reveal>
  );
}
