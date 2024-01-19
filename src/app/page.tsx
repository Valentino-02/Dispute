import { redirect } from 'next/navigation'

import { getServersIJoined } from '@/services/servers'
import { getServerSession } from 'next-auth'

export default async function Root() {
  const session = await getServerSession()
  if (!session) return redirect('/newUser')

  const servers = await getServersIJoined()
  if (servers.length !== 0) {
    return redirect(`/servers/${servers[0].id}`)
  }

  return redirect(`/home`)
}
