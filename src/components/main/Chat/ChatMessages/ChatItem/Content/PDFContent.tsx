import { FileIcon } from 'lucide-react'
import { Message } from '@prisma/client'

export default function PDFContent({ message }: { message: Message }) {
  if (!message.fileUrl) return
  return (
    <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
      <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
      <a
        href={message.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
      >
        PDF File
      </a>
    </div>
  )
}
