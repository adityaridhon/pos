import { FaPlus, FaMinus } from "react-icons/fa"


export default function CardKasir({ product, onAdd, onRemove, quantity }) {
  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 text-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="px-4 py-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Rp{product.price.toLocaleString()}
        </p>
        <div className="mt-3 flex justify-center items-center gap-2">
          <button
            onClick={() => onRemove(product)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <FaMinus size={14} />
          </button>
          <span className="px-2 min-w-[24px] text-sm">{quantity || 0}</span>
          <button
            onClick={() => onAdd(product)}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
