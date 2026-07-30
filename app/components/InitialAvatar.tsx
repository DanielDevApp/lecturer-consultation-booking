type InitialAvatarProps = {
  initials: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "neutral" | "primary";
};

const sizeStyles: Record<NonNullable<InitialAvatarProps["size"]>, string> = {
  sm: "h-11 w-11 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-14 w-14 text-lg",
};

const variantStyles: Record<NonNullable<InitialAvatarProps["variant"]>, string> = {
  neutral: "bg-neutral text-neutral-content",
  primary: "bg-primary text-white",
};

export default function InitialAvatar({
  initials,
  label,
  size = "sm",
  variant = "neutral",
}: InitialAvatarProps) {
  return (
    <div className="avatar placeholder">
      <div className={`flex ${sizeStyles[size]} items-center justify-center rounded-2xl ${variantStyles[variant]}`}>
        <span className="font-semibold uppercase tracking-[0.16em]">{initials}</span>
      </div>
      {label ? <span className="sr-only">{label}</span> : null}
    </div>
  );
}
