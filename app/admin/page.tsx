import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { supabaseServer } from "@/lib/supabase/server";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 text-3xl font-extrabold">{value}</p>
      <div className="mt-3 h-1 w-10 rounded-full bg-[#C40452]" />
    </div>
  );
}

function formatKST(iso: string | null) {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date(iso));
}

export default async function AdminDashboardPage() {
  const supabase = supabaseServer();

  // count만 빠르게
  const [{ count: noticesCount }, { count: faqCount }] = await Promise.all([
    supabase.from("notices").select("*", { count: "exact", head: true }),
    supabase.from("faq").select("*", { count: "exact", head: true }),
  ]);

  // 최신 1개씩 (updated_at 없으면 created_at으로 바꿔)
  const [{ data: nLatest }, { data: fLatest }] = await Promise.all([
    supabase.from("notices").select("updated_at, created_at").order("updated_at", { ascending: false }).limit(1),
    supabase.from("faq").select("updated_at, created_at").order("updated_at", { ascending: false }).limit(1),
  ]);

  const nDate = nLatest?.[0]?.updated_at ?? nLatest?.[0]?.created_at ?? null;
  const fDate = fLatest?.[0]?.updated_at ?? fLatest?.[0]?.created_at ?? null;
  const latestUpdatedAt = [nDate, fDate].filter(Boolean).sort().at(-1) ?? null;

  return (
    <section>
      <AdminPageHeader title="대시보드" desc="공지사항/FAQ 관리 현황을 확인합니다." />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="공지사항" value={String(noticesCount ?? 0)} />
        <StatCard label="FAQ" value={String(faqCount ?? 0)} />
        <StatCard label="최근 업데이트" value={formatKST(latestUpdatedAt)} />
      </div>
    </section>
  );
}
