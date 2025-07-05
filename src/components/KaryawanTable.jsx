import { FaEdit, FaTrash } from "react-icons/fa"

export default function KaryawanTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Posisi</th>
            <th className="px-4 py-3">Shift</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.role}</td>
              <td className="px-4 py-2">{emp.shift}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button onClick={() => onEdit(emp)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(emp)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
