"use client";

export default function MarqueeBar() {
  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-sm font-medium">

        <span className="mr-16">
          ✨ New Arrivals: Ceramic Blue Tile
        </span>

        <span className="mr-16">
          🔥 Weekly Feature: Modern Geometric Patterns
        </span>

        <span className="mr-16">
          🛒 Explore Premium Mosaic Collections
        </span>

        {/* duplicate */}
        <span className="mr-16">
          ✨ New Arrivals: Ceramic Blue Tile
        </span>

        <span className="mr-16">
          🔥 Weekly Feature: Modern Geometric Patterns
        </span>

        <span>
          🛒 Explore Premium Mosaic Collections
        </span>

      </div>
    </div>
  );
}