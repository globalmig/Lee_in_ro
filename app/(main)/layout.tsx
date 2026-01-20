import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
