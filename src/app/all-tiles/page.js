"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    fetch("/data/tiles.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data); // debug
        setTiles(data);
      })
      .catch((err) => console.log("ERROR:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Tiles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiles.map((tile) => (
          <div key={tile.id} className="p-4 border rounded">
            <h2>{tile.title}</h2>
            <p>{tile.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}