import NoticeTable, { NoticeRow } from "@/components/board/NoticeTable";
import Hero from "@/components/common/Hero";
import { supabaseServer } from "@/lib/supabase/server";

export default async function NoticesPage() {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("notices")
    .select("id, title, posted_at, created_at")
    .eq("is_published", true) // ✅ 게시중인 공지만
    .order("posted_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("notices fetch error:", error.message);
  }

  // NoticeTable이 요구하는 형태로 변환
  const rows: NoticeRow[] = (data ?? []).map((n) => ({
    id: n.id,
    title: n.title,
    createdAt: n.posted_at ?? n.created_at?.slice(0, 10) ?? "",
  }));

  return (
    <div>
      <Hero img={"/hero_bg.png"} title={"공지사항"} />

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 py-10">
        {/* Header */}
        <div className="space-y-2 mb-10">
          <p className="text-[#C40452] font-semibold tracking-tight">Customer Service Leader</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">미래신용정보</h1>
        </div>

        <NoticeTable rows={rows} basePath="/notices" />
      </div>
    </div>
  );
}
