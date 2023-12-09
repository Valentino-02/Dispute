'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import { useModal, ModalType } from '@/hooks/useModal'

interface ModalContainerProps {
  title: string
  description?: string
  modalType: ModalType
  children: React.ReactNode
}

export default function ModalContainer({
  title,
  description = '',
  modalType,
  children,
}: ModalContainerProps) {
  const { isOpen, closeModal, type } = useModal()

  const isModalOpen = isOpen && type === modalType

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="overflow-hidden text-white bg-dark-blue">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-center text-zinc-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
