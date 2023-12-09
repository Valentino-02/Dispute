import { InfiniteData } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Channel, Member } from '@prisma/client'

import ChatItem from './ChatItem'
import { MessageWithMemberWithProfile } from '@/types'

interface ChatItemsProps {
  data: InfiniteData<any> | undefined
  member: Member
  channel: Channel
}

export default function ChatItems({ data, member, channel }: ChatItemsProps) {
  return (
    <div className="flex flex-col-reverse mt-auto">
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group.items.map((message: MessageWithMemberWithProfile) => (
            <ChatItem
              key={message.id}
              channel={channel}
              currentMember={member}
              message={message}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
