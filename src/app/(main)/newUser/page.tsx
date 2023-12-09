import { redirect } from 'next/navigation'

import { getProfile } from '@/lib/profile'
import NewUserWelcome from '@/components/main/NewUser'

export default async function NewUser() {
  const profile = await getProfile()

  if (profile) return redirect(`/`)

  return (
    <div className="w-5/6 mx-auto">
      <NewUserWelcome />
    </div>
  )
}
