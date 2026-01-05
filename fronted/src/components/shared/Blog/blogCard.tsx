// 'use client';
// import React, { FC } from "react";
// import Image from "next/image";
// import { Blog } from "@/types/blog";
// import { format } from "date-fns";
// import Link from "next/link";
// import { useTheme } from "next-themes";

// interface BlogCardProps {
//   blog: Blog; // Make blog required, parent must ensure it's valid
// }

// const BlogCard: FC<BlogCardProps> = ({ blog }) => {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const {
//     title = "Untitled",
//     coverImage = "/images/placeholder.png",
//     date,
//     slug = "#",
//     tag = "General"
//   } = blog || {};

//   const blogDate = date ? format(new Date(date), "MMM dd, yyyy") : "Unknown date";

//   return (
//     <Link
//       href={slug}
//       aria-label={`Read blog: ${title}`}
//       className="group flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1"
//     >
//       <div className="overflow-hidden rounded-2xl w-full h-52 md:h-60 lg:h-64 relative">
//         <Image
//           src={coverImage || "/images/placeholder.png"}
//           alt={title}
//           fill
//           className="object-cover transition-transform duration-500 group-hover:scale-110"
//           unoptimized
//           placeholder="blur"
//           blurDataURL="/images/placeholder.png"
//         />
//       </div>

//       <div className="flex justify-between items-start">
//         <div className="flex-1">
//           <h3
//             className={`mt-2 text-xl font-semibold transition-colors duration-300 group-hover:text-primary ${
//               isDark ? "text-white" : "text-dark"
//             }`}
//           >
//             {title}
//           </h3>
//           <span
//             className={`text-sm font-medium leading-loose ${
//               isDark ? "text-white/50" : "text-dark/50"
//             }`}
//           >
//             {blogDate}
//           </span>
//         </div>

//         <div
//           className={`py-1 px-4 rounded-full text-sm font-semibold ${
//             isDark ? "bg-white/15 text-white" : "bg-dark/5 text-dark"
//           }`}
//         >
//           {tag}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default BlogCard;


'use client';
import { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";
import { useTheme } from "next-themes";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const blogDate = blog.date
    ? format(new Date(blog.date), "MMM dd, yyyy")
    : "Unknown date";

  return (
    <Link href={`/blog/${blog.slug}`} className="group flex flex-col gap-4 hover:-translate-y-1 duration-300">
      <div className="relative w-full h-52 md:h-60 lg:h-64 overflow-hidden rounded-2xl">
        <Image
          src={blog.coverImage ?? "/images/placeholder.png"}
          alt={blog.title ?? "Blog image"}
          fill
          className="object-cover duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />

      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-dark"}`}>
            {blog.title}
          </h3>

          <span className={`text-sm ${isDark ? "text-white/50" : "text-dark/50"}`}>
            {blog.detail}
          </span>
        </div>

      </div>
    </Link>
  );
};

export default BlogCard;
