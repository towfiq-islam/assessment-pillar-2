"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaDribbble,
} from "react-icons/fa";

type FooterLink = {
  label: string;
  path: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const quickLinks: FooterLink[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "" },
  { label: "Resume", path: "" },
  { label: "Project", path: "" },
];

const serviceLinks: FooterLink[] = [
  { label: "UI/UX Design", path: "" },
  { label: "Web Design", path: "" },
  { label: "Landing Page", path: "" },
];

const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Dribbble", href: "https://dribbble.com", icon: FaDribbble },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-black text-white">
      <div className="container pt-7 md:pt-10 xl:pt-14 pb-5 md:pb-7 xl:pb-8">
        <div className="grid grid-cols-2 gap-7 md:gap-10 pb-4 md:pb-7 xl:pb-10 sm:grid-cols-4">
          <div className="animate-fade-up col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="logo" />
            </Link>
            <p className="mt-3 md:mt-4 max-w-[220px] text-sm text-white/60">
              Product designer crafting clean, human-centered digital
              experiences.
            </p>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} delay={0.1} />
          <FooterColumn title="Services" links={serviceLinks} delay={0.2} />

          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">
              Follow
            </h3>
            <ul className="flex flex-wrap gap-1.5 lg:gap-3 pb-3">
              {socialLinks?.map(({ href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 lg:size-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-primary-orange hover:text-white active:scale-90"
                  >
                    <Icon className="size-3.5 lg:size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="animate-fade-up flex flex-col-reverse items-center justify-between gap-2.5 md:gap-4 border-t border-white/10 pt-5 xl:pt-8 text-sm text-white/50 sm:flex-row"
          style={{ animationDelay: "0.15s" }}
        >
          <p>© {new Date().getFullYear()}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  delay = 0,
}: {
  title: string;
  links: FooterLink[];
  delay?: number;
}) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: `${delay}s` }}>
      <h3 className="mb-3 md:mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">
        {title}
      </h3>
      <ul className="space-y-2 md:space-y-3">
        {links.map(link => (
          <li key={link.label}>
            <Link
              href={link.label}
              className="text-sm hover:underline text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
