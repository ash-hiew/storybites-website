import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import siteMetadata from "../data/siteMetadata";

export default function FooterNewsletterForm() {
  const [state, handleSubmit] = useForm("mayvlgwy");

  if (state.succeeded) {
    return (
      <div className="my-5 max-w-sm text-center">
        <p className="text-md font-bold md:text-lg">Thanks for signing up!</p>
        <p className="md:text-md text-sm">
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
    <form onSubmit={handleSubmit} className="mb-2 flex lg:w-10/12">
      <input
        className="w-full border-2 border-zinc-50 bg-zinc-900 px-3 py-2 text-base leading-normal transition duration-150 ease-in-out focus:outline-none"
        type="email"
        name="Email Address"
        placeholder="Enter your email"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <button
        className="bg-zinc-50 px-3 py-3 text-center text-sm font-medium text-zinc-900 no-underline transition-all duration-500 hover:bg-yellow-500"
        type="submit"
        disabled={state.submitting}
      >
        Subscribe
      </button>
      <ValidationError errors={state.errors} />
    </form>
  );
}
