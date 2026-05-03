"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!name) return toast.error("Name required");
  if (!email) return toast.error("Email required");
  if (password.length < 6)
    return toast.error("Password must be 6+ characters");

  try {
    const res = await fetch("/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        image: photo,
      }),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (res.ok) {
      toast.success("Registration Successful!");
      router.push("/login");
    } else {
      toast.error(data?.message || "Registration Failed");
    }
  } catch (err) {
    toast.error("Server error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded-lg mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Photo URL */}
        <input
          type="text"
          placeholder="Photo URL"
          className="w-full border px-4 py-2 rounded-lg mb-3"
          onChange={(e) => setPhoto(e.target.value)}
        />

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
            className="absolute right-3 top-2.5 text-sm cursor-pointer"
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>

        {/* Register */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Register
        </button>

        {/* Google */}
        <button
          type="button"
          className="w-full mt-3 border py-2 rounded-lg hover:bg-gray-100"
        >
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}