'use client'

import { useRef, ElementRef } from 'react'
import { Channel, Member } from '@prisma/client'
import { Loader2 } from 'lucide-react'

import { WelcomeMessage } from './WelcomeMessage'
import LoadingMessage from './LoadingMessage'
import ErrorMessage from './ErrorMessage'
import ChatItems from './ChatItems'
import { useChatQuery } from '@/hooks/useChatQuery'
import { useChatSocket } from '@/hooks/useChatSocket'
import { useChatScroll } from '@/hooks/useChatScroll'

interface ChatMessagesProps {
  channel: Channel
  member: Member
}

export default function ChatMessages({ channel, member }: ChatMessagesProps) {
  const queryKey = `chat:${channel.id}`
  const addKey = `chat:${channel.id}:messages`
  const updateKey = `chat:${channel.id}:messages:update`

  const chatRef = useRef<ElementRef<'div'>>(null)
  const bottomRef = useRef<ElementRef<'div'>>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      channelId: channel.id,
      queryKey,
    })

  useChatSocket({ queryKey, addKey, updateKey })

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })

  if (status === 'loading') {
    return <LoadingMessage />
  }

  if (status === 'error') {
    return <ErrorMessage />
  }

  return (
    <div ref={chatRef} className="flex flex-col flex-1 py-4 overflow-y-auto">
      {!hasNextPage ? (
        <WelcomeMessage
          type={channel ? 'channel' : 'conversation'}
          name={channel.name}
        />
      ) : (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="w-6 h-6 my-4 text-zinc-500 animate-spin" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="my-4 text-xs transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <ChatItems member={member} channel={channel} data={data} />
      <div ref={bottomRef} />
    </div>
  )
}
