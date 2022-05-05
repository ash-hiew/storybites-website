/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import React from "react";
import Link from "next/link";
import { sanityClient } from "../lib/sanity.server";
import { Recipe, Story } from "../typing";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import Image from "next/image";
import Layout from "../components/Layout";

interface Props {
  recipes: [Recipe];
  stories: [Story];
}

const recipesQuery = `*[_type == "recipe"][0..3]{
  _id,
  title,
  slug,
  "mainImage": mainImage.url,
  chef-> {
    name,
  }
}| order(_createdAt desc)`;

const storiesQuery = `*[_type == "story"][0..3]{
  _id,
  title,
  slug,
  "mainImage": mainImage.url,
  category-> {
    _id,
    title
  }
}| order(_createdAt desc)`;

export default function Home({ recipes, stories }: Props) {
  // emblaRef will be a reference to our carousel viewport
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

  const [emblaRef2] = useEmblaCarousel(
    {
      align: "start",
      skipSnaps: false,
      inViewThreshold: 0.7,
      speed: 5,
      containScroll: "trimSnaps",
    },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })]
  );

  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className="my-10 px-10 text-center sm:mx-10 lg:m-24 lg:max-w-4xl xl:mx-auto">
          <h4 className="m-6 font-primary text-sm font-medium uppercase tracking-widest">
            Storybites
          </h4>
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight transition-all duration-300 sm:text-4xl md:text-6xl md:leading-tight">
            Sharing our love for{" "}
            <Link href="/stories">
              <a className="underline-offset-3 text-yellow-500 underline decoration-transparent decoration-4 transition-all duration-500 hover:decoration-yellow-500">
                people
              </a>
            </Link>{" "}
            and{" "}
            <Link href="/recipes">
              <a className="underline-offset-3 text-yellow-500 underline decoration-transparent decoration-4 transition-all duration-500 hover:decoration-yellow-500">
                food
              </a>
            </Link>{" "}
            one bite at a time
            <Link href="/about">
              <span className="links text-yellow-500">.</span>
            </Link>
          </h1>
        </section>

        {/* Higlight Reel Section */}
        <section className="my-24 px-10 text-center sm:mx-10 sm:py-44 lg:m-40 lg:max-w-4xl xl:mx-auto">
          <h2 className="text-l font-primary leading-loose md:text-2xl">
            We are a <span className="font-semibold">New Zealand</span> based
            culinary brand mandated to empower one million people to find
            humanity in <span className="font-semibold">gastronomy</span>.
          </h2>
        </section>

        {/* Recent Embla Stories Section */}
        <section className="mx-auto my-32 flex max-w-7xl flex-col justify-center px-10 font-primary lg:my-40">
          <h2 className="text-3xl md:text-5xl lg:mb-5">
            <span className="font-bold">Stories</span> We&apos;ve Shared.
          </h2>

          <div className="embla overflow-hidden lg:px-0">
            <div className="embla__viewport " ref={emblaRef}>
              <div className="embla__container">
                {stories.map((story, index) => (
                  <div key={index} className="embla__slide py-10">
                    <Link
                      key={story._id}
                      href={`/stories/${story.slug.current}`}
                    >
                      <div className="links group mx-3 transition-all duration-500 active:scale-105 lg:mx-6">
                        <Image
                          className="h-auto w-full transition-all duration-500 group-hover:scale-105"
                          src={story.mainImage}
                          alt={story.title}
                          placeholder="blur"
                          blurDataURL={story.mainImage}
                          width={854}
                          height={480}
                        />
                        <div>
                          <h3 className="mt-5 text-xs uppercase tracking-widest text-stone-500 transition-all duration-300 group-hover:text-amber-600">
                            {story.category.title}
                          </h3>
                          <h4 className="mt-2 text-xl font-semibold transition-all duration-300 group-hover:text-amber-600 md:text-2xl">
                            {story.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/stories">
            <a className="mx-auto mt-5 border-2 border-zinc-900 px-5 py-2 font-medium transition-all duration-300 hover:bg-yellow-500 lg:mt-16">
              See All Stories
            </a>
          </Link>
        </section>

        {/* Recent Recipes Section */}
        <section className="mx-auto my-32 flex max-w-7xl flex-col justify-center px-10 font-primary lg:my-40">
          <h2 className="text-3xl md:text-5xl lg:mb-5">
            The Latest <span className="font-bold">Recipes</span> Collected.
          </h2>

          <div className="embla mx-auto">
            <div id="embla_div" className="embla__viewport" ref={emblaRef2}>
              <div className="embla__container">
                {recipes.map((recipe, index) => (
                  <div key={index} className="embla__slide py-10">
                    <Link
                      key={recipe._id}
                      href={`/recipes/${recipe.slug.current}`}
                    >
                      <div className="embla__slide__inner links group mx-3 transition-all duration-300 active:scale-105 lg:mx-6">
                        <Image
                          className="embla__slide__img h-auto w-full transition-all duration-300 group-hover:scale-105"
                          src={recipe.mainImage}
                          alt={recipe.title}
                          placeholder="blur"
                          blurDataURL={recipe.mainImage}
                          width={854}
                          height={480}
                        />
                        <div>
                          <h3 className="mt-5 text-xl font-semibold transition-all duration-300 group-hover:text-amber-600 lg:text-2xl">
                            {recipe.title}
                          </h3>
                          <h4 className="mt-2 transition-all duration-300 group-hover:text-amber-600">
                            {recipe.chef.name}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/recipes">
            <a className="mx-auto mt-5 border-2 border-zinc-900 px-5 py-2 font-medium transition-all duration-300 hover:bg-yellow-500 lg:mt-16">
              See All Recipes
            </a>
          </Link>
        </section>

        {/* CTA-Newsletter Section */}
        <section className="m-40 mx-auto max-w-xl px-10 font-primary md:my-52">
          <div className="text-center">
            <h2 className="m-6 font-primary font-medium uppercase tracking-wide">
              Newsletter
            </h2>
            <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-tight">
              Sign up for Monthly Updates
            </h3>
            <p className="m-auto mt-6 max-w-2xl text-sm leading-loose sm:text-base">
              Join the narrative and get exclusive access to our finest recipes,
              articles, and cooking tips.
            </p>
          </div>

          <form className="text-align mx-auto mt-16 flex max-w-md flex-col lg:flex-row">
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="email"
                name="floating_email"
                className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-3.5 px-0 text-sm text-stone-900 focus:border-zinc-900 focus:outline-none focus:ring-0"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-zinc-900 peer-focus:underline"
              >
                Email address
              </label>
            </div>
            <button className="h-12 w-full border-2 border-zinc-900 bg-yellow-500 px-5 font-medium transition-all duration-500 hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring focus:ring-offset-1 sm:w-auto sm:border-zinc-900 lg:ml-4">
              Subscribe
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const recipes = await sanityClient.fetch(recipesQuery);
  const stories = await sanityClient.fetch(storiesQuery);

  if (!recipes || !stories) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipes,
      stories,
    },
    revalidate: 60 * 60 * 24,
  };
};
