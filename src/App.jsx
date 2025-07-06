import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Kasir from "./components/Kasir"
import Karyawan from "./components/Karyawan"
import Gudang from "./components/Gudang"
import Presensi from "./components/Presensi"

function App() {
  return (
    <Router>
      <div className="flex h-screen font-primary">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kasir" element={<Kasir />} />
            <Route path="/karyawan" element={<Karyawan />} />
            <Route path="/gudang" element={<Gudang />} />
            <Route path="/presensi" element={<Presensi />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
