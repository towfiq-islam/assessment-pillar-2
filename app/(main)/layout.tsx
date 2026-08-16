import React from "react";
import { auth } from "@/auth";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <>
      {/* <Navbar user={session?.user} /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
