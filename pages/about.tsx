import React from "react";
import Layout from "../components/Layout";
import { default as _ReactPlayer } from "react-player/lazy";
import { ReactPlayerProps } from "react-player/types/lib";
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;
import Link from "next/link";

import { NextSeo } from "next-seo";
import siteMetadata from "../data/siteMetadata";

export default function AboutPage() {
  return (
    <Layout>
      <NextSeo
        title="About"
        description="Why StoryBites? Learn about our purpose for sharing stories of people and food."
        canonical="https://storybites.co.nz/about"
        openGraph={{
          url: `${siteMetadata.siteUrl}about`,
          title: "About",
          description:
            "Why StoryBites? Learn about our purpose for sharing stories of people and food.",
        }}
      />
      <main>
        <section className="mx-auto my-10 max-w-4xl px-10 font-primary md:px-6">
          <div className="space-y-4 md:space-y-6">
            <h1 className="font-medium uppercase tracking-wide">About Us</h1>
            <h2 className="text-start font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-tight">
              Unapologetically passionate about giving back to local communities
              through sharing the stories that matter most.
            </h2>
          </div>
        </section>

        <section className="mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="relative w-full">
              <ReactPlayer
                url="https://res.cloudinary.com/diwz5znsp/video/upload/v1651151979/Videos/about-banner-video_snhie8.mp4"
                width="100%"
                height="100%"
                playing={true}
                muted={true}
              />
            </div>
          </div>
        </section>

        <section className="prose-sm mx-auto my-10 max-w-xl font-primary md:prose-base md:my-20">
          <div className="space-y-4 px-10">
            <h2 className="text-3xl font-semibold md:text-4xl">The Why</h2>
            <p className="leading-loose sm:leading-relaxed">
              Ask yourself this. What brings your neighbourhood together? What
              makes a city come alive? What is that one thing that nations would
              put race, creed, or religion aside for to sit in unity with one
              another;{" "}
              <span className="font-semibold">
                their love for people and food
              </span>
              .
            </p>
            <p className="leading-loose sm:leading-relaxed">
              StoryBites was conceived from a place of cultural preservation
              through celebrating the chefs, producers and culinary
              collaborators that work humbly behind the food we all love.{" "}
            </p>
          </div>
        </section>

        <section className="prose-sm mx-auto my-32 max-w-4xl px-10 font-primary md:prose-base">
          <h2 className="text-center font-primary text-3xl font-semibold md:text-4xl">
            How We Share Stories One Bite At A Time
          </h2>
          <div className="mx-auto my-10 flex flex-col md:flex-row md:space-x-8">
            <div className="mx-auto max-w-sm">
              <div className="relative w-full">
                <ReactPlayer
                  url="https://res.cloudinary.com/diwz5znsp/video/upload/v1650973934/Videos/people.mp4"
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </div>
            </div>
            <div className="mx-auto max-w-sm space-y-6">
              <h3 className="text-2xl font-semibold md:text-3xl">People</h3>
              <p>
                Our team of cinematographers, photographers, and graphic
                designers are committed to bringing to light stories worth
                celebrating.
                <br />
                <br />
                From documentaries of cultural diversity, to the journey of
                rising up from financial adversity; we believe there is
                something special in every culinary collaborator in the family
                we call StoryBites.
              </p>
              <p>
                Check out more of our{" "}
                <Link href="/chefs">
                  <a className="font-semibold underline">
                    Culinary Collaborators
                  </a>
                </Link>
              </p>
            </div>
          </div>
          <div className="mx-auto flex flex-col md:flex-row-reverse">
            <div className="mx-auto max-w-sm">
              <div className="relative w-full">
                <ReactPlayer
                  url="https://res.cloudinary.com/diwz5znsp/video/upload/v1650969562/Videos/food.mp4"
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </div>
            </div>
            <div className="mx-auto max-w-sm space-y-6 md:mr-8">
              <h3 className="text-2xl font-semibold md:text-3xl">Food</h3>
              <p>
                Have you ever been to a restaurant and wondered just how the
                chef made your favourite dish taste so darn good?
                <br />
                <br /> Well, we have too and that’s why we’re honoured to work
                with an eclectic range of chefs from all across Christchurch,
                New Zealand who are generous enough to share their trade secrets
                for all the internet to watch.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
