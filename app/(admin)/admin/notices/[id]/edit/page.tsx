"use client";

import React, { useEffect, useState } from "react";
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

export default function AdminNoticeEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setErr(null);
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/notices/${id}`, { cache: "no-store" });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          setErr(json?.message ?? "불러오기 실패");
          return;
        }
        setTitle(json.title ?? "");
        setContent(json.content ?? "");
        setAttachments(Array.isArray(json.attachments) ? json.attachments : []);
      } catch (e: any) {
        setErr(e?.message ?? "네트워크 오류");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  // ✅ 첨부 업로드 (스토리지)
  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setErr(null);
    setUploading(true);

    try {
      const supabase = supabaseBrowser();

      for (const file of Array.from(files)) {
        const safeName = file.name.replace(/[^\w.\-()]/g, "_");
        const path = `${crypto.randomUUID()}/${Date.now()}_${safeName}`;

        const { error: upErr } = await supabase.storage.from("notices").upload(path, file, { contentType: file.type });

        if (upErr) throw upErr;

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
      setErr(e?.message ?? "업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  // ✅ 첨부 제거 (일단 UI에서만 제거, 저장 눌러야 DB 반영)
  const removeAttachment = (path: string) => {
    setAttachments((prev) => prev.filter((a) => a.path !== path));
  };

  // (선택) 스토리지 파일도 즉시 삭제하고 싶으면 사용
  const removeAttachmentAndDeleteFile = async (path: string) => {
    const ok = confirm("첨부파일을 제거할까요? (저장 후 반영됩니다)");
    if (!ok) return;

    removeAttachment(path);

    // 즉시 스토리지에서도 삭제하고 싶으면 아래 주석 해제
    // try {
    //   const supabase = supabaseBrowser();
    //   await supabase.storage.from("notices").remove([path]);
    // } catch {}
  };

  const onSave = async () => {
    setErr(null);
    const t = title.trim();
    const c = content.trim();
    if (!t) return setErr("제목을 입력하세요.");
    if (!c) return setErr("내용을 입력하세요.");

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/notices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: t, content: c, attachments }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(json?.message ?? "저장 실패");
        return;
      }
      router.replace(`/admin/notices/${id}`);
      router.refresh();
    } catch (e: any) {
      setErr(e?.message ?? "네트워크 오류");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("정말 삭제할까요?")) return;

    setErr(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/notices/${id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(json?.message ?? "삭제 실패");
        return;
      }
      router.replace("/admin/notices");
      router.refresh();
    } catch (e: any) {
      setErr(e?.message ?? "네트워크 오류");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="공지 수정"
        desc="제목/내용/첨부파일을 수정할 수 있습니다."
        right={
          <div className="flex items-center gap-2">
            <Link href={`/admin/notices/${id}`} className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
              상세로
            </Link>
            <Link href="/admin/notices" className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
              목록
            </Link>
          </div>
        }
      />

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        {loading ? (
          <p className="text-white/60">불러오는 중...</p>
        ) : (
          <>
            <label className="block text-sm font-bold text-white/80">제목</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 outline-none focus:border-[#C40452]/60"
              placeholder="공지 제목"
            />

            <label className="mt-5 block text-sm font-bold text-white/80">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-2 min-h-[220px] w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-[#C40452]/60"
              placeholder="내용"
            />

            {/* ✅ 첨부 추가 */}
            <div className="mt-5">
              <label className="block text-sm font-bold text-white/80">첨부파일 추가</label>
              <input type="file" multiple onChange={(e) => onUpload(e.target.files)} className="mt-2 block w-full text-sm text-white/70" />
              {uploading && <p className="mt-2 text-sm text-white/60">업로드 중...</p>}
              <p className="mt-2 text-xs text-white/50">업로드 후 “저장”을 눌러야 DB에 반영됩니다.</p>
            </div>

            {/* ✅ 첨부 목록 */}
            {attachments.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-bold text-white/80">첨부파일</p>
                <div className="mt-3 space-y-2">
                  {attachments.map((a) => (
                    <div key={a.path} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                      <div className="min-w-0">
                        <p className="text-sm text-white/80 truncate">{a.name}</p>
                        <p className="text-xs text-white/50 truncate">{a.url}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a href={a.url} target="_blank" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10 transition">
                          열기
                        </a>
                        <button
                          type="button"
                          onClick={() => removeAttachmentAndDeleteFile(a.path)}
                          className="rounded-lg border border-[#C40452]/40 bg-[#C40452]/10 px-3 py-2 text-xs font-bold text-[#FF6D9B] hover:bg-[#C40452]/20 transition"
                        >
                          제거
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {err && <p className="mt-4 text-sm text-red-300">{err}</p>}

            <div className="mt-6 flex items-center justify-between gap-2 flex-wrap">
              <button
                type="button"
                onClick={onDelete}
                disabled={saving}
                className="h-11 rounded-xl border border-[#C40452]/40 bg-[#C40452]/10 px-5 font-extrabold text-[#FF6D9B] hover:bg-[#C40452]/20 transition disabled:opacity-60"
              >
                삭제
              </button>

              <button type="button" onClick={onSave} disabled={saving || uploading} className="h-11 rounded-xl bg-[#C40452] px-6 font-extrabold hover:brightness-110 transition disabled:opacity-60">
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
