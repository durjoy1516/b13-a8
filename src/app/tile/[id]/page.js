"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function TileDetailsPage() {
  const { id } = useParams();

  const [tile, setTile] = useState(null);

  // 🔥 IMPORTANT FIX
  const [user, setUser] = useState(undefined);

  const [loading, setLoading] = useState(true);

  // ✅ CHECK LOGIN
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/get-session", {
          credentials: "include",
          cache: "no-store",
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!data?.user) {
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  // ✅ FETCH TILE
  useEffect(() => {
    fetch("/data/tiles.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((t) => t.id === id);

        setTile(found);
        setLoading(false);
      });
  }, [id]);

  // 🔥 SHOW LOADING UNTIL BOTH READY
  if (loading || user === undefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  // ❌ NOT LOGGED IN
  if (user === null) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Please login first
        </h1>

        <p className="text-gray-500 mt-2">
          You need to login to view tile details
        </p>

        <Link href="/login">
          <button className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  // ❌ TILE NOT FOUND
  if (!tile) {
    return (
      <p className="text-center mt-10 text-red-500">
        Tile not found
      </p>
    );
  }

  // ✅ DETAILS PAGE
  return (
    <div className="max-w-6xl mx-auto p-10 grid md:grid-cols-2 gap-10">

      {/* IMAGE */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden">
        <Image
          src={`${tile.image}?w=800&q=80`}
          alt={tile.title}
          fill
          className="object-cover"
        />
      </div>

      {/* INFO */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          {tile.title}
        </h1>

        <p className="text-gray-600">
          {tile.description}
        </p>

        <div className="text-yellow-500">
          ★★★★☆ <span className="text-gray-500">(4.3)</span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p><b>Material:</b> {tile.material}</p>

          <p><b>Dimensions:</b> {tile.dimensions}</p>

          <p><b>Category:</b> {tile.category}</p>

          <p>
            <b>Status:</b>{" "}
            <span
              className={
                tile.inStock
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              {tile.inStock
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-blue-600">
          ${tile.price}
        </h2>

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Buy Now
          </button>

          <button className="border px-5 py-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}