"use client";

import Script from "next/script";

export default function GlobalmigLog() {
  return (
    <Script
      src="//wsa.mig-log.com/wsalog.js"
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-ignore
        window.wsa = window.wsa || {};
        // @ts-ignore
        window.wsa.inflow("www.miraeinro.com");

        // body가 준비될 때까지 한번 더 보장
        const run = () => {
          // @ts-ignore
          window.wsa_do(window.wsa);
        };
        if (document.body) run();
        else window.addEventListener("DOMContentLoaded", run, { once: true });
      }}
    />
  );
}
