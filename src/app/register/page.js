"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Register() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // 🔥 ERRORS
  const [errors, setErrors] = useState({});

  const router = useRouter();

  // 🔥 REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    }

    if (!password) {
      newErrors.password = "Please enter your password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

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
        credentials: "include",
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

  // 🔥 GOOGLE LOGIN
  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border"
      >
        <h2 className="text-3xl font-bold mb-1 text-center">
          Create Account
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          Join TilesGallery today
        </p>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Your Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              setErrors((prev) => ({
                ...prev,
                name: "",
              }));
            }}
            className={`w-full mt-1 border px-4 py-2 rounded-xl outline-none transition ${
              errors.name
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "focus:ring-2 focus:ring-blue-200"
            }`}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* PHOTO */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Photo URL
          </label>

          <input
            type="text"
            placeholder="https://example.com/photo.jpg"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full mt-1 border px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              setErrors((prev) => ({
                ...prev,
                email: "",
              }));
            }}
            className={`w-full mt-1 border px-4 py-2 rounded-xl outline-none transition ${
              errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "focus:ring-2 focus:ring-blue-200"
            }`}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <label className="text-sm font-medium">
            Password <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <input
              type={show ? "text" : "password"}
              placeholder="Create password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                }));
              }}
              className={`w-full border px-4 py-2 rounded-xl outline-none transition ${
                errors.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "focus:ring-2 focus:ring-blue-200"
              }`}
            />

            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-2.5 text-sm cursor-pointer text-gray-500 hover:text-blue-600"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition font-medium shadow-sm"
        >
          Register
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={handleGoogleSignin}
          className="w-full border py-2.5 rounded-xl hover:bg-gray-50 transition font-medium"
        >
          Continue with Google
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}