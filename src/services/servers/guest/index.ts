import axios from 'axios'

import { db } from '@/lib/db'
import { getProfile } from '@/services/profile'

export async function getServerIJoinedByInvite(inviteCode: string) {
  const profile = await getProfile()

  if (!profile) {
    return
  }

  const server = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  })

  return server
}

export async function addMeToServer(inviteCode: string) {
  const profile = await getProfile()

  if (!profile) {
    return
  }

  const server = await db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  })

  return server
}

export async function updateServerInviteCode(serverId: string) {
  const res = await axios.patch(`/api/servers/${serverId}/invite-code`)
  return res.data
}

export async function leaveServer(serverId: string) {
  await axios.patch(`/api/servers/${serverId}/leave`)
}
