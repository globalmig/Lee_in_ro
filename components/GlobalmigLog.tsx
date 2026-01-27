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
        // @ts-ignore
        window.wsa_do(window.wsa);
      }}
    />
  );
}
