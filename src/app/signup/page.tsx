"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/signup", user);
      console.log("Signup success", data);
      toast.success("SignUp successfull");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-slate-200 text-black">
      <div className="w-96 h-auto p-4 border-2 border-blue-600 flex flex-col gap-2 rounded-md shadow-lg">
        <h1 className="font-bold text-xl text-blue-600 text-center">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr />
        <label htmlFor="username" className="font-semibold text-xl">
          Username:
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
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
          onClick={handleSignup}
          disabled={loading || isDisabled}
          className="p-2 border border-gray-300 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-600"
        >
          {isDisabled ? "No signup" : "Signup"}
        </button>
        <Link
          href="/login"
          className="font-semibold text-xl text-center hover:text-blue-500"
        >
          Visit login page
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
