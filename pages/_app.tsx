/* eslint-disable require-jsdoc */
import React from "react";
import "../styles/globals.css";
import "../styles/embla.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";

import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-stone-200">
      <DefaultSeo
        title="Home"
        titleTemplate="%s | StoryBites"
        defaultTitle="StoryBites"
        description="We are a New Zealand based culinary brand mandated to empower one million people to find humanity in gastronomy."
        openGraph={{
          url: "https://storybites.co.nz/",
          title: "StoryBites - A New Zealand based culinary brand",
          description:
            "We are a New Zealand based culinary brand mandated to empower one million people to find humanity in gastronomy.",
          images: [
            {
              url: "/images/og-image.png",
              width: 1200,
              height: 630,
              type: "image/png",
              alt: "StoryBites",
            },
          ],
          type: "website",
          locale: "en_IE",
          site_name: "StoryBites",
        }}
      />
      <Header />
      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default MyApp;
