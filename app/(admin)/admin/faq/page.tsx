"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import { supabaseBrowser } from "@/lib/supabase/client";

type FaqRow = {
  id: string;
  question: string;
  category: "상담 및 계약" | "신용조사" | "채권추심";
  updated_at: string; // ISO or yyyy-mm-dd
};

export default function AdminFaqPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [data, setData] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"전체" | FaqRow["category"]>("전체");

  // 목록 불러오기
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);

      const { data: rows, error } = await supabase.from("faq").select("id, question, category, updated_at").order("updated_at", { ascending: false });

      console.log("FAQ fetch result:", { rows, error });

      if (error) {
        alert(`불러오기 실패: ${error.message}`);
        console.error(error);
        setData([]);
        setLoading(false);
        return;
      }

      const normalized: FaqRow[] = (rows ?? []).map((r: any) => ({
        id: String(r.id),
        question: r.question ?? "",
        category: r.category,
        updated_at: r.updated_at ? String(r.updated_at).slice(0, 10) : "",
      }));

      setData(normalized);
      setLoading(false);
    };

    fetchFaqs();
  }, [supabase]);

  const rows = useMemo(() => {
    const keyword = q.trim();
    return data.filter((r) => {
      const okCat = cat === "전체" ? true : r.category === cat;
      const okQ = keyword ? r.question.includes(keyword) : true;
      return okCat && okQ;
    });
  }, [data, q, cat]);

  const handleCreate = () => router.push("/admin/faq/new");
  const handleEdit = (id: string) => router.push(`/admin/faq/${id}/edit`);

  const handleDelete = async (id: string) => {
    const ok = confirm("이 FAQ를 삭제할까요?");
    if (!ok) return;

    // 낙관적 업데이트(먼저 UI에서 제거)
    const prev = data;
    setData((cur) => cur.filter((r) => r.id !== id));

    const { error } = await supabase
      .from("faq") // ✅ 여기 원래 faqs였음 → faq로 통일
      .delete()
      .eq("id", id);

    if (error) {
      alert("삭제에 실패했습니다.");
      console.error(error);
      setData(prev); // 롤백
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="FAQ 관리"
        desc="자주 묻는 질문을 카테고리별로 관리합니다."
        right={
          <>
            <select value={cat} onChange={(e) => setCat(e.target.value as any)} className="h-10 rounded-xl border border-white/10 bg-black/30 px-3 text-sm outline-none focus:border-[#C40452]/60">
              <option>전체</option>
              <option>상담 및 계약</option>
              <option>신용조사</option>
              <option>채권추심</option>
            </select>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="질문 검색"
              className="h-10 w-[180px] sm:w-[240px] rounded-xl border border-white/10 bg-black/30 px-3 text-sm outline-none focus:border-[#C40452]/60"
            />

            <button onClick={handleCreate} className="h-10 rounded-xl bg-[#C40452] px-4 text-sm font-extrabold hover:brightness-110 transition">
              + 새 FAQ
            </button>
          </>
        }
      />

      <AdminTable headers={["질문", "카테고리", "수정일", "관리"]}>
        {loading ? (
          <tr>
            <td colSpan={4} className="px-4 py-10 text-center text-white/60">
              불러오는 중...
            </td>
          </tr>
        ) : (
          <>
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-white/5">
                <td className="px-4 py-4 font-semibold">{r.question}</td>
                <td className="px-4 py-4 text-white/70">{r.category}</td>
                <td className="px-4 py-4 text-white/70">{r.updated_at}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(r.id)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10 transition">
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="rounded-lg border border-[#C40452]/40 bg-[#C40452]/10 px-3 py-2 text-xs font-bold text-[#FF6D9B] hover:bg-[#C40452]/20 transition"
                    >
                      삭제
                    </button>
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
          </>
        )}
      </AdminTable>
    </section>
  );
}
