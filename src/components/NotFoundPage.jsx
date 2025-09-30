import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-800 text-white">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Page not found</h1>
        <p className="!my-2">Try contacting the support service or try one of the listed links</p>
        <Link to={"/page/about"} className="font-bold underline">Home</Link>
      </div>
    </div>
  );
};

export { NotFoundPage };
