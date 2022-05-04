import Link from 'next/link';

import { Story, Category } from "../typing";
import { sanityClient } from '../lib/sanity.server';

import Image from 'next/image';

import { FiArrowRightCircle } from "react-icons/fi";
import CategoryList from '../components/CategoryList';
import Layout from '../components/Layout';


interface Props {
  stories: [Story];
  categories: [Category];
}

const storiesQuery = `*[_type == "story"]{
  _id,
  title,
  slug {
    current
  },
  "mainImage": mainImage.secure_url,
  category-> {
    _id,
    title
  }
  }| order(_createdAt desc)`;

const categoriesQuery = `*[_type == "category"]{
  _id,
  title,
  "slug": slug.current
}`;


export default function StoriesPage({ stories, categories }: Props){
  return (
    <Layout>
        <section className='font-primary max-w-6xl px-10 mx-auto my-10'>
          <div className="space-y-4">
            <h1 className="font-medium text-sm uppercase tracking-widest">Stories</h1>
            <h2 className="font-display text-start font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">All Stories</h2>

            {/* Categories Filter Section */}
            <CategoryList categories={categories}/>
          </div>

          <div className='flex flex-col mt-10'>
          {stories.map((story, index) => (
            <div key={index} className='py-10'>
            <Link key={story._id} href={`/stories/${story.slug.current}`}>
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
        </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const stories = await sanityClient.fetch(storiesQuery);
  const categories = await sanityClient.fetch(categoriesQuery);

  return { props: { stories, categories },
  revalidate: 60 * 60 * 24,  
};
}