import DotTitle from "@/components/common/DotTitle";
import Hero from "@/components/common/Hero";
import React from "react";
import Image from "next/image";
import ContactBtn from "@/components/common/ContactBtn";
import Tabs from "@/components/common/Tabs";

export default function page() {
  const data03 = [
    { title: "민사채권", desc: "- 개인 간 대여금 등 법적 권원이 인정된 채권" },
    { title: "상사채권", desc: "- 물품대금, 매매대금, 공사대금, 임가공비, 의료비, 용역대금 등 사업 활동에서 발생한 채권" },
    { title: "금융채권", desc: "- 금융기관 대출금, 카드 이용대금 등 금융거래로 발생한 채권" },
    { title: "전략채권", desc: "- 휴대전화, 유선전화, 인터넷 등 통신 서비스 이용 요금 채권" },
    { title: "기타 생활채권", desc: "- 렌탈, 보안·경비 서비스, 도시가스, 케이블TV 등 일상생활과 관련된 채권" },
    { title: "채권관리 컨설팅 및 시스템 구축", desc: "- 채권 회수 효율을 높이기 위한 관리 전략 자문 및 맞춤형 시스템 구축 지원" },
  ];

  return (
    <div>
      <Hero img={"/hero_bg.png"} title={"사업영역"} />

      <Tabs />

      <section className="w-full max-w-[1440px] px-4 flex flex-col gap-20 mx-auto">
        <div className="01">
          <DotTitle title={"업무개요"} />
          <p>
            당사는 채권자로부터 적법한 위임을 받아 채무불이행자에 대한 재산 현황을 조사하고, 변제 이행을 안내하며 변제금 수납까지 수행하는 전문 채권추심 서비스를 제공합니다. 본 업무는 「신용정보의
            이용 및 보호에 관한 법률」 제2조 제10호에 근거하여 합법적으로 진행됩니다.
          </p>
        </div>
        <div className="02">
          <DotTitle title={"주요 업무내용"} />
          <ul className="list-disc ml-5">
            <li>채권추심 수행을 위한 채무자 및 채무관계자의 주소·연락처 등 소재 확인</li>
            <li>채무자 및 채무관계자에 대한 재산 현황 조사</li>
            <li>채무자 방문 및 합법적 절차에 따른 변제 안내·요청</li>
            <li>변제금 수령 및 채권자 대행 관리 업무 수행</li>
          </ul>
        </div>
        <div className="03">
          <DotTitle title={"주요 업무내용"} />
          <ul className="ml-5 flex flex-col gap-8">
            {data03.map((Item, index) => (
              <li key={index}>
                <h4 className="text-[#481B2E] font-bold m-0">{Item.title}</h4>
                <p>{Item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="04">
          <DotTitle title={"업무절차"} />
          <Image src="/process.png" alt="업무절차" width={1480} height={912} className="w-full" />
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
