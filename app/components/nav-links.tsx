"use client";

import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const links = [
  { name: "Material UI", href: "/", icon: VerticalSplitIcon },
  {
    name: "TailwindCSS",
    href: "/tailwind",
    icon: ViewListIcon,
  },
  { name: "ShadCN", href: "/shadcn", icon: ViewModuleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-purple-600 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "border border-solid border-purple-600 text-purple-600":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
