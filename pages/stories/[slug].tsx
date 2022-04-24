import { urlFor } from "../../lib/sanity";
import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";

import { Story, Chef } from "../../typing";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import PortableText from 'react-portable-text';

import ReactPlayer from 'react-player/lazy';


interface Props {
  story: Story;
  chef: Chef;
}

const Story = ({story}: Props) => {

  return (
    <div>
    <Header />
    <main>
      {/*<img
        className="w-screen object-cover"
        src={urlFor(recipe.mainImage).url()!}
        alt=""
    />*/}

      <article className="font-primary mx-auto max-w-3xl my-20">

        <div className="flex flex-col m-10 space-y-5">
          <h2 className="font-medium uppercase tracking-wide">Story - <span>{story.category.title}</span></h2>
          <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl md:text-6xl">{story.name}</h1>
        </div>

        <div className="m-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={story.description}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props}></h1>
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props}></h1>
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-decimal">{children}</li>
              ),
              link: ({ children, href }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
              normal: ({ children }: any) => (
                <p className="text-sm sm:text-base leading-loose sm:leading-loose">
                  {children}<br />
                </p>
              )
            }} />
        </div>

        <div className="relative pb-fluid-video mt-10">
          <ReactPlayer
            className="absolute top-0 left-0 w-full h-full"
            url={story.video}
            width='100%'
            height='100%' />
        </div>
        
        <div className="grid justify-items-center my-20 mx-10">
          <p className="uppercase tracking-wider mb-5 font-semibold">Featured Chefs</p>
          <div className='flex flex-col sm:flex-row items-start sm:space-x-8 space-y-6 sm:space-y-0'>
            {story.chefs.map(chef => (
              <div className='flex items-center space-x-3'>
              <img className='rounded-full' src={urlFor(chef.image).width(50).url()!} alt={chef.name} />
              <p className="text-xs">{chef.name}</p>
              </div>
            ))}
          </div>
        </div>

      </article>

    </main>
    <Footer />
    </div>
  );
};

export default Story;

export const getStaticPaths = async () => {
  const query = `*[_type == "story"]{
        _id,
        slug {
          current
        }
      }`;

  const stories = await sanityClient.fetch(query);
  
  const paths = stories.map((story: Story) => ({
    params: {
      slug: story.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const storyQuery = `*[_type == "story" && slug.current == $slug][0]{
  _id,
  name,
  chefs[] -> {
    name,
    image
  },
  category-> {
    _id,
    title
  },
  slug,
  video,
  description
}`;

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
      story,
    },
    //revalidate: 600, // after 6000 secs, it'll update the old cache version
  };
};