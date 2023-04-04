/* eslint-disable new-cap */
import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";
import React from "react";
import { Story, Chef } from "../../typing";

import PortableText from "react-portable-text";

import { default as _ReactPlayer } from "react-player/lazy";
import { ReactPlayerProps } from "react-player/types/lib";
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;
import Link from "next/link";
import Layout from "../../components/Layout";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";

import { NextSeo } from "next-seo";
import siteMetadata from "../../data/siteMetadata";

interface Props {
  story: Story;
  chef: Chef;
  stories: [Story];
  currentStory: Story;
}

const Story = ({ story }: Props) => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      skipSnaps: false,
      speed: 5,
      containScroll: "trimSnaps",
    },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })]
  );

  const { currentStory, stories } = story;

  const moreStories = stories.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <Layout>
      <NextSeo
        title={currentStory.title}
        description={currentStory.shortDescription}
        canonical={`${siteMetadata.siteUrl}stories/${currentStory.slug}`}
        openGraph={{
          url: `${siteMetadata.siteUrl}stories/${currentStory.slug}`,
          title: `${currentStory.title}`,
          description: `${currentStory.shortDescription}`,
          images: [
            {
              url: `${currentStory.mainImage}`,
              width: 1200,
              height: 630,
              alt: "StoryBites",
            },
          ],
        }}
      />
      <main>
        <article className="mx-auto my-10 max-w-3xl font-primary">
          <div className="m-10 flex flex-col space-y-5">
            <h2 className="text-sm font-medium uppercase tracking-widest">
              <span className="transition-all duration-300 hover:text-amber-600">
                <Link href="/stories">Story</Link>
              </span>{" "}
              -{" "}
              <span className="transition-all duration-300 hover:text-amber-600">
                <Link href={`../${currentStory.category.slug}`}>
                  {currentStory.category.title}
                </Link>
              </span>
            </h2>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              {currentStory.title}
            </h1>
          </div>

          <div className="prose m-10 prose-headings:font-bold prose-p:text-sm prose-p:leading-loose sm:prose-p:text-base sm:prose-p:leading-loose">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={currentStory.description}
            />
          </div>

          <div className="relative mt-10 pb-fluid-video">
            <ReactPlayer
              className="absolute top-0 left-0 h-full w-full"
              url={currentStory.video}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>

          <div className="my-20 mx-10 grid justify-items-center">
            <p className="mb-5 font-semibold uppercase tracking-wider">
              Featured Chefs
            </p>
            <div className="flex flex-col items-start space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0">
              {currentStory.chefs.map((chef) => (
                <Link key={chef._id} href={`/chefs/${chef.slug}`}>
                  <div className="links flex items-center space-x-3 transition-all duration-300 hover:text-amber-600">
                    <Image
                      className="rounded-full"
                      src={chef.image}
                      alt={chef.name}
                      width={50}
                      height={50}
                    />
                    <div>
                      <p className="text-sm">{chef.name}</p>
                      <p className="text-xs text-stone-400">{chef.bio}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
        <section className="mx-auto mt-32 mb-4 flex max-w-4xl flex-col justify-center font-primary">
          <h2 className="px-10 text-3xl md:text-4xl lg:mb-5">
            More <span className="font-bold">Stories</span>
          </h2>

          <div className="embla mx-auto break-words px-5">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {moreStories.map((moreStory, index) => (
                  <div key={index} className="embla__slide py-10">
                    <Link
                      key={moreStory._id}
                      href={`/stories/${moreStory.slug}`}
                    >
                      <div className="links group mx-3 transition-all duration-500 active:scale-105 lg:mx-6">
                        <Image
                          className="h-auto w-full transition-all duration-500 group-hover:scale-105"
                          src={moreStory.mainImage}
                          alt={moreStory.title}
                          placeholder="blur"
                          blurDataURL={moreStory.mainImage}
                          width={854}
                          height={480}
                        />
                        <div>
                          <p className="mt-2 text-xs uppercase  tracking-widest text-stone-500 transition-all duration-300 group-hover:text-amber-600 md:text-sm">
                            {moreStory.category.title}
                          </p>
                          <h3 className="mt-1 text-sm font-semibold transition-all duration-300 group-hover:text-amber-600 md:text-lg lg:text-xl">
                            {moreStory.title}
                          </h3>
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

export default Story;

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(
    `*[_type == "story" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const storyQuery = `*[_type == "story" && slug.current == $slug]{
    "currentStory": {
        _id,
        title,
        shortDescription,
        description,
        video,
        "slug": slug.current,
        chefs[] -> {
          _id,
          name,
          "slug": slug.current,
          "image": image.secure_url,
          bio
        },
        category-> {
          _id,
          title,
          "slug": slug.current
      }
    },
    "stories": *[_type == "story" && slug.current != $slug]{
      _id,
      title,
      "slug": slug.current,
      "mainImage": mainImage.secure_url,
      category-> {
        _id,
        title
      }
    }
  }[0]`;

  const story = await sanityClient.fetch(storyQuery, {
    slug: params?.slug,
  });

  if (!story) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      story,
    },
    revalidate: 60 * 60 * 24, // after 6000 secs, it'll update the old cache version
  };
};
