"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/backend/api/logout");
      router.push("/frontend/login");
    } catch (e: any) {
      console.log(e.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        className="px-4 py-2 text-white bg-amber-900 rounded-md hover:bg-amber-700"
        onClick={logout}
      >
        LogOut
      </button>
    </div>
  );
}

export default Page;
