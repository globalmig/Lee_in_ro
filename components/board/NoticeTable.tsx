import Link from "next/link";

export type NoticeRow = {
  id: number;
  title: string;
  no: number;
  createdAt: string; // "2026-01-19" 같은 문자열
};

type Props = {
  rows: NoticeRow[];
  basePath?: string; // 상세 페이지 경로 prefix (default: "/notices")
};

export default function NoticeTable({ rows, basePath = "/notices" }: Props) {
  return (
    <div className="w-full">
      {/* 상단 핑크 라인 */}
      <div className="h-[2px] w-full bg-[#C40452]/40" />

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-[#BFBFBF]">
              <th className="py-5 text-center text-sm font-semibold text-[#111] w-[140px]">번호</th>
              <th className="py-5 text-center text-sm font-semibold text-[#111]">제목</th>
              <th className="py-5 text-center text-sm font-semibold text-[#111] w-[180px]">등록일</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[#BFBFBF] hover:bg-black/[0.02] transition">
                <td className="py-6 text-center text-sm text-[#111]">{row.no}</td>

                {/* 제목은 링크 + 가운데 정렬 */}
                <td className="py-6 text-center text-sm text-[#111]">
                  <Link href={`${basePath}/${row.id}`} className="inline-block max-w-[92%] truncate hover:underline">
                    {row.title}
                  </Link>
                </td>

                <td className="py-6 text-center text-sm text-[#111]">{row.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
