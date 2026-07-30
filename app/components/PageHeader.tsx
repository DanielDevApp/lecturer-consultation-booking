import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  eyebrowColor?: "primary" | "accent" | "secondary" | "neutral";
  title: string;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
};

const eyebrowColors = {
  primary: "text-primary",
  accent: "text-accent",
  secondary: "text-secondary",
  neutral: "text-base-content/50",
} as const;

export default function PageHeader({
  eyebrow,
  eyebrowColor = "primary",
  title,
  description,
  action,
  children,
}: PageHeaderProps) {
  return (
    <section className="border-b border-base-300/70 bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`eyebrow page-fade ${eyebrowColors[eyebrowColor]}`}>{eyebrow}</p>
            <h1 className="page-fade-delay mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="page-fade-late mt-3 max-w-2xl text-base leading-relaxed text-base-content/70">
                {description}
              </p>
            )}
          </div>
          {action && <div className="page-fade-late shrink-0">{action}</div>}
        </div>
        {children && <div className="page-fade-late">{children}</div>}
      </div>
    </section>
  );
}
