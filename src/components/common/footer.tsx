import Link from "next/link";
import React from "react";
import {
  FaDiscord,
  FaTwitter,
  FaTelegramPlane,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { Separator } from "../ui/separator";

const Footer = () => {
  const currentDate = new Date();
  const navs = [
    {
      icon: <FaTwitter />,
      link: "https://twitter.com/verida_io",
    },
    {
      icon: <FaTelegramPlane />,
      link: "https://t.me/verida_community/",
    },
    {
      icon: <FaLinkedinIn />,
      link: "https://linkedin.com",
    },
    {
      icon: <FaDiscord />,
      link: "https://discord.com/invite/qb6vS43",
    },
    {
      icon: <FaYoutube />,
      link: "https://www.youtube.com/channel/UC4FkEDSI7Kart2wNjj9Iozw",
    },
    {
      icon: <FaGithub />,
      link: "https://github.com/verida",
    },
  ];
  return (
    <div className="mx-auto max-w-[1350px] px-4 pb-5 sm:py-10 lg:px-[112px]">
      <Separator className="mb-6 mt-5 bg-white/20 sm:hidden" />
      <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:items-start sm:gap-0">
        <div>&copy; {currentDate.getFullYear()} Verida Storage Node</div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="text-[16px] font-normal leading-[24px]">
            Find us on
          </div>
          <div className="flex gap-3">
            {navs.map((nav, index) => (
              <a
                href={nav.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                {nav.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
