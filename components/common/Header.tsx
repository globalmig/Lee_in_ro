"use client";
import React, { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa6";
import { MdEmail, MdClose } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

type MenuItem = { name: string; href: string };
type MenuGroup = { name: string; items: MenuItem[] };

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<"company" | "support" | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenGroup(null);
  };

  const topItems: MenuItem[] = [
    { name: "홈", href: "/" },
    // { name: "사업영역", href: "/company/business/debt" }, // 원하면 회사 그룹으로 이동 가능
  ];

  const companyGroup = {
    name: "회사",
    items: [
      { name: "회사소개", href: "/company/introduce" },
      { name: "회사연혁", href: "/company/history" },
      { name: "사업영역", href: "/company/business/debt" },
    ],
  };

  const businessGroup = {
    name: "사업영역",
    items: [
      { name: "채권관리", href: "/company/business/debt" },
      { name: "CRM 서비스", href: "/company/business/crm" },
      { name: "신용조사", href: "/company/business/credit" },
    ],
  };

  const supportGroup: MenuGroup = {
    name: "고객지원",
    items: [
      { name: "공지사항", href: "/notices" },
      { name: "자주 묻는 질문", href: "/faq" },
      { name: "문의하기", href: "/contact" },
    ],
  };

  const toggleGroup = (key: "company" | "support") => {
    setOpenGroup((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <header className="relative z-50">
        {/* 햄버거 */}
        <button onClick={() => setIsMenuOpen(true)} className="absolute left-4 top-5 md:left-10 md:top-10 z-50 text-white hover:text-gray-200 transition-colors" aria-label="메뉴 열기">
          <RiMenu3Fill className="w-7 h-7 md:w-8 md:h-8" />
        </button>

        {/* 로고 */}
        <div className="absolute left-16 top-6 md:left-24 md:top-8">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={240} height={100} className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] h-auto" />
          </Link>
        </div>

        {/* 고객지원 정보 */}
        <div className="absolute text-white right-4 top-4 md:right-10 md:top-5 text-right">
          <p className="font-semibold text-xs sm:text-sm md:text-base">T. 02-3451-9734</p>
          <div className="flex items-start gap-2 my-2 justify-end">
            <FaPrint className="text-sm md:text-base" />
            <p className="text-xs md:text-sm font-light">02-415-3559</p>
          </div>
          <div className="flex items-start gap-2 my-2 justify-end">
            <MdEmail className="text-sm md:text-base" />
            <p className="text-xs md:text-sm font-light">232237@mirae22.co.kr</p>
          </div>
        </div>
      </header>

      {/* 풀스크린 메뉴 */}
      <div className={`fixed inset-0 bg-black/95 z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* 닫기 */}
        <button onClick={closeMenu} className="absolute right-6 top-6 md:right-10 md:top-10 text-white hover:text-gray-300 transition-colors" aria-label="메뉴 닫기">
          <MdClose className="w-8 h-8 md:w-10 md:h-10" />
        </button>

        {/* 메뉴 컨텐츠 */}
        <nav className="flex items-start justify-center h-full px-6 pt-20 pb-52 overflow-y-auto overscroll-contain">
          <div className="w-full max-w-[560px]">
            {/* 상단 단일 메뉴 */}
            <ul className="flex flex-col gap-4">
              {topItems.map((item, idx) => (
                <li key={item.name} className="text-center">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block text-white font-bold text-2xl sm:text-3xl md:text-4xl hover:text-[#C40452] transition"
                    style={{
                      animation: isMenuOpen ? `fadeInUp 0.45s ease-out ${idx * 0.07}s forwards` : "none",
                      opacity: 0,
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-7 h-px bg-white/15" />

            {/* 회사 그룹 */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => toggleGroup("company")}
                className="inline-flex items-center justify-center gap-2
      text-white font-bold text-2xl sm:text-3xl md:text-4xl
      hover:text-[#C40452] transition"
              >
                회사
                <span className={`transition-transform ${openGroup === "company" ? "rotate-180" : ""}`}>▾</span>
              </button>

              <div
                className={`mt-4 overflow-hidden transition-all duration-300
      ${openGroup === "company" ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <ul className="flex flex-col gap-3">
                  {/* 회사 기본 메뉴 */}
                  {companyGroup.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="block text-white/90 font-semibold
              text-lg sm:text-xl md:text-2xl
              hover:text-[#C40452] transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  {/* 사업영역 서브그룹 */}
                  <li className="mt-3">
                    <ul className="flex flex-col gap-2 pl-2">
                      {businessGroup.items.map((biz) => (
                        <li key={biz.name}>
                          <Link
                            href={biz.href}
                            onClick={closeMenu}
                            className="block text-white font-medium
                  text-base sm:text-lg md:text-xl
                  hover:text-[#C40452] transition"
                          >
                            · {biz.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-7 h-px bg-white/15" />

            {/* 그룹: 고객지원 */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => toggleGroup("support")}
                className="inline-flex items-center justify-center gap-2 text-white font-bold text-2xl sm:text-3xl md:text-4xl hover:text-[#C40452] transition"
                style={{
                  animation: isMenuOpen ? `fadeInUp 0.45s ease-out 0.28s forwards` : "none",
                  opacity: 0,
                }}
              >
                {supportGroup.name}
                <span className={`transition-transform ${openGroup === "support" ? "rotate-180" : ""}`}>▾</span>
              </button>

              <div className={`mt-4 overflow-hidden transition-[max-height,opacity] duration-300 ${openGroup === "support" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="flex flex-col gap-3">
                  {supportGroup.items.map((sub, sIdx) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.href}
                        onClick={closeMenu}
                        className="block text-white/90 font-semibold text-lg sm:text-xl md:text-2xl hover:text-[#C40452] transition"
                        style={{
                          animation: openGroup === "support" ? `fadeInUp 0.35s ease-out ${sIdx * 0.06}s forwards` : "none",
                          opacity: openGroup === "support" ? 0 : 1,
                        }}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* 하단 연락처 */}
        <div className="fixed bottom-0 left-0 right-0 text-center text-white px-6 pb-6 pt-5 bg-black/80 backdrop-blur-sm border-t border-white/10 z-[60]">
          <p className="text-xs md:text-sm mb-2 text-white/70">문의 번호</p>
          <p className="text-xl md:text-2xl font-bold mb-3">T. 02-3451-9734</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center text-xs md:text-sm text-gray-300">
            <div className="flex items-center gap-2 justify-center">
              <FaPrint />
              <span>02-415-3559</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MdEmail />
              <span>232237@mirae22.co.kr</span>
            </div>

            <Link href={"/login"} onClick={closeMenu}>
              관리자페이지
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
