import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type Attachment = {
  name: string;
  path: string;
  url: string;
  type: string;
  size: number;
};

async function requireAdmin(supabase: ReturnType<typeof supabaseServer>) {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) {
    return { ok: false as const, status: 401, message: "Unauthorized" };
  }

  const { data: adminRow, error: adminErr } = await supabase.from("admin_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();

  if (adminErr || !adminRow) {
    return { ok: false as const, status: 403, message: "Forbidden" };
  }

  return { ok: true as const, userId: userData.user.id };
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseServer();
  const admin = await requireAdmin(supabase);
  if (!admin.ok) return NextResponse.json({ message: admin.message }, { status: admin.status });

  const { data, error } = await supabase.from("notices").select("id,title,content,attachments,image_links,posted_at,created_at,updated_at,is_published").eq("id", params.id).single();

  if (error) return NextResponse.json({ message: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseServer();
  const admin = await requireAdmin(supabase);
  if (!admin.ok) return NextResponse.json({ message: admin.message }, { status: admin.status });

  const body = await req.json();

  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "").trim();

  // ✅ attachments 검증/기본값
  const attachments: Attachment[] = Array.isArray(body.attachments) ? body.attachments : [];

  if (!title || !content) {
    return NextResponse.json({ message: "제목/내용은 필수입니다." }, { status: 400 });
  }

  // ✅ image_links는 attachments에서 이미지 URL만 추출해서 동기화
  const image_links = attachments
    .filter((a: any) => typeof a?.type === "string" && a.type.startsWith("image/"))
    .map((a: any) => a?.url)
    .filter(Boolean);

  const { data, error } = await supabase
    .from("notices")
    .update({
      title,
      content,
      attachments,
      image_links,
      updated_at: new Date().toISOString(), // (선택) DB trigger가 있으면 이 줄 없어도 됨
    })
    .eq("id", params.id)
    .select("id")
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseServer();
  const admin = await requireAdmin(supabase);
  if (!admin.ok) return NextResponse.json({ message: admin.message }, { status: admin.status });

  const { error } = await supabase.from("notices").delete().eq("id", params.id);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
