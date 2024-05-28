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
      link: "https://twitter.com/",
    },
    {
      icon: <FaTelegramPlane />,
      link: "https://telegram.me/",
    },
    {
      icon: <FaLinkedinIn />,
      link: "https://linkedin.com",
    },
    {
      icon: <FaDiscord />,
      link: "https://discord.com",
    },
    {
      icon: <FaYoutube />,
      link: "https://youtube.com",
    },
    {
      icon: <FaGithub />,
      link: "https://github.com",
    },
  ];
  return (
    <div className="lg:px-[112px] px-4 sm:py-10 pb-5">
      <Separator className="sm:hidden bg-white/20 mt-5 mb-6" />
      <div className="flex sm:flex-row flex-col-reverse sm:items-start items-center sm:gap-0 gap-4 justify-between">
        <div>&copy; {currentDate.getFullYear()} Verida Storage Node</div>
        <div className="flex sm:flex-row flex-col items-center gap-4 sm:gap-6">
          <div className="text-[16px] font-normal leading-[24px]">
            Find us on
          </div>
          <div className="flex gap-3">
            {navs.map((nav, index) => (
              <a href={nav.link} key={index}>
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
