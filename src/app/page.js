"use client";

import Banner from "@/components/home/Banner";
import MarqueeBar from "@/components/home/MarqueeBar";
import FeaturedTiles from "@/components/home/FeaturedTiles";

export default function Home() {
  return (
    <div>
      <Banner />
      <MarqueeBar />
      <FeaturedTiles />
    </div>
  );
}