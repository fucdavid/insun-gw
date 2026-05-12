export default function ServicesPage() {
  return <RouteSkeleton title="核心业务" description="六大核心业务将从首页摘要延展为完整服务详情。" />;
}

function RouteSkeleton({ title, description }: { title: string; description: string }) {
  return (
    <main className="mx-auto max-w-7xl px-5 py-20">
      <h1 className="text-4xl font-semibold tracking-normal">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6058]">{description}</p>
    </main>
  );
}
