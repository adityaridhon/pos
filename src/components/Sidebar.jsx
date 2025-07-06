import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import {
  FaHome,
  FaCashRegister,
  FaUserTie,
  FaWarehouse,
  FaClipboardList,
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaRegUser,
  FaChevronRight,
  FaChevronLeft,
  FaChevronUp,
  FaChevronDown
} from "react-icons/fa"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const [isGudangOpen, setIsGudangOpen] = useState(false)


  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Kasir", path: "/kasir", icon: <FaCashRegister /> },
    { name: "Manajemen Karyawan", path: "/karyawan", icon: <FaUserTie /> },
    {
      name: "Manajemen Gudang",
      icon: <FaWarehouse />,
      children: [
        { name: "Stok Barang", path: "/gudang/stok", icon: <FaClipboardList /> },
        { name: "Barang Masuk", path: "/gudang/masuk", icon: <FaArrowCircleDown /> },
        { name: "Barang Keluar", path: "/gudang/keluar", icon: <FaArrowCircleUp /> }
      ]
    },
    { name: "Presensi", path: "/presensi", icon: <FaRegUser /> },
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
      {menu.map((item, i) => {
        if (item.children) {
          return (
            <div key={i}>
            <button
        onClick={() => setIsGudangOpen(!isGudangOpen)}
        className={`flex items-center justify-between gap-3 w-full text-left px-3 py-2 rounded transition ${
          location.pathname.startsWith("/gudang")
            ? "bg-blue-600 font-semibold"
            : "hover:bg-gray-700"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{item.icon}</span>
          {isOpen && <span>{item.name}</span>}
        </div>
        {isOpen && (
          <span className="ml-auto text-sm">
            {isGudangOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        )}
      </button>

        {/* Submenu */}
        {isGudangOpen && isOpen && (
          <div className="ml-8 mt-1 space-y-1">
              {item.children.map((subItem, j) => (
                <Link
                  key={j}
                  to={subItem.path}
                  className={`flex items-center gap-2 text-sm px-3 py-1 rounded transition ${
                    location.pathname === subItem.path
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <span className="text-base">{subItem.icon}</span>
                  <span>{subItem.name}</span>
                </Link>
              ))}
          </div>
        )}
      </div>
    )
  }

  // render menu biasa
  return (
    <Link
      key={i}
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2 my-2 rounded transition ${
        location.pathname === item.path
          ? "bg-blue-600 font-semibold"
          : "hover:bg-gray-700"
      }`}
    >
      <span className="text-lg">{item.icon}</span>
      {isOpen && <span>{item.name}</span>}
    </Link>
  )
})}

      </nav>
    </div>
  )
}
