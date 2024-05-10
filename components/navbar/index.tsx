import React from "react";
import NavLink from "../link/NavLink";

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText, mini, hovered } = props;

  return (
    <nav className="top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl p-2 backdrop-blur-xl bg-white/10">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <NavLink
            className="text-sm font-normal capitalize text-black hover:underline"
            href="#"
          >
            {brandText}
          </NavLink>
        </div>
        <p className="shrink text-[33px] capitalize text-black">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-gray-400"
          >
            {brandText}
          </NavLink>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
