import { redirect } from 'next/navigation'

import NewUserWelcome from '@/components/main/NewUser'
import { getServerSession } from 'next-auth'

export default async function NewUser() {
  const session = await getServerSession()
  if (session) return redirect(`/`)
  return (
    <div className="w-5/6 mx-auto">
      <NewUserWelcome />
    </div>
  )
}
