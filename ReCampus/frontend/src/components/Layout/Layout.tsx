import type { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </>
  );
}