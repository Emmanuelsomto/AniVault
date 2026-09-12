import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Searchbar from "./Searchbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex justify-between items-center py-2 mx-6 gap-10 text-white">
      <Link to="/">
        <h1 className="font-poppins font-bold text-lg md:text-3xl">
          Ani<span className="text-red-500 opacity-90">V</span>ault
        </h1>
      </Link>

      <Searchbar className="w-full h-full px-4" />

      <div className="md:flex justify-center items-center gap-8 font-medium font-poppins hidden">
        <Link to="/trending" className="text-base hover:text-red-500">
          Trending
        </Link>
        <Link to="/browse" className="text-base hover:text-red-500">
          Browse
        </Link>
        <Link to="/my-vault" className="text-base hover:text-red-500">
          My Vault
        </Link>
        <Link
          to="/login"
          className="bg-[#e50914] text-white py-2 px-8 hover:bg-[#b80710] duration-300 ease-in transition-colors font-semibold text-lg rounded-lg"
        >
          <button className="cursor-pointer">Login</button>
        </Link>
      </div>

      <button
        onClick={toggleNavbar}
        className="flex justify-center items-center md:hidden cursor-pointer"
      >
        {isOpen ? (
          <FaTimes className="w-6.5 h-6.5 text-gray-300" />
        ) : (
          <FaBars className="w-6.5 h-6.5 text-gray-300" />
        )}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 shadow-xl px-6 py-6 flex flex-col gap-2 text-left z-50 bg-[#020617]">
          <Link
            onClick={toggleNavbar}
            to="/trending"
            className="w-full font-medium text-white hover:text-red-500 active:text-red-600 py-3 border-b border-slate-700"
          >
            Trending
          </Link>
          <Link
            onClick={toggleNavbar}
            to="/browse"
            className="w-full font-medium text-white hover:text-red-500 active:text-red-600 py-3 border-b border-slate-700"
          >
            Browse
          </Link>
          <Link
            onClick={toggleNavbar}
            to="/my-vault"
            className="w-full font-medium text-white hover:text-red-500 active:text-red-600 py-3 border-b border-slate-700"
          >
            My Vault
          </Link>
          <Link
            onClick={toggleNavbar}
            to="/login"
            className="w-full font-medium text-white hover:text-red-500 active:text-red-600 py-3 flex justify-center items-center"
          >
            <button className="bg-[#e50914] text-white py-2 px-8 hover:bg-[#b80710] active:bg-[#cd0a14] duration-300 ease-in transition-colors font-semibold text-lg rounded-lg w-full">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
