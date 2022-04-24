import { urlFor } from "../../lib/sanity";
import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";

import { Story } from "../../typing";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import PortableText from 'react-portable-text';

import ReactPlayer from 'react-player/lazy';


interface Props {
  story: Story;
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

      <article className="font-primary mx-auto max-w-3xl p-5 my-20">

        <div className="my-5">
          <h2 className="font-medium uppercase tracking-wide">Story</h2>
          <h1 className="mt-3 font-display font-bold text-5xl">{story.name}</h1>
        </div>

        <div className="my-10">
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
                <p>
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