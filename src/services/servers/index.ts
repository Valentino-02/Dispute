import axios from 'axios'
import * as z from 'zod'

import { formSchema } from '@/components/modals/serverModals/ServerForm'
import { db } from '@/lib/db'
import { getProfile } from '@/lib/profile'

export async function createServer(values: z.infer<typeof formSchema>) {
  await axios.post('/api/servers', values)
}

export async function updateServer(
  serverId: string,
  values: z.infer<typeof formSchema>
) {
  await axios.patch(`/api/servers/${serverId}`, values)
}

export async function deleteServer(serverId: string) {
  await axios.delete(`/api/servers/${serverId}`)
}

export async function getAllServerData(serverId: string) {
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  return server
}

export async function getServersIJoined() {
  const profile = await getProfile()

  if (!profile) {
    return []
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return servers
}

export async function getServerIJoined(serverId: string) {
  const profile = await getProfile()

  if (!profile) {
    return
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  return server
}
