"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      if (buttonDisable) return;
      setLoading(true);
      //sending "user" to "/api/login"
      const response = await axios.post("/api/login", user);
      toast.success("Login Successfully");
      //pushing user to "/profile"
      router.push("/profile");
    } catch (error: any) {
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-2">
      <h1 className="text-xl font-bold my-2">
        {!loading ? "Login" : "Please wait.."}
      </h1>
      <hr />

      <label htmlFor="email">E Mail</label>
      <input
        type="email"
        className="m-2 py-2 px-4 bg-zinc-600"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="m-2 py-2 px-4 bg-zinc-600"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        className="m-2 py-2 px-4 bg-black text-white rounded-md"
        onClick={onLogin}
      >
        {buttonDisable ? "Incomplete feilds" : "Login"}
      </button>

      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}
