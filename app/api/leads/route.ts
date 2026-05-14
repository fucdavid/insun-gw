import { NextResponse } from "next/server";

const REQUIRED_FIELDS = ["name", "company", "contact", "demand"] as const;
const LEAD_NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL ?? "business@insun.com";

type LeadPayload = {
  name?: unknown;
  company?: unknown;
  contact?: unknown;
  serviceInterest?: unknown;
  demand?: unknown;
};

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "请提交有效的咨询信息。" }, { status: 400 });
  }

  const missingFields = REQUIRED_FIELDS.filter((field) => !isFilled(payload[field]));

  if (missingFields.length > 0) {
    return NextResponse.json({ ok: false, message: "请填写姓名、公司、联系方式和需求描述。" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "咨询已提交，映盛团队会尽快联系你。",
    recipient: LEAD_NOTIFICATION_EMAIL
  });
}

function isFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}
