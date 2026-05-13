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
      className="relative flex h-screen shrink-0 overflow-hidden bg-[#f3f7fb] bg-cover bg-center px-5 py-24 text-white"
      style={{ "--panel-bg": `url(${backgroundImage})`, backgroundImage: "var(--panel-bg)" } as CSSProperties}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/52 via-black/18 to-white/6" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.18)_0,rgba(255,255,255,0.08)_68%)]" />
      <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:4px_4px]" />
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
