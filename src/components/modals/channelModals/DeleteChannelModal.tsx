'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Channel } from '@prisma/client'

import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ModalContainer from '../ModalContainer'
import { useModal } from '@/hooks/useModal'
import { deleteChannel } from '@/services/channels'

export default function DeleteChannelModal() {
  const { closeModal, data } = useModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { channel } = data as {
    channel: Channel
  }

  const onClick = async () => {
    try {
      setIsLoading(true)

      let serverId = channel.serverId

      await deleteChannel(channel)

      router.push(`/servers/${serverId}`)
      router.refresh()
      closeModal()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ModalContainer
      title="Delete Channel"
      modalType="deleteChannel"
      description="Are you sure you want to delete this channel?"
    >
      <DialogFooter className="px-6 py-4 bg-dark-blue">
        <div className="flex items-center justify-between w-full">
          <Button disabled={isLoading} onClick={closeModal} variant="ghost">
            Cancel
          </Button>
          <Button disabled={isLoading} variant="destructive" onClick={onClick}>
            Confirm
          </Button>
        </div>
      </DialogFooter>
    </ModalContainer>
  )
}
