"use client";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import heroBg from "@/assets/hero.png";
import upperVector from "@/assets/upper_vector.png";
import lowerVector from "@/assets/lower_vector.png";

export default function Hero() {
  return (
    <section className="pb-4 pt-13 md:pt-16 xl:pt-18 text-secondary-black">
      <div className="container relative">
        <div
          className="hero-rise relative mx-auto mb-2 md:mb-3 w-fit"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="flex items-center gap-2 rounded-full border border-secondary-black/90 text-gray-800 px-5 md:px-6 xl:px-8 py-1.5 md:py-2 text-[15px] md:text-base xl:text-lg font-semibold">
            Hello
          </span>

          <Image
            src={upperVector}
            alt="upper-vector"
            className="object-contain absolute -right-6 -top-3.5 md:-top-5 w-6 md:w-7"
          />
        </div>

        {/* Title */}
        <div
          className="hero-rise relative w-fit mx-auto text-center"
          style={{ animationDelay: "0.2s" }}
        >
          <Image
            src={lowerVector}
            alt="upper-vector"
            className="absolute -left-7 md:-left-9 lg:-left-12 -bottom-5 md:-bottom-7 lg-bottom-9 text-primary-orange/70 w-7 md:w-9 lg:w-14"
          />

          <h1 className="font-bold leading-9 xl:leading-tight text-[32px] md:text-5xl xl:text-[65px]">
            I&apos;m <span className="text-primary-orange">Jenny</span>,
            <br />
            Project Designer
          </h1>
        </div>

        <div
          className="hero-rise relative mt-12 md:mt-14 lg:-mt-16 xl:-mt-22 grid items-center grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr]"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="xl:w-[280px]">
            <FaQuoteLeft className="mb-2 md:mb-3 lg:mb-4 size-4 md:size-6 text-[#344054] mx-0" />
            <p className="leading-relaxed text-[#344054] text-[13px] md:text-[15px] lg:text-base">
              Jenny&apos;s Exceptional product design ensure our website&apos;s
              success Highly Recommended
            </p>
          </div>

          <figure className="hero-scale hidden lg:block relative -ml-12 w-[600px] xl:w-[800px] h-[450px] xl:h-[550px]">
            <Image src={heroBg} alt="hero" priority className="w-full h-full" />
          </figure>

          <div className="mx-0 text-right">
            <div className="mb-1.5 md:mb-2 flex gap-1 text-primary-orange justify-end">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="size-3.5 md:size-4 xl:size-5" />
              ))}
            </div>
            <p className="text-xl md:text-2xl xl:text-3xl text-secondary-black/90 font-extrabold">
              10 Years
            </p>
            <p className="text-sm xl:text-[15px] font-medium text-secondary-black/80">
              Experience
            </p>
          </div>
        </div>

        <figure className="hero-scale -mt-14 md:-mt-5 lg:hidden block mx-auto relative w-full md:w-[600px] md:h-[450px]">
          <Image src={heroBg} alt="hero" priority className="w-full h-full" />
        </figure>
      </div>
    </section>
  );
}
