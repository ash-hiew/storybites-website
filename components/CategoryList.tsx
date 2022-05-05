import React from "react";
import Link from "next/link";
import { Category } from "../typing";

interface Props {
  categories: [Category];
}

export default function CategoryList({ categories }: Props) {
  return (
    <div className="mt-10 flex flex-wrap justify-start text-sm sm:space-x-6">
      <div className=" my-3 mr-3 border-2 border-zinc-900 py-1 px-2 transition-all duration-300 hover:bg-zinc-900 hover:text-stone-100 sm:m-0">
        <Link href="/stories">All Stories</Link>
      </div>

      {categories.map((category) => (
        <div
          key={category._id}
          className="my-3 mr-3 border-2 border-zinc-900 py-1 px-2 transition-all duration-300 hover:bg-zinc-900 hover:text-stone-100 sm:m-0"
        >
          <Link key={category._id} href={`${category.slug}`}>
            {category.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
