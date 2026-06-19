import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import CustomCursor from "@/components/global/CustomCursor";
import React from "react";

const MarketingLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <CustomCursor />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MarketingLayout;
