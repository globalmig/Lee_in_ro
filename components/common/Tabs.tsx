"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "채권관리", href: "/company/business/debt" },
  { label: "CRM 서비스", href: "/company/business/crm" },
  { label: "신용조사", href: "/company/business/credit" },
];

export default function Tabs() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="w-full mb-20">
      <div className="mx-auto w-full max-w-[980px] px-5 sm:px-8">
        <div className="rounded-xl bg-[#F5F3F4] p-2">
          <ul className="grid grid-cols-3">
            {TABS.map((tab) => {
              const active = isActive(tab.href);

              return (
                <li key={tab.href} className="relative">
                  <Link
                    href={tab.href}
                    className={`
                      relative flex h-12 items-center justify-center rounded-lg
                      text-sm sm:text-base font-semibold transition
                      ${active ? "text-[#C40452]" : "text-[#111]/60 hover:text-[#111]/80"}
                    `}
                  >
                    {tab.label}

                    {/* underline */}
                    <span
                      className={`
                        absolute left-0 right-0 -bottom-2 mx-auto h-[2px] w-[78%]
                        transition
                        ${active ? "bg-[#C40452]" : "bg-transparent"}
                      `}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
