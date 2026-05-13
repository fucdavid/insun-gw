export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <img src="/logo-yingsheng.svg" alt="映盛 logo" className="h-12 w-auto" />
    </div>
  );
}
