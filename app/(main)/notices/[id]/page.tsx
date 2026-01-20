import Hero from "@/components/common/Hero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

type NoticeDetail = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  posted_at: string | null;
  attachments?: any[];
  image_links?: string[];
};

function formatDate(date?: string | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("notices")
    .select("id,title,content,created_at,posted_at,attachments,image_links")
    .eq("id", params.id)
    .eq("is_published", true) // ✅ 게시중인 공지만
    .single();

  if (error || !data) {
    notFound();
  }

  const notice = data as NoticeDetail;

  return (
    <div>
      <Hero img={"/hero_bg.png"} title={"공지사항"} />

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 py-12">
        {/* 상단 핑크 라인 */}
        <div className="h-[2px] w-full bg-[#C40452]/40 mb-8" />

        {/* 제목 */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#111] text-center">{notice.title}</h1>

        {/* 날짜 (posted_at 우선) */}
        <p className="mt-3 text-sm text-[#666] text-center">{formatDate(notice.posted_at ?? notice.created_at)}</p>

        {/* 구분선 */}
        <div className="mt-8 border-t border-[#BFBFBF]" />

        {/* 본문 */}
        <div className="mt-10 text-sm sm:text-base leading-7 text-[#333] whitespace-pre-line">{notice.content}</div>

        {/* 🔹 이미지 첨부 (있을 경우) */}
        {Array.isArray(notice.image_links) && notice.image_links.length > 0 && (
          <div className="mt-10 space-y-4">
            {notice.image_links.map((url, i) => (
              <img key={i} src={url} alt={`공지 이미지 ${i + 1}`} className="mx-auto max-w-full rounded-lg border" />
            ))}
          </div>
        )}

        {/* 🔹 첨부파일 (이미지 외) */}
        {Array.isArray(notice.attachments) && notice.attachments.length > 0 && (
          <div className="mt-12 border-t border-[#BFBFBF] pt-6">
            <p className="mb-3 font-semibold text-sm text-[#111]">첨부파일</p>
            <ul className="space-y-2">
              {notice.attachments.map((a: any) => (
                <li key={a.path}>
                  <a href={a.url} target="_blank" className="text-sm text-[#C40452] underline hover:opacity-80">
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 하단 구분선 */}
        <div className="mt-12 border-t border-[#BFBFBF]" />

        {/* 목록 버튼 */}
        <div className="mt-10 flex justify-center">
          <Link href="/notices" className="px-12 py-3 border border-[#C40452] text-[#C40452] font-semibold rounded-md hover:bg-[#C40452] hover:text-white transition">
            목록
          </Link>
        </div>
      </div>
    </div>
  );
}
