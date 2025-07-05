import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Kasir from "./components/Kasir"
import Karyawan from "./components/Karyawan"
import Gudang from "./components/Gudang"

function App() {
  return (
    <Router>
      <div className="flex h-screen font-primary">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Kasir" element={<Kasir />} />
            <Route path="/Karyawan" element={<Karyawan />} />
            <Route path="/Gudang" element={<Gudang />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
