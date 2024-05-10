"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { getActiveNavbar, getActiveRoute } from "@/utils/navigation";
import routes from "@/utils/routes";

export default function Admin({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full bg-gray-100">
      <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin" />

      <div className="h-full w-full font-dm">
        <main
          className={`mx-2.5 flex-none transition-all 
              md:pr-2 xl:ml-[323px]`}
        >
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              brandText={getActiveRoute(routes, pathname)}
              secondary={getActiveNavbar(routes, pathname)}
            />
            <div className="mx-auto p-2 overflow-hidden">{children}</div>
            <div className="p-3"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
