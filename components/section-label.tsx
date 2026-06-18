export default function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-[0.9375rem] font-mono uppercase tracking-[0.375em] opacity-50 ${className}`}
    >
      {`// ${children}`}
    </div>
  );
}
