import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
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

  const password = user.Password;

  if (!/[A-Z]/.test(password)) {
    setError("Password must have at least one uppercase letter.");
    return;
  }
  if (!/[0-9]/.test(password)) {
    setError("Password must have at least one digit.");
    return;
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    setError("Password must have at least one non-alphanumeric character.");
    return;
  }
  if (password !== user.ConfirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await fetch(
      "https://weatherapi.runasp.net/api/Account/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: user.Name,
          Email: user.Email,
          Password: user.Password,
          ConfirmPassword: user.ConfirmPassword,
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
      } else if(Array.isArray(data)){
        setError(data[0]);
      }
      else {
        console.log(data)
        setError("Something went wrong");
      }
      return;
    }

    alert(typeof data === "string" ? data : "Account created successfully!");
    navigate("/login");
  } catch (err) {
    console.log(err)
    setError("Network error, please try again later");
  }
};

  // ===============================

  return (
    <main className="flex items-center justify-center bg-[#0d1117] py-5 px-4">
      <section className="w-full max-w-md bg-[#161b22]/80 border border-[#00B8D9]/30 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Create an Account
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="Name"
              value={user.Name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-[#00B8D9]/40 text-white focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
            />
          </div>
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
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-[#00B8D9]/40 text-white focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              name="ConfirmPassword"
              value={user.ConfirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-[#00B8D9]/40 text-white focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#00B8D9] py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00B8D9] hover:underline">
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;
