import type { CSSProperties, ReactNode } from "react";

type HomepagePanelProps = {
  id: string;
  label: string;
  backgroundImage: string;
  children: ReactNode;
  align?: "center" | "left";
};

export function HomepagePanel({ id, label, backgroundImage, children, align = "center" }: HomepagePanelProps) {
  return (
    <section
      id={id}
      aria-label={label}
      data-panel={id}
      className="relative flex min-h-screen snap-start overflow-hidden bg-[#101214] bg-cover bg-center px-5 py-24 text-white"
      style={{ "--panel-bg": `url(${backgroundImage})`, backgroundImage: "var(--panel-bg)" } as CSSProperties}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(0,0,0,0.45)_72%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,rgba(255,255,255,0.42)_1px,transparent_1px)] [background-size:4px_4px]" />
      <div
        className={
          align === "left"
            ? "relative z-10 mx-auto flex w-full max-w-7xl items-center"
            : "relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center text-center"
        }
      >
        {children}
      </div>
    </section>
  );
}
