// app/company/page.tsx
import Hero from "@/components/common/Hero";
import React from "react";

export default function page() {
  return (
    <main className="bg-white text-[#111]">
      <Hero img={"/hero_bg.png"} title={"회사연혁"} />
      <div className="mx-auto w-full max-w-[980px] px-5 sm:px-8 pb-10 sm:pb-14">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-[#C40452] font-semibold tracking-tight">Customer Service Leader</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">미래신용정보</h1>
        </div>

        {/* Description */}
        <div className="mt-6 sm:mt-8 space-y-4 text-sm sm:text-[15px] leading-7 text-[#333]">
          <p>
            미래신용정보는 1998년 LG카드로부터 분리되어 설립된 회사로, 창사 이래 20년간 풍부한 채권관리 경험을 바탕으로 국내 유수의 대형 통신사 및 금융회사에 채권관리를 전담하여 신용정보업계의
            리더로서 효율성을 쌓아왔습니다.
          </p>
          <p>또한 전문 인력과 체계적인 조직을 바탕으로 개척정신을 발휘하여 CRM 등 신규사업 영역에서도 고객 만족도를 높여왔습니다.</p>
          <p>
            미래신용정보는 다가오는 4차 산업혁명 시대에 대비하여 개인정보보호에 더욱 만전을 기하고 민원예방을 위한 프로그램을 철저히 시행하는 등 고객과의 신뢰를 지키기 위한 최선의 노력을 다할
            것입니다.
          </p>
          <p>지난 20년의 경력과 실력을 바탕으로 고객만족을 넘어 진정한 고객감동의 실현을 위한 노력을 게을리하지 않겠습니다.</p>
          <p className="font-semibold">
            고객의 미래를 위한 최고의 파트너! 지금 <span className="text-[#C40452]">미래신용정보와</span> 함께하십시오.
          </p>
        </div>

        {/* Section: 일반 현황 */}
        <section className="mt-10 sm:mt-12">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">일반 현황</h2>
          <div className="mt-3 h-px w-full bg-[#C40452]" />

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead>
                <tr>
                  <th colSpan={2} className="border border-[#E6E6E6] bg-[#FAFAFA] py-3 text-center font-semibold text-[#444]">
                    미래를 위한 최선의 선택, 미래신용정보
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#333]">
                <Row label="회사명" value="미래신용정보 주식회사" />
                <Row label="설립일" value="1998년 5월 21일" />
                <Row label="본점소재" value="서울시 영등포구 영등포로 81 (양평동 1가, 아테나위)" />
                <Row label="대표이사" value="박민석" />
                <Row label="임직원수" value="294명" />
                <Row label="전국지점" value="33개지점 12센터 1소 6팀" />
                <Row label="주요사업" value="콜센터, 미납/채권관리, 신용조사" />
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: 주요 재무정보 */}
        <section className="mt-10 sm:mt-12">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">주요 재무정보</h2>
          <div className="mt-3 h-px w-full bg-[#C40452]" />

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#FAFAFA] text-[#444]">
                  <th className="border border-[#E6E6E6] py-3 px-3 text-center font-semibold">구분</th>
                  <th className="border border-[#E6E6E6] py-3 px-3 text-center font-semibold">2021년</th>
                  <th className="border border-[#E6E6E6] py-3 px-3 text-center font-semibold">2022년</th>
                  <th className="border border-[#E6E6E6] py-3 px-3 text-center font-semibold">2023년</th>
                </tr>
              </thead>

              <tbody className="text-[#333]">
                {/* 재무상태 */}
                <tr>
                  <td rowSpan={3} className="border border-[#E6E6E6] px-3 py-3 text-center font-semibold">
                    재무상태
                  </td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">자산총계</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">50,792</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">57,238</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">61,219</td>
                </tr>
                <tr>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">부채총계</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">15,115</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">20,065</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">21,555</td>
                </tr>
                <tr>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">자본총계</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">35,677</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">37,173</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">39,664</td>
                </tr>

                {/* 손익 */}
                <tr>
                  <td rowSpan={2} className="border border-[#E6E6E6] px-3 py-3 text-center font-semibold">
                    손익
                  </td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">매출액</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">77,838</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">76,312</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">77,801</td>
                </tr>
                <tr>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">영업이익</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">7,691</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">3,992</td>
                  <td className="border border-[#E6E6E6] px-3 py-3 text-center">4,787</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="w-[180px] border border-[#E6E6E6] bg-[#FAFAFA] px-4 py-3 text-center font-semibold text-[#444]">{label}</td>
      <td className="border border-[#E6E6E6] px-4 py-3 text-center">{value}</td>
    </tr>
  );
}
