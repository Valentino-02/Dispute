import { Hash } from 'lucide-react'

import MobileToggle from '@/components/shared/MobileToggle'
import SocketIndicator from '@/components/shared/SocketIndicator'

interface ChatHeaderProps {
  serverId: string
  name: string
}

export default async function ChannelHeader({
  serverId,
  name,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center h-12 px-3 font-semibold border-b-2 text-md border-neutral-200 dark:border-main-blue">
      <MobileToggle serverId={serverId} />
      <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-white" />
      <p className="font-semibold text-black text-md dark:text-white">{name}</p>
      <div className="flex items-center ml-auto">
        <SocketIndicator />
      </div>
    </div>
  )
}
