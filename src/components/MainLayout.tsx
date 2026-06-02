import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen bg-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="w-full px-10 pt-15 overflow-auto max-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
