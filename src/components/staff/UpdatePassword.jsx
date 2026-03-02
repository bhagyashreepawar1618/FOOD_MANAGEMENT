import { useState } from "react";
import axios from "axios";
import { useStaff } from "../../contexts/StaffContext";

function AdminUpdatePassword() {
  const { staffToken } = useStaff();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required ❗");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/admin/update-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${staffToken}`,
          },
        },
      );

      setMessage("Password updated successfully ✅");
      console.log("res=", res);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
          🔐 Update Password
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
            <label className="block mb-1 text-sm font-medium">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#AB274F]"
              placeholder="Enter old password"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#AB274F]"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#AB274F]"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#AB274F] hover:bg-[#8e1f42] text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdatePassword;
