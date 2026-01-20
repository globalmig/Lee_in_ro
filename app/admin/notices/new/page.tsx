"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { supabaseBrowser } from "@/lib/supabase/client";

type Attachment = {
  name: string;
  path: string;
  url: string;
  type: string;
  size: number;
};

export default function AdminNoticeNewPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onUpload = async (files: FileList | null) => {
    if (!files) return;
    setUploading(true);
    setErr(null);

    try {
      const supabase = supabaseBrowser();

      for (const file of Array.from(files)) {
        const safeName = file.name.replace(/[^\w.\-()]/g, "_");
        const path = `${crypto.randomUUID()}/${Date.now()}_${safeName}`;

        const { error } = await supabase.storage.from("notices").upload(path, file, { contentType: file.type });

        if (error) throw error;

        const { data } = supabase.storage.from("notices").getPublicUrl(path);

        setAttachments((prev) => [
          ...prev,
          {
            name: file.name,
            path,
            url: data.publicUrl,
            type: file.type,
            size: file.size,
          },
        ]);
      }
    } catch (e: any) {
      setErr(e?.message ?? "파일 업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  const onCreate = async () => {
    setErr(null);

    const t = title.trim();
    const c = content.trim();
    if (!t) return setErr("제목을 입력하세요.");
    if (!c) return setErr("내용을 입력하세요.");

    setLoading(true);
    try {
      const res = await fetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: t,
          content: c,
          is_published: true, // ✅ 항상 게시
          attachments,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(json?.message ?? "등록에 실패했습니다.");
        return;
      }

      router.replace("/admin/notices");
      router.refresh();
    } catch (e: any) {
      setErr(e?.message ?? "네트워크 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="공지사항 작성"
        desc="공지사항을 작성하면 즉시 게시됩니다."
        right={
          <Link href="/admin/notices" className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
            목록으로
          </Link>
        }
      />

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <label className="block text-sm font-bold text-white/80">제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 outline-none focus:border-[#C40452]/60"
          placeholder="공지 제목을 입력하세요"
        />

        <label className="mt-5 block text-sm font-bold text-white/80">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 min-h-[220px] w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-[#C40452]/60"
          placeholder="내용을 입력하세요"
        />

        {/* 첨부파일 */}
        <div className="mt-5">
          <label className="block text-sm font-bold text-white/80">이미지 / 첨부파일</label>
          <input type="file" multiple onChange={(e) => onUpload(e.target.files)} className="mt-2 block w-full text-sm text-white/70" />
          {uploading && <p className="mt-2 text-sm text-white/60">업로드 중...</p>}
        </div>

        {err && <p className="mt-4 text-sm text-red-300">{err}</p>}

        <div className="mt-6 flex justify-end">
          <button type="button" disabled={loading} onClick={onCreate} className="h-11 rounded-xl bg-[#C40452] px-6 font-extrabold hover:brightness-110 transition disabled:opacity-60">
            {loading ? "등록 중..." : "등록"}
          </button>
        </div>
      </div>
    </section>
  );
}
