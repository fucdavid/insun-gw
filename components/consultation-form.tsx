"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type SubmissionState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

export function ConsultationForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ status: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmissionState({ status: "submitting", message: "正在提交咨询信息..." });

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        setSubmissionState({ status: "error", message: result.message ?? "提交失败，请稍后重试或直接发送邮件。" });
        return;
      }

      setSubmissionState({ status: "success", message: result.message ?? "咨询已提交，映盛团队会尽快联系你。" });
      form.reset();
    } catch {
      setSubmissionState({ status: "error", message: "提交失败，请稍后重试或直接发送邮件。" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[#dce6f2] bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[#172033]">
          姓名
          <input required name="name" className="min-h-12 border border-[#dce6f2] px-4 text-base" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#172033]">
          公司
          <input required name="company" className="min-h-12 border border-[#dce6f2] px-4 text-base" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#172033]">
          联系方式
          <input required name="contact" className="min-h-12 border border-[#dce6f2] px-4 text-base" placeholder="手机 / 邮箱 / 微信" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#172033]">
          感兴趣的服务
          <select name="serviceInterest" className="min-h-12 border border-[#dce6f2] px-4 text-base">
            <option>用户运营</option>
            <option>口碑营销</option>
            <option>社会化媒体营销</option>
            <option>直播/短视频营销</option>
            <option>互动公关</option>
            <option>数字渠道建设</option>
            <option>不确定，需要咨询</option>
          </select>
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-medium text-[#172033]">
        需求描述
        <textarea required name="demand" rows={6} className="border border-[#dce6f2] px-4 py-3 text-base" />
      </label>
      <p className="mt-5 text-sm leading-6 text-[#5a6880]">
        提交即表示你了解我们会按
        <Link href="/privacy" className="font-semibold text-[#1267e8]">
          隐私政策
        </Link>
        处理咨询信息。
      </p>
      {submissionState.message ? (
        <p
          role="status"
          className={submissionState.status === "error" ? "mt-4 text-sm font-medium text-[#b42318]" : "mt-4 text-sm font-medium text-[#0f5b4f]"}
        >
          {submissionState.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submissionState.status === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[#1267e8] px-6 text-base font-medium text-white disabled:cursor-not-allowed disabled:bg-[#8cb7f4]"
      >
        {submissionState.status === "submitting" ? "提交中..." : "提交咨询"}
      </button>
    </form>
  );
}
