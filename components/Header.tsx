import Link from "next/link";

import { motion } from "framer-motion";

import { useState } from "react";
import { SocialIcons } from "./SocialIcons";

function Header() {


  const [active, setActive] = useState(false);

  const variants = {
    open: { left: "-100vw"},
    closed: { left: 0}
  }

  const handleClick = () => {
    setActive(!active);
  };

  // Disable scroll when menu open
  if (typeof window !== "undefined") {
    if(active){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  return (
    <header className="font-primary z-50 relative bg-stone-100 lg:fixed top-0 left-0 w-full">

    <nav className='max-w-7xl mx-auto relative'>
        <div className="p-6 flex">
          {/* Logo */}
          <div>
          <Link href='/'>
            <a className='group inline-flex items-center mr-4 z-30 transition-all duration-300'>
            <img className= "w-16 object-contain cursor-pointer group-hover:scale-90 transition-all duration-300" src="/images/storybites-logo.svg" alt="Storybites Logo" />
            </a>
          </Link>
          </div>

          {/* Navigation Links: Desktop */}
          <div className="hidden relative lg:flex items-center w-full space-x-6 justify-end mr-4 hover:prose-a:text-yellow-500 prose-a:duration-300">
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
              whileHover={{scale: 1.1}}
              whileTap={{scale:1}}
              transition={{duration: 0.2}}
        className='prose prose-zinc-900 inline-flex fixed right-7 top-5 lg:hidden text-zinc-900 outline-none bg-stone-50 z-50 rounded-full shadow-md'
      >
        <svg className={`${ active ? 'active-rotate' : ''} ham ham1`} viewBox="0 0 100 100" width="50">
          <path
                className={`${ active ? 'active-top' : ''} line top`}
                d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
          <path
                className="line middle"
                d="m 30,50 h 40" />
          <path
                className={`${ active ? 'active-bottom' : ''} line bottom `}
                d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
        </svg>
      </motion.button>

      <motion.nav
      animate={active ? "close" : "open"}
      variants={variants}
      transition={{delay: 0.2, duration: 0.4, ease: "easeInOut", stiffness: 50, }}
      className="fixed top-0 left-0 bottom-0 h-30 w-full z-40 lg:hidden">
        <motion.div
        initial={false}
        className="absolute top-0 left-0 p-10 bg-stone-50 h-screen w-full overscroll-auto overflow-y-auto z-40">
          {/* Logo */}
          <Link href='/'>
            <a className='group inline-flex items-center mb-6'>
            <img className= "w-16 object-contain cursor-pointer group-hover:scale-90 transition-all duration-300" src="/images/storybites-logo.svg" alt="Storybites Logo" />
            </a>
          </Link>          
          <motion.ul 
            className="relative prose-li:text-3xl hover:prose-li:text-yellow-500 prose-li:duration-300 space-y-6 prose-li:cursor-pointer">
            <li onClick={handleClick}>
              <Link href="/stories">
                Stories
              </Link>
            </li>
            <li onClick={handleClick}>
            <Link href="/recipes">
                Recipes
              </Link>
            </li>
            <li onClick={handleClick}>
            <Link href="/about">
                About
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/chefs">
                Our Chefs
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/contact">
                Work with Us
              </Link>
            </li>
          </motion.ul>
      {/* Contact Section */}
        <div className="mt-20">
          <p className="font-semibold text-xl">Get in Touch</p>
          <p>hello@storybites.co.nz</p>
          <SocialIcons />
        </div>          
        </motion.div>

      </motion.nav>
          
    </nav>
    </header>
  );
}

export default Header