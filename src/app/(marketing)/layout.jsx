import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import React from "react";

const MarketingLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MarketingLayout;
