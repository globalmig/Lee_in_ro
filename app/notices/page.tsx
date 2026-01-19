import Hero from "@/components/common/Hero";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero img={"/notices_bg.png"} title={"공지사항"} />

      {/* Header */}
      <div className="space-y-2">
        <p className="text-[#C40452] font-semibold tracking-tight">Customer Service Leader</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">미래신용정보</h1>
      </div>
    </div>
  );
}
