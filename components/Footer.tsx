import React from "react";
import Link from "next/link";
import Image from "next/image";

import siteMetadata from "../data/siteMetadata.js";
import FooterNewsletterForm from "./FooterNewsletterForm";

function Footer() {
  return (
    <footer className="bg-zinc-900 pt-10 font-primary ">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between space-y-20 px-4 pt-5 pb-0 text-zinc-50 sm:p-6 lg:flex-row lg:items-end lg:space-x-20 lg:space-y-5">
        {/* Logo Section */}
        <div className="mx-auto flex max-w-xs flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
          <Link href="/">
            <Image
              src={siteMetadata.siteLogoColour}
              alt="Storybites Logo"
              className="w-1/3"
              width={100}
              height={100}
            />
          </Link>
          <p className="mt-5 ">
            Sharing our love for people and <br /> food one bite at a time.
          </p>
        </div>

        {/* Subscribe Form */}
        <div className="mx-auto flex flex-grow flex-col items-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-50">
            SUBSCRIBE TO OUR NEWSLETTER
          </p>
          <FooterNewsletterForm />
          <p className="text-xs leading-normal text-zinc-400">
            Get the latest on recipes, articles, and cooking tips.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="flex-end mx-auto flex flex-col items-center space-y-4 lg:items-end">
          <p className="text-right text-2xl font-semibold">Get in Touch</p>
          <p>{siteMetadata.email}</p>
          <div className="mt-2 flex justify-end space-x-4 prose-a:text-zinc-400 prose-a:transition-all prose-a:duration-300 hover:prose-a:text-zinc-50">
            <a href={siteMetadata.instagram} target="_blank" rel="noreferrer">
              <span className="sr-only">Instagram</span>
              <svg
                className="h-8 w-8"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a href={siteMetadata.youtube} target="_blank" rel="noreferrer">
              <span className="sr-only">YouTube</span>
              <svg
                className="h-9 w-9"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 3 50 50"
              >
                <path
                  fillRule="evenodd"
                  d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Links & Copyright */}
      <div className="mx-auto max-w-screen-xl space-y-8 overflow-hidden px-4 py-12 text-sm leading-6 sm:px-6 md:text-base lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center text-zinc-400 prose-a:duration-500 hover:prose-a:text-zinc-50">
          <div className="px-5 py-2">
            <Link href="/stories">Stories</Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/recipes">Recipes</Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/chefs">Our Chefs</Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/about">About</Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/contact">Contact</Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-zinc-400">
          © 2022 Storybites. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
