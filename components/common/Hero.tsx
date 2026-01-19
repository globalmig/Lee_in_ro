import React from "react";
import Image from "next/image";

interface HeroProp {
  img: string;
  title: string;
}

export default function Hero(item: HeroProp) {
  return (
    <div className="w-full h-[448px] relative flex justify-center items-center mb-16">
      <Image src={item.img} alt={item.title} fill className="absolute" />
      <h1 className="text-white relative">{item.title}</h1>
    </div>
  );
}
