import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/leads/route";

describe("lead notification API", () => {
  it("rejects incomplete consultation submissions with actionable errors", async () => {
    const response = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: JSON.stringify({ name: "", company: "映盛测试公司" })
      })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      message: expect.stringContaining("请填写")
    });
  });

  it("accepts a complete consultation submission and returns notification confirmation", async () => {
    const response = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: "张三",
          company: "测试品牌",
          contact: "zhangsan@example.com",
          serviceInterest: "用户运营",
          demand: "希望了解私域用户运营和社群运营服务。"
        })
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      message: "咨询已提交，映盛团队会尽快联系你。",
      recipient: "business@insun.com"
    });
  });
});
