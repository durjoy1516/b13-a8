"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/sign-in/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (data?.user) {
      alert("Login success!");
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div>
        <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">Login</h2>

            <input
                type="email"
                className="input input-bordered w-full mb-2"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="input input-bordered w-full mb-2"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary w-full">Login</button>
        </form>
        <p className="text-sm mt-4      text-center">Don't have an account?{" "}
        <a href="/register" className="text-blue-500 font-semibold">
        Register</a>
        </p>
    </div>
  );
}