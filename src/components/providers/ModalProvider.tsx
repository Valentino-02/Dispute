'use client'

import EditServerModal from '@/components/modals/serverModals/EditServerModal'
import InviteModal from '@/components/modals/serverModals/InviteModal'
import CreateServerModal from '@/components/modals/serverModals/CreateServerModal'
import MembersModal from '@/components/modals/MembersModal'
import CreateChannelModal from '@/components/modals/channelModals/CreateChannelModal'
import LeaveServerModal from '@/components/modals/serverModals/leaveDeleteModals/LeaveServerModal'
import DeleteServerModal from '@/components/modals/serverModals/leaveDeleteModals/DeleteServerModal'
import DeleteChannelModal from '@/components/modals/channelModals/DeleteChannelModal'
import EditChannelModal from '@/components/modals/channelModals/EditChannelModal'
import MessageFileModal from '@/components/modals/messageModals/MessageFileModal'
import DeleteMessageModal from '@/components/modals/messageModals/DeleteMessageModal'
import useCheckMounted from '@/hooks/useCheckMounted'

export default function ModalProvider() {
  const isMounted = useCheckMounted()

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  )
}
