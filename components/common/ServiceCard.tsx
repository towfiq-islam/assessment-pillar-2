import Image from "next/image";
import { Service } from "@/components/home/Services";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <div
      className="animate-fade-up relative h-full overflow-hidden transition-transform duration-400 hover:-translate-y-1.5"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="h-full overflow-hidden rounded-2xl md:rounded-t-3xl rounded-b-[30px] bg-white/4 backdrop-blur-[6px] border-2 border-white/30 card">
        <h3 className="text-lg lg:text-xl xl:text-2xl text-white/90 font-semibold rounded-t-3xl p-4 xl:p-7 xl:pb-5 mb-7 lg:mb-10 xl:mb-16 border-b-2 border-white/30">
          {service.title}
        </h3>

        <figure className="relative w-full h-[280px] xl:h-[351px] overflow-hidden rounded-2xl">
          <Image
            src={service.mockupImg}
            alt={service.title}
            fill
            className="object-cover"
          />
        </figure>
      </div>
    </div>
  );
}
