import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/bgimage.jpg";

function Home() {
  return (
    <div className="bg-[#FFF5F8]">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#AB274F] mb-4">
            Bhojan Buddy
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Bhojan Buddy is a smart food management system that helps students
            get timely meals while reducing food wastage.
          </p>

          <Link
            to="/register"
            className="inline-block bg-[#AB274F] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Right Image Placeholder */}
        <div className="flex justify-center">
          <div className="w-full h-64 md:h-80 bg-white border-2 border-dashed border-[#AB274F] rounded-xl flex items-center justify-center text-gray-400">
            <img src={bgImage} className="w-full h-full object-cover"></img>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#AB274F] mb-12">
            How Bhojan Buddy Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                1. Student Registration
              </h3>
              <p className="text-gray-600">
                Students register using their name and create a secure password
                to access the system.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                2. Food Updates
              </h3>
              <p className="text-gray-600">
                Mess or canteen staff update daily food availability in the
                system.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                3. Smart Distribution
              </h3>
              <p className="text-gray-600">
                Students get timely food updates, ensuring minimum waste and
                better planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BHOJAN BUDDY */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#AB274F] mb-8">
            Why Choose Bhojan Buddy?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <p className="bg-white p-6 rounded-xl shadow text-gray-700">
              🍽️ Reduces food wastage in hostels and canteens
            </p>
            <p className="bg-white p-6 rounded-xl shadow text-gray-700">
              👨‍🎓 Helps students get reliable and timely meals
            </p>
            <p className="bg-white p-6 rounded-xl shadow text-gray-700">
              📊 Provides an organised and transparent system
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
