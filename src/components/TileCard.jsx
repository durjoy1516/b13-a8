"use client";

import Link from "next/link";

export default function TileCard({ tile }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-xl transition">
      <figure>
        <img src={tile.image} alt={tile.title} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{tile.title}</h2>

        <div className="card-actions justify-end">
          <Link href={`/tile/${tile.id}`} className="btn btn-sm btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}