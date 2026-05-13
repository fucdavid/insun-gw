import Link from "next/link";
import { getHomepageServices } from "@/lib/content";

export default function ServicesPage() {
  const services = getHomepageServices();

  return (
    <main className="mx-auto max-w-7xl px-5 py-20">
      <h1 className="text-4xl font-semibold tracking-normal">核心业务</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6058]">
        六大核心业务将从首页摘要延展为完整服务详情。
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="block border-t border-black/15 pt-6 text-2xl font-semibold text-[#1c1c1a] transition hover:text-[#0f5b4f]"
          >
            {service.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
