import { urlFor } from "../../lib/sanity";
import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";

import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";

import Image from 'next/image';
import Layout from "../../components/Layout";
import { Chef, Recipe, Story } from "../../typing";

interface Props {
  story: Story;
  recipe: Recipe;
  chef: Chef;
  chefWithRelatedVideos: Chef;
  currentChef: Chef;
}

const Chef = ({chefWithRelatedVideos}: Props ) => {

  const { relatedRecipes, relatedStories,  currentChef} = chefWithRelatedVideos;

  return (
    <Layout>
      <main>
        <section className='font-primary max-w-6xl px-10 mx-auto my-10'>
          <div className="space-y-4">
            <h1 className="font-medium text-sm uppercase tracking-widest">Related Videos</h1>
            <h2 className="font-display text-start font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">{currentChef.name}</h2>

          </div>

          <div className='flex flex-col mt-10'>
          {relatedStories.map((story) => (
            <div key={story._id} className='py-10'>
            <Link key={story._id} href={`stories/${story.slug}`}>
            <div className='links md:flex md:items-center group active:scale-105 duration-300 transition-all'>
              <div className='overflow-hidden relative flex-shrink md:max-w-xs lg:max-w-sm'>
                <Image className='w-full h-auto group-hover:scale-105 duration-300 transition-all' src={story.mainImage} alt={story.title} placeholder='blur' blurDataURL={story.mainImage} width={854} height={480} priority={true}/>
              </div>                             
              <div className='flex-grow mt-3 md:ml-10 space-y-3 md:space-y-5'>
                <p className='text-xs uppercase tracking-widest text-stone-500 group-hover:text-amber-600 duration-300 transition-all'>{story.category.title}</p>
                <h3 className='text-2xl md:text-2xl lg:text-4xl font-semibold group-hover:text-amber-600 duration-300 transition-all'>{story.title}</h3>

                <FiArrowRightCircle size={42} className='group-hover:text-amber-600 duration-300 transition-all'/>
              </div>
            </div>
            </Link>
            </div>
          ))}
          </div>

          <div className='flex flex-col mt-10'>
          {relatedRecipes.map((recipe, index) => (
            <div key={index} className='py-10'>
            <Link key={index} href={`/recipes/${recipe.slug}`}>
            <div className='links md:flex md:items-center group active:scale-105 duration-300 transition-all'>
              <div className='overflow-hidden relative flex-shrink md:max-w-xs lg:max-w-sm'>
                <Image className='w-full h-auto group-hover:scale-105 duration-300 transition-all' src={recipe.mainImage} alt={recipe.title} placeholder='blur' blurDataURL={recipe.mainImage} width={854} height={480} priority={true}/>
              </div>                             
              <div className='flex-grow md:ml-10 mt-3 space-y-3 md:space-y-5'>
                <h3 className='text-2xl md:text-2xl lg:text-5xl font-semibold group-hover:text-amber-600 duration-300 transition-all'>{recipe.title}</h3>
                <p className='group-hover:text-amber-600 duration-300 transition-all'>{currentChef.name}</p>
                <FiArrowRightCircle size={42} className='group-hover:text-amber-600 duration-300 transition-all'/>
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
      image,
      bio
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
  }`

  const chefWithRelatedVideos = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  
  if (!chefWithRelatedVideos) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      chefWithRelatedVideos
    },
    revalidate: 60 * 60 * 24, 
  };
};