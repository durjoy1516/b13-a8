"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TileDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data?.user) {
          router.push("/login");
        } else {
          setUser(data.user);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">
        Private Dashboard
      </h1>

      <div className="bg-white shadow p-6 rounded-xl">
        <p>Welcome: {user?.name || user?.email}</p>

        <p className="text-gray-500 mt-3">
          Here you can show saved tiles, orders, wishlist etc.
        </p>
      </div>
    </div>
  );
}