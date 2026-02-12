import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import GlobalmigLog from "@/components/GlobalmigLog";
import NaverLog from "@/components/NaverLog";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = "https://miraeinro.com";
const SITE_NAME = "미래신용정보 이인로";
const TITLE = "미래신용정보 이인로 | 채권관리, 신용조사, CRM 고객관리";
const DESCRIPTION = "상담·마케팅·심사·모니터링과 채권관리, 신용조사까지 제공하는 CRM 고객관리 통합 솔루션";
const KEYWORDS = [
  "CRM",
  "CRM 서비스",
  "고객관리",
  "고객관리 시스템",
  "상담 CRM",
  "마케팅 CRM",
  "심사",
  "모니터링",
  "채권관리",
  "미납관리",
  "민사채권",
  "상사채권",
  "신용조사",
  "재산조사",
  "통합 솔루션",
  "미래신용정보",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  other: {
    "naver-site-verification": "69c364dc405e5b5738f9fb974500fc4e549ebfeb",
  },

  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: "/",
    languages: {
      ko: "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.png", // public/og.png 준비 권장 (1200x630)
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - CRM 고객관리 통합 솔루션`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // 사이트 아이콘 세팅 (public 경로)
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen">{children}</div>
        {/* <Script type="text/javascript" src="//wsa.mig-log.com/wsalog.js"></Script>
        <Script type="text/javascript">wsa.inflow("miraeinro.com"); wsa_do(wsa);</Script> */}
        {/* <!-- 공통 적용 스크립트 , 모든 페이지에 노출되도록 설치. 단 전환페이지 설정값보다 항상 하단에 위치해야함 --> */}
        <GlobalmigLog />
        {/* Naver-Log Script */}
        <NaverLog/>
      </body>
    </html>
  );
}
