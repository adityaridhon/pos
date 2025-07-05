import { FaEdit, FaTrash } from "react-icons/fa"

export default function StockTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-3">Produk</th>
            <th className="px-4 py-3">Stok</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.stock}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button onClick={() => onEdit(item)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(item)} className="text-red-500 hover:text-red-700">
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
