"use client";

import { useRouter } from "next/navigation";

export default function TileCard({ tile, user }) {
  const router = useRouter();

  const handleNavigation = () => {
    if (user) {
      router.push(`/tile/${tile.id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      onClick={handleNavigation}
      className="group cursor-pointer relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={tile.image || "/placeholder.jpg"}
          alt={tile.title}
          className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 group-hover:translate-y-0 transition duration-300">
        
        <h3 className="text-white font-semibold text-sm mb-2">
          {tile.title}
        </h3>

        {/* Only show button for non-click fallback */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent double click
            handleNavigation();
          }}
          className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          View Details →
        </button>
      </div>
    </div>
  );
}