"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <div
      className="relative h-[70vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('/images/tiles/banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Discover Your Perfect Aesthetic
        </h1>

        <p className="text-gray-200 mb-6">
          Explore premium tile collections crafted for modern living spaces.
        </p>

        <Link
          href="/all-tiles"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium shadow-lg transition"
        >
          Browse Now
        </Link>
      </div>
    </div>
  );
}