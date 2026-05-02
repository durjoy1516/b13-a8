"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data?.user) {
      toast.success("Registration Successful!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      toast.error("Registration Failed!");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Register</h2>

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

      <button className="btn btn-primary w-full">Register</button>
    </form>
  );
}