"use client";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span
        className="animate-fade-up font-semibold tracking-widest text-primary-orange"
        style={{ animationDelay: "0s" }}
      >
        404
      </span>

      <h1
        className="animate-fade-up mt-2 md:mt-3 text-2xl md:text-3xl font-bold text-gray-900"
        style={{ animationDelay: "0.1s" }}
      >
        Page not found
      </h1>

      <p
        className="animate-fade-up mt-4 max-w-md text-gray-500 text-sm md:text-[15px]"
        style={{ animationDelay: "0.2s" }}
      >
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Check the URL, or head back to somewhere that does.
      </p>

      <div
        className="animate-fade-up mt-6 md:mt-8 flex flex-col items-center gap-3 sm:flex-row"
        style={{ animationDelay: "0.3s" }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 md:gap-2 rounded-full bg-primary-orange px-4 md:px-6 py-2 md:py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md hover:shadow-orange-500/20"
        >
          <FiArrowLeft className="h-4 w-4" />
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
