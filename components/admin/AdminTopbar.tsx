"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function AdminTopbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-30 h-[64px] border-b border-white/10 bg-[#0B0B0C]/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button className="md:hidden rounded-lg border border-white/10 bg-white/5 p-2" onClick={onOpenSidebar} aria-label="메뉴">
            <Menu className="w-5 h-5" />
          </button>
          <p className="font-bold">
            관리자 <span className="text-[#C40452]">관리</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10 transition">
            사이트 보기
          </Link>
          {/* 나중에 Supabase 로그아웃 버튼 자리 */}
          <button className="rounded-lg border border-[#C40452]/40 bg-[#C40452]/15 px-3 py-2 text-sm font-bold text-[#FF6D9B] hover:bg-[#C40452]/25 transition">로그아웃</button>
        </div>
      </div>
    </header>
  );
}
