'use client'

import * as z from 'zod'
import { useRouter, useParams } from 'next/navigation'

import ChannelForm from './ChannelForm'
import ModalContainer from '../ModalContainer'
import { formSchema } from './ChannelForm'
import { useModal } from '@/hooks/useModal'
import { createChannel } from '@/services/channels'

export default function CreateChannelModal() {
  const { closeModal, data } = useModal()
  const router = useRouter()
  const { serverId } = useParams() as {
    serverId: string
  }

  const { channelType } = data

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createChannel(serverId, values)

      router.refresh()
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ModalContainer title="Create Channel" modalType="createChannel">
      <ChannelForm
        onSubmit={onSubmit}
        defaultValues={
          channelType ? { name: '', type: channelType } : undefined
        }
      />
    </ModalContainer>
  )
}
