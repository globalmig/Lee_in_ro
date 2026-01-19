import React from "react";

interface DotTitleProp {
  title: string;
}

export default function DotTitle({ title }: DotTitleProp) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-4 h-4 rounded-full bg-[#C40452] relative">
        <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <h3 className="m-0 p-0">{title}</h3>
    </div>
  );
}
