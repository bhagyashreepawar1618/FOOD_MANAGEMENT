import { useState } from "react";
import axios from "axios";
import { useStaff } from "../../contexts/StaffContext.jsx";

function AdminUpdateProfile() {
  const { staff, setStaff, staffToken } = useStaff();

  const [fullname, setFullname] = useState(staff?.fullname || "");
  const [email, setEmail] = useState(staff?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!fullname || !email) {
      setError("All fields are required ❗");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/update-profile`,
        {
          fullname,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${staffToken}`,
          },
        },
      );

      setMessage("Profile updated successfully ✅");

      // optional: update context data
      if (staff) {
        setStaff(res.data.data);
      }

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong ❌");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F8] p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-[#AB274F] mb-6">
          👤 Update Profile
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#AB274F]"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#AB274F]"
              placeholder="Enter email"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#AB274F] hover:bg-[#8e1f42] text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdateProfile;
