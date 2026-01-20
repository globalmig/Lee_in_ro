// app/admin/faq/new/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { supabaseBrowser } from "@/lib/supabase/client";

type FaqCategory = "상담 및 계약" | "신용조사" | "채권추심";

export default function AdminFaqNewPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [category, setCategory] = useState<FaqCategory>("상담 및 계약");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (saving) return;

    const q = question.trim();
    const a = answer.trim();

    if (!q) return alert("질문을 입력하세요.");
    if (!a) return alert("답변을 입력하세요.");

    setSaving(true);

    // ✅ faq 테이블에 INSERT
    const { error } = await supabase.from("faq").insert([
      {
        category,
        question: q,
        answer: a,
        // 컬럼이 존재할 때만 넣으세요. (없으면 지워도 됨)
        is_published: isPublished,
      },
    ]);

    setSaving(false);

    if (error) {
      console.error(error);
      alert(`등록 실패: ${error.message}`);
      return;
    }

    alert("등록되었습니다.");
    router.push("/admin/faq");
    router.refresh();
  };

  return (
    <section>
      <AdminPageHeader
        title="FAQ 등록"
        desc="자주 묻는 질문을 새로 등록합니다."
        right={
          <Link href="/admin/faq" className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
            목록으로
          </Link>
        }
      />

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        {/* 카테고리 */}
        <label className="block text-sm font-bold text-white/80">카테고리</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as FaqCategory)}
          className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm outline-none focus:border-[#C40452]/60"
        >
          <option value="상담 및 계약">상담 및 계약</option>
          <option value="신용조사">신용조사</option>
          <option value="채권추심">채권추심</option>
        </select>

        {/* 질문 */}
        <label className="mt-5 block text-sm font-bold text-white/80">질문</label>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 outline-none focus:border-[#C40452]/60"
          placeholder="예) 상담 신청은 어떻게 하나요?"
        />

        {/* 답변 */}
        <label className="mt-5 block text-sm font-bold text-white/80">답변</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-2 min-h-[220px] w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-[#C40452]/60"
          placeholder="답변 내용을 입력하세요."
        />

        {/* 하단 액션 */}
        <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="h-11 rounded-xl bg-[#C40452] px-5 font-extrabold hover:brightness-110 transition disabled:opacity-60 disabled:hover:brightness-100"
            >
              {saving ? "등록 중..." : "등록"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
