'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { DialogFooter } from '@/components/ui/dialog'
import { useModal } from '@/hooks/useModal'
import { Button } from '@/components/ui/button'

export default function CancelConfirmBtns({
  serviceCall,
}: {
  serviceCall: () => Promise<void>
}) {
  const { closeModal } = useModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await serviceCall()

      router.push('/servers')
      router.refresh()
      closeModal()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
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
  )
}
