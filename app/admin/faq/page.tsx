"use client";

import React, { useMemo, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";

type FaqRow = {
  id: string;
  question: string;
  category: "일반" | "서비스" | "결제";
  updated_at: string;
};

const MOCK: FaqRow[] = [
  { id: "f1", question: "상담 신청은 어떻게 하나요?", category: "서비스", updated_at: "2026-01-19" },
  { id: "f2", question: "문의 답변은 얼마나 걸리나요?", category: "일반", updated_at: "2026-01-15" },
  { id: "f3", question: "결제 영수증 발급이 가능한가요?", category: "결제", updated_at: "2026-01-11" },
];

export default function AdminFaqPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"전체" | FaqRow["category"]>("전체");

  const rows = useMemo(() => {
    return MOCK.filter((r) => {
      const okCat = cat === "전체" ? true : r.category === cat;
      const okQ = q.trim() ? r.question.includes(q.trim()) : true;
      return okCat && okQ;
    });
  }, [q, cat]);

  return (
    <section>
      <AdminPageHeader
        title="FAQ 관리"
        desc="자주 묻는 질문을 카테고리별로 관리합니다."
        right={
          <>
            <select value={cat} onChange={(e) => setCat(e.target.value as any)} className="h-10 rounded-xl border border-white/10 bg-black/30 px-3 text-sm outline-none focus:border-[#C40452]/60">
              <option>전체</option>
              <option>일반</option>
              <option>서비스</option>
              <option>결제</option>
            </select>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="질문 검색"
              className="h-10 w-[180px] sm:w-[240px] rounded-xl border border-white/10 bg-black/30 px-3 text-sm outline-none focus:border-[#C40452]/60"
            />

            <button className="h-10 rounded-xl bg-[#C40452] px-4 text-sm font-extrabold hover:brightness-110 transition">+ 새 FAQ</button>
          </>
        }
      />

      <AdminTable headers={["질문", "카테고리", "수정일", "관리"]}>
        {rows.map((r) => (
          <tr key={r.id} className="hover:bg-white/5">
            <td className="px-4 py-4 font-semibold">{r.question}</td>
            <td className="px-4 py-4 text-white/70">{r.category}</td>
            <td className="px-4 py-4 text-white/70">{r.updated_at}</td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10 transition">수정</button>
                <button className="rounded-lg border border-[#C40452]/40 bg-[#C40452]/10 px-3 py-2 text-xs font-bold text-[#FF6D9B] hover:bg-[#C40452]/20 transition">삭제</button>
              </div>
            </td>
          </tr>
        ))}

        {rows.length === 0 && (
          <tr>
            <td colSpan={4} className="px-4 py-10 text-center text-white/60">
              검색 결과가 없습니다.
            </td>
          </tr>
        )}
      </AdminTable>
    </section>
  );
}
