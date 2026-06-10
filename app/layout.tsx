import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from 'next-themes'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "오늘도 설계, 구현중~~",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 💡 핵심: suppressHydrationWarning을 추가합니다.
    <html suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
        
        <Header />

        <ThemeProvider>{children}</ThemeProvider>

        <Footer />
      </body>

    </html>
  );
}
