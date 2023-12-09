import { redirect } from 'next/navigation'
import {
  addMeToServer,
  getServerIJoinedByInvite,
} from '@/services/servers/guest'

export default async function InviteCodePage({
  params,
}: {
  params: { inviteCode: string }
}) {
  if (!params.inviteCode) {
    return redirect('/')
  }

  const existingServer = await getServerIJoinedByInvite(params.inviteCode)

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  const server = await addMeToServer(params.inviteCode)

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return null
}
