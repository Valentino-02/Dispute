import { redirect } from 'next/navigation'

import ChannelHeader from '@/components/main/ChannelHeader'
import { getChannel } from '@/services/channels'

export default async function ChannelIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { channelId: string }
}) {
  const channel = await getChannel(params.channelId)

  if (!channel) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col h-full bg-background dark:bg-background">
      <ChannelHeader name={channel.name} serverId={channel.serverId} />
      {children}
    </div>
  )
}
