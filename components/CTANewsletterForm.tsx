import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import siteMetadata from "../data/siteMetadata";

export default function CTANewsletterForm() {
  const [state, handleSubmit] = useForm("mnqwokqr");

  if (state.succeeded) {
    return (
      <div className="mx-auto my-10 max-w-md space-y-2 bg-stone-300 p-10 text-center">
        <p className="text-lg font-bold md:text-xl">Thanks for signing up!</p>
        <p className="text-sm md:text-lg">
          Look forward to our upcoming newsletters. In the meantime, you can
          follow us on{" "}
          <a
            href={siteMetadata.instagram}
            target="_blank"
            className="underline"
          >
            Instagram
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-align mx-auto mt-16 flex max-w-md flex-col lg:flex-row"
    >
      <div className="group relative z-0 mb-6 w-full">
        <input
          type="email"
          name="email"
          className="peer block w-full appearance-none border-0 border-b-2 border-stone-300 bg-transparent py-3.5 px-0 text-sm text-stone-900 focus:border-zinc-900 focus:outline-none focus:ring-0"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:scale-80 absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-stone-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:text-zinc-900 peer-focus:underline"
        >
          Email address
        </label>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="h-12 w-full border-2 border-zinc-900 bg-yellow-500 px-5 font-medium transition-all duration-500 hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring focus:ring-offset-1 sm:w-auto sm:border-zinc-900 lg:ml-4"
      >
        Subscribe
      </button>
      <ValidationError errors={state.errors} />
    </form>
  );
}
