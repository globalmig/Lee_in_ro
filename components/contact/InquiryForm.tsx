// components/contact/InquiryForm.tsx
"use client";

import React, { useMemo, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  message: string;
  agree: boolean;
};

type Props = {
  onSubmit?: (data: Omit<FormState, "agree">) => Promise<void> | void;
  privacyUrl?: string; // "자세히 보기" 링크
};

export default function InquiryForm({ onSubmit, privacyUrl = "/privacy" }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const phoneOnlyDigits = useMemo(() => form.phone.replace(/[^\d]/g, ""), [form.phone]);

  const isValid = useMemo(() => {
    if (!form.name.trim()) return false;
    if (phoneOnlyDigits.length < 9) return false; // 최소 길이(지역번호 포함 대략)
    if (!form.message.trim()) return false;
    if (!form.agree) return false;
    return true;
  }, [form.name, form.message, form.agree, phoneOnlyDigits.length]);

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value as any }));
      setDone(false);
      setErrorMsg(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setDone(false);

    if (!isValid) {
      setErrorMsg("필수 항목을 모두 입력하고 개인정보처리방침에 동의해주세요.");
      return;
    }

    try {
      setSubmitting(true);

      // 기본 동작: props로 onSubmit이 없으면 콘솔 출력만
      const payload = {
        name: form.name.trim(),
        phone: phoneOnlyDigits,
        message: form.message.trim(),
      };

      if (onSubmit) await onSubmit(payload);

      setDone(true);
      setForm({ name: "", phone: "", message: "", agree: false });
    } catch (err: any) {
      setErrorMsg(err?.message ?? "전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-5">
        {/* 이름 */}
        <div className="grid grid-cols-[90px_1fr] items-center gap-4 sm:grid-cols-[120px_1fr]">
          <label className="text-sm font-semibold text-[#111]">
            이름 <span className="text-[#C40452]">*</span>
          </label>
          <input
            value={form.name}
            onChange={handleChange("name")}
            placeholder="이름을 입력해주세요."
            className="h-12 w-full rounded-md border border-[#BFBFBF] px-4 text-sm outline-none focus:border-[#C40452]"
          />
        </div>

        {/* 전화번호 */}
        <div className="grid grid-cols-[90px_1fr] items-center gap-4 sm:grid-cols-[120px_1fr]">
          <label className="text-sm font-semibold text-[#111]">
            전화번호 <span className="text-[#C40452]">*</span>
          </label>
          <input
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder="전화번호를 입력해주세요."
            inputMode="tel"
            className="h-12 w-full rounded-md border border-[#BFBFBF] px-4 text-sm outline-none focus:border-[#C40452]"
          />
        </div>

        {/* 내용 */}
        <div className="grid grid-cols-[90px_1fr] items-start gap-4 sm:grid-cols-[120px_1fr]">
          <label className="pt-2 text-sm font-semibold text-[#111]">
            내용 <span className="text-[#C40452]">*</span>
          </label>
          <textarea
            value={form.message}
            onChange={handleChange("message")}
            placeholder="내용을 입력해주세요."
            rows={8}
            className="w-full resize-none rounded-md border border-[#BFBFBF] px-4 py-3 text-sm leading-6 outline-none focus:border-[#C40452]"
          />
        </div>

        {/* 개인정보 동의 */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <label className="flex items-center gap-3 text-xs sm:text-sm text-[#111]">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={handleChange("agree")}
              className="h-4 w-4 accent-black"
            />
            <span>개인정보처리방침을 읽었으며 이에 동의합니다.</span>
          </label>

          <a href={privacyUrl} className="text-xs sm:text-sm text-[#111] underline underline-offset-4 hover:text-[#C40452]">
            자세히 보기
          </a>
        </div>

        {/* 메시지 */}
        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
        {done && <p className="text-sm text-emerald-600">문의가 접수되었습니다.</p>}

        {/* 버튼 */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!isValid || submitting}
            className="
              h-12 w-full rounded-md
              border border-[#C40452]
              bg-white text-[#C40452] font-semibold
              hover:bg-[#C40452] hover:text-white
              disabled:cursor-not-allowed disabled:opacity-50
              transition
            "
          >
            {submitting ? "전송 중..." : "문의하기"}
          </button>
        </div>
      </div>
    </form>
  );
}
