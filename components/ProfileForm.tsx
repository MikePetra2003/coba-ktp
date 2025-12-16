'use client'

import { updateProfile } from '@/app/profile/actions'
import { useState } from 'react'
// 1. 👇 Tambah import ini
import { useRouter } from 'next/navigation'

type ProfileData = {
  full_name: string | null
  address: string | null
  ktp_number: string | null
  avatar_url: string | null
}

export default function ProfileForm({ 
  data, 
  onCancel 
}: { 
  data: ProfileData, 
  onCancel: () => void 
}) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  // 2. 👇 Inisialisasi router
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage('Menyimpan...')
    
    const result = await updateProfile(formData)
    
    setLoading(false)
    
    if (result?.error) {
      setMessage(`Error: ${result.error}`)
    } else {
      setMessage('Berhasil disimpan!')
      
      // 3. 👇 PERBAIKAN PENTING DI SINI:
      // Refresh data server sebelum kembali ke dashboard
      router.refresh() 
      
      setTimeout(() => {
        onCancel() 
      }, 1000)
    }
  }

  // ... (Sisa kode ke bawah sama persis, tidak ada yang berubah)
  return (
    <form action={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-100">
       {/* ... isi form sama seperti sebelumnya ... */}
       {/* Pastikan kode JSX ke bawah tetap ada (input, button, dll) */}
       
       <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profil</h2>
      
      <input type="hidden" name="currentAvatarUrl" value={data.avatar_url || ''} />

      <div className="flex justify-center mb-6">
        {data.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.avatar_url} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-medium text-sm">No Img</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Ganti Foto Profil</label>
        <input type="file" name="avatar" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
        <input name="fullName" defaultValue={data.full_name || ''} type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama lengkap" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat</label>
        <textarea name="address" defaultValue={data.address || ''} rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan alamat lengkap" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">No. KTP</label>
        <input name="ktpNumber" defaultValue={data.ktp_number || ''} type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 3578..." />
      </div>

      <div className="flex gap-3 pt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
        >
          Batal
        </button>
        
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
      
      {message && (
        <div className={`p-3 rounded text-sm text-center ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}
    </form>
  )
}