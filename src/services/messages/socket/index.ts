import axios from 'axios'
import { Channel, Message } from '@prisma/client'

export async function sendMessage(
  channel: Channel,
  values: {
    content?: string
    fileUrl?: string
  }
) {
  await axios.post('/api/socket/messages', {
    ...values,
    serverId: channel.serverId,
    channelId: channel.id,
  })
}

export async function updateMessage(
  serverId: string,
  message: Message,
  content: string
) {
  await axios.patch(`/api/socket/messages/${message.id}`, {
    content,
    serverId,
    channelId: message.channelId,
    messageId: message.id,
  })
}

export async function deleteMessage(serverId: string, message: Message) {
  await axios.delete(`/api/socket/messages/${message.id}`, {
    data: {
      serverId,
      channelId: message.channelId,
      messageId: message.id,
    },
  })
}
