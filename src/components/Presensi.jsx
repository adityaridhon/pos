import { useRef, useState, useEffect } from "react"
import Swal from "sweetalert2"


export default function Absen() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [absenLog, setAbsenLog] = useState([])
  const [cameraActive, setCameraActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [justAbsen, setJustAbsen] = useState(false)
  
  useEffect(() => {
    if (!isLoading && justAbsen) {
      Swal.fire({
        icon: "success",
        title: "Absen Berhasil!",
        text: "Data absen telah disimpan",
        timer: 2000,
        showConfirmButton: false
      })
      setJustAbsen(false) // reset
    }
  }, [isLoading, justAbsen])
  

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      setCameraActive(true)
    } catch (err) {
      alert("Kamera tidak bisa diakses.")
    }
  }

  const takePhoto = () => {
    setIsLoading(true)
    setJustAbsen(false) // reset trigger
  
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0, 320, 240)
  
    const dataURL = canvas.toDataURL("image/png")
    const now = new Date()
    const timestamp = now.toLocaleString()
    const date = now.toISOString().split("T")[0]
    const dayName = now.toLocaleDateString("id-ID", { weekday: "long" })
  
    setPhoto(dataURL)
    video.srcObject.getTracks().forEach(track => track.stop())
    setCameraActive(false)
  
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setAbsenLog((prev) => [...prev, {
          photo: dataURL,
          time: timestamp,
          day:dayName,
          date,
          location: { latitude, longitude }
        }])
        setIsLoading(false)
        setJustAbsen(true) // ✅ trigger notifikasi
      },
      (err) => {
        console.warn("Gagal ambil lokasi:", err)
        setAbsenLog((prev) => [...prev, {
          photo: dataURL,
          time: timestamp,
          day:dayName,
          date,
          location: { latitude: "N/A", longitude: "N/A" }
        }])
        setIsLoading(false)
        setJustAbsen(true) // ✅ tetap trigger notifikasi
      }
    )
  }
  
  

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Presensi Karyawan</h2>

      <div className="space-y-3 w-full text-center place-items-center">
        <video ref={videoRef} autoPlay width={320} height={240} className="rounded bg-black" />
        <canvas ref={canvasRef} width={320} height={240} className="hidden" />

        {!cameraActive && (
          <button onClick={openCamera} className="bg-blue-500 px-4 py-2 text-white rounded">
            Aktifkan Kamera
          </button>
        )}

        {cameraActive && (
          <button onClick={takePhoto} className="bg-green-600 px-4 py-2 text-white rounded">
            Ambil Foto & Absen
          </button>
        )}
        {isLoading && (
          <div className="text-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto" />
            <p className="text-sm text-gray-500 mt-2">Menyimpan absen...</p>
          </div>
        )}

      </div>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold">🕒 Riwayat Absen</h3>
      <ul className="space-y-3">
        {absenLog.map((entry, i) => (
          <li key={i} className="flex items-start gap-3">
            <img src={entry.photo} className="w-16 h-16 rounded border" />
            <div>
            <p className="text-sm">
              🗓️ {entry.day}, {new Date(entry.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </p>
              <p className="text-sm">⏰ {entry.time}</p>
              <p className="text-sm text-gray-500">
                📍 Lokasi: {entry.location?.latitude}, {entry.location?.longitude}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
