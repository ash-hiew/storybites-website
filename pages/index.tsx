import Head from 'next/head';
import Link from 'next/link';
import { urlFor } from "../lib/sanity";
import { sanityClient } from "../lib/sanity.server";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Recipe, Story } from "../typing";
//import { Scrollbars } from 'rc-scrollbars';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';


import Image from 'next/image';

interface Props {
  recipes: [Recipe];
  stories: [Story];
}

const recipesQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage,
  chef-> {
    name,
    image
  }
}`;

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

export default function Home({ recipes, stories }: Props) {

  // emblaRef will be a reference to our carousel viewport
  const [emblaRef, embla] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    inViewThreshold: 0.7,
    speed: 5,
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin({forceWheelAxis:'x'})]);

  const [emblaRef2, emblaApi2] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    inViewThreshold: 0.7,
    speed: 5,
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin({forceWheelAxis:'x'})]);

  return (
  <div>
      <Head>
        <title>Storybites</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      
      <Header />
      <main>
        {/* Hero Section */}
        <section className='text-center px-10 lg:max-w-4xl sm:mx-10 my-24 lg:m-40 xl:mx-auto'>
          <h1 className="font-primary font-medium uppercase m-6 tracking-wide">Storybites</h1>
          <h2 className="font-display font-semibold leading-tight tracking-tight text-3xl md:text-6xl md:leading-tight duration-500 transition-all">Sharing our love for <a href='/stories' className='text-yellow-500 underline decoration-transparent hover:decoration-yellow-500 duration-500 transition-all decoration-4 underline-offset-2'>people</a> and <a href='/recipes' className='text-yellow-500 underline decoration-transparent hover:decoration-yellow-500 duration-500 transition-all decoration-4 underline-offset-2'>food</a> one bite at a time<span className='text-yellow-500'>.</span></h2>
        </section>

        {/* About Section */}

        {/* Higlight Reel Section */}
        <section className='text-center px-10 lg:max-w-4xl sm:mx-10 my-24 lg:m-40 xl:mx-auto sm:py-44'>
          <p className="font-primary text-l md:text-2xl leading-loose">We are a <span className='font-semibold'>New Zealand</span> based culinary brand mandated to empower one million people to find humanity in <span className='font-semibold'>gastronomy</span>.</p>
        </section>

        {/* Recent Embla Stories Section */}
        <section className='font-primary flex flex-col justify-center max-w-7xl mx-auto my-32 lg:my-40 px-10'>
          <h2 className='text-3xl md:text-5xl lg:mb-5'>Recent <span className='font-bold'>Stories</span> We've Shared.</h2>

          <div className='embla overflow-hidden lg:px-0'>
            <div className='embla__viewport ' ref={emblaRef}>
              <div className='embla__container'>
              {stories.slice(0, 3).map((story, index) => (
                <div key={index} className='embla__slide py-10'>
                  <Link key={story._id} href={`/stories/${story.slug.current}`}>
                    <div className='links mx-3 lg:mx-6 group active:scale-105 duration-500 transition-all'>
                      <Image className='w-full h-auto group-hover:scale-105 duration-500 transition-all' src={urlFor(story.mainImage).url()!} alt={story.name} placeholder='blur' blurDataURL={urlFor(story.mainImage).url()!} width={1280} height={720}/>
                      <div>        
                      <p className='mt-5 text-xs uppercase tracking-widest text-gray-500 group-hover:text-yellow-500 duration-300 transition-all'>{story.category.title}</p>                     
                      <h3 className='mt-2 text-xl md:text-2xl font-semibold group-hover:text-yellow-500 duration-500 transition-all'>{story.name}</h3>

                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              </div>
            </div>
          </div>

          <a href="/stories" className='font-medium mt-2 md:mt-5 xl:mt-16 px-5 py-2 border-2 border-black mx-auto hover:bg-yellow-500 duration-500 transition-all'>See more Stories</a>
          
        </section>

        {/* Recent Recipes Section */}
        <section className='font-primary flex flex-col justify-center max-w-7xl mx-auto my-32 lg:my-40 px-10'>
          <h2 className='text-3xl md:text-5xl lg:mb-5'>The Latest <span className='font-bold'>Recipes</span> Collected.</h2>

          <div className='embla mx-auto'>
          {/*<div className='mx-auto'>
            <button className="p-5 rounded-lg" type="button" onClick={scrollPrev}>
            Prev
            </button>
            <button className="p-5 rounded-lg" type="button" onClick={scrollNext}>
            Next
            </button>
              </div>*/}
          <div id='embla_div' className='embla__viewport' ref={emblaRef2}>
            <div className='embla__container'>
              {recipes.slice(0, 3).map((recipe, index) => (
                <div key={index} className='embla__slide py-10'>
                  <Link key={recipe._id} href={`/recipes/${recipe.slug.current}`}>
                    <div className='embla__slide__inner links mx-3 lg:mx-6 group active:scale-105 duration-500 transition-all'>
                      <Image className='embla__slide__img w-full h-auto group-hover:scale-105 duration-500 transition-all' src={urlFor(recipe.mainImage).url()!} alt={recipe.name} placeholder='blur' blurDataURL={urlFor(recipe.mainImage).url()!} width={1280} height={720}/>
                      <div>                             
                        <h3 className='text-xl lg:text-2xl font-semibold mt-5 group-hover:text-yellow-500 duration-500 transition-all'>{recipe.name}</h3>
                        <p className='mt-2 group-hover:text-yellow-500 duration-500 transition-all'>{recipe.chef.name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a href="/recipes" className='font-medium mt-5 lg:mt-16 px-5 py-2 border-2 border-black mx-auto hover:bg-yellow-500 duration-500 transition-all'>See more Recipes</a>
        
        </section>

        {/* CTA-Newsletter Section */}
        <section className='font-primary px-10 max-w-xl mx-auto m-40 md:my-52'>
          <div className='text-center'>
            <h2 className="font-primary font-medium uppercase m-6 tracking-wide">Newsletter</h2>
            <h3 className="font-display font-semibold leading-tight tracking-tight text-3xl md:text-6xl md:leading-tight">Sign up for Monthly Updates</h3>
            <p className='mt-6 max-w-2xl text-sm sm:text-base leading-loose m-auto'>Join the narrative and get exclusive access to our finest recipes, articles, and cooking tips.</p>
          </div>

          <form className='flex flex-col lg:flex-row text-align mt-16 mx-auto max-w-md'>
            <div className="relative z-0 mb-6 w-full group">
              <input type="email" name="floating_email" className="block py-3.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
              <label htmlFor="floating_email" className="absolute text-sm peer-focus:underline text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-7">Email address</label>
            </div>
            <button className="font-medium focus:outline-none focus:ring-offset-1 focus:ring border-black sm:border-black border-2 w-full h-12 sm:w-auto lg:ml-4 bg-yellow-500 px-5 hover:bg-black hover:text-white duration-500 transition-all">Subscribe</button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
    
  );
};

export const getStaticProps = async () => {
  const recipes = await sanityClient.fetch(recipesQuery);
  const stories = await sanityClient.fetch(storiesQuery);

  return { props: { recipes, stories } };
};