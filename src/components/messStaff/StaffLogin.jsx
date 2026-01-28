import React, { useState } from "react";
import { Link } from "react-router-dom";

function StaffLogin() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Staff ID:", staffId);
    console.log("Password:", password);
    // yaha baad me staff auth API lagegi
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F8]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#AB274F] mb-2">
          Staff Login
        </h2>
        <p className="text-center text-gray-500 mb-6">Authorized access only</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Staff ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff ID
            </label>
            <input
              type="text"
              placeholder="Enter staff ID"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AB274F]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AB274F]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#AB274F] text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Student login link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Are you a student?{" "}
          <Link
            to="/login"
            className="text-[#AB274F] font-semibold hover:underline"
          >
            Student Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default StaffLogin;
