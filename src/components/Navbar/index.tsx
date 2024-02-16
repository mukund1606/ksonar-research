"use client";
import NextLink from "next/link";

import { ThemeToggle } from "@/components/ThemeSwitcher";
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
import { Linkedin, Mail, MessageSquare, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="flex gap-2">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">KSonar Research</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="flex gap-12" justify="end">
        <div className="hidden gap-8 md:flex">
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
            <DropdownMenu>
              <DropdownItem as={NextLink} href="/reports?industry=all">
                All
              </DropdownItem>
              <DropdownItem as={NextLink} href="/reports?industry=food">
                Food
              </DropdownItem>
              <DropdownItem as={NextLink} href="/reports?industry=iso">
                ISO
              </DropdownItem>
              <DropdownItem as={NextLink} href="/reports?industry=led">
                LED
              </DropdownItem>
              <DropdownItem as={NextLink} href="/reports?industry=beverage">
                Beverage
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
                className="items-center gap-1 border-none bg-opacity-60 p-[6px]"
              >
                <Image
                  alt="Woman listing to music"
                  className="aspect-[4/5] object-cover"
                  width={200}
                  height={400}
                  src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                />
                <CardFooter className="rounded-md border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
                  <div className="flex flex-col gap-2">
                    <div className="max-w-44 pb-2 text-medium">
                      <p>Hi, My name is XYZ</p>
                      <p>I am a researcher at KSonar Research</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Linkedin size={30} />
                      <Link
                        href="#"
                        className="text-black underline dark:text-white"
                      >
                        LinkedIn Profile
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail size={30} />
                      <Link
                        href="mailto:mail@mail.com"
                        className="text-black underline dark:text-white"
                      >
                        main@mail.com
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={30} />
                      <Link
                        className="text-black underline dark:text-white"
                        href="https://wa.me/999999999999"
                        target="_blank"
                      >
                        Whatsapp
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={30} />
                      <Link className="text-black dark:text-white">
                        +91 9999999999
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
            href="#"
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
            <DropdownMenu>
              <DropdownItem as={NextLink} href="/reports?industry=all">
                All
              </DropdownItem>
              <DropdownItem as={NextLink} href="/reports?industry=food">
                Food
              </DropdownItem>
              <DropdownItem as={NextLink} href="/reports?industry=iso">
                ISO
              </DropdownItem>
              <DropdownItem as={NextLink} href="/reports?industry=led">
                LED
              </DropdownItem>
              <DropdownItem as={NextLink} href="/reports?industry=beverage">
                Beverage
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
