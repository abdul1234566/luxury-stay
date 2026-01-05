// // src/components/utils/blogsData.ts
// export const blogs = [
//     {
//       title: "How to Invest in Real Estate",
//       date: "2025-11-01",
//       excerpt: "Learn the basics of real estate investment and grow your wealth.",
//       coverImage: "/images/blogs/blog1.jpg", // must exist in /public/images/blogs/
//       slug: "invest-in-real-estate",
//       tag: "Investment",
//       detail: "Full blog content here..."
//     },
//     {
//       title: "Top 10 Property Trends in 2025",
//       date: "2025-11-05",
//       excerpt: "Stay ahead with the latest property trends for 2025.",
//       coverImage: "/images/blogs/blog2.jpg",
//       slug: "property-trends-2025",
//       tag: "Trends",
//       detail: "Full blog content here..."
//     },
//     {
//       title: "Tips for First-Time Home Buyers",
//       date: "2025-11-10",
//       excerpt: "Essential tips for buying your first home with confidence.",
//       coverImage: "/images/blogs/blog3.jpg",
//       slug: "first-time-home-buyers",
//       tag: "Tips",
//       detail: "Full blog content here..."
//     },
//   ];
  

import { Blog } from "@/types/blog";

export const blogs: Blog[] = [
  {
    title: "Gym Service",
    date: "2025-11-01",
    excerpt: "Learn the basics of real estate investment and grow your wealth.",
    coverImage: "/images/blog/gym.png",
    slug: "invest-in-real-estate",
    tag: "Investment",
    detail: "separate gym for gents and"
  },
  {
    title: "Parking Service",
    date: "2025-11-05",
    excerpt: "Stay ahead with the latest property trends for 2025.",
    coverImage: "/images/blog/parking.png",
    slug: "property-trends-2025",
    tag: "Trends",
    detail: "Parking available for 1 car per room,Valet parking"
  },
  {
    title: "Food Service",
    date: "2025-11-10",
    excerpt: "Essential tips for buying your first home with confidence.",
    coverImage: "/images/blog/cook.png",
    slug: "first-time-home-buyers",
    tag: "Tips",
    detail: "14/7 fresh live cooking as per user choice"
  },
];
