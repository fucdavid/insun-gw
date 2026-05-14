import { ConsultationForm } from "@/components/consultation-form";

export default function ContactPage() {
  return (
    <main className="bg-[#f6f9fc] px-5 pb-20 pt-28 text-[#172033]">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="mb-4 text-sm font-semibold text-[#1267e8]">CONTACT INSUN</p>
          <h1 className="text-5xl font-semibold tracking-normal md:text-6xl">咨询合作</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#46566f]">
            如果你希望了解用户运营、口碑营销、社会化媒体营销、直播/短视频营销、互动公关或数字渠道建设，可以通过表单或直接联系方式与映盛沟通。
          </p>
          <div className="mt-8 grid gap-4">
            <div className="border border-[#dce6f2] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#1267e8]">业务邮箱</p>
              <p className="mt-2 text-base text-[#172033]">business@insun.com</p>
            </div>
            <div className="border border-[#dce6f2] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#1267e8]">沟通内容</p>
              <p className="mt-2 text-base leading-7 text-[#5a6880]">品牌阶段、目标人群、服务兴趣、项目周期和当前增长问题。</p>
            </div>
          </div>
        </div>

        <ConsultationForm />
      </section>
    </main>
  );
}
