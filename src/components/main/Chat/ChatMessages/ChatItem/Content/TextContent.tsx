import { Message } from '@prisma/client'

import { cn } from '@/lib/utils'

export default function TextContent({ message }: { message: Message }) {
  const isUpdated = message.updatedAt !== message.createdAt
  return (
    <p
      className={cn(
        'text-sm text-zinc-600 dark:text-zinc-300',
        message.deleted &&
          'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1'
      )}
    >
      {message.content}
      {isUpdated && !message.deleted && (
        <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
          (edited)
        </span>
      )}
    </p>
  )
}
