"use client";

export default function MarqueeBar() {
  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee text-sm font-medium">
        New Arrivals: Ceramic Blue Tile | Weekly Feature: Modern Geometric Patterns | Join the Community...
      </div>
    </div>
  );
}