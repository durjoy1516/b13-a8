"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();
  const dropdownRef = useRef(null);

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

    const handleAuthChange = () => loadUser();

    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("focus", handleAuthChange);

    // 🔥 outside click close dropdown
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("focus", handleAuthChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔥 LOGOUT
  const handleLogout = async () => {
    await fetch("/api/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          TilesGallery
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-3 text-sm font-medium">

          <Link
            href="/"
            className={`px-4 py-2 rounded-lg ${
              pathname === "/"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>

          <Link
            href="/all-tiles"
            className={`px-4 py-2 rounded-lg ${
              pathname === "/all-tiles"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Tiles
          </Link>

          {user && (
            <Link
              href="/my-profile"
              className={`px-4 py-2 rounded-lg ${
                pathname === "/my-profile"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              My Profile
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* NOT LOGGED IN */}
          {!user ? (
            <div className="flex gap-6">

              <Link
                href="/login"
                className=" px-5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>

            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user?.image?.trim() ? user.image : "/profile.png"}
                alt="user"
                className="w-9 h-9 rounded-full cursor-pointer border object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onError={(e) => {
                  e.target.src = "/profile.png";
                }}
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

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
{menuOpen && (
  <div className="md:hidden px-4 pb-4 animate-in slide-in-from-top duration-300">

    <div className="bg-white border shadow-lg rounded-2xl p-3 mt-3 space-y-2">

      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className={`block px-4 py-3 rounded-xl transition font-medium ${
          pathname === "/"
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Home
      </Link>

      <Link
        href="/all-tiles"
        onClick={() => setMenuOpen(false)}
        className={`block px-4 py-3 rounded-xl transition font-medium ${
          pathname === "/all-tiles"
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        All Tiles
      </Link>

      {user && (
        <Link
          href="/my-profile"
          onClick={() => setMenuOpen(false)}
          className={`block px-4 py-3 rounded-xl transition font-medium ${
            pathname === "/my-profile"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          My Profile
        </Link>
      )}

      {!user ? (
        <div className="flex flex-col gap-2 pt-3">

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 font-medium shadow-sm hover:shadow-md"
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center px-4 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition duration-300 font-medium"
          >
            Sign Up
          </Link>

        </div>
      ) : (
        <button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className="w-full mt-2 px-4 py-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition duration-300 font-medium text-left"
        >
          Logout
        </button>
      )}
    </div>
  </div>
)}
    </nav>
  );
}