'use client'

import { format } from 'date-fns'

import { ActionTooltip } from '@/components/shared/ActionTooltip'
import { MessageWithMemberWithProfile } from '@/types'
import { roleIconMap } from '@/util/roleIconMap'

const DATE_FORMAT = 'd MMM yyyy, HH:mm'

export default function UserName({
  message,
  onClick,
}: {
  message: MessageWithMemberWithProfile
  onClick: () => void
}) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex items-center">
        <p
          onClick={onClick}
          className="text-sm font-semibold cursor-pointer hover:underline"
        >
          {message.member.profile.name}
        </p>
        <ActionTooltip label={message.member.role}>
          {roleIconMap[message.member.role]}
        </ActionTooltip>
      </div>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        {format(new Date(message.createdAt), DATE_FORMAT)}
      </span>
    </div>
  )
}
