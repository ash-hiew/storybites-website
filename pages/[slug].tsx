
import { sanityClient } from "../lib/sanity.server";
import { GetStaticProps } from "next";

import { Story, Chef, Category } from "../typing";

import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";

import Image from 'next/image';
import CategoryList from "../components/CategoryList";
import Layout from "../components/Layout";

import { NextSeo } from 'next-seo';
import siteMetadata from "../data/siteMetadata";

interface Props {
  story: Story;
  stories: [Story];
  chef: Chef;
  categoryWithStories: Category;
  categories: [Category];
  currentCategory: Category;
}

const Category = ({categoryWithStories}: Props) => {

  const { currentCategory, stories, categories } = categoryWithStories;

  return (
    <Layout>
      <NextSeo 
      title={`${currentCategory.title} - Stories`}
      description=""
      openGraph={{
        url: `${siteMetadata.siteUrl}/${currentCategory}`,
        title: `${currentCategory.title} - Stories`,
        description: ""
      }}
      />
      <main>
        <section className='font-primary max-w-6xl px-10 mx-auto my-10'>
          <div className="space-y-4">
            <h1 className="font-medium text-sm uppercase tracking-widest">Stories</h1>
            <h2 className="font-display text-start font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">{currentCategory.title}</h2>

            {/* Categories Filter Section */}
            <CategoryList categories={categories} />
          </div>

          <div className='flex flex-col mt-10'>
          {stories.map((story) => (
            <div key={story._id} className='py-10'>
            <Link key={story._id} href={`stories/${story.slug}`}>
            <div className='links md:flex md:items-center group active:scale-105 duration-300 transition-all'>
              <div className='overflow-hidden relative flex-shrink md:max-w-xs lg:max-w-sm'>
                <Image className='w-full h-auto group-hover:scale-105 duration-300 transition-all' src={story.mainImage} alt={story.title} placeholder='blur' blurDataURL={story.mainImage} width={854} height={480}/>
              </div>                             
              <div className='flex-grow mt-3 md:ml-10 space-y-3 md:space-y-5'>
                <p className='text-xs uppercase tracking-widest text-stone-500'>{story.category.title}</p>
                <h3 className='text-2xl md:text-2xl lg:text-4xl font-semibold group-hover:text-amber-600 duration-300 transition-all'>{story.title}</h3>

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
    }
  }

  return {
    props: {
      categoryWithStories
    },
    revalidate: 60 * 60 * 24, 
  };
};