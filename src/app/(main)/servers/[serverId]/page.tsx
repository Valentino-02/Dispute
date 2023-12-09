import { redirect } from 'next/navigation'

import { getServerIJoined } from '@/services/servers'

const ServerIdPage = async ({ params }: { params: { serverId: string } }) => {
  const server = await getServerIJoined(params.serverId)
  const initialChannel = server?.channels[0]

  if (initialChannel?.name !== 'general') {
    return redirect(`/`)
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}

export default ServerIdPage
