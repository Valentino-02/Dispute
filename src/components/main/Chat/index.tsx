import { Channel, Member } from '@prisma/client'

import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'

interface ChatProps {
  channel: Channel
  member: Member
}

export default async function Chat({ channel, member }: ChatProps) {
  return (
    <>
      <ChatMessages channel={channel} member={member} />
      <ChatInput channel={channel} />
    </>
  )
}
