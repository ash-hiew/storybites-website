import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";
import { Recipe } from "../../typing";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Image from "next/image";
import PortableText from 'react-portable-text';

import ReactPlayer from 'react-player/lazy';
import { urlFor } from "../../lib/sanity";

interface Props {
  recipe: Recipe;
}

const Recipe = ({recipe}: Props) => {
  
  return (
    <div>
    <Header />
    <main>
      <article className="font-primary mx-auto max-w-3xl my-20">
        <div className="m-10">
        <h2 className="font-medium uppercase tracking-widest text-sm">Recipe</h2>
        <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl md:text-6xl">{recipe.name}</h1>
        </div>

        <div className="my-10 relative pb-fluid-video">
          <ReactPlayer
            className="absolute top-0 left-0 w-full h-full"
            url={recipe.video}
            width='100%'
            height='100%'
            controls={true}
            
          />
        </div>
        <div className="m-10 sm:p-8 p-6 bg-stone-100">
          <h3 className="mb-4 text-3xl">Ingredients</h3>
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={recipe.ingredients}
            className="prose prose-li:text-sm sm:prose-li:text-base prose-headings:font-bold"
           />
        </div>
        <div className="m-10">
          <h3 className="mb-4 text-3xl">Instructions</h3>
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={recipe.instructions}
            className="prose prose-p:text-sm sm:prose-p:text-base prose-p:leading-loose sm:prose-p:leading-loose prose-headings:font-bold"
           />
        </div>

        <div className='grid justify-items-center my-20'>
          <p className="uppercase tracking-wider mb-5 font-semibold">Written By</p>
          <div className='flex items-center space-x-3'>
            <Image className='rounded-full' src={urlFor(recipe.chef.image).width(100).url()!} alt={recipe.chef.name} width={50} height={50} placeholder='blur' blurDataURL={urlFor(recipe.chef.image).url()!}/>
            <div>
              <p className="text-sm">{recipe.chef.name}</p>
              <p className="text-xs text-stone-500">{recipe.chef.bio}</p>
            </div>
            
          </div>
        </div>
        
      </article>

    </main>
    <Footer />
    </div>
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
  ...,
  chef -> {
    name,
    image,
    bio
  },
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