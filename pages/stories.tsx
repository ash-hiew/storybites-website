import Link from "next/link";
import React from "react";
import { Story, Category } from "../typing";
import { sanityClient } from "../lib/sanity.server";

import Image from "next/image";

import { FiArrowRightCircle } from "react-icons/fi";
import CategoryList from "../components/CategoryList";
import Layout from "../components/Layout";

import { NextSeo } from "next-seo";

import siteMetadata from "../data/siteMetadata.js";

interface Props {
  stories: [Story];
  categories: [Category];
}

const storiesQuery = `*[_type == "story"]{
  _id,
  title,
  slug {
    current
  },
  "mainImage": mainImage.secure_url,
  category-> {
    _id,
    title
  },_createdAt
  }| order(_createdAt desc)`;

const categoriesQuery = `*[_type == "category"]{
  _id,
  title,
  "slug": slug.current
}`;

export default function StoriesPage({ stories, categories }: Props) {
  return (
    <Layout>
      <NextSeo
        title="Stories"
        description="A collection of stories we've shared of chefs with different cultural backgrounds and cuisines. From their journeys as chefs to their love of food."
        canonical="https://storybites.co.nz/stories"
        openGraph={{
          url: `${siteMetadata.siteUrl}stories`,
          title: "Stories",
          description:
            "A collection of stories we've shared of chefs with different cultural backgrounds and cuisines. From their journeys as chefs to their love of food.",
        }}
      />
      <main>
        <section className="mx-auto my-10 max-w-6xl font-primary">
          <div className="space-y-4 px-10">
            <h1 className="text-sm font-medium uppercase tracking-widest">
              Stories
            </h1>
            <h2 className="text-start font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-tight">
              All Stories
            </h2>

            {/* Categories Filter Section */}
            <CategoryList categories={categories} />
          </div>

          <div className="mt-10 flex flex-col px-5">
            {stories.map((story, index) => (
              <div key={index} className="py-10">
                <Link key={story._id} href={`/stories/${story.slug.current}`}>
                  <div className="links group transition-all duration-300 active:scale-105 md:flex md:items-center">
                    <div className="relative flex-shrink overflow-hidden md:max-w-xs lg:max-w-sm">
                      <Image
                        className="h-auto w-full transition-all duration-300 group-hover:scale-105"
                        src={story.mainImage}
                        alt={story.title}
                        placeholder="blur"
                        blurDataURL={story.mainImage}
                        width={854}
                        height={480}
                        priority={true}
                      />
                    </div>
                    <div className="mt-3 flex-grow space-y-3 md:ml-10 md:space-y-5">
                      <p className="text-xs uppercase tracking-widest text-stone-500 transition-all duration-300 group-hover:text-amber-600">
                        {story.category.title}
                      </p>
                      <h3 className="text-2xl font-semibold transition-all duration-300 group-hover:text-amber-600 md:text-2xl lg:text-4xl">
                        {story.title}
                      </h3>

                      <FiArrowRightCircle
                        size={42}
                        className="transition-all duration-300 group-hover:text-amber-600"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const stories = await sanityClient.fetch(storiesQuery);
  const categories = await sanityClient.fetch(categoriesQuery);

  if (!stories || !categories) {
    return {
      notFound: true,
    };
  }

  return {
    props: { stories, categories },
    revalidate: 60 * 60 * 24,
  };
};
