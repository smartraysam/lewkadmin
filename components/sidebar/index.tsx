/* eslint-disable */
import Links from "./components/Links";
import { IRoute } from "@/types/navigation";

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`sm:none duration-175 linear w-[200px] fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96 xl:translate-x-0"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
      
      </span>

      <div className={`mx-5 mt-[50px] flex items-center`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-xl font-bold uppercase text-gray-600">
          LEWK's <span className="font-medium">Admin</span>
        </div>
      </div>
      <div className="mb-7 mt-8 h-px bg-gray-300" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Free Horizon Card */}
      <div className="flex justify-center">
        {/* <SidebarCard /> */}
        <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
          <p className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
            <span className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
              ©{new Date().getFullYear()}. All Rights Reserved.
            </span>
          </p>
        </div>
      </div>

      {/* Nav item end */}
    </div>
  );
}

export default SidebarHorizon;
