import { Outlet } from "react-router";
import { Header } from "./Header";

const PageLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-blue-500 text-white aboreto">
      <Header />
      <Outlet />
    </div>
  );
};

export { PageLayout };
