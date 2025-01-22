const Navbar = () => {
  return (
    <nav className="bg-[#E6F7F2] px-8 py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">HealthCare</h1>

        <div className="flex items-center gap-8">
          <a href="#" className="text-lg text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-lg text-gray-700 hover:text-gray-900">
            Services
          </a>
          <a href="#" className="text-lg text-gray-700 hover:text-gray-900">
            About Us
          </a>
          <a href="#" className="text-lg text-gray-700 hover:text-gray-900">
            Contact
          </a>
          <button className="bg-[#3d7a6c] text-white px-6 py-2 rounded-md hover:bg-[#346b5f] transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
