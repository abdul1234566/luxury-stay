// 'use client';
// import React from 'react';
// import BlogCard from '@/components/shared/Blog/blogCard';
// import { Icon } from "@iconify/react";
// import Link from 'next/link';
// import { useTheme } from 'next-themes';
// import { blogs } from './blogsdata';


// const BlogSmall: React.FC = () => {
//     const { theme } = useTheme();
//     const isDark = theme === 'dark';
//     const golden = '#FFD700';

//     return (
//         <section className="py-16">
//             <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
//                 <div className='flex justify-between md:items-end items-start mb-10 md:flex-row flex-col'>
//                     <div>
//                         <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
//                             <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" aria-label="Home icon" />
//                             Blog
//                         </p>
//                         <h2 className={`lg:text-52 text-40 font-bold`} style={{ color: golden }}>
//                             Real estate insights
//                         </h2>
//                         <p className='text-dark/50 dark:text-white/50 text-sm'>
//                             Stay ahead in the property market with expert advice and updates
//                         </p>
//                     </div>
//                     <Link href="/blogs" className={`py-4 px-8 rounded-full text-sm font-semibold transition-colors duration-300 ${isDark ? 'bg-white text-dark hover:bg-primary hover:text-white' : 'bg-dark text-white hover:bg-primary hover:text-white'}`} aria-label="Read all blog articles">
//                         Read all articles
//                     </Link>
//                 </div>
//                 <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-12">
//                     {blogs
//                         .filter(blog => blog && blog.coverImage) // only valid blogs
//                         .map((blog, i) => (
//                             <div key={i} className="w-full">
//                                 <BlogCard blog={blog} />
//                             </div>
//                         ))}

//                 </div>
//             </div>
//         </section>
//     );
// }

// export default BlogSmall;


'use client';
import React from "react";
import BlogCard from "@/components/shared/Blog/blogCard";
import { blogs } from "@/components/shared/Blog/blogsdata";

export default function Page() {
  return (
    <section className="py-20">
      <div className="container max-w-7xl mx-auto px-5">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">Our Services </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
           We serves our guests with top notch fanillities and Services making their saty luxury and memorable.
        </p>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

      </div>
    </section>
  );
}
