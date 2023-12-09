'use client'

import { Server } from '@prisma/client'

import ModalContainer from '../../ModalContainer'
import CancelConfirmBtns from './CancelConfirmBtns'
import { leaveServer } from '@/services/servers/guest'
import { useModal } from '@/hooks/useModal'

export default function LeaveServerModal() {
  const { data } = useModal()
  const { server } = data as {
    server: Server
  }
  return (
    <ModalContainer
      title="Leave Server"
      modalType="leaveServer"
      description="Are you sure you want to leave?"
    >
      <CancelConfirmBtns serviceCall={() => leaveServer(server.id)} />
    </ModalContainer>
  )
}
