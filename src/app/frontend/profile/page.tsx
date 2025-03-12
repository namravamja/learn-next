"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const router = useRouter();
  const [data, setData] = React.useState(null);
  const logout = async () => {
    try {
      await axios.get("/backend/api/logout");
      router.push("/frontend/login");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getUserData = async () => {
    const response = await axios.get("/backend/api/me");
    console.log(response.data);
    setData(response.data.data._id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black gap-4">
      <h2 className="px-4 py-2 text-white bg-amber-900 rounded-md hover:bg-amber-700">
        {data == null ? (
          ""
        ) : (
          <Link href={`/frontend/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        className="px-4 py-2 text-white bg-amber-900 rounded-md hover:bg-amber-700"
        onClick={logout}
      >
        LogOut
      </button>

      <button
        className="px-4 py-2 text-white bg-amber-900 rounded-md hover:bg-amber-700"
        onClick={getUserData}
      >
        getData
      </button>
    </div>
  );
}

export default Page;
