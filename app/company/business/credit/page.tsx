import DotTitle from "@/components/common/DotTitle";
import Hero from "@/components/common/Hero";
import React from "react";
import Image from "next/image";
import ContactBtn from "@/components/common/ContactBtn";
import Tabs from "@/components/common/Tabs";

export default function page() {
  const data03 = [
    {
      title: "임대차 / 현장조사",
      desc: ["대출 및 거래 시 대상 부동산의 실태와 권리관계를 현장 확인", "임차인·임대차 현황, 실거주 여부", "사업장 운영 여부 및 현장 실사", "부동산 거래가·담보 목적 현장 확인"],
    },
    {
      title: "서류수령 대행",
      desc: ["고객 방문을 통한 본인 확인 및 요청 서류 수령·전달", "약정서, 계약서, 신분 확인", "재직·소득·등기 관련 서류 수령", "금융·일반기업 업무 위탁 대응"],
    },
    {
      title: "재산조사",
      desc: ["거래 상대방의 신용 및 재산 현황 종합 조사", "주소지 방문을 통한 실거주·연락처 확인", "부동산·사업장·가맹점 운영 여부 조사", "채권 회수·거래 판단을 위한 기초 자료 제공"],
    },
  ];

  return (
    <div>
      <Hero img={"/business_hero_bg.png"} title={"사업영역"} />

      <Tabs />

      <section className="w-full max-w-[1440px] px-4 flex flex-col gap-20 mx-auto">
        <div className="01">
          <DotTitle title={"업무개요"} />
          <p>금융회사·기업·개인사업자의 의뢰를 받아 거래 안전성 확보를 위해 부동산 권리관계, 실거주·사업 여부, 신용·재산 현황을 종합적으로 조사·확인하는 서비스입니다.</p>
        </div>
        <div className="02">
          <DotTitle title={"주요 업무"} />
          <ul className="list-disc ml-5">
            <li>법인·개인사업자 수행 가능</li>
            <li>금융·통신·기업·개인 채권 등 다양한 조사 경험</li>
            <li>현장 중심 조사 + 시스템 기반 관리</li>
            <li>온라인 진행으로 신속한 결과 제공</li>
          </ul>
        </div>
        <div className="03">
          <DotTitle title={"업무영역"} />
          <ul className="ml-5 flex flex-col gap-8">
            {data03.map((item, index) => (
              <li key={index} className="flex flex-col ">
                <h4 className="text-[#481B2E] font-bold text-lg mb-2">{item.title}</h4>

                <ul className="ml-4 flex flex-col gap-2 list-disc text-sm text-[#333]">
                  {item.desc.map((text, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {text}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="05">
          <DotTitle title={"수수료"} />
          <p>- 약정수수료는 협의 후 결정</p>
        </div>
      </section>
      <div className="contact w-full flex justify-center mt-20 mb-32 px-4">
        <ContactBtn />
      </div>
    </div>
  );
}
