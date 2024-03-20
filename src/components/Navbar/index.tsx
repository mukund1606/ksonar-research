"use client";
import NextLink from "next/link";

import { ThemeToggle } from "@/components/ThemeSwitcher";
import { IndustrySchema } from "@/types/forms";
import {
  Button,
  Card,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Building2, Mail, MessageSquare, Phone } from "lucide-react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="flex gap-2">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">KSonar Research</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="flex gap-12" justify="end">
        <div className="hidden gap-8 lg:flex">
          <NavbarItem isActive={pathname === "/"}>
            <Link
              as={NextLink}
              color={pathname === "/" ? "primary" : "foreground"}
              href="/"
              className="transition-all duration-400 hover:text-primary"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/about"}>
            <Link
              as={NextLink}
              color={pathname === "/about" ? "primary" : "foreground"}
              href="/about"
              className="transition-all duration-400 hover:text-primary"
            >
              About
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/reports"}>
            <Link
              as={NextLink}
              color={pathname === "/reports" ? "primary" : "foreground"}
              href="/reports"
              className="transition-all duration-400 hover:text-primary"
            >
              Reports
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Link
                  color="foreground"
                  className="cursor-pointer transition-all duration-400 hover:text-primary"
                >
                  Industry
                </Link>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              items={[
                {
                  key: "all",
                  label: "All",
                },
                ...IndustrySchema._def.values.map((i) => ({
                  key: i.toLowerCase(),
                  label: i,
                })),
              ]}
            >
              {(item) => (
                <DropdownItem
                  key={item.key}
                  as={NextLink}
                  href={`/reports?industry=${item.key}`}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          {session && (
            <NavbarItem isActive={pathname === "/admin"}>
              <Dropdown>
                <DropdownTrigger>
                  <Link
                    color={pathname === "/admin" ? "primary" : "foreground"}
                    className="cursor-pointer transition-all duration-400 hover:text-primary"
                  >
                    Manage
                  </Link>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem as={NextLink} href="/admin">
                    Dashboard
                  </DropdownItem>
                  <DropdownItem
                    onClick={async () => {
                      await signOut({ callbackUrl: "/" });
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
        </div>
        <div className="flex gap-2">
          <Popover placement="bottom" backdrop="transparent">
            <PopoverTrigger>
              <Button color="primary">Contact Us</Button>
            </PopoverTrigger>
            <PopoverContent className="bg-transparent shadow-none">
              <Card
                isFooterBlurred
                radius="lg"
                className="p-[6px items-center gap-1 border-none bg-opacity-60"
              >
                <Image
                  alt="Profile Pic"
                  className="aspect-[4/5] max-w-[280px] object-cover"
                  width={300}
                  height={375}
                  src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                />
                <CardFooter className="rounded-md border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
                  <div className="flex max-w-64 flex-col gap-2">
                    <div className="pb-2 text-medium">
                      <p>Hi, My name is XYZ</p>
                      <p>I am a researcher at KSonar Research</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail size={30} />
                      <Link
                        href="mailto:ksonarresearch@gmail.com"
                        className="text-black underline dark:text-white"
                      >
                        ksonarresearch@gmail.com
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={30} />
                      <Link
                        className="text-black underline dark:text-white"
                        href="https://wa.me/91XXXXXXXXXX"
                        target="_blank"
                      >
                        Whatsapp
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={30} />
                      <Link className="text-black dark:text-white">
                        +91 XXXXXXXXXX
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 size={30} />
                      <Link
                        href="#"
                        className="text-black underline dark:text-white"
                      >
                        19671 110 Avenue, Surrey,
                        <br />
                        British Columbia, V3R2A9
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </PopoverContent>
          </Popover>
          <ThemeToggle />
        </div>
      </NavbarContent>
      <NavbarMenu className="items-center pt-8">
        <NavbarMenuItem isActive={pathname === "/"}>
          <Link
            color={pathname === "/" ? "primary" : "foreground"}
            className="w-full"
            href="/"
            size="lg"
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/about"}>
          <Link
            color={pathname === "/about" ? "primary" : "foreground"}
            className="w-full"
            href="/about"
            size="lg"
          >
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/reports"}>
          <Link
            color={pathname === "/reports" ? "primary" : "foreground"}
            className="w-full"
            href="/reports"
            size="lg"
          >
            Reports
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Dropdown>
            <DropdownTrigger>
              <Link
                color="foreground"
                className="cursor-pointer transition-all duration-400 hover:text-primary-foreground"
              >
                Industry
              </Link>
            </DropdownTrigger>
            <DropdownMenu
              items={[
                {
                  key: "all",
                  label: "All",
                },
                ...IndustrySchema._def.values.map((i) => ({
                  key: i.toLowerCase(),
                  label: i,
                })),
              ]}
            >
              {(item) => (
                <DropdownItem
                  key={item.key}
                  as={NextLink}
                  href={`/reports?industry=${item.key}`}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
        {session && (
          <NavbarItem isActive={pathname === "/admin"}>
            <Dropdown>
              <DropdownTrigger>
                <Link
                  color={pathname === "/admin" ? "primary" : "foreground"}
                  className="cursor-pointer transition-all duration-400 hover:text-primary"
                >
                  Manage
                </Link>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem as={NextLink} href="/admin">
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  onClick={async () => {
                    await signOut({ callbackUrl: "/" });
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
