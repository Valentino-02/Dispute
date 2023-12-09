import { redirect } from 'next/navigation'

import { tryCreateProfile, getProfile } from '@/lib/profile'
import { getServersIJoined } from '@/services/servers'

export default async function Root() {
  const profile = await getProfile()

  if (!profile) return redirect(`/newUser`)

  await tryCreateProfile()

  const servers = await getServersIJoined()

  if (servers.length !== 0) {
    return redirect(`/servers/${servers[0].id}`)
  }

  return redirect(`/home`)
}
