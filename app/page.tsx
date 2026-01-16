import Link from "next/link";
import React from "react";
import { FaPrint } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Image from "next/image";

export default function page() {
  return (
    <>
      <ul className="absolute  left-10 top-1/2 text-white z-10">
        <li className="mb-4">· 상담신청</li>
        <li className="mb-4">· 사업영역</li>
        <li className="mb-4">· 회사소개</li>
      </ul>

      <div className="absolute text-white right-10 top-5">
        <p className="font-semibold">고객지원센터 1833-4980</p>
        <div className="flex gap-2 my-2">
          <FaPrint />
          <p className="text-sm font-light">02-415-3559</p>
        </div>
        <div className="flex gap-2">
          <MdEmail />
          <p className="text-sm font-light">jklee7711@naver.com</p>
        </div>
      </div>

      <section className="h-screen bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: "url('/hero_bg.png')" }}>
        <div className="mainTitle flex flex-col justify-center items-center h-full gap-12">
          <div className="text-center">
            <p className="text-5xl mb-4 ">내 채권의 미래</p>
            <h2>미래신용 정보</h2>
          </div>

          <p className="text-center">
            더 이상 스트레스 받지 마세요!
            <br />
            대신 해결해드립니다.
          </p>
          <Link href={"/contact"} className="py-4 px-20 border text-2xl hover:pink hover:font-bold hover:border-[#c40452]">
            상담신청
          </Link>
        </div>
      </section>
      <section className="h-screen bg-cover bg-center bg-no-repeat text-white text-center flex flex-col justify-center items-center" style={{ backgroundImage: "url('/second_bg.png')" }}>
        <h2>미래신용정보 서비스</h2>
        <div className="itemList grid grid-cols-2 md:grid-cols-4 max-w-[1440px] w-full my-12 md:my-40">
          <div className="CRM flex flex-col justify-center items-center">
            <Image src={"/icon/CRM.png"} alt="CRM서비스" width={200} height={200} className="" />
            <h3>CRM 서비스</h3>
            <p className="text-sm">
              상담·마케팅·심사·모니터링
              <br />
              고객관리 통합 솔루션 제공
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image src={"/icon/money.png"} alt="채권관리" width={200} height={200} className="" />
            <h3>채권관리</h3>
            <p className="text-sm text-center">
              미납요금 상담부터 회수까지,
              <br /> 토탈 미납관리 서비스 제공
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image src={"/icon/management.png"} alt="민,상사 채권관리" width={200} height={200} className="" />
            <h3>민,상사 채권관리</h3>
            <p className="text-sm text-center">
              권원이 인정된 개인 대여금,
              <br /> 민사·상사채권 관리 지원
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image src={"/icon/search.png"} alt="신용조사" width={200} height={200} className="" />
            <h3>신용조사</h3>
            <p className="text-sm text-center">
              거래 상대방의 신용상태 및<br /> 재산 보유 여부 조사
            </p>
          </div>
        </div>
      </section>
      <section className="h-screen">
        <Image src={"/AI_bg.png"} alt="" width={100} height={100} className="w-full" />
        <Image src={"/AI_full_body.png"} alt="" width={100} height={100} className="w-full" />
      </section>
    </>
  );
}
