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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email required");
    if (password.length < 6)
      return toast.error("Password must be 6+ chars");

    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        toast.success("Login Successful!");

        router.push("/");
        setTimeout(() => {
        router.refresh();
        }, 100);
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
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded-lg mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-3">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2 text-sm cursor-pointer"
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>

        {/* Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          No account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}