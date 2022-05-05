/* eslint-disable new-cap */
import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";
import { Recipe } from "../../typing";
import React from "react";
import Image from "next/image";
import PortableText from "react-portable-text";

import ReactPlayer from "react-player/lazy";
import Link from "next/link";
import Layout from "../../components/Layout";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { NextSeo } from "next-seo";
import siteMetadata from "../../data/siteMetadata";

interface Props {
  recipe: Recipe;
  currentRecipe: Recipe;
  recipes: [Recipe];
}

const Recipe = ({ recipe }: Props) => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      skipSnaps: false,
      inViewThreshold: 0.7,
      speed: 5,
      containScroll: "trimSnaps",
    },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })]
  );

  const { currentRecipe, recipes } = recipe;

  const moreRecipes = recipes.sort(() => Math.random() - 0.5).slice(0, 2);

  return (
    <Layout>
      <NextSeo
        title={currentRecipe.title}
        description={currentRecipe.shortDescription}
        openGraph={{
          url: `${siteMetadata.siteUrl}/recipes/${currentRecipe.slug}`,
          title: `${currentRecipe.title}`,
          description: `${currentRecipe.shortDescription}`,
          images: [
            {
              url: `${currentRecipe.mainImage}`,
              width: 1200,
              height: 630,
              alt: "StoryBites",
            },
          ],
        }}
      />
      <main>
        <article className="mx-auto my-10 max-w-3xl font-primary">
          <section className="m-10">
            <h2 className="text-sm font-medium uppercase tracking-widest">
              <span className="transition-all duration-300 hover:text-amber-600">
                <Link href="/recipes">Recipe</Link>
              </span>
            </h2>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              {currentRecipe.title}
            </h1>
          </section>

          <section className="prose m-10 prose-headings:font-bold prose-p:text-sm prose-p:leading-loose sm:prose-p:text-base sm:prose-p:leading-loose">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={currentRecipe.description}
            />
          </section>

          <section className="relative my-10 pb-fluid-video">
            <ReactPlayer
              className="absolute top-0 left-0 h-full w-full"
              url={currentRecipe.video}
              width="100%"
              height="100%"
              controls={true}
            />
          </section>

          <section className="m-10 bg-stone-100 p-6 sm:p-8">
            <h2 className="mb-4 text-3xl">Ingredients</h2>
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={currentRecipe.ingredients}
              className="prose prose-headings:font-bold prose-li:text-sm sm:prose-li:text-base"
            />
          </section>
          <section className="m-10">
            <h2 className="mb-4 text-3xl">Instructions</h2>
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={currentRecipe.instructions}
              className="prose prose-headings:font-bold prose-p:text-sm prose-p:leading-loose sm:prose-p:text-base sm:prose-p:leading-loose"
            />
          </section>

          <section className="my-20 grid justify-items-center">
            <h2 className="mb-5 font-semibold uppercase tracking-wider">
              Written By
            </h2>
            <Link href={`/chefs/${currentRecipe.chef.slug}`}>
              <div className="links flex items-center space-x-3 transition-all hover:text-amber-600">
                <Image
                  className="rounded-full"
                  src={currentRecipe.chef.image}
                  alt={currentRecipe.chef.name}
                  width={50}
                  height={50}
                  placeholder="blur"
                  blurDataURL={currentRecipe.chef.image}
                />

                <div>
                  <h3 className="text-sm">{currentRecipe.chef.name}</h3>
                  <h4 className="text-xs text-stone-500">
                    {currentRecipe.chef.bio}
                  </h4>
                </div>
              </div>
            </Link>
          </section>
        </article>

        <section className="mx-auto mt-32 mb-10 flex max-w-4xl flex-col justify-center px-10 font-primary">
          <h2 className="text-3xl md:text-4xl lg:mb-5">
            More <span className="font-bold">Recipes</span>
          </h2>

          <div className="embla mx-auto">
            <div id="embla_div" className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {moreRecipes.map((moreRecipe, index) => (
                  <div key={index} className="embla__slide py-10">
                    <Link
                      key={moreRecipe._id}
                      href={`/recipes/${moreRecipe.slug}`}
                    >
                      <div className="embla__slide__inner links group mx-3 transition-all duration-300 active:scale-105 lg:mx-6">
                        <Image
                          className="embla__slide__img h-auto w-full transition-all duration-300 group-hover:scale-105"
                          src={moreRecipe.mainImage}
                          alt={moreRecipe.title}
                          placeholder="blur"
                          blurDataURL={moreRecipe.mainImage}
                          width={854}
                          height={480}
                        />
                        <div>
                          <h3 className="mt-5 text-lg font-semibold transition-all duration-300 group-hover:text-amber-600 lg:text-xl">
                            {moreRecipe.title}
                          </h3>
                          <h4 className="mt-2 transition-all duration-300 group-hover:text-amber-600">
                            {moreRecipe.chef.name}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Recipe;

export const getStaticPaths = async () => {
  const query = `*[_type == "recipe"]{
        _id,
        slug {
          current
        }
      }`;

  const recipes = await sanityClient.fetch(query);

  const paths = recipes.map((recipe: Recipe) => ({
    params: {
      slug: recipe.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
    "currentRecipe": {
    _id,
    title,
    description,
    shortDescription,
    ingredients,
    instructions,
    video,
    "slug": slug.current,
    "mainImage": mainImage.secure_url,
    chef -> {
      name,
      "slug": slug.current,
      "image": image.secure_url,
      bio
    }
  },
    "recipes": *[_type == "recipe" && slug.current != $slug]{
    _id,
    title,
    chef -> {
      name
    },
    "slug": slug.current,
    "mainImage": mainImage.secure_url
    }
  }`;

  const recipe = await sanityClient.fetch(recipeQuery, {
    slug: params?.slug,
  });

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
    revalidate: 60 * 60 * 24, // after 6000 secs, it'll update the old cache version
  };
};
