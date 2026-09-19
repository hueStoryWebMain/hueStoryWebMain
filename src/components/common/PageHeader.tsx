type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
};

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={`mx-auto max-w-4xl px-5 pb-12 pt-28 text-center sm:px-8 lg:px-12 ${className ?? ""}`}
    >
      {eyebrow ? <p className="text-eyebrow mb-4 text-blush">{eyebrow}</p> : null}
      <h1 className="font-heading text-[32px] font-light leading-tight text-cream sm:text-4xl md:text-5xl lg:text-[56px]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl font-body text-[15px] font-light leading-[1.7] text-bare md:text-base">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
