"use client";
import React, { useState, useEffect } from "react";
// import Logo from "@/components/Global/Logo";
import { header } from "@/data/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Header = () => {
  const path = usePathname();
  const basePath = path ? "/" + path.split("/").filter(Boolean).slice(0, 2).join("/") : "/";
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Monitor login status via storage on mount/refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = sessionStorage.getItem("egostix_session_user");
      setIsLoggedIn(!!savedUser);
    }
  }, [path]); // Trigger re-check whenever the path changes to reflect login/logout updates

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
        {/* Dynamic Auth Buttons Container */}
        {process.env.NODE_ENV === "development" && (
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded bg-blue-700 px-4 py-2 font-mono text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-800 hover:scale-[1.02] active:scale-100 shadow-sm"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("egostix_auth_tab", "login");
                    }
                  }}
                  className="text-xs font-mono font-semibold text-slate-700 hover:text-blue-700 px-2 py-2 transition"
                >
                  Login
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("egostix_auth_tab", "signup");
                    }
                  }}
                  className="inline-flex items-center justify-center rounded bg-blue-700 px-3.5 py-1.5 font-mono text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-800 hover:scale-[1.02] active:scale-100 shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
