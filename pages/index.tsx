/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import React from "react";
import Link from "next/link";
import { sanityClient } from "../lib/sanity.server";
import { Recipe, Story } from "../typing";

import useEmblaCarousel from "embla-carousel-react";

import Image from "next/image";
import Layout from "../components/Layout";
import CTANewsletterForm from "../components/CTANewsletterForm";

interface Props {
  recipes: [Recipe];
  stories: [Story];
}

const recipesQuery = `*[_type == "recipe"]{
  _id,
  title,
  slug,
  "mainImage": mainImage.secure_url,
  chef-> {
    name,
  },
  _createdAt
}| order(_createdAt desc)[0..3]`;

const storiesQuery = `*[_type == "story"]{
  _id,
  title,
  slug,
  "mainImage": mainImage.secure_url,
  category-> {
    _id,
    title
  },
  _createdAt
}| order(_createdAt desc)[0..3]`;

export default function Home({ recipes, stories }: Props) {
  // emblaRef will be a reference to our carousel viewport
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    inViewThreshold: 0.7,
    speed: 5,
    containScroll: "trimSnaps",
  });

  const [emblaRef2] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    inViewThreshold: 0.7,
    speed: 5,
    containScroll: "trimSnaps",
  });

  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className="px-10 py-10 text-center sm:mx-10 lg:max-w-4xl xl:mx-auto">
          <h4 className="m-6 font-primary text-sm font-medium uppercase tracking-widest">
            Storybites
          </h4>
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight transition-all duration-300 sm:text-4xl md:text-6xl md:leading-tight">
            Sharing our love for{" "}
            <Link
              href="/stories"
              className="underline-offset-3 text-yellow-500 underline decoration-transparent decoration-4 transition-all duration-500 hover:decoration-yellow-500"
            >
              people
            </Link>{" "}
            and{" "}
            <Link
              href="/recipes"
              className="underline-offset-3 text-yellow-500 underline decoration-transparent decoration-4 transition-all duration-500 hover:decoration-yellow-500"
            >
              food
            </Link>{" "}
            one bite at a time
            <Link href="/about">
              <span className="links text-yellow-500">.</span>
            </Link>
          </h1>
        </section>

        {/* Higlight Reel Section */}
        <section className="sm:x-10 my-24 px-10 text-center sm:py-44 lg:max-w-4xl lg:p-40 xl:mx-auto">
          <h2 className="text-l font-primary md:text-2xl">
            We are a New Zealand based food network and creative agency
            passionate about celebrating the gift of hospitality.
          </h2>
        </section>

        {/* Brand Partners Section */}
        <section className="mx-auto my-24 text-center">
          <h2 className="px-10 text-lg sm:mb-3 sm:text-xl md:mb-3 md:text-2xl lg:mb-5">
            <span className="font-bold">Brands</span> We&apos;ve Worked With
          </h2>
          <div className="flex space-x-20 overflow-hidden pt-5">
            <div className="flex animate-marquee-infinite space-x-20">
              <Image
                className="max-w-none"
                src="/images/partner-logos/selwyn-from-the-land--logo.webp"
                alt="Selwyn from the Land Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/upstock--logo.webp"
                alt="Upstock Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/makikihi-fries--logo.webp"
                alt="Makikihi Fries Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/maimoa--logo.webp"
                alt="Maimoa Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/gong-cha--logo.webp"
                alt="Gong Cha Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/ora-king--logo.webp"
                alt="Ora King Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/aoraki--logo.webp"
                alt="Aoraki Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/proper-crisps--logo.webp"
                alt="Proper Crisps Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/ooni--logo.webp"
                alt="Ooni - Pizza Ovens Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/papparich--logo.webp"
                alt="Papparich Logo"
                width={150}
                height={100}
              />
            </div>
            <div
              className="flex animate-marquee-infinite space-x-20"
              aria-hidden="true"
            >
              <Image
                className="max-w-none"
                src="/images/partner-logos/selwyn-from-the-land--logo.webp"
                alt="Selwyn from the Land Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/upstock--logo.webp"
                alt="Upstock Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/makikihi-fries--logo.webp"
                alt="Makikihi Fries Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/maimoa--logo.webp"
                alt="Maimoa Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/gong-cha--logo.webp"
                alt="Gong Cha Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/ora-king--logo.webp"
                alt="Ora King Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/aoraki--logo.webp"
                alt="Aoraki Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/proper-crisps--logo.webp"
                alt="Proper Crisps Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/ooni--logo.webp"
                alt="Ooni - Pizza Ovens Logo"
                width={150}
                height={100}
              />
              <Image
                className="max-w-none"
                src="/images/partner-logos/papparich--logo.webp"
                alt="Papparich Logo"
                width={150}
                height={100}
              />
            </div>
          </div>
        </section>
        {/* Recent Embla Stories Section */}
        <section className="mx-auto my-32 flex max-w-7xl flex-col justify-center font-primary lg:my-40">
          <h2 className="-mb-3 px-10 text-3xl sm:text-4xl md:mb-3 md:text-5xl lg:mb-5">
            <span className="font-bold">Stories</span> We&apos;ve Shared.
          </h2>

          <div className="embla overflow-hidden px-5 lg:px-0">
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

          <Link
            href="/stories"
            className="mx-auto mt-3 border-2 border-zinc-900 px-5 py-2 font-medium transition-all duration-300 hover:bg-yellow-500 lg:mt-16"
          >
            See All Stories
          </Link>
        </section>

        {/* Recent Recipes Section */}
        <section className="mx-auto my-32 flex max-w-7xl flex-col justify-center font-primary lg:my-40">
          <h2 className="-mb-3 px-10 text-3xl sm:text-4xl md:mb-3 md:text-5xl lg:mb-5">
            Latest <span className="font-bold">Recipes</span>.
          </h2>

          <div className="embla mx-auto px-5">
            <div id="embla_div" className="embla__viewport" ref={emblaRef2}>
              <div className="embla__container">
                {recipes.map((recipe, index) => (
                  <div key={index} className="embla__slide py-10">
                    <Link
                      key={recipe._id}
                      href={`/recipes/${recipe.slug.current}`}
                    >
                      <div className="links group mx-3 transition-all duration-500 active:scale-105 lg:mx-6">
                        <Image
                          className="h-auto w-full transition-all duration-500 group-hover:scale-105"
                          src={recipe.mainImage}
                          alt={recipe.title}
                          placeholder="blur"
                          blurDataURL={recipe.mainImage}
                          width={854}
                          height={480}
                        />
                        <div>
                          <h3 className="mt-3 text-xl font-semibold transition-all duration-300 group-hover:text-amber-600 lg:text-2xl">
                            {recipe.title}{" "}
                            <span className="invisible"> Recipe</span>
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

          <Link
            href="/recipes"
            className="mx-auto mt-5 border-2 border-zinc-900 px-5 py-2 font-medium transition-all duration-300 hover:bg-yellow-500 lg:mt-16"
          >
            See All Recipes
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
          <CTANewsletterForm />
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
