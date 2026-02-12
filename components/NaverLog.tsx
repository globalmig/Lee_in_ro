"use client";

import Script from "next/script";

export default function NaverLog() {
  return (
    <Script
      src="//wcs.naver.net/wcslog.js"
      strategy="beforeInteractive"
      onLoad={() => {
        // @ts-ignore
        window.wcs_add = window.wcs_add || {};
        // @ts-ignore
        window.wcs_add.wa = "s_3146148b17b2";

        // @ts-ignore
        window._nasa = window._nasa || {};

        // Collect inflow under a single canonical host to avoid split tracking.
        // @ts-ignore
        if (window.wcs) {
          // @ts-ignore
          window.wcs.inflow("miraeinro.com");
          // @ts-ignore
          window.wcs_do();
        }
      }}
    />
  );
}
