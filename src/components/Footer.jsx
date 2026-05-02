"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* 🔹 About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            TilesGallery
          </h2>
          <p className="text-sm leading-relaxed">
            Discover premium tiles for modern interiors. We bring you the best
            designs, textures, and quality materials to elevate your space.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/all-tiles" className="hover:text-white">All Tiles</Link></li>
            <li><Link href="/my-profile" className="hover:text-white">My Profile</Link></li>
            <li><Link href="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>
          <p className="text-sm">Email: support@tilesgallery.com</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
          <p className="text-sm">Location: Dhaka, Bangladesh</p>
        </div>

        {/* 🔹 Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} TilesGallery. All rights reserved.
      </div>
    </footer>
  );
}