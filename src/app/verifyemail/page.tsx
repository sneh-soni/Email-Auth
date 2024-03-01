"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmail() {
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
    const decoded = decodeURIComponent(urlToken);
    setToken(decoded || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-2xl my-2">Verify Email Page</p>
      <p>{token ? `${token}` : "no token"}</p>
      {verified && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl">Thank you! your Email is Verified</p>
          <Link className="underline" href="/profile">
            profile
          </Link>
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
