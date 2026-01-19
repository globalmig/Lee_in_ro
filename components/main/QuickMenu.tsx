"use client";

import { useEffect, useState } from "react";

const MENU = [
  { id: "contact", label: "상담신청" },
  { id: "business", label: "사업영역" },
  { id: "company", label: "회사소개" },
];

export default function QuickMenu() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
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
        fixed
        left-6
        top-1/2
        -translate-y-1/2
        z-50
        space-y-4
        text-white
        text-shadow
      "
    >
      {MENU.map((menu) => (
        <li
          key={menu.id}
          onClick={() => handleClick(menu.id)}
          className="
            cursor-pointer
            flex items-center gap-3
            group
          "
        >
          {/* 점 */}
          <span
            className={`
              w-2 h-2 rounded-full transition
              ${active === menu.id ? "bg-[#C40452]" : "bg-white/50"}
              group-hover:bg-[#C40452]
            `}
          />

          {/* 텍스트 */}
          <span
            className={`
              text-sm transition
              ${active === menu.id ? "font-bold text-[#C40452]" : "text-white/80"}
              group-hover:text-white
            `}
          >
            {menu.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
