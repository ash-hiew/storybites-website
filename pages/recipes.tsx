import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Recipe } from "../typing";
import { sanityClient } from '../lib/sanity.server';
import { urlFor } from '../lib/sanity';

import Image from 'next/image';

import { FiArrowRightCircle } from "react-icons/fi";

interface Props {
  recipes: [Recipe];
}

const recipesQuery = `*[_type == "recipe"]{
  ...,
  chef-> {
    name
  }
}`;


export default function RecipesPage({ recipes} : Props){
  return (
    <div>
      <Header />

      <main>
        <section className='font-primary max-w-6xl mx-auto px-10 my-10'>
          <div className="space-y-4">
            <h1 className="font-medium uppercase tracking-widest">Recipes</h1>
            <h2 className="font-display text-start font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">All Recipes</h2>
          </div>

          <div className='flex flex-col mt-10'>
          {recipes.map((recipe, index) => (
            <div key={index} className='py-10'>
            <Link key={index} href={`/recipes/${recipe.slug.current}`}>
            <div className='links md:flex md:items-center group active:scale-105 duration-300 transition-all'>
              <div className='overflow-hidden relative flex-shrink md:max-w-xs lg:max-w-sm'>
                <Image className='w-full h-auto group-hover:scale-105 duration-300 transition-all' src={urlFor(recipe.mainImage).url()!} alt={recipe.name} placeholder='blur' blurDataURL={urlFor(recipe.mainImage).url()!} width={854} height={480} priority={true}/>
              </div>                             
              <div className='flex-grow md:ml-10 mt-3 space-y-3 md:space-y-5'>
                {/*<p className='text-xs text-stone-400 group-hover:text-yellow-500 duration-300 transition-all'>Category</p>*/}
                <h3 className='text-2xl md:text-2xl lg:text-5xl font-semibold group-hover:text-yellow-500 duration-300 transition-all'>{recipe.name}</h3>
                <p className='group-hover:text-yellow-500 duration-300 transition-all'>{recipe.chef.name}</p>
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
  )
}


export const getStaticProps = async () => {
  const recipes = await sanityClient.fetch(recipesQuery);

  return { props: { recipes } };
}