import { NextResponse } from "next/server";
import crypto from "crypto";

const SOLAPI_BASE = "https://api.solapi.com/messages/v4/send";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ message: "필수값 누락" }, { status: 400 });
    }

    /* 🔐 Solapi 인증 헤더 생성 */
    const apiKey = process.env.SOLAPI_API_KEY!;
    const apiSecret = process.env.SOLAPI_API_SECRET!;
    const date = new Date().toISOString();
    const salt = crypto.randomUUID();

    const signature = crypto
      .createHmac("sha256", apiSecret)
      .update(date + salt)
      .digest("hex");

    const authHeader = `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;

    /* 📩 문자 내용 */
    const text = `
[홈페이지 문의]
이름: ${name}
전화번호: ${phone}

문의내용:
${message}
    `.trim();

    /* 📤 Solapi 요청 */
    const res = await fetch(SOLAPI_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        message: {
          to: process.env.SOLAPI_ADMIN_PHONE,
          from: process.env.SOLAPI_SENDER,
          text,
        },
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: "문자 발송 실패", detail: result }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}
