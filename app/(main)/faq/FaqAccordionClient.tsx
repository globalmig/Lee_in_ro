"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Image from "next/image";

type FAQItem = {
  id: string;
  title: string;
  question: string;
  answer: string;
};

export default function FaqAccordionClient({ faqData }: { faqData: FAQItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faqData.map((item) => {
        const isActive = activeId === item.id;

        return (
          <div key={item.id} className="border-b border-gray-200 overflow-hidden">
            {/* 질문 영역 */}
            <button onClick={() => toggleAccordion(item.id)} className="w-full flex items-center justify-between py-4 md:py-5 text-left hover:bg-gray-50 transition-colors px-2">
              <div className="flex items-center gap-3 md:gap-4 flex-1">
                <p className="text-[#481B2E] font-bold w-32">{item.title}</p>

                <p className="text-sm md:text-base font-medium text-[#481B2E] pr-4">
                  <strong className="text-[#C40452] mr-2 text-xl">Q.</strong>
                  {item.question}
                </p>
              </div>

              <div className="text-gray-400 flex-shrink-0">{isActive ? <FiChevronUp className="w-5 h-5 md:w-6 md:h-6" /> : <FiChevronDown className="w-5 h-5 md:w-6 md:h-6" />}</div>
            </button>

            {/* 답변 영역 */}
            <div className={`transition-all duration-300 ease-in-out ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="bg-gray-50 px-4 md:px-6 py-4 md:py-6 mb-3">
                <div className="flex gap-3 md:gap-4">
                  <p className="text-[#481B2E] font-bold w-20"></p>
                  <div className="mr-4">
                    <Image src={"/icon/answer.png"} alt={"답변아이콘"} width={70} height={60} />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {faqData.length === 0 && <div className="py-14 text-center text-gray-500">등록된 FAQ가 없습니다.</div>}
    </div>
  );
}
