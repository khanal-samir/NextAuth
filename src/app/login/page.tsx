"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" min-h-screen flex items-center justify-center bg-slate-200 text-black">
      <div className="w-96 h-auto p-4 border-2 border-blue-600 flex flex-col gap-2 rounded-md shadow-lg">
        <h1 className="font-bold text-xl text-blue-600 text-center">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr />

        <label htmlFor="email" className="font-semibold text-xl">
          Email:
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password" className="font-semibold text-xl">
          Password:
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          disabled={loading || buttonDisabled}
          className="p-2 border border-gray-300 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-600"
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>
        <Link
          href="/signup"
          className="font-semibold text-xl text-center hover:text-blue-500"
        >
          Visit Signup page
        </Link>
      </div>
    </div>
  );
}
