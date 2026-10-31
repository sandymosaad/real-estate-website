import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonProps = (
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
) & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
};

const variants = {
  primary: "bg-primary text-on-primary hover:bg-dark",
  outline: "border border-primary text-primary hover:bg-light",
  ghost: "text-ink hover:bg-light",
};

const sizes = { sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3" };

export function Button({ className = "", variant = "primary", size = "md", href, ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-xl font-semibold transition-[color,background-color,border-color,transform] duration-200 ease-site active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${variants[variant]} ${sizes[size]} ${className}`.trim();
  if (href) return <a className={classes} href={href} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
