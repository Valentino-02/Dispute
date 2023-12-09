import { Channel, Message } from '@prisma/client'

import TextContent from './TextContent'
import EditableTextContent from './EditableTextContent'
import ImageContent from './ImageContent'
import PDFContent from './PDFContent'

interface ContentProps {
  message: Message
  channel: Channel
  isEditing: boolean
  setIsEditing: (value: boolean) => void
}

export default function Content({
  message,
  channel,
  isEditing,
  setIsEditing,
}: ContentProps) {
  const fileType = message.fileUrl?.split('.').pop()
  const isText = !message.fileUrl
  const isPDF = fileType === 'pdf' && message.fileUrl
  const isImage = !isPDF && message.fileUrl

  if (isText && isEditing)
    return (
      <EditableTextContent
        message={message}
        channel={channel}
        setIsEditing={setIsEditing}
      />
    )

  if (isText) return <TextContent message={message} />

  if (isImage) return <ImageContent message={message} />

  if (isPDF) return <PDFContent message={message} />
}
