"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = ["Live", "Schedule", "Points"] as const;

const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-10 bg-[#061e59] text-white shadow">
        <div className="max-w-6xl mx-auto flex justify-between px-4 py-5">
          <Link href="/">
            <h1 className="text-xl font-bold cursor-pointer">
              🏏 IPL Dashboard
            </h1>
          </Link>
          <div className="flex gap-4">
            {TABS.map((tab) => {
              const href = `/${tab.toLowerCase()}`;
              const isActive = pathname === href;
              return (
                <Link key={tab} href={href}>
                  <button
                    className={`text-sm font-medium px-3 py-2 rounded transition ${
                      isActive
                        ? "bg-white text-[#061e59]"
                        : "text-white hover:bg-[#0d2a75]"
                    }`}
                  >
                    {tab}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {pathname === "/" && (
        <div
          className="relative w-full h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-3xl sm:text-5xl font-bold mb-2">
              🏆 RCB and the Feeling of Being Champions
            </h2>
            <p className="text-sm sm:text-base">04 June 2025</p>
          </div>
        </div>
      )}

      {pathname !== "/" && <main className="mx-auto">{children}</main>}
    </div>
  );
};

export default DashboardLayout;
