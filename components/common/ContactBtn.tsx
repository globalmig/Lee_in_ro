import Link from "next/link";
import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function ContactBtn() {
  return (
    <Link
      href={"/contact"}
      className="border border-[#C40452] rounded-md text-[#C40452] flex justify-center items-center py-4 gap-4 font-bold hover:bg-[#C40452] hover:text-white  w-full md:max-w-[320px] "
    >
      <FaRegPenToSquare />
      문의하기
    </Link>
  );
}
