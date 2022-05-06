import React from "react";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";
import siteMetadata from "../data/siteMetadata";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <Layout>
      <NextSeo
        title="Work With Us"
        description="If you're interested in what we do at StoryBites and would like to be involved, we'd love to hear from you. Fill out our contact form and we'll be in contact"
        canonical={`${siteMetadata.siteUrl}contact`}
        openGraph={{
          url: `${siteMetadata.siteUrl}contact`,
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
          <ContactForm />
        </section>
      </main>
    </Layout>
  );
}
