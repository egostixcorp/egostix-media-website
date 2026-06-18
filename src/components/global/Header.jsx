"use client";
import React from "react";
// import Logo from "@/components/Global/Logo";
import { header } from "@/data/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
const Header = () => {
  const path = usePathname();
  const basePath = "/" + path.split("/").filter(Boolean).slice(0, 2).join("/");
  return (
    <div
      id="wrapper"
      className="fixed top-0 h-16 z-[9999] w-full border-b border-neutral-200 bg-white/90 px-2 backdrop-blur tablet:px-[10%] laptop:px-[15%]"
    >
      <div
        id="content"
        className="flex h-full w-full items-center justify-between px-4 tablet:px-5"
      >
        <Link
          href={"/"}
          className="flex h-16 w-28 items-center justify-center overflow-hidden p-4 tablet:w-32 tablet:p-5"
        >
          <Image
            src={"/egostix-media-trans.png"}
            alt="Egostix Media Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-center gap-3 text-xs font-medium tablet:gap-4 tablet:text-sm"
        >
          {header.map((item, i) => {
            const isActive = basePath === item.route;

            return (
              <Link
                className={cn("hover:text-blue-600", {
                  "text-blue-600 ": isActive,
                })}
                key={i}
                href={item.route}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        {/* <div className="cursor-pointer">
          <Menu />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
