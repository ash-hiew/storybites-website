import Header from '../components/Header';
import Footer from '../components/Footer';

import Image from 'next/image';
import { Chef } from '../typing';
import { sanityClient } from '../lib/sanity.server';
import { urlFor } from '../lib/sanity';
import Link from 'next/link';
import PortableText from 'react-portable-text';

interface Props {
  chefs: [Chef];
}

const chefsQuery = `*[_type == "chef"]{
  _id,
  name,
  image,
  bio
}`;

export default function ChefsPage({ chefs } : Props){
  return (
    <div>
      <Header />
      
      <main>
        <section className='font-primary px-6 max-w-4xl mx-auto my-32'>
          <div className="space-y-4 md:space-y-6">
            <h1 className="font-medium uppercase tracking-wide">Our Chefs</h1>
            <p className="font-display font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">The Quintessence to Culinary Collaboration.</p>
          </div>
        </section>

        <section className='mx-auto'>
          <div className='mx-auto'>
            <img src='https://via.placeholder.com/1920x700'/>
          </div>
        </section>

        <section className='font-primary px-6 max-w-4xl mx-auto my-20'>
          <div className="space-y-4 md:space-y-6 text-start md:text-center">
          <h2 className='font-semibold tracking-tight text-3xl'>Chefs We've Collaborated With.</h2>
          <p className='mt-3 max-w-2xl mx-auto'>
            From fried chicken, to french pastries, food has no place for discrimination. Check out our team of culinary collaborators.
          </p>        
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 justify-center content-start mt-10'>
          {chefs.map((chef, index) => (
            <div key={index} className='flex flex-col my-8  justify-center'>
                <img className='rounded-full' src={urlFor(chef.image).url()!} alt={chef.name} />                          
              <div className='space-y-1 mt-5 text-center'>
                <h3 className='text-lg font-semibold'>{chef.name}</h3>
                <p className='text-xs text-gray-400'>          
                <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={chef.bio} /></p>
              </div>
            
            </div>
          ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='font-primary px-6 max-w-4xl mx-auto m-40 md:my-52 text-center'>
          <div className='mx-auto my-10'>
            <h2 className="font-primary font-medium uppercase m-6 tracking-wide">Contact</h2>
            <h3 className="font-display font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">Keen to Partner With Us?</h3>
            <p className='mt-6 max-w-2xl mx-auto'>
              If you are passionate about sharing your craft to the community we are building, join the narrative and start the conversation today.
            </p>
          </div>

          <a href="/stories" className='font-medium px-5 py-2 border-2 border-black mx-auto bg-yellow-500 hover:bg-black hover:text-white duration-500 transition-all'>Let's have a chat</a>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const chefs = await sanityClient.fetch(chefsQuery);

  return { props: { chefs } };
}