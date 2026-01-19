import DotTitle from "@/components/common/DotTitle";
import Hero from "@/components/common/Hero";
import React from "react";
import Image from "next/image";
import ContactBtn from "@/components/common/ContactBtn";
import Tabs from "@/components/common/Tabs";

export default function page() {
  const data01 = [
    { img: "/icon/manager.png", title: "풍부한 고객관리 경험", desc: "공공·금융·통신·렌탈 등 다양한 산업의 고객관리 운영 노하우 보유" },
    { img: "/icon/setting.png", title: "고객관리 시스템", desc: "데이터 분석과 자동화(PDS·CTI·ACS) 기반의 효율적인 상담 운영" },
    { img: "/icon/study.png", title: "전문 인력 및 교육", desc: "1,300여 명 전문 인력과 체계적인 교육 시스템 운영" },
    { img: "/icon/security.png", title: "정보보안·민원관리", desc: "금융권 수준의 보안 체계와 민원 예방·대응 프로세스 구축" },
  ];

  const data03 = [
    {
      title: "고객센터 구축 및 조직 운영",
      desc: [
        "인력 운영: 직접 채용 및 인력 승계, 이직률 관리와 장기근속 체계 운영",
        "시스템: CRM, 녹취, 모니터링, 민원, 콜 평가를 통한 상담 시스템 운영",
        "조직 운영: SLA 기반 품질·생산성 관리 및 장애·피크타임 대응",
        "교육 체계: 내·외부 교육 프로그램을 통한 상담 역량 강화",
      ],
    },
    {
      title: "Marketing",
      desc: ["홈쇼핑 주문고객 DB 수령 후 판매유치 TM", "추가 상품 판매(Cross Sales) / 상위 제품 판매 유도(Up Sales)", "이벤트 / 캠페인 안내 및 참여 촉진 TM"],
    },
    {
      title: "주문확정",
      desc: ["고객 주문 사실 확인 및 접수 처리 업무", "신규, 재가입, 추가 주문 및 Care 요청 고객 대상 주문사실 본인확인 및 설치주소, 결제정보, 주문동의, 출금동의, 결제일자 등 상담"],
    },
    {
      title: "모니터링",
      desc: ["상담원 녹취(CS) 평가", "상담원의 업무 영역별 녹취 모니터링 평가 및 피드백을 통한 상품품질 향상, 불법영업 차단, 민원 사전관리"],
    },
    {
      title: "심사",
      desc: ["신용대출 사실 확인 및 서류 심사", "개인, 법인, 가맹점 서류심사 및 등록 / 신용대출 신청사실 및 직장여 재직 확인 / 인터넷·모바일 실시간 신청 확인 및 심사"],
    },
    {
      title: "사전안내 및 요금상담센터",
      desc: ["사전안내(청약고지) 및 요금상담센터(정기·비정기) 구축 및 운영", "결제(D-5) 사전 안내 및 청구 요금 관련 상담 / 결제정보 안내 / 미납(1일~30일) 안내 / 수납 등 센터 구축 및 운영"],
    },
  ];

  return (
    <div>
      <Hero img={"/hero_bg.png"} title={"사업영역"} />

      <Tabs />

      <section className="w-full max-w-[1440px] px-4 flex flex-col gap-20 mx-auto">
        <div className="01">
          <DotTitle title={"업무개요"} />
          <p className="break-keep">
            미래신용정보는 고객센터 구축 및 조직 운영 서비스를 비롯해 상담원 교육, 통화품질 제고 등 고객과의 접점에서 철저한 Needs분석을 통해 단순한 전화상담이 아닌 고객과의 지속적인 관계 유지 및 유대
            강화를 위한 미래 지향적 고객상담 대행 서비스를 제공합니다.
          </p>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-24">
            {data01.map((item, index) => (
              <li key={index} className="flex flex-col justify-center items-center gap-4">
                <Image src={item.img} alt={item.title} width={223} height={182} className="" />
                <p className="font-bold">{item.title}</p>
                <p className="text-center">{item.desc}</p>
              </li>
            ))}
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
