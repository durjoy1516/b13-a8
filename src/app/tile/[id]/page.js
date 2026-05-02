"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TileDetails() {
  const [user, setUser] = useState(null);
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
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return <h1>Tile Details (Private)</h1>;
}