"use client";

import { useEffect, useState } from "react";

const MENU = [
  { id: "company", label: "회사소개" },
  { id: "contact", label: "상담신청" },
  { id: "business", label: "사업영역" },
];

export default function QuickMenu() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    MENU.forEach((menu) => {
      const el = document.getElementById(menu.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul
      className="
        fixed left-3 sm:left-6
        top-1/2 -translate-y-1/2
        z-50 space-y-3 sm:space-y-4
        text-white
      "
    >
      {MENU.map((menu) => {
        const isActive = active === menu.id;

        return (
          <li key={menu.id} onClick={() => handleClick(menu.id)} className="cursor-pointer flex items-center gap-2 sm:gap-3 group select-none">
            {/* 점 */}
            <span
              className={`
                w-2 h-2 rounded-full transition
                ${isActive ? "bg-[#C40452]" : "bg-white/50"}
                group-hover:bg-[#C40452]
              `}
            />

            {/* 라벨: sm 이상은 항상 보임 / 모바일은 active일 때만 보임 */}
            <span
              className={`
                text-xs sm:text-sm transition whitespace-nowrap
                ${isActive ? "font-bold text-[#C40452]" : "text-white/80"}
                group-hover:text-white
                hidden sm:inline
              `}
            >
              {menu.label}
            </span>

            {/* 모바일 전용 라벨(Active만) */}
            <span
              className={`
                sm:hidden
                text-xs transition whitespace-nowrap
                ${isActive ? "font-bold text-[#C40452]" : "hidden"}
              `}
            >
              {menu.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
