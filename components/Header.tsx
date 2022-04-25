import Link from "next/link";
import { useState } from "react";

function Header() {

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  // Disable scroll when menu open
  if (typeof window !== "undefined") {
    if(active){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    }

  
  return (
    <header className="font-primary sticky top-0 z-50 shadow-md bg-stone-50">

      <nav className='flex max-w-7xl mx-auto relative items-center flex-wrap bg-stone-50 p-3'>

        {/* Logo */}
        <Link href='/'>
          <a className='group inline-flex items-center p-2 mr-4 z-20 transition-all duration-300'>
          <img className= "w-16 object-contain cursor-pointer group-hover:scale-90 transition-all duration-300" src="/images/storybites-logo.svg" alt="Storybites Logo" />
          </a>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className=' inline-flex lg:hidden text-zinc-900 ml-auto outline-none hover:scale-90 transition-all duration-300 z-20'
          onClick={handleClick}
        >
          <svg className={`${ active ? 'active-rotate' : ''} ham ham1`} viewBox="0 0 100 100" width="60">
            <path
                  className={`${ active ? 'active-top' : ''} line top`}
                  d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
            <path
                  className="line middle"
                  d="m 30,50 h 40" />
            <path
                  className={`${ active ? 'active-bottom' : ''} line bottom `}
                  d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
          </svg>
        </button>

        {/* Navigation Links: Mobile & Desktop */}
        <div
          className={`${
            active ? 'max-h-full' : 'max-h-0 overflow-hidden duration-700'
          } fixed lg:relative top-0 left-0 transition-all duration-800 delay-100 ease-in-out bg-stone-50 h-screen w-full lg:h-full lg:max-h-full lg:inline-flex lg:flex-grow lg:w-auto z-10`}
        >
          <div className='p-5 mt-32 text-3xl font-bold space-y-5 lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:p-0 lg:mt-0 lg:space-y-0 w-full lg:items-center flex flex-col lg:text-base lg:font-medium lg:h-auto prose-a:transition-all prose-a:duration-300 prose-a:ease-in-out prose-a:justify-center text-zinc-900 hover:prose-a:text-yellow-500 hover:prose-a:scale-105 prose-a:rounded prose-a:items-center'>
            <Link href='/stories'>
              <a className={`${ active ? 'text-opacity-100 delay-300' : 'text-opacity-0' }'lg:inline-flex lg:w-auto w-full px-3 py-2 lg:text-opacity-100`}>
                Stories
              </a>
            </Link>
            <Link href='/recipes'>
              <a className={`${ active ? 'text-opacity-100 delay-300' : 'text-opacity-0' }'lg:inline-flex lg:w-auto w-full px-3 py-2 lg:text-opacity-100`}>
                Recipes
              </a>
            </Link>
            <Link href='/chefs'>
              <a className={`${ active ? 'text-opacity-100 delay-300' : 'text-opacity-0 ' }'lg:inline-flex lg:w-auto w-full px-3 py-2 lg:text-opacity-100`}>
                Our Chefs
              </a>
            </Link>
            <Link href='/about'>
              <a className={`${ active ? 'text-opacity-100 delay-300' : 'text-opacity-0 ' }'lg:inline-flex lg:w-auto w-full px-3 py-2 lg:text-opacity-100`}>
                About
              </a>
            </Link>
            <Link href='/contact'>
              <a className={`${ active ? 'text-opacity-100' : 'text-opacity-0 ' } lg:inline-flex lg:w-auto w-full px-3 py-2 lg:text-opacity-100`}>
                Work with Us
              </a>
            </Link>
          </div>
          
        </div>
      </nav>

      {/* Contact Section */}
      <div className={`${
        active ? 'opacity-100 translate-y-16 delay-200 z-10' : 'opacity-0 duration-200 invisible'
      } fixed bottom-20 flex flex-col items-start p-8 space-y-4 mx-auto lg:hidden prose-a:transition-all prose-a:duration-300 prose-a:ease-in-out hover:prose-a:text-zinc-900`}>
        <p className="font-semibold text-xl">Get in Touch</p>
        <p>hello@storybites.co.nz</p>
        <div className="flex mt-3 space-x-4 justify-end">
          <a href="#" className="text-stone-400">
            <span className="sr-only">Instagram</span>
            <svg className="w-8 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a href="#" className="text-stone-400">
            <span className="sr-only">YouTube</span>
            <svg className="w-9 h-9" aria-hidden="true" fill="currentColor" viewBox="0 3 50 50"><path fillRule="evenodd" d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"/></svg>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header