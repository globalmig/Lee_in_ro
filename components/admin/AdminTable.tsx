import React from "react";

export default function AdminTable({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full">
          <thead className="bg-white/5">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 text-left text-sm font-bold text-white/80">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
