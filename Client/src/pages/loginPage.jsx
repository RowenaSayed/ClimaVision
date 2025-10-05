import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://weatherapi.runasp.net/api/Account/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email: user.Email,
            Password: user.Password,
          }),
        }
      );

      let data;
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!res.ok) {
        if (typeof data === "string") {
          setError(data);
        } else if (data.errors) {
          const firstKey = Object.keys(data.errors)[0];
          setError(data.errors[firstKey][0]);
        } else if (Array.isArray(data)) {
          setError(data[0]);
        } else {
          console.log(data);
          setError("Something went wrong");
        }
        return;
      }
      console.log(data.token)
      localStorage.setItem('token',data.token)
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Network error, please try again later");
    }
  };

  // ===============================

  return (
    <main className=" flex items-center justify-center bg-[#0d1117] py-5 px-4">
      <section className="w-full max-w-md bg-[#161b22]/80 border border-[#00B8D9]/30 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back
        </h1>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              name="Email"
              value={user.Email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-[#00B8D9]/40 text-white focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              name="Password"
              value={user.Password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-[#00B8D9]/40 text-white focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#00B8D9] py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#00B8D9] hover:underline">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
