import Hero from "@/components/common/Hero";
import Timeline from "@/components/history/Timeline";
import React from "react";

export default function page() {
  return (
    <>
      <Hero img={"/hero_bg.png"} title={"회사연혁"} />

      <section className="flex flex-col justify-center items-center w-full px-4">
        <div className="border border-[#C40452] rounded-xl  p-10 md:p-10 flex flex-col justify-center items-center text-center keep-break w-full max-w-[1440px] ">
          <h3 className="text-[#C40452]">Customer Service Leader 미래신용정보</h3>
          <p className="mt-4">
            고객과 공감하며, 전문적인 상담을 통해 도움을 필요로 하는 고객에게 실질적 가치를 제공 한다.
            <br />
            획기적 창의·끊임없는 도전·자율적 혁신을 바탕으로 고객 만족을 넘어
            <br />
            진정한 고객 감동을 실현해 나갈 최고의 파트너 미래신용정보
          </p>
        </div>

        <Timeline />
      </section>
    </>
  );
}
