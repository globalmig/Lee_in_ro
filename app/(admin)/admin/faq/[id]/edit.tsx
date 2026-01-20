// app/admin/faq/[id]/edit/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type FaqCategory = "일반" | "서비스" | "결제";

export default function AdminFaqEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState<FaqCategory>("서비스");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    // TODO: Supabase SELECT로 기존 데이터 불러오기
    // 지금은 목업 로딩
    (async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));
      setCategory("서비스");
      setQuestion("상담 신청은 어떻게 하나요?");
      setAnswer("홈페이지의 상담신청 메뉴에서 정보를 입력하면 담당자가 연락드립니다.");
      setIsPublished(true);
      setLoading(false);
    })();
  }, [id]);

  const handleUpdate = async () => {
    // TODO: Supabase UPDATE 붙이기
    console.log({ id, category, question, answer, isPublished });
    alert("수정(목업) 처리");
  };

  const handleDelete = async () => {
    // TODO: Supabase DELETE 붙이기
    const ok = confirm("정말 삭제할까요?");
    if (!ok) return;
    alert("삭제(목업) 처리");
    router.push("/admin/faq");
  };

  return (
    <section>
      <AdminPageHeader
        title="FAQ 수정"
        desc={`ID: ${id}`}
        right={
          <div className="flex items-center gap-2">
            <Link href="/admin/faq" className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
              목록으로
            </Link>
            <button onClick={handleDelete} className="h-10 rounded-xl border border-[#C40452]/40 bg-[#C40452]/10 px-4 text-sm font-extrabold text-[#FF6D9B] hover:bg-[#C40452]/20 transition">
              삭제
            </button>
          </div>
        }
      />

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        {loading ? (
          <div className="py-16 text-center text-white/60">불러오는 중...</div>
        ) : (
          <>
            {/* 카테고리 */}
            <label className="block text-sm font-bold text-white/80">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FaqCategory)}
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm outline-none focus:border-[#C40452]/60"
            >
              <option value="일반">일반</option>
              <option value="서비스">서비스</option>
              <option value="결제">결제</option>
            </select>

            {/* 질문 */}
            <label className="mt-5 block text-sm font-bold text-white/80">질문</label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 outline-none focus:border-[#C40452]/60"
            />

            {/* 답변 */}
            <label className="mt-5 block text-sm font-bold text-white/80">답변</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-2 min-h-[220px] w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-[#C40452]/60"
            />

            {/* 하단 액션 */}
            <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
              <label className="inline-flex items-center gap-2 text-sm text-white/80">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="accent-[#C40452]" />
                공개(게시)
              </label>

              <div className="flex items-center gap-2">
                <button className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 font-bold hover:bg-white/10 transition">임시저장</button>
                <button onClick={handleUpdate} className="h-11 rounded-xl bg-[#C40452] px-5 font-extrabold hover:brightness-110 transition">
                  저장
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
