"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react"; // Icon for mobile menu

function Header() {
  const router = useRouter();
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goToDashboard = () => {
    router.replace("/dashboard");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-secondary shadow-sm relative">
      {/* Logo */}
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />

      {/* Hamburger icon for mobile */}
      <div className="md:hidden">
        <Menu onClick={toggleMenu} className="cursor-pointer text-gray-600" />
      </div>

      {/* Navigation menu */}
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-secondary md:flex md:relative md:w-auto md:top-0 md:gap-6 md:bg-transparent transition-all text-center`}
      >
        <li
          onClick={goToDashboard}
          className={`p-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard" ? "text-primary font-bold" : ""
          }`}
        >
          Dashboard
        </li>
        <li
          className={`p-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/questions" ? "text-primary font-bold" : ""
          }`}
        >
          Questions
        </li>
        <li
          className={`p-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/upgrade" ? "text-primary font-bold" : ""
          }`}
        >
          Upgrade
        </li>
        <li
          className={`p-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/how" ? "text-primary font-bold" : ""
          }`}
        >
          How it Works?
        </li>

        {/* User Button as the last menu item */}
        <li
          className={`flex justify-center md:justify-end ${
            isMenuOpen ? "my-5" : ""
          }`}
        >
          <UserButton />
        </li>
      </ul>
    </div>
  );
}

export default Header;
