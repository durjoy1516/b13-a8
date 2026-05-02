import Link from "next/link";

export default function Home() {
  return (
    <div>
          
      {/* Banner */}
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Discover Your Perfect Aesthetic
        </h1>
        <Link href="/all-tiles" className="btn btn-primary">
          Browse Now
        </Link>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden whitespace-nowrap border-y py-2">
        <p className="animate-marquee">
          New Arrivals | Weekly Feature | Join the Community
        </p>
      </div>

      {/* Featured */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Featured Tiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* later API theke ashbe */}
          <div className="p-4 shadow rounded">Tile 1</div>
          <div className="p-4 shadow rounded">Tile 2</div>
          <div className="p-4 shadow rounded">Tile 3</div>
          <div className="p-4 shadow rounded">Tile 4</div>
        </div>
      </div>
    </div>
  );
}