"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 🔥 LOAD USER
  const loadUser = async () => {
  try {
    const res = await fetch("/api/auth/get-session", {
      credentials: "include",
      cache: "no-store",
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    setUser(data?.user || null);
  } catch {
    setUser(null);
  }
};

  useEffect(() => {
  loadUser();

  const handleAuthChange = () => {
    loadUser(); // refresh session
  };

  window.addEventListener("authChanged", handleAuthChange);

  // 🔥 extra safety (focus tab e login detect)
  window.addEventListener("focus", handleAuthChange);

  return () => {
    window.removeEventListener("authChanged", handleAuthChange);
    window.removeEventListener("focus", handleAuthChange);
  };
}, []);

  // 🔥 LOGOUT
  const handleLogout = async () => {
    await fetch("/api/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);

    // 🔥 IMPORTANT
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <Link href="/" className="text-xl font-bold text-blue-600">
          TilesGallery
        </Link>

        <div className="hidden md:flex gap-6 text-sm text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/all-tiles">All Tiles</Link>
          {user && <Link href="/my-profile">My Profile</Link>}
        </div>

        <div className="flex items-center gap-3">

          {!user ? (
            <Link
              href="/login"
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user?.image || "/profile.png"}
                alt="user"
                className="w-9 h-9 rounded-full cursor-pointer border"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden">

                  <Link
                    href="/my-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 border-t space-y-3">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/all-tiles" onClick={() => setMenuOpen(false)}>All Tiles</Link>

          {user && (
            <Link href="/my-profile" onClick={() => setMenuOpen(false)}>
              My Profile
            </Link>
          )}

          {!user ? (
            <Link href="/login" className="text-blue-600">Login</Link>
          ) : (
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}