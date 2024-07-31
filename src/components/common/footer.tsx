import React from "react"
import {
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

import { cn } from "@/lib/utils/utils"

const platformLinks = [
  {
    icon: <FaXTwitter />,
    link: "https://twitter.com/verida_io",
  },
  {
    icon: <FaTelegramPlane />,
    link: "https://t.me/verida_community/",
  },
  {
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/company/verida-technology",
  },
  {
    icon: <FaDiscord />,
    link: "https://discord.verida.io/",
  },
  {
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@verida_io",
  },
  {
    icon: <FaGithub />,
    link: "https://github.com/verida",
  },
]

export type FooterProps = Omit<React.ComponentProps<"footer">, "children">

export const Footer: React.FC<FooterProps> = (props) => {
  const { className, ...footerProps } = props

  const currentDate = new Date()

  return (
    <footer className={cn("", className)} {...footerProps}>
      <div className="flex flex-row justify-center">
        <div className="flex w-full max-w-screen-xl flex-col items-center gap-6 px-4 py-6 sm:flex-row-reverse sm:justify-between sm:px-8 sm:py-10">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <div className="text-[16px] font-normal leading-[24px]">
              Find us on
            </div>
            <div className="flex gap-3">
              {platformLinks.map((platformLink) => (
                <a
                  key={platformLink.link}
                  href={platformLink.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platformLink.icon}
                </a>
              ))}
            </div>
          </div>
          <p>&copy; {currentDate.getFullYear()} Verida Network</p>
        </div>
      </div>
    </footer>
  )
}
