"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert(data.message);
      router.push("/login");

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleRegister} className="w-96 p-6 shadow rounded space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input placeholder="Name" className="border p-2 w-full"
          onChange={(e) => setName(e.target.value)} />

        <input placeholder="Email" className="border p-2 w-full"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password" className="border p-2 w-full"
          onChange={(e) => setPassword(e.target.value)} />

        <input type="password" placeholder="Confirm Password" className="border p-2 w-full"
          onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className="bg-black text-white w-full p-2">
          Create Account
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
