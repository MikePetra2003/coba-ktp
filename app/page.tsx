import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
// 👇 PERBAIKAN: Import ProfileDashboard, BUKAN ProfileForm
import ProfileDashboard from '@/components/ProfileDashboard' 
import { signout } from '@/app/auth/actions'

export default async function Home() {
  const supabase = await createClient()

  // 1. Cek sesi user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. Ambil data profil
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 3. Siapkan Data Default
  const safeProfile = {
    full_name: profileData?.full_name || '',
    address: profileData?.address || '',
    ktp_number: profileData?.ktp_number || '',
    avatar_url: profileData?.avatar_url || '',
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-500">Kelola informasi profil anda di sini</p>
          </div>
          
          <form action={signout}>
            <button className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors shadow-sm font-medium">
              Logout
            </button>
          </form>
        </div>
        
        {/* 👇 PERBAIKAN: Render ProfileDashboard */}
        <ProfileDashboard data={safeProfile} />
      </div>
    </main>
  )
}