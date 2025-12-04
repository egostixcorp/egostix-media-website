import Image from "next/image";
import React from "react";

// Add/update your partner list here
const PARTNERS = [
  {
    name: "Anubit",
    logo: "/partners/anubit.webp",
  },
  {
    name: "Your Maker",
    logo: "/partners/ym.png",
  },
];

const PartnersMarquee = () => {
  // Duplicate array so marquee loops smoothly
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <div className="w-full overflow-hidden  bg-white border-t flex items-center justify-center border-b">
      <h2 className="text-center text-xl laptop:text-4xl font-mono ">
        Our Partners
      </h2>

      <div className="relative flex tablet:w-56 w-44 redd overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-10 px-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 opacity-80 hover:opacity-100 transition justify-center"
            >
              <div className="h-10 w-28 relative">
                <Image
                  src={item.logo}
                  alt={item.name}
                  //   width={1000}
                  //   height={1000}
                  fill
                  className="object-contain"
                />
              </div>
              {/* <span className="font-inter text-sm tablet:text-base">
                {item.name}
              </span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersMarquee;
