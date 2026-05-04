"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetch("/data/tiles.json")
      .then((res) => res.json())
      .then((data) => {
        setTiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        setLoading(false);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const visibleTiles = tiles.slice(0, visibleCount);
  const hasMore = visibleCount < tiles.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explore All Tiles
      </h1>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleTiles.map((tile) => (
              <div
                key={tile.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={
                      tile.image
                        ? `${tile.image}?w=500&q=80`
                        : "/placeholder.jpg"
                    }
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {tile.title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {tile.description}
                  </p>

                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{tile.material}</span>
                    <span>{tile.dimensions}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-blue-600 font-bold">
                      ${tile.price}
                    </span>

                    <Link href={`/tile/${tile.id}`}>
                      <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE BUTTON */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Load More...
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}