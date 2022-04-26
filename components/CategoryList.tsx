import Link from "next/link";
import { Category } from "../typing";


interface Props {
  categories: [Category];
}

export default function CategoryList({categories}: Props) {
  return (
    <div className='flex flex-wrap mt-10 space-x-6 text-sm'>
      <div className=" my-3 py-1 px-2 border-2 border-zinc-900 hover:text-stone-100 hover:bg-zinc-900 duration-300 transition-all">
          <Link href="/stories">All Stories</Link>
      </div>

      {categories.map((category) => (
        <div key={category._id} className='my-3 py-1 px-2 border-2 border-zinc-900 hover:text-stone-100 hover:bg-zinc-900 duration-300 transition-all'>
          <Link key={category._id} href={`${category.slug}`}>
            {category.title}
          </Link>
        </div>))}
    </div>
  );

}