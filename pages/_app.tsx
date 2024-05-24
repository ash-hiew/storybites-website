/* eslint-disable require-jsdoc */
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/globals.css";
import "../styles/embla.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";

import Header from "../components/Header";
import Footer from "../components/Footer";

const isProduction = process.env.NODE_ENV === "production";
import * as gtag from "../lib/analytics";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) {
        gtag.pageview(url);
      }
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div>
      <DefaultSeo
        title="Home"
        titleTemplate="%s | StoryBites"
        defaultTitle="StoryBites"
        description="We are a New Zealand based food network and creative agency passionate about celebrating the gift of hospitality."
        canonical="https://storybites.co.nz/"
        openGraph={{
          url: "https://storybites.co.nz/",
          title:
            "StoryBites - A New Zealand based food network and creative agency",
          description:
            "We are a New Zealand based food network and creative agency passionate about celebrating the gift of hospitality.",
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
