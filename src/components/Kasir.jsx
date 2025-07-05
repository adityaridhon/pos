import { useEffect, useState } from "react"
import { fetchProduct } from "../utils/fetchProduct"
import CardKasir from "./CardKasir"
import Swal from 'sweetalert2'


export default function Cashier() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  useEffect(() => {
    fetchProduct().then((data) => {
      setProducts(data)
    })
  }, [])

  const handleAdd = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.name]: {
        ...product,
        quantity: (prev[product.name]?.quantity || 0) + 1
      }
    }))
  }

  const handleRemove = (product) => {
    setCart((prev) => {
      const currentQty = prev[product.name]?.quantity || 0
      if (currentQty <= 1) {
        const updated = { ...prev }
        delete updated[product.name]
        return updated
      }
      return {
        ...prev,
        [product.name]: {
          ...product,
          quantity: currentQty - 1
        }
      }
    })
  }

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handlePay = () => {
    if (Object.keys(cart).length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Keranjang kosong",
        text: "Silakan pilih produk terlebih dahulu.",
        confirmButtonColor: "#3085d6"
      })
      return
    }
  
    Swal.fire({
      title: "Konfirmasi Pembayaran",
      text: `Total yang harus dibayar: Rp${total.toLocaleString()}`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#10b981", // Tailwind green-500
      cancelButtonText: "Batal",
      confirmButtonText: "Bayar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Pembayaran Berhasil",
          text: "Transaksi selesai. Terima kasih!",
          confirmButtonColor: "#10b981"
        })
        setCart({})
      }
    })
  }
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kasir</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product, i) => (
          <CardKasir
            key={i}
            product={product}
            onAdd={handleAdd}
            onRemove={handleRemove}
            quantity={cart[product.name]?.quantity || 0}
          />
        ))}
      </div>

      <div className="mt-6 border-t pt-4 text-end">
        <h3 className="text-xl font-semibold mb-2">Keranjang</h3>
        {Object.keys(cart).length === 0 ? (
          <p className="text-gray-500">Belum ada item.</p>
        ) : (
          <ul className="space-y-2">
            {Object.values(cart).map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 font-bold text-lg">Total: Rp{total.toLocaleString()}</div>
        <button
          onClick={handlePay}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Bayar
        </button>
      </div>
    </div>
  )
}
