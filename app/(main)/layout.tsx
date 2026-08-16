import React from "react";
import Footer from "@/shared/Footer";
import ServerNavbar from "@/shared/ServerNavbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ServerNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
