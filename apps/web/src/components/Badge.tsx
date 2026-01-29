interface BadgeProps {
  variant: "verified" | "usa";
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const styles = {
    verified: "bg-green-100 text-green-800",
    usa: "bg-blue-100 text-blue-800",
  };

  const icons = {
    verified: "✓",
    usa: "🇺🇸",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}
    >
      <span>{icons[variant]}</span>
      {children}
    </span>
  );
}
