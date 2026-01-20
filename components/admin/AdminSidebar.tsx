"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { X } from "lucide-react";

const NAV = [
  { label: "대시보드", href: "/admin" },
  { label: "공지사항 관리", href: "/admin/notices" },
  { label: "FAQ 관리", href: "/admin/faq" },
];

export default function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-dvh w-[260px] bg-[#0F0F12] border-r border-white/10
      transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} md:block`}
    >
      <div className="flex items-center justify-between px-5 h-[64px] border-b border-white/10">
        <div className="font-extrabold tracking-tight">
          ADMIN <span className="text-[#C40452]">센터</span>
        </div>
        <button className="md:hidden" onClick={onClose} aria-label="닫기">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded-xl px-4 py-3 font-semibold transition
                    ${active ? "bg-white/10 border border-white/10" : "hover:bg-white/5"}
                  `}
                >
                  <span className={`${active ? "text-white" : "text-white/80"}`}>{item.label}</span>
                  {active && <span className="ml-2 text-[#C40452]">•</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-white/60">포인트 컬러</p>
          <p className="mt-1 font-bold text-[#C40452]">#C40452</p>
          <p className="mt-2 text-xs text-white/60">디자인 톤: 다크 + 포인트 버튼/라인</p>
        </div>
      </nav>
    </aside>
  );
}
