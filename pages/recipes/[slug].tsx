import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";
import { Recipe } from "../../typing";

import Image from "next/image";
import PortableText from 'react-portable-text';

import ReactPlayer from 'react-player/lazy';
import Link from "next/link";
import Layout from "../../components/Layout";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { NextSeo } from 'next-seo';
import siteMetadata from "../../data/siteMetadata";

interface Props {
  recipe: Recipe;
  currentRecipe: Recipe;
  recipes: [Recipe];
}

const Recipe = ({recipe}: Props) => {

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    inViewThreshold: 0.7,
    speed: 5,
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin({forceWheelAxis:'x'})]);

  const { currentRecipe, recipes } = recipe;

  const moreRecipes = recipes.sort(() => Math.random() - 0.5).slice(0,2);
  
  return (
    <Layout>
      <NextSeo
      title={currentRecipe.title}
      description={currentRecipe.shortDescription}
      openGraph={{
        url: `${siteMetadata.siteUrl}/recipes/${currentRecipe.slug.current}`,
        title: `${currentRecipe.title}`,
        description: `${currentRecipe.shortDescription}`,
        images: [
          {
            url: `${currentRecipe.mainImage}`,
            width: 1200,
            height: 630,
            alt: "StoryBites"
          },
        ],
      }}
      />
      <main>
        <article className="font-primary mx-auto max-w-3xl my-10">
          <section className="m-10">
            <h2 className="font-medium uppercase tracking-widest text-sm"><span className="hover:text-amber-600 transition-all duration-300"><Link href='/recipes'>Recipe</Link></span></h2>
            <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl md:text-6xl">{currentRecipe.title}</h1>
          </section>

          <section className="m-10 prose prose-p:text-sm sm:prose-p:text-base prose-p:leading-loose sm:prose-p:leading-loose prose-headings:font-bold">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={currentRecipe.description} />
          </section>

          <section className="my-10 relative pb-fluid-video">
            <ReactPlayer
              className="absolute top-0 left-0 w-full h-full"
              url={currentRecipe.video}
              width='100%'
              height='100%'
              controls={true}
            />
          </section>

          <section className="m-10 sm:p-8 p-6 bg-stone-100">
            <h2 className="mb-4 text-3xl">Ingredients</h2>
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={currentRecipe.ingredients}
              className="prose prose-li:text-sm sm:prose-li:text-base prose-headings:font-bold"
            />
          </section>
          <section className="m-10">
            <h2 className="mb-4 text-3xl">Instructions</h2>
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={currentRecipe.instructions}
              className="prose prose-p:text-sm sm:prose-p:text-base prose-p:leading-loose sm:prose-p:leading-loose prose-headings:font-bold"
            />
          </section>

          <section className='grid justify-items-center my-20'>
            <h2 className="uppercase tracking-wider mb-5 font-semibold">Written By</h2>
            <Link href={`/chefs/${currentRecipe.chef.slug}`}>
            <div className='flex items-center space-x-3 links hover:text-amber-600 transition-all'>
              <Image className='rounded-full' src={currentRecipe.chef.image} alt={currentRecipe.chef.name} width={50} height={50} placeholder='blur' blurDataURL={currentRecipe.chef.image}/>
              
                <div>
                  <h3 className="text-sm">{currentRecipe.chef.name}</h3>
                  <h4 className="text-xs text-stone-500">{currentRecipe.chef.bio}</h4>
                </div>
            </div>
            </Link>
          </section>
          
        </article>

        <section className='font-primary flex flex-col justify-center max-w-4xl mx-auto mt-32 mb-10 px-10'>
          <h2 className='text-3xl md:text-4xl lg:mb-5'>More <span className='font-bold'>Recipes</span></h2>

            <div className='embla mx-auto'>
            <div id='embla_div' className='embla__viewport' ref={emblaRef}>
              <div className='embla__container'>
                {moreRecipes.map((recipe, index) => (
                  <div key={index} className='embla__slide py-10'>
                    <Link key={recipe._id} href={`/recipes/${recipe.slug.current}`}>
                      <div className='embla__slide__inner links mx-3 lg:mx-6 group active:scale-105 duration-300 transition-all'>
                        <Image className='embla__slide__img w-full h-auto group-hover:scale-105 duration-300 transition-all' src={recipe.mainImage} alt={recipe.title} placeholder='blur' blurDataURL={recipe.mainImage} width={854} height={480}/>
                        <div>                             
                          <h3 className='text-lg lg:text-xl font-semibold mt-5 group-hover:text-amber-600 duration-300 transition-all'>{recipe.title}</h3>
                          <h4 className='mt-2 group-hover:text-amber-600 duration-300 transition-all'>{recipe.chef.name}</h4>
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
    slug,
    "mainImage": mainImage.url,
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
    "mainImage": mainImage.url
    }
  }`;

  const recipe = await sanityClient.fetch(recipeQuery, {
    slug: params?.slug,
  });
  
  if (!recipe) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      recipe,
    },
    revalidate: 60 * 60 * 24, // after 6000 secs, it'll update the old cache version
  };
};