import React from "react";
import Navbar from "../_components/Navbar/Navbar";
import Footer from "../_components/Footer/Footer";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <div className=" w-full">
        <Navbar />
        <div className=" w-full">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default layout;
