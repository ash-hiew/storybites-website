import { sanityClient } from "../lib/sanity.server";
import { GetStaticProps } from "next";
import React from "react";
import { Story, Chef, Category } from "../typing";

import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";

import Image from "next/image";
import CategoryList from "../components/CategoryList";
import Layout from "../components/Layout";

import { NextSeo } from "next-seo";
import siteMetadata from "../data/siteMetadata";

interface Props {
  story: Story;
  stories: [Story];
  chef: Chef;
  categoryWithStories: Category;
  categories: [Category];
  currentCategory: Category;
}

const Category = ({ categoryWithStories }: Props) => {
  const { currentCategory, stories, categories } = categoryWithStories;

  return (
    <Layout>
      <NextSeo
        title={`${currentCategory.title} - Stories`}
        description=""
        canonical={`${siteMetadata.siteUrl}${currentCategory}`}
        openGraph={{
          url: `${siteMetadata.siteUrl}${currentCategory}`,
          title: `${currentCategory.title} - Stories`,
          description: "",
        }}
      />
      <main>
        <section className="mx-auto my-10 max-w-6xl px-10 font-primary">
          <div className="space-y-4">
            <h1 className="text-sm font-medium uppercase tracking-widest">
              Stories
            </h1>
            <h2 className="text-start font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-tight">
              {currentCategory.title}
            </h2>

            {/* Categories Filter Section */}
            <CategoryList categories={categories} />
          </div>

          <div className="mt-10 flex flex-col">
            {stories.map((story) => (
              <div key={story._id} className="py-10">
                <Link key={story._id} href={`stories/${story.slug}`}>
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
                      />
                    </div>
                    <div className="mt-3 flex-grow space-y-3 md:ml-10 md:space-y-5">
                      <p className="text-xs uppercase tracking-widest text-stone-500">
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
};

export default Category;

export const getStaticPaths = async () => {
  const query = `*[_type == "category"]{
    _id,
    "slug": slug.current,
  }`;

  const selectedCategory = await sanityClient.fetch(query);

  const paths = selectedCategory.map((category: Category) => ({
    params: {
      slug: category.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == "category" && slug.current == $slug][0]{
    "currentCategory": {
   _id,
   title,
   "slug": slug.current,
 },
 "stories":*[_type == "story" && references(^._id)]{
   _id,
   title,
  "slug": slug.current,
   "mainImage": mainImage.secure_url,
   category-> {
     _id,
     title
   }
 },
"categories":  *[_type == "category"]{
    _id,
    title,
    "slug": slug.current,
  }
 }`;

  const categoryWithStories = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!categoryWithStories) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categoryWithStories,
    },
    revalidate: 60 * 60 * 24,
  };
};
