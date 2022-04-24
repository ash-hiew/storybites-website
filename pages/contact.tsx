

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div>
      <Header />
      
      <main>
        <section className='font-primary px-10 max-w-2xl mx-auto my-32'>
          <div className="text-center space-y-6">
            <h1 className="font-medium uppercase tracking-wide">Contact</h1>
            <h2 className="font-display font-semibold tracking-tight text-4xl md:text-6xl leading-normal md:leading-tight text-center">Work With Us</h2>
            <p className="text-sm sm:text-base leading-loose sm:leading-loose">
            See potential for a synergistic conversation? No matter your background whether in hospitality, FMCG, equipment innovation, or food tourism, we want to hear from you.
            </p>
          </div>
        {/* Contact Form */}
          <form className="mt-12">
            <div className="relative z-0 mb-6 w-full group">
              <input type="text" name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer autofill:bg-white" placeholder=" " required />
              <label htmlFor="floating_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-7">Full name</label>
            </div>

            <div className="grid xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 mb-6 w-full group">
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer" placeholder=" " required />
                <label htmlFor="floating_phone" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-7">Phone number (123-456-7890)</label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input type="email" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer" placeholder=" " required />
                <label htmlFor="floating_email" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-7">Email address</label>
              </div>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <textarea name="message" id="message" rows={4} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer" placeholder=" " required />
              <label htmlFor="message" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-7">Message</label>
            </div>
            <button type="submit" className="font-medium focus:outline-none focus:ring-offset-1 focus:ring border-black sm:border-black border-2 w-full h-12 bg-yellow-500 px-5 hover:bg-black hover:text-white duration-500 transition-all">Send</button>
          </form>
        </section>
      </main>
      
      <Footer />
  </div>
  )
};