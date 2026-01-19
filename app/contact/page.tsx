"use client";
import Hero from "@/components/common/Hero";
import InquiryForm from "@/components/contact/InquiryForm";
import Link from "next/link";
import { MapPin, Phone, Printer, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero img={"/hero_bg.png"} title={"사업영역"} />
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[980px] px-5 sm:px-8 pb-12">
          {/* Header */}
          <div className="space-y-2 mb-20">
            <p className="text-[#C40452] font-semibold tracking-tight">Contact</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              궁금하신 사항을 적어주시면
              <br /> 담당자가 자세하게 안내해드리겠습니다.
            </h2>
          </div>
          <InquiryForm
            privacyUrl="/privacy"
            onSubmit={async (data) => {
              // TODO: 여기서 API 호출로 저장하면 됨
              // await fetch("/api/inquiry", { method: "POST", body: JSON.stringify(data) })
              console.log("inquiry:", data);
            }}
          />
        </div>
      </section>

      <section id="company" className="relative w-full h-screen overflow-hidden mt-40 border-t">
        {/* BG */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] sm:h-[56%] md:h-[52%]">
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
          <div className="absolute left-5 top-6 sm:left-8 sm:top-8 md:left-10 md:top-10 z-20">
            <Image src="/logo.png" alt="logo" width={240} height={100} className="w-[160px] sm:w-[200px] md:w-[240px] h-auto" />

            <div className="text-[#4B4D52]/60 font-semibold mt-10">
              <p className="text-xl md:text-4xl">더 이상 스트레스 받지 마세요.</p>
              <p className="text-xl md:text-4xl">저희가 해결합니다.</p>
            </div>
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
            <div className="flex flex-col gap-4 lg:gap-6">
              <Link href="/company/introduce" className="border border-[#C40452] rounded-lg px-10 lg:px-14 py-3 lg:py-4 text-[#C40452] font-bold bg-white/80 hover:bg-white transition">
                회사소개 &gt;
              </Link>
              <Link href="/company/business/debt" className="border border-[#C40452] rounded-lg px-10 lg:px-14 py-3 lg:py-4 text-[#C40452] font-bold bg-white/80 hover:bg-white transition">
                사업 영역 &gt;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
