import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import GlobalmigLog from "@/components/GlobalmigLog";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <footer className="mt-auto">
        <Footer />
        {/* <GlobalmigLog /> */}
      </footer>
    </>
  );
}
