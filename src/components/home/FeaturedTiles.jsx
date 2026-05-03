"use client";

import { useEffect, useState } from "react";
import TileCard from "@/components/TileCard";
import { useRouter } from "next/navigation";

export default function FeaturedTiles() {
  const [tiles, setTiles] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // tiles fetch
  useEffect(() => {
    fetch("/data/tiles.json")
      .then((res) => res.json())
      .then((data) => setTiles(data.slice(0, 4)));
  }, []);

  // user session check
useEffect(() => {
  fetch("/api/auth/session")
    .then((res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .then((data) => setUser(data?.user || null))
    .catch(() => setUser(null));
}, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Featured Tiles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {tiles.map((tile) => (
          <TileCard key={tile.id} tile={tile} user={user} />
        ))}
      </div>
    </div>
  );
}