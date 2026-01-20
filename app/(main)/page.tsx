import Link from "next/link";
import React from "react";

import Image from "next/image";
import { MapPin, Phone, Printer, Mail } from "lucide-react";
import QuickMenu from "@/components/main/QuickMenu";

export default function page() {
  return (
    <>
      {/* 퀵메뉴 */}
      <QuickMenu />
      {/* 상담신청-히어로섹션 */}
      {/* 회사소개 */}
      <section id="company" className="snap-start relative w-full h-[800px] md:h-screen overflow-hidden bg-black/90">
        {/* BG */}
        <div className="absolute inset-x-0 bottom-0 h-[56%] sm:h-[56%] md:h-[52%]">
          <Image src="/AI_bg.png" alt="" fill className="object-cover object-center" priority />
        </div>

        {/* 가운데 정렬 컨테이너 */}
        <div className="relative mx-auto w-full max-w-[1440px] h-full">
          {/* Person */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <Image
              src="/AI_full_body.png"
              alt=""
              width={742}
              height={982}
              priority
              className="
        h-auto
        w-[420px] max-w-[95vw]
        sm:w-[460px]
        md:w-[520px]
        lg:w-[580px]
      "
            />
          </div>

          {/* Left top: logo + copy */}
          <div className="absolute left-5 top-6 sm:left-8 sm:top-8 md:left-10 md:top-10 ">
            {/* <Image src="/logo.png" alt="logo" width={240} height={100} className="w-[160px] sm:w-[200px] md:w-[240px] h-auto" /> */}

            <div className="text-white/80 font-semibold mt-28">
              <p className="text-xl md:text-4xl ">더 이상 스트레스 받지 마세요.</p>
              <p className="text-xl md:text-4xl py-4">채권관리 · CRM 서비스 · 신용조사</p>
              <p className="text-xl md:text-4xl">저희가 해결합니다.</p>
            </div>
            {/* <div className="md:hidden flex flex-col gap-4 lg:gap-6 mt-4">
              <Link href="/company/introduce" className="border border-[#C40452] rounded-lg px-10 lg:px-14 py-3 lg:py-4 text-[#C40452] font-bold  hover:bg-white transition">
                회사소개 &gt;
              </Link>
              <Link href="/company/business/debt" className="border border-[#C40452] rounded-lg px-10 lg:px-14 py-3 lg:py-4 text-[#C40452] font-bold  hover:bg-white transition">
                사업 영역 &gt;
              </Link>
            </div> */}
          </div>

          {/* About: single block (mobile bottom-left / desktop bottom-right) */}
          <div
            className="
      absolute z-20
      left-5 bottom-6
      md:left-auto md:right-10 md:bottom-20
      text-white text-shadow
      max-w-[300px] sm:max-w-[360px]
    "
          >
            <h3 className="text-xl font-medium">서울채권지점</h3>

            <div className="flex items-end gap-3 sm:gap-4 mt-1">
              <h2 className="text-2xl md:text-5xl font-bold">이인로</h2>
              <h3 className="text-xl md:text-3xl font-medium">부장</h3>
            </div>

            <div className="mt-3 space-y-2 text-xs sm:text-sm leading-relaxed opacity-90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-[2px] shrink-0" />
                <p>07272 서울시 영등포구 영등포로 59, 3층</p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <p>T. 02-3451-9734</p>
              </div>

              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 shrink-0" />
                <p>F. 02-415-3559</p>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <p>E. 232237@mirae22.co.kr</p>
              </div>
            </div>
          </div>

          {/* Right top buttons: desktop only */}
          <div className="hidden md:block absolute right-10 top-10 z-20">
            {/* <div className="flex flex-col gap-4 lg:gap-6">
              <Link href="/company/introduce" className="border border-[#C40452] rounded-lg px-10 lg:px-14 py-3 lg:py-4 text-[#C40452] font-bold bg-white/80 hover:bg-white transition">
                회사소개 &gt;
              </Link>
              <Link href="/company/business/debt" className="border border-[#C40452] rounded-lg px-10 lg:px-14 py-3 lg:py-4 text-[#C40452] font-bold bg-white/80 hover:bg-white transition">
                사업 영역 &gt;
              </Link>
            </div> */}
          </div>
        </div>
      </section>
      <section id="contact" className="snap-start h-screen min-h-[600px] bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: "url('/hero_bg.png')" }}>
        <div className="mainTitle flex flex-col justify-center items-center h-full gap-12">
          <div className="text-center">
            <p className="text-5xl mb-4 ">내 채권의 미래</p>
            <h2>미래신용 정보</h2>
          </div>

          <p className="text-center">
            더 이상 스트레스 받지 마세요!
            <br />
            대신 해결해드립니다.
          </p>
          <Link href={"/contact"} className="py-4 px-20 border text-2xl hover:pink hover:font-bold hover:border-[#c40452]">
            상담신청
          </Link>
        </div>
      </section>
      {/* 사업영역 */}
      <section
        id="business"
        className="snap-start h-screen min-h-[600px] bg-cover bg-center bg-no-repeat text-white text-center flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/second_bg.png')" }}
      >
        <h2 className="py-4">미래신용정보 서비스</h2>
        <div className="itemList grid grid-cols-2 md:grid-cols-4 max-w-[1440px] w-full my-12 md:my-40">
          <Link href={"/company/business/crm"}>
            <div className="CRM flex flex-col justify-center items-center hover:text-[#c40452]">
              <Image src={"/icon/CRM.png"} alt="CRM서비스" width={200} height={200} className="" />
              <h3>CRM 서비스</h3>
              <p className="text-sm hover:text-[#c40452]">
                상담·마케팅·심사·모니터링
                <br />
                고객관리 통합 솔루션 제공
              </p>
            </div>
          </Link>
          <Link href={"/company/business/debt"}>
            <div className="flex flex-col justify-center items-center hover:text-[#c40452]">
              <Image src={"/icon/money.png"} alt="채권관리" width={200} height={200} className="" />
              <h3>채권관리</h3>
              <p className="text-sm text-center">
                미납요금 상담부터 회수까지,
                <br /> 토탈 미납관리 서비스 제공
              </p>
            </div>
          </Link>
          <Link href={"/company/business/debt"}>
            <div className="flex flex-col justify-center items-center hover:text-[#c40452]">
              <Image src={"/icon/management.png"} alt="민,상사 채권관리" width={200} height={200} className="" />
              <h3>민,상사 채권관리</h3>
              <p className="text-sm text-center">
                권원이 인정된 개인 대여금,
                <br /> 민사·상사채권 관리 지원
              </p>
            </div>
          </Link>
          <Link href={"/company/business/credit"}>
            <div className="flex flex-col justify-center items-center hover:text-[#c40452]">
              <Image src={"/icon/search.png"} alt="신용조사" width={200} height={200} className="" />
              <h3>신용조사</h3>
              <p className="text-sm text-center">
                거래 상대방의 신용상태 및<br /> 재산 보유 여부 조사
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
