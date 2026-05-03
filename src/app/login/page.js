"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   // validation
  //   if (!email) {
  //     return toast.error("Email is required");
  //   }

  //   if (password.length < 6) {
  //     return toast.error("Password must be at least 6 characters");
  //   }

  //   const res = await fetch("/api/auth/sign-in/email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await res.json();

  //   if (res.ok) {
  //     toast.success("Login Successful!");
  //     router.push("/");
  //   } else {
  //     toast.error(data?.message || "Login Failed");
  //   }
  // };
  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email) return toast.error("Email required");
  if (password.length < 6)
    return toast.error("Password must be 6+ chars");

  try {
    const res = await fetch("/api/auth/sign-in/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (res.ok) {
      toast.success("Login Successful!");
      router.push("/");
    } else {
      toast.error(data?.message || "Login Failed");
    }
  } catch (err) {
    toast.error("Server error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-3">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2.5 text-sm cursor-pointer text-gray-500"
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>

        {/* Login Button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>

        {/* Google Login (placeholder) */}
        <button
          type="button"
          className="w-full mt-3 border py-2 rounded-lg hover:bg-gray-100"
        >
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}