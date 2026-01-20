import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { supabaseServer } from "@/lib/supabase/server";

type Attachment = {
  name: string;
  path: string;
  url: string;
  type: string;
  size: number;
};

function formatKST(iso: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date(iso));
}

export default async function AdminNoticeDetailPage({ params }: { params: { id: string } }) {
  const supabase = supabaseServer();

  // ✅ 관리자 확인 (admin_users RLS 정책 필요)
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return (
      <section>
        <AdminPageHeader
          title="공지 상세"
          desc="로그인이 필요합니다."
          right={
            <Link href="/admin/notices" className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
              목록
            </Link>
          }
        />
      </section>
    );
  }

  const { data: adminRow } = await supabase.from("admin_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();

  if (!adminRow) {
    return (
      <section>
        <AdminPageHeader
          title="공지 상세"
          desc="접근 권한이 없습니다."
          right={
            <Link href="/admin/notices" className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
              목록
            </Link>
          }
        />
      </section>
    );
  }

  const { data, error } = await supabase.from("notices").select("id,title,content,attachments,created_at").eq("id", params.id).single();

  if (error || !data) {
    return (
      <section>
        <AdminPageHeader
          title="공지 상세"
          desc="존재하지 않는 공지입니다."
          right={
            <Link href="/admin/notices" className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
              목록
            </Link>
          }
        />
      </section>
    );
  }

  const attachments: Attachment[] = Array.isArray(data.attachments) ? data.attachments : [];

  return (
    <section>
      <AdminPageHeader
        title="공지 상세"
        desc={`작성일: ${formatKST(data.created_at)}`}
        right={
          <div className="flex items-center gap-2">
            <Link href={`/admin/notices/${data.id}/edit`} className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
              수정
            </Link>
            <Link href="/admin/notices" className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold flex items-center hover:bg-white/10 transition">
              목록
            </Link>
          </div>
        }
      />

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <h2 className="text-xl font-extrabold">{data.title}</h2>
        <div className="mt-4 whitespace-pre-wrap text-white/80 leading-relaxed">{data.content}</div>

        {attachments.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-sm font-bold text-white/80">첨부파일</p>
            <div className="mt-3 space-y-2">
              {attachments.map((a) => (
                <div key={a.path} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-sm text-white/80 truncate">{a.name}</p>
                    <p className="text-xs text-white/50 truncate">{a.url}</p>
                  </div>
                  <a href={a.url} target="_blank" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10 transition">
                    열기
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
