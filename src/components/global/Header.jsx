"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, ArrowRight } from "lucide-react";
import { header } from "@/data/nav";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import { createClient } from "@/utils/supabase/client";

const Header = () => {
  const path = usePathname();
  const basePath = path
    ? "/" + path.split("/").filter(Boolean).slice(0, 2).join("/")
    : "/";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [path]);

  return (
    <header
      id="wrapper"
      className="fixed top-0 h-16 z-[9999] w-full border-b border-neutral-200 bg-white/90 px-2 backdrop-blur tablet:px-[10%] laptop:px-[15%]"
    >
      <div
        id="content"
        className="flex h-full w-full items-center justify-between px-3 tablet:px-5"
      >
        {/* Desktop View: Logo on left, Nav in middle, Auth on right */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Link
            href="/"
            className="flex h-16 w-28 items-center justify-center overflow-hidden tablet:w-32"
          >
            <Image
              src="/egostix-media-trans.png"
              alt="Egostix Media Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </Link>

          <nav
            aria-label="Primary desktop navigation"
            className="flex items-center justify-center gap-4 text-xs font-medium tablet:gap-6 tablet:text-sm font-inter"
          >
            {header.map((item, i) => {
              const isActive = basePath === item.route;
              return (
                <Link
                  key={i}
                  href={item.route}
                  className={cn(
                    "transition-colors hover:text-blue-600 font-mono text-xs",
                    {
                      "text-blue-600 font-bold": isActive,
                      "text-slate-700": !isActive,
                    }
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded bg-blue-700 px-4 py-2 font-mono text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-800 shadow-sm"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-mono font-semibold text-slate-700 hover:text-blue-700 px-2 py-2 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded bg-blue-700 px-3.5 py-1.5 font-mono text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-800 shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile View: Logo on Left; Sign Up + Hamburger Menu Trigger on Right */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Mobile Left: Egostix Media Logo ONLY */}
          <Link
            href="/"
            className="flex h-16 w-24 items-center justify-center overflow-hidden"
          >
            <Image
              src="/egostix-media-trans.png"
              alt="Egostix Media Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Mobile Right: Sign Up Button + Hamburger UI Sheet Trigger */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded bg-blue-700 px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-sm hover:bg-blue-800 transition"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded bg-blue-700 px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-sm hover:bg-blue-800 transition"
              >
                Sign Up
              </Link>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="flex size-10 items-center justify-center rounded-md border border-neutral-200 bg-white text-slate-800 hover:bg-neutral-50 transition"
                  aria-label="Open mobile menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="flex flex-col justify-between w-4/5 sm:max-w-sm bg-white p-6 z-[10000]">
                {/* Sheet Header - Title ONLY (No description subtitle) */}
                <SheetHeader className="text-left border-b border-neutral-100 pb-3">
                  <SheetTitle className="font-mono text-lg font-bold text-slate-900">
                    Egostix Media
                  </SheetTitle>
                </SheetHeader>

                {/* Navigation List */}
                <nav aria-label="Mobile navigation" className="flex flex-col space-y-3 py-6">
                  {header.map((item, i) => {
                    const isActive = basePath === item.route;
                    return (
                      <SheetClose asChild key={i}>
                        <Link
                          href={item.route}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "font-mono text-sm py-2 px-3 rounded-md transition-colors flex items-center justify-between",
                            {
                              "bg-blue-50 text-blue-700 font-bold border border-blue-100": isActive,
                              "text-slate-700 hover:bg-neutral-50": !isActive,
                            }
                          )}
                        >
                          <span>{item.label}</span>
                          {isActive && <span className="size-1.5 rounded-full bg-blue-600" />}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Bottom Actions Area: Auth deep subtle blue container + Standalone Contact CTA */}
                <div className="mt-auto border-t border-neutral-200 pt-5 space-y-3">
                  {/* Subtle blue deep container for Login & Sign Up */}
                  <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-3 shadow-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <SheetClose asChild>
                        <Link
                          href="/login"
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center rounded border border-neutral-300 bg-white py-2 font-mono text-xs font-semibold text-slate-700 hover:bg-neutral-50 transition text-center shadow-2xs"
                        >
                          Login
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/signup"
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center rounded bg-blue-700 py-2 font-mono text-xs font-semibold text-white hover:bg-blue-800 transition text-center shadow-xs"
                        >
                          Sign Up
                        </Link>
                      </SheetClose>
                    </div>
                  </div>

                  {/* Standalone Highlighted Main Contact CTA Button */}
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded bg-blue-700 px-4 py-3 font-mono text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-blue-800 active:scale-95 text-center"
                    >
                      <span>Contact Us & Inquiry</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

