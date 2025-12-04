import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex h-80 relative redd mt-5 w-full items-center justify-between">
      <div className="px-[15%] text-xs flex items-center justify-center w-full">
        <p className="absolute bottom-0 p-1">
          <Link href={"https://egostix.com/"} target="_blank">
            Copyright © {new Date().getFullYear()} Egostix Engineering Pvt. Ltd.
            All rights reserved.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
