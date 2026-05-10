"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // 🔥 LOAD USER
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/get-session", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.user) {
          router.push("/login");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* COVER */}
        <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        {/* PROFILE */}
        <div className="px-8 pb-10 relative">

          {/* IMAGE */}
          <div className="-mt-16 flex justify-center">
            <img
              src={
                user?.image ||
                "/profile.png"
              }
              onError={(e) => {
                e.target.src = "/profile.png"}}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* INFO */}
          <div className="text-center mt-5">

            <h1 className="text-3xl font-bold text-gray-800">
              {user?.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {user?.email}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">

              <div className="bg-blue-50 px-5 py-3 rounded-2xl">
                <p className="text-sm text-gray-500">
                  Account Status
                </p>

                <h3 className="font-semibold text-blue-600">
                  Active
                </h3>
              </div>

              <div className="bg-green-50 px-5 py-3 rounded-2xl">
                <p className="text-sm text-gray-500">
                  Tiles Saved
                </p>

                <h3 className="font-semibold text-green-600">
                  12
                </h3>
              </div>

            </div>

            {/* UPDATE BUTTON */}
            <Link href="/my-profile/update-profile">

              <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-medium">
                Update Profile
              </button>

            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}