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
  chef-> {
    name,
    image
  }
}`;

export default function StoriesPage({ stories }: Props){
  return (
    <div>
      <Header />
      
      <main>
        <section className='font-primary px-6 max-w-6xl mx-auto my-10'>
          <div className="space-y-4">
            <h1 className="font-medium uppercase tracking-wide">Stories</h1>
            <h2 className="font-display text-start font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">All Stories</h2>
          </div>

          <div className='flex flex-col mt-10'>
          {stories.map((story, index) => (
            <div key={index} className='py-10'>
            <Link key={story._id} href={`/stories/${story.slug.current}`}>
            <div className='links md:flex md:items-center group active:scale-105 duration-300 transition-all space-y-5'>
              <div className='overflow-hidden relative flex-shrink md:max-w-xs lg:max-w-sm'>
                <Image className='w-full h-auto group-hover:scale-105 duration-300 transition-all' src={urlFor(story.mainImage).url()!} alt={story.name} width={1280} height={720} />
              </div>                             
              <div className='flex-grow md:ml-10 space-y-2'>
                <p className='text-xs text-gray-400 group-hover:text-yellow-500 duration-300 transition-all'>Doumentaries</p>
                <h3 className='text-2xl md:text-2xl lg:text-5xl font-semibold group-hover:text-yellow-500 duration-300 transition-all'>{story.name}</h3>
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