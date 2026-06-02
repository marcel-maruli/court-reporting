"use client";

import { ArrowLeft, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { back } = useRouter();
  const pathname = usePathname();
  const router = useRouter();
  const urlSplitted = pathname.split("/");
  const isUserDetail = urlSplitted.length === 3 && urlSplitted[1] === "users";

  const [isMobile, setIsMobile] = useState(false);

  const onLogout = () => {
    document.cookie = `userAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;  path=/`;
    router.push("/login");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    setIsMobile(mediaQuery.matches);
  }, []);

  return (
    <div className="bg-gray-600 w-screen h-15 flex items-center py-4 px-4 pr-10 sticky top-0 gap-5 z-50 justify-between">
      {isMobile && isUserDetail && (
        <button className="text-white" onClick={back}>
          <ArrowLeft size={20} />
        </button>
      )}
      <p className="text-white font-medium">Court Reporting System</p>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
      >
        Logout <LogOut size={18} />
      </button>
    </div>
  );
};

export default Navbar;
