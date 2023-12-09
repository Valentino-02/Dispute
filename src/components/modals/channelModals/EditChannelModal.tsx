'use client'

import * as z from 'zod'
import { useRouter } from 'next/navigation'

import ChannelForm from './ChannelForm'
import ModalContainer from '../ModalContainer'
import { formSchema } from './ChannelForm'
import { useModal } from '@/hooks/useModal'
import { updateChannel } from '@/services/channels'

export default function CreateChannelModal() {
  const { closeModal, data } = useModal()
  const router = useRouter()

  const { channel } = data

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!channel) return
    try {
      await updateChannel(channel, values)

      router.refresh()
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ModalContainer title="Edit Channel" modalType="editChannel">
      <ChannelForm
        onSubmit={onSubmit}
        defaultValues={
          channel ? { name: channel.name, type: channel.type } : undefined
        }
        isEdit
      />
    </ModalContainer>
  )
}
