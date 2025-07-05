import { useEffect, useState } from "react"
import employeesData from "../data/Karyawan.json"
import KaryawanTable from "../components/KaryawanTable"
import Swal from 'sweetalert2'


export default function Karyawan() {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    setEmployees(employeesData)
  }, [])

  const handleEdit = (emp) => {
    alert(`Fitur edit belum tersedia (dummy)\nNama: ${emp.name}`)
  }

  const handleDelete = (emp) => {
    Swal.fire({
      title: `Hapus ${emp.name}?`,
      text: "Data ini tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // merah
      cancelButtonColor: "#6b7280",  // abu
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        setEmployees((prev) => prev.filter((e) => e.id !== emp.id))
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: `Karyawan ${emp.name} dihapus`,
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }
  

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manajemen Karyawan</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Cari nama..."
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            + Tambah
          </button>
        </div>
      </div>

      <KaryawanTable
        data={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
