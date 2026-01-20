import Hero from "@/components/common/Hero";
import React from "react";
import { supabaseServer } from "@/lib/supabase/server";
import FaqAccordionClient from "./FaqAccordionClient";

type FAQItem = {
  id: string; // ✅ uuid
  title: string; // UI에서 쓰는 title = DB의 category
  question: string;
  answer: string;
};

export default async function FAQPage() {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("faq")
    .select("id, category, question, answer, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("faq fetch error:", error.message);
  }

  const faqData: FAQItem[] = (data ?? []).map((r) => ({
    id: r.id,
    title: r.category ?? "", // ✅ category가 title 역할
    question: r.question,
    answer: r.answer,
  }));

  return (
    <>
      <Hero img={"/hero_bg.png"} title={"FAQ"} />

      <div className="max-w-[1200px] mx-auto px-4 mb-32">
        {/* Header */}
        <div className="space-y-2 mb-10">
          <p className="text-[#C40452] font-semibold tracking-tight">Customer Service Leader</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">미래신용정보</h1>
        </div>

        <FaqAccordionClient faqData={faqData} />
      </div>
    </>
  );
}
