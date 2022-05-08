import React from "react";

import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mrgjovnd");

  if (state.succeeded) {
    return (
      <div className="mx-auto my-10 max-w-md space-y-2 bg-stone-300 p-10 text-center">
        <p className="text-lg font-bold md:text-xl">Thank you!</p>
        <p className="text-sm md:text-lg">
          We&apos;ve received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <div className="group relative z-0 mb-6 w-full">
        <input
          type="text"
          name="name"
          id="floating_name"
          className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-2.5 px-0 text-sm text-stone-900 autofill:bg-white focus:border-amber-600 focus:outline-none focus:ring-0"
          placeholder=" "
          required
        />
        <label
          htmlFor="name"
          className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-amber-600"
        >
          Full name
        </label>
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="tel"
            name="phone"
            id="floating_phone"
            className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-2.5 px-0 text-sm text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-0"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0  peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-amber-600"
          >
            Phone number
          </label>
          <ValidationError prefix="Phone" field="phone" errors={state.errors} />
        </div>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="email"
            name="email"
            className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-2.5 px-0 text-sm text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-0"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0  peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-amber-600"
          >
            Email address
          </label>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>
      <div className="group relative z-0 mb-6 w-full">
        <textarea
          name="message"
          id="message"
          rows={4}
          className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-2.5 px-0 text-sm text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-0"
          placeholder=" "
          required
        />
        <label
          htmlFor="message"
          className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-amber-600"
        >
          Message
        </label>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button
        type="submit"
        className="h-12 w-full border-2 border-zinc-900 bg-yellow-500 px-5 font-medium transition-all duration-500 hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring focus:ring-offset-1 sm:border-zinc-900"
        disabled={state.submitting}
      >
        Send
      </button>
      <ValidationError errors={state.errors} />
    </form>
  );
}
