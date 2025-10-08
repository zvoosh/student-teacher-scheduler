import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const Header = () => {
  const [menuOpen, isMenuOpen] = useState(false);
  const location = useLocation();

  const userRole = JSON.parse(sessionStorage.getItem("logedInUser")).role;

  return (
    <div className="w-full bg-gray-800 !p-5 flex flex-col 2xl:flex-row justify-center">
      <div
        className={`w-full justify-center items-center gap-3 !mb-5 flex flex-col transition-all duration-1000 ease-in-out transfrom overflow-hidden ${
          menuOpen
            ? "opacity-100 translate-y-0 max-h-[500px] block"
            : "opacity-0 -translate-y-5 pointer-event-none max-h-0 hidden"
        }`}
      >
        {userRole == "teacher" && (
          <>
            <Link
              to={"/page/home"}
              className={`!mx-5  ${
                location.pathname == "/page/home" && "text-gray-400"
              }`}
            >
              Home
            </Link>
            <Link
              to={"/page/approve"}
              className={`!mx-5  ${
                location.pathname == "/page/approve" && "text-gray-400"
              }`}
            >
              Approvement
            </Link>
            <Link
              to={"/page/message"}
              className={`!mx-5  ${
                location.pathname == "/page/message" && "text-gray-400"
              }`}
            >
              Messages
            </Link>
            <Link
              to={"/page/appointments"}
              className={`!mx-5  ${
                location.pathname == "/page/appointments" && "text-gray-400"
              }`}
            >
              Appointments
            </Link>
            <Link
              className="!mx-5"
              to={"/"}
              onClick={() => {
                sessionStorage.removeItem("logedInUser");
              }}
            >
              Logout
            </Link>
          </>
        )}
        {userRole == "admin" && (
          <>
            <Link
              to={"/page/teachers"}
              className={`!mx-5  ${
                location.pathname == "/page/teachers" && "text-gray-400"
              }`}
            >
              Teachers
            </Link>
            <Link
              to={"/page/students"}
              className={`!mx-5  ${
                location.pathname == "/page/students" && "text-gray-400"
              }`}
            >
              Students
            </Link>
            <Link
              className="!mx-5"
              to={"/"}
              onClick={() => {
                sessionStorage.removeItem("logedInUser");
              }}
            >
              Logout
            </Link>
          </>
        )}
        {userRole == "student" && (
          <>
            <Link
              to={"/page/teachers"}
              className={`!mx-5  ${
                location.pathname == "/page/teachers" && "text-gray-400"
              }`}
            >
              Teachers
            </Link>
            <Link
              to={"/page/book/appointment"}
              className={`!mx-5  ${
                location.pathname == "/page/book/appointment" && "text-gray-400"
              }`}
            >
              Book appointment
            </Link>
            <Link
              className="!mx-5"
              to={"/"}
              onClick={() => {
                sessionStorage.removeItem("logedInUser");
              }}
            >
              Logout
            </Link>
          </>
        )}
      </div>
      <div className="!py-2 flex flex-col justify-center items-center">
        <h1 className="text-sm 2xl:text-2xl font-bold text-center !mb-3 flex">
          <div
            className="block 2xl:hidden"
            onClick={() => {
              isMenuOpen((prev) => !prev);
            }}
          >
            <MenuOutlined />
          </div>
          <div>Student - Teacher Scheduling Application</div>
        </h1>
        <div className="hidden 2xl:block">
          {userRole == "teacher" && (
            <>
              <Link
                to={"/page/home"}
                className={`!mx-5 underline underline-offset-4 ${
                  location.pathname == "/page/home" && "text-gray-400"
                }`}
              >
                Home
              </Link>
              <Link
                to={"/page/approve"}
                className={`!mx-5 underline underline-offset-4 ${
                  location.pathname == "/page/approve" && "text-gray-400"
                }`}
              >
                Approvement
              </Link>
              <Link
                to={"/page/message"}
                className={`!mx-5 underline underline-offset-4 ${
                  location.pathname == "/page/message" && "text-gray-400"
                }`}
              >
                Messages
              </Link>
              <Link
                to={"/page/appointments"}
                className={`!mx-5 underline underline-offset-4 ${
                  location.pathname == "/page/appointments" && "text-gray-400"
                }`}
              >
                Appointments
              </Link>
              <Link
                to={"/"}
                className="!mx-5 underline underline-offset-4"
                onClick={() => {
                  sessionStorage.removeItem("logedInUser");
                }}
              >
                Logout
              </Link>
            </>
          )}
          {userRole == "admin" && (
            <>
              <Link
                to={"/page/teachers"}
                className={`!mx-5 underline underline-offset-4 ${
                  location.pathname == "/page/teachers" && "text-gray-400"
                }`}
              >
                Teachers
              </Link>
              <Link
                to={"/page/students"}
                className={`!mx-5 underline underline-offset-4 ${
                  location.pathname == "/page/students" && "text-gray-400"
                }`}
              >
                Students
              </Link>
              <Link
                to={"/"}
                className="!mx-5 underline underline-offset-4"
                onClick={() => {
                  sessionStorage.removeItem("logedInUser");
                }}
              >
                Logout
              </Link>
            </>
          )}
          {userRole == "student" && (
            <>
              <Link
                to={"/page/teachers"}
                className={`!mx-5 underline underline-offset-4 ${
                  location.pathname == "/page/teachers" && "text-gray-400"
                }`}
              >
                Teachers
              </Link>
              <Link
                to={"/page/book/appointment"}
                className={`!mx-5 underline underline-offset-4 ${
                  location.pathname == "/page/book/appointment" &&
                  "text-gray-400"
                }`}
              >
                Book Appoitment
              </Link>
              <Link
                to={"/"}
                className="!mx-5 underline underline-offset-4"
                onClick={() => {
                  sessionStorage.removeItem("logedInUser");
                }}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { Header };
