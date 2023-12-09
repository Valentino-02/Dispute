'use client'

import { Channel, Member } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'react-toastify'

import UserAvatar from '@/components/shared/UserAvatar'
import UserName from './UserName'
import Content from './Content'
import EditDeleteBtn from './EditDeleteBtn'
import { MessageWithMemberWithProfile } from '@/types'

interface ChatItemProps {
  channel: Channel
  currentMember: Member
  message: MessageWithMemberWithProfile
}

export default function ChatItem({
  channel,
  currentMember,
  message,
}: ChatItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const onMemberClick = () => {
    toast('Private Messages Coming Soon!')
    if (message.memberId === currentMember.id) return

    /* router.push(`/servers/${params?.serverId}/conversations/${member.id}`) */
  }

  return (
    <div className="relative flex items-center w-full p-4 transition group hover:bg-black/5">
      <div className="flex items-start w-full group gap-x-2">
        <div
          onClick={onMemberClick}
          className="transition cursor-pointer hover:drop-shadow-md"
        >
          <UserAvatar src={message.member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <UserName message={message} onClick={onMemberClick} />
          <Content
            message={message}
            channel={channel}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
      <EditDeleteBtn
        currentMember={currentMember}
        message={message}
        channel={channel}
        setIsEditing={setIsEditing}
      />
    </div>
  )
}
