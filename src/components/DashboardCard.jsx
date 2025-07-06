import { Link } from "react-router-dom"
export default function DashboardCard({ title, value, icon, color = "bg-blue-500", path = "/" }) {
    return (
      <div className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className={`p-3 mr-4 text-white ${color} rounded-full`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
          <Link to={path} className="text-xs text-blue-500 hover:text-blue-900 transition">Lihat Selengkapnya</Link>
        </div>
      </div>
    )
  }
  