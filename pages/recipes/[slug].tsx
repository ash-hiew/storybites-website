import { sanityClient } from "../../lib/sanity.server";
import { GetStaticProps } from "next";
import { Recipe } from "../../typing";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import PortableText from 'react-portable-text';

import ReactPlayer from 'react-player/lazy';

interface Props {
  recipe: Recipe;
}

const Recipe = ({recipe}: Props) => {

  return (
    <div>
    <Header />
    <main>
      {/*<img
        className="w-screen object-cover"
        src={urlFor(recipe.mainImage).url()!}
        alt=""
    />*/}

      <article className="font-primary mx-auto max-w-3xl px-5 my-10">
        <div className="my-5">
        <h2 className="font-medium uppercase tracking-wide">Recipe</h2>
        <h1 className="mt-3 font-display font-bold text-5xl">{recipe.name}</h1>
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

        <div className="my-20">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={recipe.instructions}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-3 text-4xl font-bold" {...props}></h1>
              ),
              h2: (props: any) => (
                <h2 className="my-3 text-3xl font-bold" {...props}></h2>
              ),
              h3: (props: any) => (
                <h3 className="my-3 text-2xl font-bold" {...props}></h3>
              ),
              h4: (props: any) => (
                <h4 className="my-3 text-xl font-bold" {...props}></h4>
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ children, href }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }} />
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
  _id,
  name,
  slug,
  chef -> {
    name
  },
  mainImage,
  video,
  instructions
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
    //revalidate: 600, // after 6000 secs, it'll update the old cache version
  };
};