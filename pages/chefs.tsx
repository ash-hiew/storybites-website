import React from "react";
import Image from "next/image";
import { Chef } from "../typing";
import { sanityClient } from "../lib/sanity.server";
import Layout from "../components/Layout";
import Link from "next/link";

import { NextSeo } from "next-seo";
import siteMetadata from "../data/siteMetadata";

interface Props {
  chefs: [Chef];
}

const chefsQuery = `*[_type == "chef"]{
  _id,
  name,
  "slug": slug.current,
  "image": image.secure_url,
  bio
}`;

export default function ChefsPage({ chefs }: Props) {
  return (
    <Layout>
      <NextSeo
        title="Our Chefs"
        description="Check out our team of culinary collaborators who joined the narrative to share their love of food and their journey."
        openGraph={{
          url: `${siteMetadata.siteUrl}/chefs`,
          title: "Our Chefs",
          description:
            "Check out our team of culinary collaborators who joined the narrative to share their love of food and their journey.",
        }}
      />
      <main>
        <section className="my-10 max-w-4xl px-10 font-primary">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-sm font-medium uppercase tracking-widest">
              Our Chefs
            </h1>
            <p className="font-display text-4xl font-semibold tracking-tight md:text-6xl md:leading-tight">
              The Quintessence to Culinary Collaboration.
            </p>
          </div>
        </section>

        <section className="mx-auto">
          <div className="mx-auto">
            <Image
              src="https://res.cloudinary.com/storybites/image/upload/v1651790688/chefs-kitchen_dhmeef.jpg"
              width={3200}
              height={1468}
              placeholder="blur"
              blurDataURL="https://res.cloudinary.com/storybites/image/upload/v1651790688/chefs-kitchen_dhmeef.jpg"
            />
          </div>
        </section>

        <section className="mx-auto my-20 max-w-4xl px-10 font-primary">
          <div className="text-start space-y-4 md:space-y-6 md:text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Chefs We&apos;ve Collaborated With.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base sm:leading-loose">
              From fried chicken, to french pastries, food has no place for
              discrimination. Check out our team of culinary collaborators.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 justify-center gap-x-10 sm:grid-cols-3 md:grid-cols-4">
            {chefs.map((chef, index) => (
              <Link key={index} href={`/chefs/${chef.slug}`}>
                <div className="links group my-8 flex flex-col justify-center transition-all">
                  <div className="rounded-full grayscale transition-all duration-300 group-hover:grayscale-0">
                    <Image
                      className="h-44 w-44 rounded-full "
                      src={chef.image}
                      width={400}
                      height={400}
                      alt={chef.name}
                      placeholder="blur"
                      blurDataURL={chef.image}
                      priority={true}
                    />
                  </div>

                  <div className="mt-5 space-y-1 text-center">
                    <h3 className="text-md font-semibold transition-all group-hover:text-amber-600 lg:text-lg">
                      {chef.name}
                    </h3>
                    <p className="text-xs text-stone-500">{chef.bio}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="m-40 mx-auto max-w-4xl px-10 text-center font-primary md:my-52">
          <div className="mx-auto my-10">
            <h2 className="m-6 font-primary font-medium uppercase tracking-wide">
              Contact
            </h2>
            <h3 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-tight">
              Keen to Partner With Us?
            </h3>
            <p className="mx-auto mt-6 max-w-2xl">
              If you are passionate about sharing your craft to the community we
              are building, join the narrative and start the conversation today.
            </p>
          </div>

          <Link href="/stories">
            <a className="mx-auto border-2 border-zinc-900 bg-yellow-500 px-5 py-2 font-medium transition-all duration-500 hover:bg-zinc-900 hover:text-white">
              Let&apos;s have a chat
            </a>
          </Link>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const chefs = await sanityClient.fetch(chefsQuery);

  if (!chefs) {
    return {
      notFound: true,
    };
  }

  return { props: { chefs } };
};
