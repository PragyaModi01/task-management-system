import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-4">
      <h2 className="text-xl font-semibold">Sprint Management System</h2>

      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
