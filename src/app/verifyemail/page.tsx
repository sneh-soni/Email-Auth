"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function verifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-2xl my-2">Verify Email</p>
      <p>{token ? `${token}` : "no token"}</p>
      {verified && (
        <div>
          <p className="text-2xl">Email Verified</p>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <p className="text-4xl">Error</p>
        </div>
      )}
    </div>
  );
}
