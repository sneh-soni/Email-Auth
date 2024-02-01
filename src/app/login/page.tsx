"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function SignUpPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-2">
      <h1 className="text-xl font-bold my-2">Login Page</h1>
      <hr />

      <label htmlFor="email">E Mail</label>
      <input
        type="email"
        className="m-2 py-2 px-4 bg-zinc-600"
        placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="m-2 py-2 px-4 bg-zinc-600"
        placeholder="password"
      />

      <button
        className="m-2 py-2 px-4 bg-black text-white rounded-md"
        onClick={onLogin}
      >
        Log In
      </button>

      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}
