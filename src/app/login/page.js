"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // 🔥 ERRORS
  const [errors, setErrors] = useState({});

  const router = useRouter();

  // 🔥 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};

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

        window.dispatchEvent(new Event("authChanged"));

        router.push("/");
      } else {
        toast.error(data?.message || "Login Failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // 🔥 GOOGLE
  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border"
      >
        <h2 className="text-3xl font-bold mb-1 text-center">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          Login to continue
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Email Address
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
            Password
          </label>

          <div className="relative mt-1">
            <input
              type={show ? "text" : "password"}
              placeholder="Enter password"
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

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition font-medium shadow-sm"
        >
          Login
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

        {/* REGISTER LINK */}
        <p className="text-sm text-center mt-5 text-gray-600">
          No account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}