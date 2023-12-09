'use client'

import { Channel, Member, MemberRole, Message } from '@prisma/client'
import { Edit, Trash } from 'lucide-react'

import { ActionTooltip } from '@/components/shared/ActionTooltip'

import { useModal } from '@/hooks/useModal'

interface EditDeleteBtnsProps {
  currentMember: Member
  message: Message
  channel: Channel
  setIsEditing: (value: boolean) => void
}

export default function EditDeleteBtn({
  currentMember,
  message,
  channel,
  setIsEditing,
}: EditDeleteBtnsProps) {
  const { openModal } = useModal()

  const isAdmin = currentMember.role === MemberRole.ADMIN
  const isModerator = currentMember.role === MemberRole.MODERATOR
  const isOwner = currentMember.id === message.memberId
  const canDeleteMessage =
    !message.deleted && (isAdmin || isModerator || isOwner)
  const canEditMessage = !message.deleted && isOwner && !message.fileUrl

  if (!canDeleteMessage) return

  return (
    <div className="absolute items-center hidden p-1 bg-white border rounded-sm group-hover:flex gap-x-2 -top-2 right-5 dark:bg-dark-blue">
      {canEditMessage && (
        <ActionTooltip label="Edit">
          <Edit
            onClick={() => setIsEditing(true)}
            className="w-4 h-4 ml-auto transition cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
          />
        </ActionTooltip>
      )}
      <ActionTooltip label="Delete">
        <Trash
          onClick={() => openModal('deleteMessage', { message, channel })}
          className="w-4 h-4 ml-auto transition cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
        />
      </ActionTooltip>
    </div>
  )
}
