import NoticeTable, { NoticeRow } from "@/components/board/NoticeTable";
import Hero from "@/components/common/Hero";


const rows: NoticeRow[] = Array.from({ length: 10 }).map((_, i) => ({
  id: 31 - i,
  title: "제목",
  createdAt: "등록일",
}));

export default function NoticesPage() {
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
