"use client";
import Hero from "@/components/common/Hero";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Image from "next/image";

interface FAQItem {
  id: number;
  title: string;
  question: string;
  answer: string;
}

export default function faq() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      title: "상담 및 계약",
      question: "귀사에 제공추심이나 신용조사를 의뢰하여 되는 필을 만한 가면인가요?",
      answer: `채권추심 및 신용조사법무를 영위하지 위해서는 '신용정보의 이용 및 보호에 관한 법률'에 명백한 요건을 갖추어 금융위원회의 허가를 받아야 합니다. 당사는 1998년에 제5호상의 신용조사업 허가를 받은 기업으로 금융당국의 영업한 감독을 받고 있습니다. 제공추심을 의뢰하시기 전 허가필 번호 확인하시면 보다 확실 하시는 것이 중요합니다. 금융감독원 또는 신용정보협회를 통해 허가여부 여부를 문의 할 수 있습니다.`,
    },
    {
      id: 2,
      title: "상담 및 계약",
      question: "채권추심위임계약 해지는 채권자가 요구하면 언제든 가능한지요?",
      answer: `계약 기간 중 위임 채권의 전부 또는 일부에 대한 해지를 요청하는 경우, 회사의 서면 동의가 필요합니다. 특히 당사의 추심 활동으로 회수 가능성이 확인된 이후 해지 시에는 계약에 따른 추심 성공 수수료가 발생합니다.`,
    },
    {
      id: 3,
      title: "신용조사",
      question: "채권 회수 성과가 없을 경우, 이미 납부한 신용조사 수수료는 환불되나요?",
      answer: `채권 회수 결과와 관계없이, 당사가 신용조사 업무에 착수한 이후에는 신용조사 수수료를 반환하지 않습니다.(채권추심위임계약서 내 ‘신용조사’ 관련 조항 기준)`,
    },
    {
      id: 4,
      title: "신용조사",
      question: "신용조사 수수료는 채권 회수 성공 시에만 지급해도 되나요?",
      answer: `신용조사 수수료는 조사 의뢰 시 선납을 원칙으로 하고 있으며, 회수 성공 여부와는 무관합니다.`,
    },
    {
      id: 5,
      title: "채권추심",
      question: "채권추심 의뢰 시 채권을 증명하는 서류는 원본 제출이 필수인가요?",
      answer: `법원 판결문, 계약서, 계산서, 거래 증빙 자료 등 채권 관련 서류는 사본으로 제출하셔도 무방합니다.`,
    },
    {
      id: 6,
      title: "채권추심",
      question: "가압류·압류 등 법적 절차 비용을 고려신용정보나 담당자 개인 계좌로 송금해도 되나요?",
      answer: `법적 조치에 소요되는 비용은 지정된 법무사 계좌로만 송금해야 하며, 당사 직원이 현금 수령이나 개인 계좌 입금을 요청하는 행위는 엄격히 금지되어 있습니다.`,
    },
    {
      id: 7,
      title: "채권추심",
      question: "신용조사 수수료 외에 법적 절차 비용도 모두 채권자가 부담해야 하나요?",
      answer: `가압류, 소송 등 법적 절차에 필요한 비용은 발생 시점마다 채권자가 부담하게 됩니다.`,
    },
    {
      id: 8,
      title: "채권추심",
      question: "추심 의뢰 후 채권자가 직접 채무자에게서 변제금을 받은 경우에도 수수료가 발생하나요?",
      answer: `계약 기간 중 채권자가 직접 채무자로부터 변제금을 수령한 경우에도, 계약서에 명시된 ‘추심 실적 인정 범위’에 따라 추심 성공 수수료가 적용됩니다.`,
    },
    {
      id: 9,
      title: "채권추심",
      question: "가압류 등 법적 조치 이후 채무자가 자발적으로 변제한 경우에도 수수료를 지급해야 하나요?",
      answer: `당사의 지원으로 진행된 법적 조치로 인해 채무자가 변제한 경우, 이는 추심 성과로 인정되어 성공 수수료가 발생합니다.`,
    },
    {
      id: 10,
      title: "채권추심",
      question: "채권추심 진행 상황은 수시로 확인할 수 있나요?",
      answer: `추심 진행 중에는 담당 지사 또는 담당자를 통해 언제든지 현재 진행 상황을 확인하실 수 있습니다.`,
    },
    {
      id: 11,
      title: "채권추심",
      question: "계약 체결 후 보통 어느 정도 기간 내에 채권 회수가 이루어지나요?",
      answer: `채무자의 재산 상태, 변제 의지 등 여러 요소를 고려해 일정 수준의 예측은 가능하나, 구체적인 회수 시점을 단정적으로 안내드리기는 어렵습니다.`,
    },
  ];

  const toggleAccordion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <>
      <Hero img={"/hero_bg.png"} title={"공지사항"} />

      <div className="max-w-[1200px] mx-auto px-4 mb-32">
        {/* Header */}
        <div className="space-y-2 mb-10">
          <p className="text-[#C40452] font-semibold tracking-tight">Customer Service Leader</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">미래신용정보</h1>
        </div>

        <div className="space-y-3">
          {faqData.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div key={item.id} className="border-b border-gray-200 overflow-hidden">
                {/* 질문 영역 */}
                <button onClick={() => toggleAccordion(item.id)} className="w-full flex items-center justify-between py-4 md:py-5 text-left hover:bg-gray-50 transition-colors px-2">
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    {/* Q 아이콘 */}
                    {/* <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#C40452] relative flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm md:text-base">Q</span>
                    </div> */}

                    <p className="text-[#481B2E] font-bold w-32">{item.title}</p>

                    {/* 질문 텍스트 */}
                    <p className="text-sm md:text-base font-medium text-[#481B2E] pr-4">
                      <strong className="text-[#C40452] mr-2 text-xl">Q.</strong>
                      {item.question}
                    </p>
                  </div>

                  {/* 화살표 아이콘 */}
                  <div className="text-gray-400 flex-shrink-0">{isActive ? <FiChevronUp className="w-5 h-5 md:w-6 md:h-6" /> : <FiChevronDown className="w-5 h-5 md:w-6 md:h-6" />}</div>
                </button>

                {/* 답변 영역 */}
                <div className={`transition-all duration-300 ease-in-out ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-gray-50 px-4 md:px-6 py-4 md:py-6 mb-3">
                    <div className="flex gap-3 md:gap-4">
                      {/* A 아이콘 */}
                      {/* <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 relative flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-bold text-sm md:text-base">A</span>
                      </div> */}
                      <p className="text-[#481B2E] font-bold w-20"></p>
                      <div className="mr-4">
                        <Image src={"/icon/answer.png"} alt={"답변아이콘"} width={70} height={60} />
                      </div>

                      {/* 답변 텍스트 */}
                      <div className="flex-1">
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
