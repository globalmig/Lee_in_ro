import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = supabaseServer();

    // ✅ 로그인 유저 확인
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ 관리자 확인
    const { data: adminRow, error: adminErr } = await supabase.from("admin_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();

    if (adminErr || !adminRow) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();

    // ✅ 항상 게시로 강제하고 싶으면 true 고정 (프론트값 무시)
    const is_published = true;

    if (!title || !content) {
      return NextResponse.json({ message: "제목/내용은 필수입니다." }, { status: 400 });
    }

    // ✅ 첨부
    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    // ✅ 이미지 링크만 따로 저장 (image_links가 text[] 라고 가정)
    const image_links = attachments
      .filter((a: any) => typeof a?.type === "string" && a.type.startsWith("image/"))
      .map((a: any) => a?.url)
      .filter(Boolean);

    // ✅ posted_at (date)
    const posted_at = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const { data, error } = await supabase
      .from("notices")
      .insert({
        title,
        content,
        is_published,
        posted_at,
        image_links,
        attachments,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}
