import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import {
  FaBars,
  FaHome,
  FaCashRegister,
  FaUserTie,
  FaWarehouse,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Kasir", path: "/kasir", icon: <FaCashRegister /> },
    { name: "Manajemen Karyawan", path: "/karyawan", icon: <FaUserTie /> },
    { name: "Manajemen Gudang", path: "/gudang", icon: <FaWarehouse /> }
  ]

  return (
    <div
      className={`transition-all duration-500 ease-in-out 
      ${isOpen ? "w-72" : "w-16"} bg-blue-800 text-white h-full flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <span className="text-xl font-bold transition-all duration-300">
          {isOpen ? "POS" : ""}
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-xl"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 mt-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3.5 py-2 my-2 rounded transition-all ${
              location.pathname === item.path
                ? "bg-white text-blue-800 font-semibold"
                : "hover:bg-gray-700/40"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span
              className={`whitespace-nowrap transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-100 ml-1" : "opacity-0 ml-0"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
