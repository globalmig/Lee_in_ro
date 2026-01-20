"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import { supabaseBrowser } from "@/lib/supabase/client";

type NoticeRow = {
  id: string;
  title: string;
  created_at: string;
  is_published: boolean;
};

export default function AdminNoticesPage() {
  const router = useRouter();

  const [q, setQ] = useState("");
  const [rows, setRows] = useState<NoticeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchRows = async () => {
    setLoading(true);
    const supabase = supabaseBrowser();

    let query = supabase
      .from("notices")
      .select("id,title,created_at,is_published") // ✅ 필요한 것만
      .order("created_at", { ascending: false });

    const keyword = q.trim();
    if (keyword) query = query.ilike("title", `%${keyword}%`);

    const { data, error } = await query;

    if (!error) setRows((data ?? []) as NoticeRow[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const shown = useMemo(() => rows, [rows]);

  const onDelete = async (id: string) => {
    const ok = confirm("정말 삭제할까요? 삭제하면 복구할 수 없습니다.");
    if (!ok) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/notices/${id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(json?.message ?? "삭제에 실패했습니다.");
        return;
      }

      // ✅ UI에서 즉시 제거
      setRows((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  const goDetail = (id: string) => router.push(`/admin/notices/${id}`);
  const goEdit = (id: string) => router.push(`/admin/notices/${id}/edit`);

  return (
    <section>
      <AdminPageHeader
        title="공지사항 관리"
        desc="공지사항 작성/수정/삭제/게시 상태를 관리합니다."
        right={
          <>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="제목 검색"
              className="h-10 w-[180px] sm:w-[240px] rounded-xl border border-white/10 bg-black/30 px-3 text-sm outline-none focus:border-[#C40452]/60"
            />
            <Link href="/admin/notices/new" className="h-10 rounded-xl bg-[#C40452] px-4 text-sm font-extrabold flex items-center justify-center hover:brightness-110 transition">
              + 새 공지
            </Link>
          </>
        }
      />

      <AdminTable headers={["제목", "작성일", "상태", "관리"]}>
        {loading && (
          <tr>
            <td colSpan={4} className="px-4 py-10 text-center text-white/60">
              불러오는 중...
            </td>
          </tr>
        )}

        {!loading &&
          shown.map((r) => (
            <tr key={r.id} className="hover:bg-white/5">
              {/* ✅ 제목 클릭하면 상세로 */}
              <td className="px-4 py-4 font-semibold">
                <button type="button" onClick={() => goDetail(r.id)} className="text-left hover:underline underline-offset-4" title="상세 보기">
                  {r.title}
                </button>
              </td>

              <td className="px-4 py-4 text-white/70">{r.created_at}</td>

              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border
                    ${r.is_published ? "border-emerald-400/30 text-emerald-200 bg-emerald-400/10" : "border-white/15 text-white/70 bg-white/5"}
                  `}
                >
                  {r.is_published ? "게시중" : "비공개"}
                </span>
              </td>

              {/* ✅ 수정/삭제 동작 */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => goEdit(r.id)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10 transition">
                    수정
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(r.id)}
                    disabled={deletingId === r.id}
                    className="rounded-lg border border-[#C40452]/40 bg-[#C40452]/10 px-3 py-2 text-xs font-bold text-[#FF6D9B] hover:bg-[#C40452]/20 transition disabled:opacity-60"
                  >
                    {deletingId === r.id ? "삭제 중..." : "삭제"}
                  </button>
                </div>
              </td>
            </tr>
          ))}

        {!loading && shown.length === 0 && (
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
