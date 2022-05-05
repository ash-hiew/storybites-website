import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { useState } from "react";
import { SocialIcons } from "./SocialIcons";
import siteMetadata from "../data/siteMetadata";

function Header() {
  const [active, setActive] = useState(false);

  const variants = {
    open: { left: "-100vw" },
    closed: { left: 0 },
  };

  const handleClick = () => {
    setActive(!active);
  };

  // Disable scroll when menu open
  if (typeof window !== "undefined") {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  return (
    <header className="relative top-0 left-0 z-50 w-full bg-stone-100 bg-opacity-90 font-primary lg:sticky">
      <nav className="relative mx-auto max-w-7xl">
        <div className="flex p-6">
          {/* Logo */}
          <div>
            <Link href="/">
              <a className="group z-30 mr-4 inline-flex items-center transition-all duration-300">
                <Image
                  className="w-16 cursor-pointer object-contain transition-all duration-300 group-hover:scale-90"
                  src={siteMetadata.siteLogo}
                  alt="Storybites Logo"
                  width={70}
                  height={70}
                />
              </a>
            </Link>
          </div>

          {/* Navigation Links: Desktop */}
          <div className="relative mr-4 hidden w-full items-center justify-end space-x-6 prose-a:tracking-wider prose-a:duration-300 hover:prose-a:text-yellow-500 lg:flex">
            <div>
              <Link href="/stories">
                <a>Stories</a>
              </Link>
            </div>
            <div>
              <Link href="/recipes">
                <a>Recipes</a>
              </Link>
            </div>
            <div>
              <Link href="/about">
                <a>About</a>
              </Link>
            </div>
            <div>
              <Link href="/chefs">
                <a>Our Chefs</a>
              </Link>
            </div>
            <div>
              <Link href="/contact">
                <a>Work with Us</a>
              </Link>
            </div>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <motion.button
          initial={false}
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="prose-zinc-900 prose fixed right-7 top-5 z-50 inline-flex rounded-full bg-stone-50 text-zinc-900 shadow-md outline-none lg:hidden"
        >
          <svg
            className={`${active ? "active-rotate" : ""} ham ham1`}
            viewBox="0 0 100 100"
            width="50"
          >
            <path
              className={`${active ? "active-top" : ""} line top`}
              d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
            />
            <path className="line middle" d="m 30,50 h 40" />
            <path
              className={`${active ? "active-bottom" : ""} line bottom `}
              d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
            />
          </svg>
        </motion.button>

        <motion.nav
          animate={active ? "close" : "open"}
          variants={variants}
          transition={{
            delay: 0.2,
            duration: 0.4,
            ease: "easeInOut",
            stiffness: 50,
          }}
          className="h-30 fixed top-0 left-0 bottom-0 z-40 w-full lg:hidden"
        >
          <motion.div
            initial={false}
            className="absolute top-0 left-0 z-40 h-screen w-full overflow-y-auto overscroll-auto bg-stone-50 p-10"
          >
            {/* Logo */}
            <Link href="/">
              <a
                onClick={handleClick}
                className="group mb-6 inline-flex items-center"
              >
                <Image
                  className="w-16 cursor-pointer object-contain transition-all duration-300 group-hover:scale-90"
                  src={siteMetadata.siteLogo}
                  alt="Storybites Logo"
                  width={80}
                  height={80}
                />
              </a>
            </Link>
            <motion.ul className="relative space-y-6 prose-li:cursor-pointer prose-li:text-3xl prose-li:duration-300 hover:prose-li:text-yellow-500">
              <li onClick={handleClick}>
                <Link href="/stories">
                  <a>Stories</a>
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link href="/recipes">
                  <a>Recipes</a>
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link href="/chefs">
                  <a>Our Chefs</a>
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link href="/contact">
                  <a>Work with Us</a>
                </Link>
              </li>
            </motion.ul>
            {/* Contact Section */}
            <div className="mt-20">
              <p className="text-xl font-semibold">Get in Touch</p>
              <p>{siteMetadata.email}</p>
              <SocialIcons />
            </div>
          </motion.div>
        </motion.nav>
      </nav>
    </header>
  );
}

export default Header;
