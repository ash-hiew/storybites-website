import React from "react";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";
import siteMetadata from "../data/siteMetadata";

export default function ContactPage() {
  return (
    <Layout>
      <NextSeo
        title="Work With Us"
        description="If you're interested in what we do at StoryBites and would like to be involved, we'd love to hear from you. Fill out our contact form and we'll be in contact"
        openGraph={{
          url: `${siteMetadata.siteUrl}/contact`,
          title: "Privacy Policy",
          description:
            "If you're interested in what we do at StoryBites and would like to be involved, we'd love to hear from you. Fill out our contact form and we'll be in contact",
        }}
      />
      <main>
        <section className="mx-auto my-10 max-w-2xl px-10 font-primary">
          <div className="space-y-6 text-center">
            <h1 className="font-medium uppercase tracking-wide">Contact</h1>
            <h2 className="text-center font-display text-4xl font-semibold leading-normal tracking-tight md:text-6xl md:leading-tight">
              Work With Us
            </h2>
            <p className="text-sm leading-loose sm:text-base sm:leading-loose">
              See potential for a synergistic conversation? No matter your
              background whether in hospitality, FMCG, equipment innovation, or
              food tourism, we want to hear from you.
            </p>
          </div>
          {/* Contact Form */}
          <form className="mt-12">
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-2.5 px-0 text-sm text-stone-900 autofill:bg-white focus:border-amber-600 focus:outline-none focus:ring-0"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_name"
                className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-amber-600"
              >
                Full name
              </label>
            </div>

            <div className="grid xl:grid-cols-2 xl:gap-6">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_phone"
                  id="floating_phone"
                  className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-2.5 px-0 text-sm text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0  peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-amber-600"
                >
                  Phone number (123-456-7890)
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="email"
                  name="floating_email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-2.5 px-0 text-sm text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0  peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-amber-600"
                >
                  Email address
                </label>
              </div>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-2.5 px-0 text-sm text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-0"
                placeholder=" "
                required
              />
              <label
                htmlFor="message"
                className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-amber-600"
              >
                Message
              </label>
            </div>
            <button
              type="submit"
              className="h-12 w-full border-2 border-zinc-900 bg-yellow-500 px-5 font-medium transition-all duration-500 hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring focus:ring-offset-1 sm:border-zinc-900"
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
}
