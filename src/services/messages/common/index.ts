import axios from 'axios'

export async function getMessagesBatchAndNextPageParam(
  currentPageParam = undefined,
  channelId: string
) {
  const res = await axios.get('/api/messages', {
    params: { pageParam: currentPageParam, channelId },
  })
  return res.data
}
