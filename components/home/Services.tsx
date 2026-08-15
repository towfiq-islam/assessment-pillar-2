"use client";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import serviceBg from "@/assets/Services.png";
import uiMockup from "@/assets/contain.png";
import webMockup from "@/assets/web_design.png";
import landingMockup from "@/assets/landing_page.png";
import { ServiceCard } from "../common/ServiceCard";

export type Service = {
  title: string;
  mockupImg: StaticImageData;
};

const services: Service[] = [
  { title: "UI/ UX Design", mockupImg: uiMockup },
  { title: "Web Design", mockupImg: webMockup },
  { title: "Landing Page", mockupImg: landingMockup },
  { title: "Brand Identity", mockupImg: uiMockup },
  { title: "App Design", mockupImg: webMockup },
  { title: "Motion Graphics", mockupImg: landingMockup },
  { title: "Product Design", mockupImg: uiMockup },
  { title: "Illustration", mockupImg: webMockup },
];

export default function Services() {
  return (
    <section className="relative -mt-7 md:-mt-10 overflow-hidden rounded-t-2xl md:rounded-t-[50px] bg-secondary-black text-white pb-9 xl:pb-12 pt-8 md:pt-10 lg:pt-14 xl:pt-24">
      {/* Background Image */}
      <Image
        src={serviceBg}
        alt="service"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="container relative">
        {/* Header */}
        <div className="animate-fade-up mb-7 md:mb-10 xl:mb-14 flex flex-col justify-between gap-2 md:gap-6 sm:flex-row md:items-center">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">
            My <span className="text-primary-orange">Services</span>
          </h2>
          <p className="max-w-lg text-sm md:text-[15px] xl:text-base text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus
            nunc, posuere in justo vulputate, bibendum sodales.
          </p>
        </div>

        {/* Cards */}
        <div className="overflow-hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={false}
            speed={600}
            pagination={{
              el: ".services-pagination",
              clickable: true,
              bulletClass: "service-dot",
              bulletActiveClass: "service-dot-active",
            }}
            breakpoints={{
              640: { slidesPerView: 1.3, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!overflow-hidden !pb-2"
          >
            {services.map((service, i) => (
              <SwiperSlide key={service.title} className="h-auto py-2">
                <ServiceCard service={service} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="services-pagination mt-4 md:mt-6 lg:mt-8 xl:mt-10 flex flex-wrap justify-center gap-2 [&_.service-dot]:h-2 [&_.service-dot]:w-2 [&_.service-dot]:rounded-full [&_.service-dot]:bg-white/20 [&_.service-dot]:cursor-pointer [&_.service-dot]:transition-all [&_.service-dot]:duration-300 [&_.service-dot]:ease-out  [&_.service-dot-active]:w-6 [&_.service-dot-active]:bg-primary-orange" />
      </div>
    </section>
  );
}
