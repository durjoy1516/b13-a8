"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

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

          setName(data.user.name || "");
          setImage(data.user.image || "");
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔥 UPDATE PROFILE
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          name,
          image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile Updated Successfully!");

        window.dispatchEvent(new Event("authChanged"));

        router.push("/my-profile");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Update Profile
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Update your account information
        </p>

        {/* IMAGE */}
        <div className="flex justify-center mb-6">
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

        {/* NAME */}
        <div className="mb-5">
          <label className="text-sm font-medium">
            Your Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full mt-2 border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* IMAGE URL */}
        <div className="mb-6">
          <label className="text-sm font-medium">
            Image URL
          </label>

          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image url"
            className="w-full mt-2 border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
        >
          Update Information
        </button>
      </form>
    </div>
  );
}