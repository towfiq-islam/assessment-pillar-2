import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import ReduxProvider from "@/provider/ReduxProvider/ReduxProvider";
import ToastProvider from "@/provider/ToastProvider/ToastProvider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
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
    <html lang="en" className={`${urbanist.variable} antialiased`}>
      <body>
        <ReduxProvider>
          <ToastProvider />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
