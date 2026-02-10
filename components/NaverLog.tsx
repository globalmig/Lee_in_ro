import Script from "next/script";

export default function NaverLog() {
  return (
    <Script
      src="//wcs.naver.net/wcslog.js"
      strategy="beforeInteractive"
       dangerouslySetInnerHTML={{
       __html: `
       if (!wcs_add) var wcs_add={};
      wcs_add["wa"] = "s_3146148b17b2";
      if (!_nasa) var _nasa={};
      if(window.wcs){
      wcs.inflow();
      wcs_do();
       `}}
      />
  );
}
