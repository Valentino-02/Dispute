import { redirect } from 'next/navigation'

import { getServersIJoined } from '@/services/servers'

export default async function ServerPage() {
  const servers = await getServersIJoined()

  if (servers.length !== 0) {
    return redirect(`/servers/${servers[0].id}`)
  }
  return redirect(`/`)
}
