// components/contact/InquiryForm.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    wcs?: {
      trans: (conv: { type: string; value?: string }) => void;
      [key: string]: any; 
    };
    wcs_add?: {
      wa?: string;
      [key: string]: any;
    };
  }
}

type FormState = {
  name: string;
  phone: string;
  message: string;
  agree: boolean;
};

type Props = {
  onSubmit?: (data: Omit<FormState, "agree">) => Promise<void> | void;
  privacyUrl?: string;
};

type Field = "name" | "phone" | "message" | "agree" | null;

function ErrorBubble({ message, align = "left" }: { message: string; align?: "left" | "right" }) {
  return (
    <div className={`absolute top-full mt-2 z-20 ${align === "right" ? "right-0" : "left-0"}`}>
      <div className="relative rounded-lg bg-[#111] px-3 py-2 text-xs text-white shadow-lg">
        {message}
        <span className={`absolute -top-1 h-2 w-2 rotate-45 bg-[#111] ${align === "right" ? "right-4" : "left-4"}`} />
      </div>
    </div>
  );
}

export default function InquiryForm({ onSubmit, privacyUrl = "/privacy" }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<Field>(null);
  const [bubbleMsg, setBubbleMsg] = useState<string | null>(null);
  const [showBubble, setShowBubble] = useState(false);
  const [done, setDone] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const agreeRef = useRef<HTMLInputElement | null>(null);
  const bubbleTimer = useRef<number | null>(null);

  const phoneOnlyDigits = useMemo(() => form.phone.replace(/[^\d]/g, ""), [form.phone]);

  const handleChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value as any }));

    setDone(false);
    setErrorMsg(null);
    setErrorField(null);
    setShowBubble(false);
    setBubbleMsg(null);

    if (bubbleTimer.current) {
      window.clearTimeout(bubbleTimer.current);
      bubbleTimer.current = null;
    }
  };

  const focusField = (field: Field) => {
    const el = field === "name" ? nameRef.current : field === "phone" ? phoneRef.current : field === "message" ? messageRef.current : field === "agree" ? agreeRef.current : null;

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el.focus(), 50);
    }
  };

  const showFieldBubble = (field: Field, message: string) => {
    setErrorField(field);
    setBubbleMsg(message);
    setShowBubble(true);

    if (bubbleTimer.current) {
      window.clearTimeout(bubbleTimer.current);
      bubbleTimer.current = null;
    }

    bubbleTimer.current = window.setTimeout(() => {
      setShowBubble(false);
      setBubbleMsg(null);
      bubbleTimer.current = null;
    }, 2500);
  };

  const validate = (): { ok: true } | { ok: false; field: Field; message: string } => {
    if (!form.name.trim()) return { ok: false, field: "name", message: "이름을 입력해주세요." };
    if (phoneOnlyDigits.length < 10) return { ok: false, field: "phone", message: "전화번호를 정확히 입력해주세요. (숫자만 10자리 이상)" };
    if (!form.message.trim()) return { ok: false, field: "message", message: "문의 내용을 입력해주세요." };
    if (!form.agree) return { ok: false, field: "agree", message: "개인정보처리방침에 동의해주세요." };
    return { ok: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setDone(false);

    const v = validate();
    if (!v.ok) {
      focusField(v.field);
      showFieldBubble(v.field, v.message);
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: form.name.trim(),
        phone: phoneOnlyDigits,
        message: form.message.trim(),
      };

      if (onSubmit) await onSubmit(payload);

      // --- NAVER 신청완료(lead) 스크립트 실행 ---
      if (window.wcs) {
        if (!window.wcs_add) window.wcs_add = {};
        
        window.wcs_add.wa = 's_3146148b17b2'; 

        const _conv = {
          type: 'lead',
        };
        
        window.wcs.trans(_conv);
      }
      // ---------------------------------------

      setDone(true);
      setForm({ name: "", phone: "", message: "", agree: false });

      setErrorField(null);
      setShowBubble(false);
      setBubbleMsg(null);
    } catch (err: any) {
      setErrorMsg(err?.message ?? "전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase = "h-11 md:h-12 w-full rounded-md border px-3 md:px-4 text-sm outline-none focus:border-[#C40452] transition-colors";
  const textareaBase = "w-full resize-none rounded-md border px-3 md:px-4 py-2 md:py-3 text-sm leading-6 outline-none focus:border-[#C40452] transition-colors";
  const errorBorder = "border-red-400";
  const normalBorder = "border-[#BFBFBF]";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto sm:px-0">
      <div className="space-y-4 md:space-y-5">
        {/* 이름 */}
        <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-center gap-2 md:gap-4">
          <label className="text-sm font-semibold text-[#111]">
            이름 <span className="text-[#C40452]">*</span>
          </label>

          <div className="relative">
            <input
              ref={nameRef}
              value={form.name}
              onChange={handleChange("name")}
              placeholder="이름을 입력해주세요."
              className={`${inputBase} ${errorField === "name" ? errorBorder : normalBorder}`}
            />

            {showBubble && errorField === "name" && bubbleMsg && (
              <div className="animate-[fadeIn_0.18s_ease-out]">
                <ErrorBubble message={bubbleMsg} />
              </div>
            )}
          </div>
        </div>

        {/* 전화번호 */}
        <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-center gap-2 md:gap-4">
          <label className="text-sm font-semibold text-[#111]">
            전화번호 <span className="text-[#C40452]">*</span>
          </label>

          <div className="relative">
            <input
              ref={phoneRef}
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="전화번호를 입력해주세요."
              inputMode="tel"
              className={`${inputBase} ${errorField === "phone" ? errorBorder : normalBorder}`}
            />

            {showBubble && errorField === "phone" && bubbleMsg && (
              <div className="animate-[fadeIn_0.18s_ease-out]">
                <ErrorBubble message={bubbleMsg} />
              </div>
            )}
          </div>
        </div>

        {/* 내용 */}
        <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-2 md:gap-4">
          <label className="text-sm font-semibold text-[#111] md:pt-2">
            내용 <span className="text-[#C40452]">*</span>
          </label>

          <div className="relative">
            <textarea
              ref={messageRef}
              value={form.message}
              onChange={handleChange("message")}
              placeholder="내용을 입력해주세요."
              rows={6}
              className={`${textareaBase} ${errorField === "message" ? errorBorder : normalBorder} md:rows-8`}
            />

            {showBubble && errorField === "message" && bubbleMsg && (
              <div className="animate-[fadeIn_0.18s_ease-out]">
                <ErrorBubble message={bubbleMsg} />
              </div>
            )}
          </div>
        </div>

        {/* 개인정보 동의 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-2">
          <div className="relative flex-1">
            <label className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-[#111]">
              <input
                ref={agreeRef}
                type="checkbox"
                checked={form.agree}
                onChange={handleChange("agree")}
                className={`h-4 w-4 flex-shrink-0 accent-black ${errorField === "agree" ? "outline outline-2 outline-red-400 rounded-[2px]" : ""}`}
              />
              <span className="leading-tight">개인정보처리방침을 읽었으며 이에 동의합니다.</span>
            </label>

            {showBubble && errorField === "agree" && bubbleMsg && (
              <div className="animate-[fadeIn_0.18s_ease-out]">
                <ErrorBubble message={bubbleMsg} align="left" />
              </div>
            )}
          </div>

          <a href={privacyUrl} className="text-xs md:text-sm text-[#111] underline underline-offset-4 hover:text-[#C40452] transition-colors whitespace-nowrap self-start sm:self-auto">
            자세히 보기
          </a>
        </div>

        {/* 메시지 */}
        {errorMsg && <p className="text-sm text-red-600 px-1">{errorMsg}</p>}
        {done && <p className="text-sm text-emerald-600 px-1">문의가 접수되었습니다.</p>}

        {/* 버튼 */}
        <div className="pt-2 md:pt-3">
          <button
            type="submit"
            disabled={submitting}
            className="
              h-11 md:h-12 w-full rounded-md
              border border-[#C40452]
              bg-white text-[#C40452] font-semibold text-sm md:text-base
              hover:bg-[#C40452] hover:text-white
              disabled:cursor-not-allowed disabled:opacity-50
              transition-all
            "
          >
            {submitting ? "전송 중..." : "문의하기"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </form>
  );
}
