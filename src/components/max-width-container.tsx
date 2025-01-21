import { cn } from "@/lib/utils";

export function MaxWidthContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-4 md:max-w-5xl lg:max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
