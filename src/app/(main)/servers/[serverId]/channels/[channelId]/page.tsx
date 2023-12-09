import { redirect } from 'next/navigation'
import { ChannelType } from '@prisma/client'

import MediaRoom from '@/components/shared/MediaRoom'
import { getChannel } from '@/services/channels'
import { getMyMember } from '@/services/members'
import Chat from '@/components/main/Chat'

interface ChannelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
  const channel = await getChannel(params.channelId)

  const member = await getMyMember(params.serverId)

  if (!channel || !member) {
    redirect('/servers')
  }

  return (
    <>
      {channel.type === ChannelType.TEXT && (
        <Chat channel={channel} member={member} />
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </>
  )
}
