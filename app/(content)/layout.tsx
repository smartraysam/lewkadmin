"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { getActiveNavbar, getActiveRoute } from "@/utils/navigation";
import routes from "@/utils/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <ToastContainer />
      <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin" />
      <div className="w-full font-dm h-screen">
        <main
          className={`mx-2.5 flex-none transition-all min-h-screen 
              md:pr-2 xl:ml-[200px]`}
        >
          <div className="min-h-screen">
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              brandText={getActiveRoute(routes, pathname)}
              secondary={getActiveNavbar(routes, pathname)}
            />
            <div className="p-2 min-h-screen">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
