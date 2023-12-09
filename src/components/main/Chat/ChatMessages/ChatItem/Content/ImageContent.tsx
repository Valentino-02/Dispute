import Image from 'next/image'

import { Message } from '@prisma/client'

export default function ImageContent({ message }: { message: Message }) {
  if (!message.fileUrl) return
  return (
    <a
      href={message.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center w-48 h-48 mt-2 overflow-hidden border rounded-md aspect-square bg-secondary"
    >
      <Image
        src={message.fileUrl}
        alt={message.content}
        fill
        className="object-cover"
      />
    </a>
  )
}
