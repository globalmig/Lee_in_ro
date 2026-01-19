import Hero from "@/components/common/Hero";
import Link from "next/link";

type NoticeDetail = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

// 🔹 실제로는 DB / API 연동
async function getNotice(id: string): Promise<NoticeDetail> {
  return {
    id,
    title: "공지사항 제목입니다.",
    createdAt: "2026-01-19",
    content: `
미래신용정보 공지사항 내용입니다.

여러 줄의 텍스트가 들어갈 수 있으며,
줄바꿈과 가독성을 고려해 구성합니다.

항상 최선을 다하는
미래신용정보가 되겠습니다.
    `,
  };
}

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
  const notice = await getNotice(params.id);

  return (
    <div>
      <Hero img={"/hero_bg.png"} title={"공지사항"} />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 py-12">
        {/* 상단 핑크 라인 */}
        <div className="h-[2px] w-full bg-[#C40452]/40 mb-8" />

        {/* 제목 */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#111] text-center">{notice.title}</h1>

        {/* 날짜 */}
        <p className="mt-3 text-sm text-[#666] text-center">{notice.createdAt}</p>

        {/* 구분선 */}
        <div className="mt-8 border-t border-[#BFBFBF]" />

        {/* 본문 */}
        <div className="mt-10 text-sm sm:text-base leading-7 text-[#333] whitespace-pre-line">{notice.content}</div>

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
