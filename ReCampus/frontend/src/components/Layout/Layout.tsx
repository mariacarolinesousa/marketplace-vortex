import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {children}
      </main>

      <Footer />
    </div>
  );
}