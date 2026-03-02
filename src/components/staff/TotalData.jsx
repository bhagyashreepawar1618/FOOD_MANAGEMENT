import { useEffect, useState } from "react";
import axios from "axios";
import { useStaff } from "../../contexts/StaffContext";

function StaffOrdersDashboard() {
  const { staffToken } = useStaff();

  const [date, setDate] = useState("");
  const [menu, setMenu] = useState(null);
  const [ordersData, setOrdersData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ 1️⃣ Fetch Menu
  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/students/getmenu`,
        { date },
      );

      const menuData = res.data.data;
      setMenu(menuData);

      await fetchOrders(menuData._id);
      await fetchStats(menuData._id);

      setLoading(false);
    } catch (err) {
      setError("Menu not available for this date");
      setLoading(false);
    }
  };

  // Fetch Orders Table
  const fetchOrders = async (menuId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/all-orders`,
      {
        headers: {
          Authorization: `Bearer ${staffToken}`,
        },
      },
    );

    setOrdersData(res.data.data);
  };

  // ✅ 3️⃣ Fetch Stats
  const fetchStats = async (menuId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/get-menu-stats/${menuId}`,
      {
        headers: {
          Authorization: `Bearer ${staffToken}`,
        },
      },
    );

    setStatsData(res.data.data);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#AB274F] mb-6">
          📋 Staff Orders Dashboard
        </h2>

        {/* ===== Date Selector ===== */}
        <div className="flex gap-4 mb-6 justify-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <button
            onClick={fetchMenu}
            className="px-6 py-2 bg-[#AB274F] text-white rounded-lg"
          >
            Load Data
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* ===== Summary Section ===== */}
        {statsData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-semibold text-[#AB274F]">
                Total Orders
              </h3>
              <p className="text-2xl font-bold mt-2">{statsData.totalOrders}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-semibold text-[#AB274F]">
                Total Rotis
              </h3>
              <p className="text-2xl font-bold mt-2">{statsData.totalRotis}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-[#AB274F] mb-2">
                Sabji Votes
              </h3>
              {statsData.sabjiStats.map((item, index) => (
                <p key={index}>
                  {item.sabji} : <strong>{item.count}</strong>
                </p>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow md:col-span-3">
              <h3 className="text-lg font-semibold text-[#AB274F] mb-2">
                Sweet Votes
              </h3>
              <div className="flex flex-wrap gap-6">
                {statsData.sweetStats.map((item, index) => (
                  <p key={index}>
                    {item.sweet} : <strong>{item.count}</strong>
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== Orders Table ===== */}
        {ordersData && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#AB274F] text-white">
                <tr>
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Sabji</th>
                  <th className="px-6 py-3">Sweet</th>
                  <th className="px-6 py-3">Rotis</th>
                </tr>
              </thead>

              <tbody>
                {ordersData.orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">{order.student?.fullname}</td>
                    <td className="px-6 py-3">{order.student?.email}</td>
                    <td className="px-6 py-3">{order.menu?.date}</td>
                    <td className="px-6 py-3">{order.selectedSabji}</td>
                    <td className="px-6 py-3">{order.selectedSweet}</td>
                    <td className="px-6 py-3 font-semibold">{order.rotis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffOrdersDashboard;
