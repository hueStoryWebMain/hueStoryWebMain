import Image from "next/image";
import Link from "next/link";
import { LOGOS, ROUTES, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoVariant = keyof typeof LOGOS;

type LogoProps = {
  variant?: LogoVariant;
  /** Force the mark to render as pure white (CSS mask) */
  white?: boolean;
  className?: string;
  /** Pixel height of the mark */
  size?: number;
  priority?: boolean;
  href?: string | null;
};

export default function Logo({
  variant = "alt",
  white = false,
  className,
  size = 72,
  priority = false,
  href = ROUTES.HOME,
}: LogoProps) {
  const src =
    variant === "whiteName"
      ? LOGOS.whiteName
      : white
        ? LOGOS.altWhite
        : LOGOS[variant];

  const mark = (
    <Image
      src={src}
      alt={SITE_NAME}
      width={size * 3}
      height={size}
      priority={priority}
      className={cn(
        "h-auto w-auto object-contain",
        white &&
          variant !== "whiteName" &&
          "brightness-110 contrast-125 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]",
        className
      )}
      style={{ height: size, width: "auto" }}
    />
  );

  if (href === null) return mark;

  return (
    <Link
      href={href}
      aria-label={`${SITE_NAME} home`}
      className="inline-flex shrink-0 items-center"
    >
      {mark}
    </Link>
  );
}
