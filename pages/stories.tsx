import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Story } from "../typing";
import { sanityClient } from '../lib/sanity.server';
import { urlFor } from '../lib/sanity';

import Image from 'next/image';

import { FiArrowRightCircle } from "react-icons/fi";


interface Props {
  stories: [Story];
}

const storiesQuery = `*[_type == "story"]{
  _id,
  name,
  slug,
  mainImage,
  category-> {
    _id,
    title
  }
}`;

export default function StoriesPage({ stories }: Props){
  return (
    <div>
      <Header />
      
      <main>
        <section className='font-primary max-w-6xl px-10 mx-auto my-10'>
          <div className="space-y-4">
            <h1 className="font-medium uppercase tracking-wide">Stories</h1>
            <h2 className="font-display text-start font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">All Stories</h2>
          </div>

          <div className='flex flex-col mt-10'>
          {stories.map((story, index) => (
            <div key={index} className='py-10'>
            <Link key={story._id} href={`/stories/${story.slug.current}`}>
            <div className='links md:flex md:items-center group active:scale-105 duration-300 transition-all'>
              <div className='overflow-hidden relative flex-shrink md:max-w-xs lg:max-w-sm'>
                <Image className='w-full h-auto group-hover:scale-105 duration-300 transition-all' src={urlFor(story.mainImage).url()!} alt={story.name} placeholder='blur' blurDataURL={urlFor(story.mainImage).url()!} width={854} height={480} priority={true}/>
              </div>                             
              <div className='flex-grow mt-3 md:ml-10 space-y-3 md:space-y-5'>
                <p className='text-xs uppercase tracking-widest text-gray-500 group-hover:text-yellow-500 duration-300 transition-all'>{story.category.title}</p>
                <h3 className='text-2xl md:text-2xl lg:text-4xl font-semibold group-hover:text-yellow-500 duration-300 transition-all'>{story.name}</h3>

                <FiArrowRightCircle size={42} className='group-hover:text-yellow-500 duration-300 transition-all'/>
              </div>
            </div>
            </Link>
            </div>
          ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const stories = await sanityClient.fetch(storiesQuery);

  return { props: { stories } };
}