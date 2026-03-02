import { useState } from "react";
import axios from "axios";

function StaffDashboard() {
  const [date, setDate] = useState("");
  const [sabji, setSabji] = useState(["", "", ""]);
  const [sweet, setSweet] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleSabjiChange = (index, value) => {
    const updated = [...sabji];
    updated[index] = value;
    setSabji(updated);
  };

  const handleSweetChange = (index, value) => {
    const updated = [...sweet];
    updated[index] = value;
    setSweet(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/setmenu`,
        {
          date: new Date().toLocaleDateString("en-CA"),
          sabjiOptions: sabji,
          sweetOptions: sweet,
        },
      );

      alert("Menu Saved Successfully ✅");
      setDate("");
      setSabji(["", "", ""]);
      setSweet(["", "", ""]);
    } catch (error) {
      console.log("Menu Save Error:", error);
      alert("Error saving menu ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] p-6 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#AB274F] mb-6">
          Staff Dashboard - Set Daily Menu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AB274F]"
            />
          </div>

          {/* Sabji Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#AB274F] mb-3">
              🥘 Sabji Options
            </h3>

            {sabji.map((item, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Sabji Option ${index + 1}`}
                value={item}
                onChange={(e) => handleSabjiChange(index, e.target.value)}
                required
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AB274F]"
              />
            ))}
          </div>

          {/* Sweet Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#AB274F] mb-3">
              🍨 Sweet Options
            </h3>

            {sweet.map((item, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Sweet Option ${index + 1}`}
                value={item}
                onChange={(e) => handleSweetChange(index, e.target.value)}
                required
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AB274F]"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl 
            bg-[#AB274F] 
            hover:bg-[#8e1f42] 
            disabled:bg-[#c46a86] 
            text-white font-semibold tracking-wide 
            transition-all duration-300 
            shadow-md hover:shadow-[#AB274F]/40 
            hover:scale-[1.02]"
          >
            {loading ? "Saving..." : "Save Menu"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StaffDashboard;
