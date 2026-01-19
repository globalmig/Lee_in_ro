"use client";
import React, { useState, useEffect } from "react";
import { FaPrint } from "react-icons/fa6";
import { MdEmail, MdClose } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: "홈", href: "/" },
    { name: "메뉴소개", href: "/menus" },
    { name: "매장소개", href: "/location" },
    { name: "공지사항", href: "/board" },
    { name: "가맹문의", href: "/franchise" },
  ];

  return (
    <>
      <header className="relative z-50">
        {/* 햄버거 버튼 */}
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
            <p className="text-xs md:text-sm font-light">jklee7711@naver.com</p>
          </div>
        </div>
      </header>

      {/* 전체 화면 메뉴 */}
      <div className={`fixed inset-0 bg-black bg-opacity-95 z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* 닫기 버튼 */}
        <button onClick={() => setIsMenuOpen(false)} className="absolute right-6 top-6 md:right-10 md:top-10 text-white hover:text-gray-300 transition-colors" aria-label="메뉴 닫기">
          <MdClose className="w-8 h-8 md:w-10 md:h-10" />
        </button>

        {/* 메뉴 아이템 */}
        <nav className="flex flex-col items-center justify-center h-full gap-6 md:gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-3xl md:text-5xl lg:text-6xl font-bold hover:text-[#C40452] transition-all duration-300 hover:scale-110"
              style={{
                animation: isMenuOpen ? `fadeInUp 0.5s ease-out ${index * 0.1}s forwards` : "none",
                opacity: 0,
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 하단 연락처 정보 */}
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <p className="text-sm md:text-base mb-2">문의 번호</p>
          <p className="text-2xl md:text-3xl font-bold mb-4">T. 02-3451-9734</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center text-xs md:text-sm text-gray-400">
            <div className="flex items-center gap-2 justify-center">
              <FaPrint />
              <span>02-415-3559</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MdEmail />
              <span>232237@mirae22.co.kr</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
