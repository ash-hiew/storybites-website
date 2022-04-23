import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage(){
  return (
    <div>
      <Header />
      
      <main>
        <section className='font-primary px-6 max-w-4xl mx-auto my-32'>
          <div className="space-y-4 md:space-y-6">
            <h1 className="font-medium uppercase tracking-wide">About Us</h1>
            <h2 className="font-display text-start font-semibold leading-tight tracking-tight text-4xl md:text-6xl md:leading-tight">
              Unapologetically passionate about giving back to local communities through sharing the stories that matter most.
            </h2>
          </div>
        </section>

        <section className='mx-auto'>
          <div className='mx-auto'>
            <img src='https://via.placeholder.com/1920x700'/>
          </div>
        </section>

        <section className='font-primary px-6 max-w-xl mx-auto my-10 md:my-20'>
          <div className="space-y-4">
            <h1 className='font-semibold text-3xl'>The Why</h1>
            <p>Ask yourself this. What brings your neighbourhood together? What makes a city come alive? What is that one thing that nations would put race, creed, or religion aside for to sit in unity with one another; <span className="font-semibold">their love for people and food</span>.</p>
          </div>
          <img className='mt-20 mx-auto' src='https://via.placeholder.com/500x300'/>
        </section>

        <section className='font-primary px-6 max-w-4xl mx-auto my-32'>
          <h1 className='font-primary font-semibold text-3xl text-center'>How We Share Stories One Bite At A Time</h1>

        </section>
      </main>
      
      <Footer />
    </div>
  )
}