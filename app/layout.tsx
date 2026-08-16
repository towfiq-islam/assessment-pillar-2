import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider/ReduxProvider";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import ToastProvider from "@/provider/ToastProvider/ToastProvider";
import AuthProvider from "@/provider/AuthProvider/AuthProvider";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${urbanist.variable} antialiased`}>
      <body>
        <AuthProvider>
          <ReduxProvider>
            <ToastProvider />
            {children}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
