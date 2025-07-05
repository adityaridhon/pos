import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Sen', total: 120000 },
  { day: 'Sel', total: 185000 },
  { day: 'Rab', total: 99000 },
  { day: 'Kam', total: 144000 },
  { day: 'Jum', total: 174000 },
  { day: 'Sab', total: 100000},
  { day: 'Min', total: 231000 },
]

export default function SalesChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Penjualan Minggu Ini</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => `Rp${value.toLocaleString()}`} />
          <Bar dataKey="total" fill="#3b82f6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
