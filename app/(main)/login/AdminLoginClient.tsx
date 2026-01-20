// app/admin/login/AdminLoginClient.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function AdminLoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit start", { email, next });

    setErr(null);
    setLoading(true);

    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log("signIn result", { error, session: !!data?.session });

    setLoading(false);
    if (error) return setErr(error.message);

    console.log("router replace ->", next);
    router.refresh();
    router.replace(next);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white/10 border border-white/10 rounded-2xl p-6">
        <h1 className="text-white text-2xl font-bold">관리자 로그인</h1>
        <p className="text-white/60 text-sm mt-2">안녕하세요! 좋은하루 보내세요.</p>

        <div className="mt-6 space-y-3">
          <input
            className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white outline-none"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white outline-none"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {err && <p className="text-red-300 text-sm mt-3">{err}</p>}

        <button disabled={loading} className="mt-6 w-full rounded-lg bg-[#C40452] hover:bg-[#a90346] text-white font-bold py-3 disabled:opacity-60">
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
