'use client'

import { useState } from 'react'

import ModalContainer from '../ModalContainer'
import { DialogFooter } from '@/components/ui/dialog'
import { useModal } from '@/hooks/useModal'
import { Button } from '@/components/ui/button'
import { deleteMessage } from '@/services/messages/socket'

export default function DeleteMessageModal() {
  const { closeModal, data } = useModal()

  const { message, channel } = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    if (!message) return

    try {
      setIsLoading(true)

      if (channel) {
        await deleteMessage(channel.serverId, message)
      }

      closeModal()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <ModalContainer
      title="Delete Message"
      modalType="deleteMessage"
      description="Are you sure you want to permanently delete this message?"
    >
      <DialogFooter className="px-6 py-4 bg-gray-100">
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
