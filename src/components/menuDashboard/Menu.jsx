import axios from "axios";
import { use, useState } from "react";
import { useStudent } from "../../contexts/studentContext";
// import axios from "axios";  // tum baad me use kar lena

function StudentDashboard() {
  const { studentToken } = useStudent();
  const [date, setDate] = useState("");
  const [menu, setmenu] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [rotis, setRotis] = useState(1);
  const [selectedSabji, setSelectedSabji] = useState("");
  const [selectedSweet, setSelectedSweet] = useState("");

  const handleFetchMenu = async () => {
    console.log("student token is=", studentToken);
    if (!date) {
      alert("Please select a date first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/students/getmenu",
        {
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${studentToken}`,
          },
        },
      );

      console.log("res=", response.data);
      setmenu(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Menu not available for this date");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSabji || !selectedSweet || !rotis) {
      alert("Please select all the options ❗");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/students/set-student-menu",
        {
          selectedSabji,
          selectedSweet,
          rotis,
        },
        {
          headers: {
            Authorization: `Bearer ${studentToken}`,
          },
        },
      );

      console.log("res=", res.data.data);
    } catch (e) {
      alert(e);
    }
    alert(
      `Selected:\nSabji: ${selectedSabji}\nSweet: ${selectedSweet}\nRotis : ${rotis}`,
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#AB274F] mb-6">
          Student Dashboard
        </h2>

        {/* Date Selector */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#AB274F]"
          />

          <button
            onClick={handleFetchMenu}
            className="px-6 py-2 rounded-xl 
            bg-[#AB274F] 
            hover:bg-[#8e1f42] 
            text-white font-semibold 
            transition-all duration-300 
            hover:scale-[1.05]"
          >
            {loading ? "Loading..." : "Get Menu"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 font-medium mb-6">
            {error}
          </div>
        )}

        {/* Menu Section */}
        {menu && (
          <form onSubmit={handleSubmit}>
            {/* Sabji Section */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#AB274F] mb-4">
                🥘 Choose Your Sabji
              </h3>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {menu.sabjiOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedSabji(item)}
                    className={`cursor-pointer p-6 rounded-2xl shadow-md transition-all duration-300 
                    ${
                      selectedSabji === item
                        ? "bg-[#AB274F] text-white scale-105"
                        : "bg-white hover:shadow-lg"
                    }`}
                  >
                    <p className="text-lg font-medium text-center">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sweet Section */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#AB274F] mb-4">
                🍨 Choose Your Sweet
              </h3>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {menu.sweetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedSweet(item)}
                    className={`cursor-pointer p-6 rounded-2xl shadow-md transition-all duration-300 
                    ${
                      selectedSweet === item
                        ? "bg-[#AB274F] text-white scale-105"
                        : "bg-white hover:shadow-lg"
                    }`}
                  >
                    <p className="text-lg font-medium text-center">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Roti Section */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#AB274F] mb-4">
                🫓 Choose Number of Rotis
              </h3>

              <div className="flex items-center justify-center gap-6 bg-white p-6 rounded-2xl shadow-md">
                {/* Decrease Button */}
                <button
                  type="button"
                  onClick={() => rotis > 1 && setRotis(rotis - 1)}
                  className="w-12 h-12 rounded-full bg-[#AB274F] text-white text-2xl font-bold 
      hover:bg-[#8e1f42] transition-all duration-300"
                >
                  -
                </button>

                {/* Roti Count */}
                <div className="text-3xl font-bold text-[#AB274F]">{rotis}</div>

                {/* Increase Button */}
                <button
                  type="button"
                  onClick={() => rotis < 10 && setRotis(rotis + 1)}
                  className="w-12 h-12 rounded-full bg-[#AB274F] text-white text-2xl font-bold 
      hover:bg-[#8e1f42] transition-all duration-300"
                >
                  +
                </button>
              </div>
            </div>
            {/* Confirm Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-10 py-3 rounded-xl 
                bg-[#AB274F] 
                hover:bg-[#8e1f42] 
                text-white font-semibold 
                transition-all duration-300 
                shadow-md hover:shadow-[#AB274F]/40 
                hover:scale-[1.05]"
              >
                Confirm Selection
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
