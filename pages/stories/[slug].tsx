import { urlFor } from "../../lib/sanity";
import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";

import { Story, Chef } from "../../typing";

import PortableText from 'react-portable-text';

import ReactPlayer from 'react-player/lazy';
import Link from "next/link";
import Layout from "../../components/Layout";

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Image from 'next/image';

interface Props {
  story: Story;
  chef: Chef;
  stories: [Story];
  currentStory: Story;
}

const Story = ({story}: Props) => {

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    inViewThreshold: 0.7,
    speed: 5,
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin({forceWheelAxis:'x'})]);

  const { currentStory, stories } = story;

  const moreStories = stories.sort(() => Math.random() - 0.5).slice(0,3)

  return (
  <Layout>
        <main>
      <article className="font-primary mx-auto max-w-3xl my-10">

        <div className="flex flex-col m-10 space-y-5">
          <h2 className="font-medium uppercase tracking-widest text-sm"><span className="hover:text-amber-600 transition-all duration-300"><Link href='/stories'>Story</Link></span> - <span className="hover:text-amber-600 transition-all duration-300"><Link href={`../${currentStory.category.slug.current}`}>{currentStory.category.title}</Link></span></h2>
          <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl md:text-6xl">{currentStory.title}</h1>
        </div>

        <div className="m-10 prose prose-p:text-sm sm:prose-p:text-base prose-p:leading-loose sm:prose-p:leading-loose prose-headings:font-bold">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={currentStory.description} />
        </div>

        <div className="relative pb-fluid-video mt-10">
          <ReactPlayer
            className="absolute top-0 left-0 w-full h-full"
            url={currentStory.video}
            width='100%'
            height='100%'
            controls={true}
            />
        </div>
        
        <div className="grid justify-items-center my-20 mx-10">
          <p className="uppercase tracking-wider mb-5 font-semibold">Featured Chefs</p>
          <div className='flex flex-col sm:flex-row items-start sm:space-x-8 space-y-6 sm:space-y-0'>
            {currentStory.chefs.map(chef => (
              <Link href={`/chefs/${chef.slug}`}>
                <div key={chef._id} className='flex items-center space-x-3 links hover:text-amber-600 duration-300 transition-all'>
                  <Image className='rounded-full' src={chef.image} alt={chef.name} width={50} height={50}/>
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
      <section className='font-primary flex flex-col justify-center max-w-7xl mx-auto my-32 lg:my-40 px-10'>
          <h2 className='text-2xl md:text-3xl lg:mb-5'>More <span className='font-bold'>Stories</span></h2>

          <div className='embla overflow-hidden lg:px-0'>
            <div className='embla__viewport ' ref={emblaRef}>
              <div className='embla__container'>
              {moreStories.map((moreStory, index) => (
                <div key={index} className='embla__slide py-10'>
                  <Link key={moreStory._id} href={`/stories/${moreStory.slug.current}`}>
                    <div className='links mx-3 lg:mx-6 group active:scale-105 duration-500 transition-all'>
                      <Image className='w-full h-auto group-hover:scale-105 duration-500 transition-all' src={moreStory.mainImage} alt={moreStory.title} placeholder='blur' blurDataURL={moreStory.mainImage} width={854} height={480} priority={true}/>
                      <div>        
                      <p className='mt-3 text-xs uppercase tracking-widest text-stone-500 group-hover:text-amber-600 duration-300 transition-all'>{moreStory.category.title}</p>                     
                      <h3 className='mt-2 text-xl md:text-2xl font-semibold group-hover:text-amber-600 duration-300 transition-all'>{moreStory.title}</h3>
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
    `*[_type == "story" && defined(slug.current)][].slug.current`);
  
  return {
    paths: paths.map((slug: any) => ({params: {slug}})),
    fallback: "blocking",
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {


  const storyQuery = `*[_type == "story" && slug.current == $slug]{
    "currentStory": {
        _id,
        title,
        description,
        video,
        slug,
        chefs[] -> {
          name,
          "slug": slug.current,
          "image": image.secure_url,
          bio
        },
        category-> {
          _id,
          title,
          slug {
            current
        }
      }
    },
    "stories": *[_type == "story" && slug.current != $slug]{
          _id,
      title,
      slug,
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
    }
  }

  return {
    props: {
      story
    },
    revalidate: 60 * 60 * 24, // after 6000 secs, it'll update the old cache version
  };
};