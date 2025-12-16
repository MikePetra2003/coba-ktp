'use client'

import { useState } from 'react'
import ProfileForm from './ProfileForm'

type ProfileData = {
  full_name: string | null
  address: string | null
  ktp_number: string | null
  avatar_url: string | null
}

export default function ProfileDashboard({ data }: { data: ProfileData }) {
  const [isEditing, setIsEditing] = useState(false)

  // Fungsi helper untuk menampilkan teks placeholder jika data kosong
  const renderValue = (val: string | null) => {
    if (!val || val.trim() === '') {
      return <span className="text-gray-400 italic">Belum diisi</span>
    }
    return <span className="text-gray-900 font-medium">{val}</span>
  }

  // JIKA MODE EDITING: Tampilkan Form
  if (isEditing) {
    return (
      <ProfileForm 
        data={data} 
        onCancel={() => setIsEditing(false)} 
      />
    )
  }

  // JIKA MODE VIEW: Tampilkan Data (Read Only)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      {/* Header Cover (Opsional untuk estetika) */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <div className="px-6 pb-6">
        <div className="relative flex justify-between items-end -mt-12 mb-6">
          {/* Avatar Display */}
          <div className="relative">
            {data.avatar_url ? (
               // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={data.avatar_url} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white" 
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center text-gray-400">
                No Img
              </div>
            )}
          </div>
          
          {/* Tombol Edit */}
          <button 
            onClick={() => setIsEditing(true)}
            className="mb-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
            Edit Profil
          </button>
        </div>

        {/* Informasi Detail User */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-y-4">
            <div className="border-b border-gray-100 pb-3">
              <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
              {renderValue(data.full_name)}
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-sm text-gray-500 mb-1">Alamat Domisili</p>
              {renderValue(data.address)}
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-sm text-gray-500 mb-1">Nomor KTP</p>
              {renderValue(data.ktp_number)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}