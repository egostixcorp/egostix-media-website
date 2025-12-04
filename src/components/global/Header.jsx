"use client";
import React from "react";
// import Logo from "@/components/Global/Logo";
import { header } from "@/data/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu } from "lucide-react";
const Header = () => {
  const path = usePathname();
  const basePath = "/" + path.split("/").filter(Boolean).slice(0, 2).join("/");
  return (
    <div
      id="wrapper"
      className="redd fixed top-0 h-16 z-[9999] w-full p-2 tablet:px-[15%]"
    >
      <div
        id="content"
        className="redd flex h-full w-full items-center justify-between  bg-white/10 px-4  backdrop-blur-sm tablet:px-5"
      >
        <Link
          href={"/"}
          className="redd h-16 w-32 overflow-hidden flex items-center justify-center p-5"
        >
          <Image
            src={"/egostix-media-trans.png"}
            alt="Egostix Media Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>
        <div className="flex items-center justify-center gap-4 text-sm font-medium">
          {header.map((item, i) => {
            return (
              <Link
                className={cn("", {
                  "text-blue-600": basePath === item.route,
                })}
                key={i}
                href={item.route}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        {/* <div className="cursor-pointer">
          <Menu />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
