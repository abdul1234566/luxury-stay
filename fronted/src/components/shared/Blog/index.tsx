// import React from 'react';
// import BlogCard from '@/components/shared/Blog/blogCard';
// import { getAllPosts } from '@/components/utils/markdown';
// import { Icon } from "@iconify/react";
// import Link from 'next/link';

// interface Blog {
//     title: string;
//     date: string;
//     excerpt: string;
//     coverImage: string;
//     slug: string;
//     detail: string;
//     tag: string;
// }

// const BlogSmall: React.FC = () => {
//     // Get all posts and map over them to ensure each field is a string
//     const posts: Blog[] = getAllPosts(["title", "date", "excerpt", "coverImage", "slug", "tag"])
//         .map(item => ({
//             title: typeof item.title === 'string' ? item.title : String(item.title),
//             date: typeof item.date === 'string' ? item.date : String(item.date),
//             excerpt: typeof item.excerpt === 'string' ? item.excerpt : String(item.excerpt),
//             coverImage: typeof item.coverImage === 'string' ? item.coverImage : String(item.coverImage),
//             slug: typeof item.slug === 'string' ? item.slug : String(item.slug),
//             detail: typeof item.detail === 'string' ? item.detail : String(item.detail),
//             tag: typeof item.tag === 'string' ? item.tag : String(item.tag),
//         }))
//         .slice(0, 3);

//     return (
//         <section>
//             <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
//                 <div className='flex justify-between md:items-end items-start mb-10 md:flex-row flex-col'>
//                     <div>
//                         <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
//                             <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" aria-label="Home icon" />
//                             Blog
//                         </p>
//                         <h2 className="lg:text-52 text-40 font-medium dark:text-white">
//                             Real estate insights
//                         </h2>
//                         <p className='text-dark/50 dark:text-white/50 text-xm'>
//                             Stay ahead in the property market with expert advice and updates
//                         </p>
//                     </div>
//                     <Link href="/blogs" className='bg-dark dark:bg-white text-white dark:text-dark py-4 px-8 rounded-full hover:bg-primary duration-300' aria-label="Read all blog articles">
//                         Read all articles
//                     </Link>
//                 </div>
//                 <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-12">
//                     {posts.map((blog, i) => (
//                         <div key={i} className="w-full">
//                             <BlogCard blog={blog} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default BlogSmall;

// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// interface Blog {
//     title: string;
//     date: string;
//     excerpt: string;
//     coverImage: string;
//     slug: string;
//     tag: string;
//     detail: string;
// }

// interface BlogCardProps {
//     blog: Blog;
// }

// const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
//     return (
//         <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
//             <div className="relative w-full h-52 md:h-60 lg:h-64">
//                 <Image
//                     src={blog.coverImage}
//                     alt={blog.title}
//                     fill
//                     className="object-cover"
//                     placeholder="blur"
//                     blurDataURL="/images/placeholder.png" // optional placeholder
//                 />
//             </div>
//             <div className="p-5">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">{blog.date} • {blog.tag}</p>
//                 <h3 className="mt-2 font-bold text-lg text-gray-900 dark:text-white">{blog.title}</h3>
//                 <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{blog.excerpt}</p>
//                 <Link href={`/blogs/${blog.slug}`} className="mt-3 inline-block text-primary dark:text-yellow-400 font-semibold hover:underline">
//                     Read More
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default BlogCard;



// import React from "react";
// import BlogCard from "@/components/shared/Blog/blogCard";
// import { blogs } from "@/components/shared/Blog/blogsdata";

// export default function BlogsPage() {
//   return (
//     <section className="py-20">
//       <div className="container max-w-7xl mx-auto px-5">

//         {/* Title */}
//         <h1 className="text-4xl font-bold mb-6">Latest Blog Articles</h1>
//         <p className="text-gray-600 dark:text-gray-300 mb-12">
//           Explore the best insights, tips, and trends in real estate.
//         </p>

//         {/* Blog Grid */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {blogs.map((blog) => (
//             <BlogCard key={blog.slug} blog={blog} />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }






"use client";

import React from "react";
import BlogCard from "@/components/shared/Blog/blogCard";
import { blogs } from "@/components/shared/Blog/blogsdata";
import { useTheme } from "next-themes";

export default function BlogsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Colors matching FAQ/Testimonial UI
  const colors = {
    text: isDark ? "#F2E9E1" : "#3B2F2F",
    textSecondary: isDark ? "#F2E9E1/70" : "#3B2F2F/70",
    bg: isDark ? "#1E1B18" : "#F5F0E1",
  };

  return (
    <section className="py-20 transition-colors duration-500" style={{ background: colors.bg }}>
      <div className="container max-w-7xl mx-auto px-5">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
          Our Services 
        </h1>
        <p className="mb-12" style={{ color: colors.textSecondary }}>
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
