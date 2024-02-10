"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      // Get request to logout
      const response = await axios.get("/api/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      toast.error("Logout Failed");
    }
  };

  const getUserDetails = async () => {
    try {
      // Get request to userdetails
      const response = await axios.get("/api/userdetails");
      router.push(`/profile/${response.data.user._id}`);
    } catch (error: any) {
      toast.error("Failed to get user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <div className="flex">
        <button
          className="m-2 py-2 px-4 bg-black text-white rounded-md"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="m-2 py-2 px-4 bg-black text-white rounded-md"
          onClick={getUserDetails}
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
