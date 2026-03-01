import { useStudent } from "../../contexts/studentContext";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const { student, studentToken, setStudentToken } = useStudent();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setStudentToken(null);
    navigate("/login", { replace: true });
  };

  if (!student && !studentToken) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading student data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F8] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={student.profilePicture}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-[#AB274F]"
          />

          <h2 className="mt-4 text-2xl font-bold text-[#AB274F]">
            {student.fullname}
          </h2>

          <p className="text-gray-500">@{student.username}</p>
        </div>

        {/* Details Section */}
        <div className="mt-6 space-y-4">
          <div className="bg-[#FFF0F4] p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{student.email}</p>
          </div>

          <div className="bg-[#FFF0F4] p-4 rounded-lg">
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium text-gray-800">{student.username}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-3 rounded-xl 
          bg-[#AB274F] hover:bg-[#8e1f42] 
          text-white font-semibold tracking-wide 
          transition-all duration-300 
          shadow-md hover:shadow-[#AB274F]/40"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentProfile;
