// components/company/HistoryTimeline.tsx
import React from "react";

type HistoryItem = {
  year: string;
  items: string[];
};

const HISTORY: HistoryItem[] = [
  { year: "2021", items: ["업체아이월브에이디파눅 설립"] },
  { year: "2020", items: ["대외 홍보/광고/기획아이템 TV, 라디오, You-TUBE 등", "KT채권추심업무 개시", "민·상사 채권 전담 영업망 확대(9개 지점)"] },
  { year: "2019", items: ["신용회복위원회 중금리대출 영업 승인(금융감독원)"] },
  { year: "2018", items: ["창립 20주년", "NEW VISION & SLOGAN 선포"] },
  { year: "2017", items: ["본사 이전 (참마구 가락동 → 영등포구 영등포)", "법원송달업무 취임"] },
  { year: "2015", items: ["차세대 고객관리 시스템 구축 완료", "국민행복기금 지원·채무조정 상담 위임업체 업무 개시"] },
  { year: "2013", items: ["한국자산관리공사 우수 협력사 감사패 수상 및 개인정보보호 우수 업체 선정"] },
  { year: "2012", items: ["금융기관 및 일반기업 채무추심대행 업무 개시"] },
  { year: "2010", items: ["콜센터 구축 및 서비스 개시 (In/Out Bound, 심사, 모니터링, 사전안내, 주말운영)"] },
  { year: "2008", items: ["KT 장기연체 수탁채권 회수율 2년 연속 감사패 수상"] },
  { year: "2004", items: ["국내 유수 금융기관 신용관리 Solution 컨설팅 및 민원대행 업무 개시", "한국-테닝콜 콜센터부문 3년 연속 수상 (2002~2004)"] },
  { year: "2002", items: ["Web기반 채무자 채권관리시스템 구축"] },
  { year: "2000", items: ["영국 Experian사와 전략적 제휴"] },
  { year: "1998", items: ["LG신용정보 설립(LG카드로부터 분리) → 미래신용정보로 상호 변경"] },
];

export default function Timeline() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[980px] px-5 sm:px-8 py-10 sm:py-14">
        {/* 타이틀 필요하면 여기 */}
        {/* <h2 className="text-xl sm:text-2xl font-extrabold">연혁</h2> */}

        <div className="relative mt-2">
          {/* 세로 라인 (도트가 붙는 가운데 라인) */}
          <div className="absolute left-[92px] sm:left-[140px] top-0 h-full w-px bg-[#EDEDED]" />

          <ul className="space-y-6 sm:space-y-7">
            {HISTORY.map((row) => (
              <li
                key={row.year}
                className="
                  relative
                  grid
                  grid-cols-[72px_28px_1fr]
                  sm:grid-cols-[120px_40px_1fr]
                  items-start
                  gap-x-4
                "
              >
                {/* Year */}
                <div className="text-[18px] sm:text-[22px] font-extrabold text-[#111] leading-none pt-[2px]">{row.year}</div>

                {/* Dot */}
                <div className="relative flex justify-center">
                  <span className="mt-[6px] block h-2.5 w-2.5 rounded-full border-2 border-[#C40452] bg-white absolute left-0" />
                </div>

                {/* Content */}
                <div className="text-sm sm:text-[15px] leading-7 text-[#333]">
                  <ul className="space-y-1.5">
                    {row.items.map((t, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="break-keep">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
