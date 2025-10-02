import { Outlet } from "react-router";
import { Header } from "./Header";

const PageLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-800 text-white aboreto flex flex-col items-center overflow-y-scroll">
      <Header />
      <Outlet />
    </div>
  );
};

export { PageLayout };
