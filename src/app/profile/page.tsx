"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("/api/logout");
      console.log("Logout successfull: ", response);
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed: ", error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <button
        className="m-2 py-2 px-4 bg-black text-white rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
