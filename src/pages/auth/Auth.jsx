import { Outlet } from "react-router";

const Auth = () => {

  return (
    <div className="w-screen h-screen bg-blue-500 flex flex-col xl:flex-row">
      <Outlet />
    </div>
  );
};

export { Auth };
