import { useInfiniteQuery } from '@tanstack/react-query'

import { useSocket } from '@/components/providers/SocketProvider'
import { getMessagesBatchAndNextPageParam } from '@/services/messages/common'

interface ChatQueryProps {
  channelId?: string
  queryKey: string
}

const nonSocketRefetchInterval = 1000

export const useChatQuery = ({
  channelId = undefined,
  queryKey,
}: ChatQueryProps) => {
  const { isConnected } = useSocket()

  const fetchMessages = async ({ pageParam = undefined }) => {
    if (channelId) {
      const res = await getMessagesBatchAndNextPageParam(pageParam, channelId)
      return res
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : nonSocketRefetchInterval,
    })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  }
}
