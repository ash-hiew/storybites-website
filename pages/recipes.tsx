import Link from "next/link";
import React from "react";
import { Recipe } from "../typing";
import { sanityClient } from "../lib/sanity.server";

import Image from "next/image";

import { FiArrowRightCircle } from "react-icons/fi";
import Layout from "../components/Layout";

import { NextSeo } from "next-seo";
import siteMetadata from "../data/siteMetadata";

interface Props {
  recipes: [Recipe];
}

const recipesQuery = `*[_type == "recipe"]{
  _id,
  title,
  slug,
  "mainImage": mainImage.url,
  chef-> {
    name
  }
}| order(_createdAt desc)`;

export default function RecipesPage({ recipes }: Props) {
  return (
    <Layout>
      <NextSeo
        title="Recipes"
        description="We've curated recipes from our culinary collaborators in hopes to inspire those at home to cook like the professionals."
        openGraph={{
          url: `${siteMetadata.siteUrl}/recipes/`,
          title: "Recipes",
          description:
            "We've curated recipes from our culinary collaborators in hopes to inspire those at home to cook like the professionals.",
        }}
      />
      <main>
        <section className="mx-auto my-10 max-w-6xl px-10 font-primary">
          <div className="space-y-4">
            <h1 className="font-medium uppercase tracking-widest">Recipes</h1>
            <h2 className="text-start font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-tight">
              All Recipes
            </h2>
          </div>

          <div className="mt-10 flex flex-col">
            {recipes.map((recipe, index) => (
              <div key={index} className="py-10">
                <Link key={index} href={`/recipes/${recipe.slug.current}`}>
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
                      {/* <p className='text-xs text-stone-400 group-hover:text-yellow-500 duration-300 transition-all'>Category</p>*/}
                      <h3 className="text-2xl font-semibold transition-all duration-300 group-hover:text-amber-600 md:text-2xl lg:text-5xl">
                        {recipe.title}
                      </h3>
                      <p className="transition-all duration-300 group-hover:text-amber-600">
                        {recipe.chef.name}
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
}

export const getStaticProps = async () => {
  const recipes = await sanityClient.fetch(recipesQuery);

  if (!recipes) {
    return {
      notFound: true,
    };
  }

  return { props: { recipes } };
};
