"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const handleVerifyUserEmail = async () => {
    try {
      const { data } = await axios.post("/api/users/verifyemail", { token });
      if (data) {
        setVerified(true);
        setError(false);
      }
    } catch (error: any) {
      setError(error);
      console.log("Email verification  failed");
      console.log(error);
      toast.error(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      handleVerifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2 bg-slate-200 text-black">
      <h1 className="text-4xl font-bold">Verify Email</h1>
      <h2 className="p-2 bg-blue-600 rounded-md text-white">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl text-green-500 font-thin">Email Verified!</h2>
          <Link
            href="/login"
            className="text-xl font-semibold text-center hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-red-500 font-thin">Error!</h2>
        </div>
      )}
    </div>
  );
}
