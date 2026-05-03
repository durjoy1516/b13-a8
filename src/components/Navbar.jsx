"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
  fetch("/api/auth/session")
    .then((res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .then((data) => setUser(data?.user || null))
    .catch(() => setUser(null));
}, []);

  const handleLogout = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          TilesGallery
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm text-gray-700">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/all-tiles" className="hover:text-blue-600">All Tiles</Link>
          <Link href="/my-profile" className="hover:text-blue-600">My Profile</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Desktop Auth */}
          {!user ? (
            <Link
              href="/login"
              className="hidden md:block px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          ) : (
            <div className="relative hidden md:block">
              <img
                onClick={() => setDropdownOpen(!dropdownOpen)}
                src={user?.image || "/profile.png"}
                className="w-9 h-9 rounded-full cursor-pointer border"
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                  <Link
                    href="/my-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          <Link href="/" className="block">Home</Link>
          <Link href="/all-tiles" className="block">All Tiles</Link>
          <Link href="/my-profile" className="block">My Profile</Link>

          {!user ? (
            <Link href="/login" className="block text-blue-600 font-semibold">
              Login
            </Link>
          ) : (
            <>
              <Link href="/my-profile" className="block">
                Profile
              </Link>
              <button onClick={handleLogout} className="block text-left w-full">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}