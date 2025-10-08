import { Link } from "react-router";

const NotFoundPage = () => {
  const user = JSON.parse(sessionStorage.getItem("logedInUser"));

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Page not found</h1>
        <p className="!my-2">
          Try contacting the support service or try one of the listed links
        </p>
        {user.role == "teacher" ? (
          <Link to={"/page/home"} className="font-bold underline">
            Home
          </Link>
        ) : user.role == "admin" ? (
          <Link to={"/page/teachers"} className="font-bold underline">
            Home
          </Link>
        ) : (
          <Link to={"/"} className="font-bold underline">
            Home
          </Link>
        )}
      </div>
    </div>
  );
};

export { NotFoundPage };
