import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import stockData from "../data/Gudang.json"
import StockTable from "../components/StockTable"

export default function Gudang() {
  const [stocks, setStocks] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    setStocks(stockData)
  }, [])

  const handleEdit = (item) => {
    Swal.fire({
      icon: "info",
      title: "Edit (Dummy)",
      text: `Produk: ${item.name}`,
      confirmButtonColor: "#3b82f6"
    })
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: `Hapus ${item.name}?`,
      text: "Data stok ini akan dihapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        setStocks((prev) => prev.filter((s) => s.id !== item.id))
        Swal.fire({
          icon: "success",
          title: "Dihapus",
          text: `${item.name} berhasil dihapus.`,
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  const filtered = stocks.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manajemen Gudang</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Cari produk..."
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            + Tambah
          </button>
        </div>
      </div>

      <StockTable
        data={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
