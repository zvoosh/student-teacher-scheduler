import { useEffect, useState } from "react";
import { Outlet } from "react-router";

const images = [
  "/images/tabloid4.jpg",
  "/images/tabloid5.jpg",
  "/images/tabloid6.jpg",
  "/images/tabloid7.jpg",
];

const Auth = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-screen h-screen bg-blue-500 flex">
      <div className="w-1/2 h-screen flex items-center justify-center overflow-hidden">
        {/* Image slider */}
        <div className="w-full relative overflow-hidden aspect-[3/4]">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === imageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
        <Outlet />
    </div>
  );
};

export { Auth };
