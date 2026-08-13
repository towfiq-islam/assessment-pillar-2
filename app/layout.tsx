import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ReduxProvider from "@/provider/ReduxProvider/ReduxProvider";
import ToastProvider from "@/provider/ToastProvider/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JCREA",
  description: "An E-commerce Website",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        <ReduxProvider>
          <ToastProvider />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
