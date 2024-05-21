/* eslint-disable */
import React from "react";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import NavLink from "@/components/link/NavLink";
import { Dashboard } from "@mui/icons-material";
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  // Chakra color mode
  const pathname = usePathname();
  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      return (
        <NavLink key={index} href={route.layout + "/" + route.path}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li
              className="my-[3px] flex cursor-pointer items-center px-8"
              key={index}
            >
              <span
                className={`${
                  activeRoute(route.layout) === true
                    ? "font-bold text-blue-700"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.icon ? route.icon : <Dashboard />}
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  activeRoute(route.layout) === true
                    ? "font-bold text-gray-700"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.name}
              </p>
            </li>
            {activeRoute(route.layout) ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-blue-700" />
            ) : null}
          </div>
        </NavLink>
      );
    });
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
