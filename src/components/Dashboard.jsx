import { FaUsers, FaBoxOpen, FaCashRegister, FaMoneyBillWave } from "react-icons/fa"
import DashboardCard from "../components/DashboardCard"
import SalesChart from "../components/SalesChart"

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard path="karyawan" title="Karyawan" value={12}  icon={<FaUsers />} color="bg-amber-300" />
        <DashboardCard path="gudang" title="Produk Gudang" value={54} icon={<FaBoxOpen />} color="bg-amber-700"/>
        <DashboardCard path="" title="Transaksi Hari Ini" value={17} icon={<FaCashRegister />} />
        <DashboardCard path="gudang" title="Pendapatan Hari Ini" value={`Rp${(1720000).toLocaleString()}`} icon={<FaMoneyBillWave />} color="bg-green-500"/>
      </div>

      {/* Chart */}
      <SalesChart />
    </div>
  )
}
