'use client'

import { Server } from '@prisma/client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ModalType, useModal } from '@/hooks/useModal'

interface HeaderMenuItemProps {
  children: React.ReactNode
  name: string
  server: Server
  modalType: ModalType
  className?: string
}

export default function HeaderMenuItem({
  children,
  name,
  modalType,
  server,
  className = 'px-3 py-2 text-sm cursor-pointer',
}: HeaderMenuItemProps) {
  const { openModal } = useModal()
  return (
    <DropdownMenuItem
      onClick={() => openModal(modalType, { server })}
      className={className}
    >
      {name}
      {children}
    </DropdownMenuItem>
  )
}
