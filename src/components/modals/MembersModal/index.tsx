'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import ModalContainer from '../ModalContainer'
import MemberProfile from './MemberProfile'
import MemberMenu from './MemberMenu'
import { useModal } from '@/hooks/useModal'
import { ServerWithMembersWithProfiles } from '@/types'

export default function MembersModal() {
  const { data } = useModal()
  const { server } = data as { server: ServerWithMembersWithProfiles }

  return (
    <ModalContainer
      title="Manage Members"
      modalType="members"
      description={server?.members?.length + ' Members'}
    >
      <ScrollArea className="mt-8 max-h-[420px] pr-6">
        {server?.members?.map((member) => (
          <MemberProfile key={member.id} member={member}>
            {server.profileId !== member.profileId && (
              <MemberMenu member={member} />
            )}
          </MemberProfile>
        ))}
      </ScrollArea>
    </ModalContainer>
  )
}
