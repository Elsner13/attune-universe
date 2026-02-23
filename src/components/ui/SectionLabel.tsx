interface SectionLabelProps {
  text: string;
}

export function SectionLabel({ text }: SectionLabelProps) {
  return (
    <p className="mb-5 font-body text-[11px] uppercase tracking-[3px] text-accent">
      {text}
    </p>
  );
}
