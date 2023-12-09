'use client'

import { Server } from '@prisma/client'

import ModalContainer from '../../ModalContainer'
import CancelConfirmBtns from './CancelConfirmBtns'
import { deleteServer } from '@/services/servers'
import { useModal } from '@/hooks/useModal'

export default function DeleteServerModal() {
  const { data } = useModal()
  const { server } = data as {
    server: Server
  }

  return (
    <ModalContainer
      title="Delete Server"
      modalType="deleteServer"
      description="Are you sure you want to delete this server?"
    >
      <CancelConfirmBtns serviceCall={() => deleteServer(server.id)} />
    </ModalContainer>
  )
}
