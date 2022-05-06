import React from "react";
import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";

import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";

import Image from "next/image";
import Layout from "../../components/Layout";
import { Chef, Recipe, Story } from "../../typing";

import { NextSeo } from "next-seo";
import siteMetadata from "../../data/siteMetadata";

interface Props {
  story: Story;
  recipe: Recipe;
  chef: Chef;
  chefWithRelatedVideos: Chef;
  currentChef: Chef;
}

const Chef = ({ chefWithRelatedVideos }: Props) => {
  const { relatedRecipes, relatedStories, currentChef } = chefWithRelatedVideos;

  return (
    <Layout>
      <NextSeo
        title={currentChef.name}
        description={currentChef.bio}
        canonical={`${siteMetadata.siteUrl}chefs/${currentChef.slug}`}
        openGraph={{
          url: `${siteMetadata.siteUrl}chefs/${currentChef.slug}`,
          title: `${currentChef.name}`,
          description: `${currentChef.bio}`,
          images: [
            {
              url: `${currentChef.image}`,
              width: 1000,
              height: 1000,
              alt: `${currentChef.name}`,
            },
          ],
        }}
      />
      <main>
        <section className="mx-auto my-10 max-w-6xl px-10 font-primary">
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-widest">
              Related Videos
            </h2>
            <h1 className="text-start font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-tight">
              {currentChef.name}
            </h1>
          </div>

          <div className="mt-10 flex flex-col">
            {relatedStories.map((story) => (
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

          <div className="mt-10 flex flex-col">
            {relatedRecipes.map((recipe, index) => (
              <div key={index} className="py-10">
                <Link key={index} href={`/recipes/${recipe.slug}`}>
                  <div className="links group transition-all duration-300 active:scale-105 md:flex md:items-center">
                    <div className="relative flex-shrink overflow-hidden md:max-w-xs lg:max-w-sm">
                      <Image
                        className="h-auto w-full transition-all duration-300 group-hover:scale-105"
                        src={recipe.mainImage}
                        alt={recipe.title}
                        placeholder="blur"
                        blurDataURL={recipe.mainImage}
                        width={854}
                        height={480}
                        priority={true}
                      />
                    </div>
                    <div className="mt-3 flex-grow space-y-3 md:ml-10 md:space-y-5">
                      <h3 className="text-2xl font-semibold transition-all duration-300 group-hover:text-amber-600 md:text-2xl lg:text-5xl">
                        {recipe.title}
                      </h3>
                      <p className="transition-all duration-300 group-hover:text-amber-600">
                        {currentChef.name}
                      </p>
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

export default Chef;

export const getStaticPaths = async () => {
  const query = `*[_type == "chef"]{
    _id,
    "slug": slug.current,
  }`;

  const selectedChef = await sanityClient.fetch(query);

  const paths = selectedChef.map((chef: Chef) => ({
    params: {
      slug: chef.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == "chef" && slug.current == $slug][0]{
    "currentChef":{
      name,
      "image": image.secure_url,
      bio,
      "slug": slug.current
    },
    "relatedStories": *[_type=='story' && references(^._id)]{ 
      title,
      "slug": slug.current,
      category-> {
        _id,
        title
      },
      "mainImage": mainImage.secure_url
    },
    "relatedRecipes": *[_type=='recipe' && references(^._id)]{
      title,
      "slug": slug.current,
      "mainImage": mainImage.secure_url
    }
  }`;

  const chefWithRelatedVideos = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!chefWithRelatedVideos) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      chefWithRelatedVideos,
    },
    revalidate: 60 * 60 * 24,
  };
};
