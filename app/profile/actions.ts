'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  
  // 1. Ambil user yang sedang login
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const fullName = formData.get('fullName') as string
  const address = formData.get('address') as string
  const ktpNumber = formData.get('ktpNumber') as string
  const file = formData.get('avatar') as File

  let avatarUrl = formData.get('currentAvatarUrl') as string

  // 2. Handle Upload Foto (Logika sama seperti sebelumnya)
  if (file && file.size > 0) {
    const fileName = `${user.id}-${Date.now()}`
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true }) // upsert true biar bisa overwrite

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      return { error: 'Gagal upload foto' }
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)
      
    avatarUrl = publicUrl
  }

  // 3. PERBAIKAN UTAMA: Gunakan UPSERT, bukan UPDATE
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id, // ID Wajib ada untuk upsert
      full_name: fullName,
      address: address,
      ktp_number: ktpNumber,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .select() // Tambahan: select() memastikan kita dapat return data untuk cek error

  if (error) {
    console.error('Database Error:', error) // Cek terminal VSCode jika error
    return { error: error.message }
  }

  // 4. Paksa refresh halaman
  revalidatePath('/', 'layout')
  
  return { success: 'Data berhasil diupdate' }
}