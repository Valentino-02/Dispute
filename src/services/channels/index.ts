import axios from 'axios'
import * as z from 'zod'

import { db } from '@/lib/db'
import { formSchema } from '@/components/modals/channelModals/ChannelForm'
import { Channel, Server } from '@prisma/client'

export async function createChannel(
  serverId: string,
  values: z.infer<typeof formSchema>
) {
  await axios.post(`/api/channels`, {
    ...values,
    serverId,
  })
}

export async function updateChannel(
  channel: Channel,
  values: z.infer<typeof formSchema>
) {
  const response = await axios.patch(`/api/channels/${channel.id}`, {
    ...values,
    serverId: channel.serverId,
  })

  const server: Server = response.data
  return server
}

export async function deleteChannel(channel: Channel) {
  const response = await axios.delete(`/api/channels/${channel.id}`, {
    data: {
      serverId: channel.serverId,
    },
  })

  const server: Server = response.data
  return server
}

export async function getChannel(channelId: string) {
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  })

  return channel
}
