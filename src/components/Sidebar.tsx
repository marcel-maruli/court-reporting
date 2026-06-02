"use client";

import { getUserInfo } from "@/utils/getUserInfo";
import { BriefcaseBusiness, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Routes = [
  { url: "/job-list", name: "Job List", icon: BriefcaseBusiness },
];

const Sidebar = () => {
  const router = useRouter();
  const location = usePathname();
  const [user, setUser] = useState({ email: "", role: "", username: "" });

  useEffect(() => {
    const info = getUserInfo();
    if (info.email) {
      setUser(info);
    }
  }, []);

  const isCurrentPath = (url: string) => location === url;

  return (
    <div className="text-black font-medium bg-white shadow-xl w-64 h-[calc(100dvh-60px)] border-r">
      <div className="flex flex-col w-full">
        <div className="border-b flex items-center gap-3 py-6 px-4 bg-gray-50">
          <div className="border bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-sm">
            <User2 className="text-gray-600" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.username || ""}</p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || ""}
            </p>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase font-bold">
              {user?.role || ""}
            </span>
          </div>
        </div>

        <div className="flex-1 mt-4">
          {Routes.map((route) => {
            return (
              <div key={route.name} className="border-b border-gray-100">
                <button
                  className={`flex items-center justify-between px-4 py-4 w-full text-left transition-colors hover:bg-gray-50 ${
                    isCurrentPath(route.url || "")
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700"
                  }`}
                  onClick={() => router.push(route.url!)}
                >
                  <div className="flex items-center gap-3">
                    <route.icon size={20} />
                    <span>{route.name}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
