"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function RoomsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Same premium theme colors
  const colors = {
    bg: isDark ? "#1E1B18" : "#F5F0E1",
    heroFrom: isDark ? "#2C2723" : "#F5EAD6",
    heroTo: isDark ? "#3A352F" : "#EADFC2",
    buttonBg: isDark ? "#A78256" : "#DCCAB0",
    buttonText: isDark ? "#FFF5E1" : "#3B2F2F",
    buttonHover: isDark ? "#8F6948" : "#CBB292",
    text: isDark ? "#F2E9E1" : "#3B2F2F",
  };

  return (
    <div className="transition-colors duration-500" style={{ background: colors.bg, color: colors.text }}>
      
      {/* Header */}
      <header className="w-full p-6 shadow-md dark:shadow-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Homely</h1>
          <nav className="space-x-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/rooms" className="hover:underline font-semibold">Rooms</Link>
            <Link href="/properties/book" className="hover:underline">Book</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative py-36 text-center"
        style={{
          background: `linear-gradient(to right, ${colors.heroFrom}, ${colors.heroTo})`,
        }}
      >
        <h1 className="text-5xl font-bold mb-4">Explore Our Luxurious Rooms</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Choose from a wide range of elegantly designed rooms with comfort and premium amenities.
        </p>
        <Link href="/properties/book">
          <button
            className="px-10 py-4 font-semibold rounded-full transition-opacity duration-300 hover:opacity-90"
            style={{
              background: colors.buttonBg,
              color: colors.buttonText,
            }}
          >
            View Rooms
          </button>
        </Link>
      </section>

      {/* Optional Hero Image (like About page) */}
      <div className="max-w-6xl mx-auto my-16 overflow-hidden rounded-2xl shadow-2xl">
        <Image
          src="/images/hero/heroBanner.png"
          alt="Luxury Rooms"
          width={1200}
          height={500}
          className="object-cover rounded-2xl"
          unoptimized
        />
      </div>

      {/* Footer */}
      <footer className="py-10 mt-20 bg-[#F0E3D6] dark:bg-[#3A352F] text-[#3B2F2F] dark:text-[#F2E9E1] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Homely. All Rights Reserved.</p>
          <div className="space-x-4">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
