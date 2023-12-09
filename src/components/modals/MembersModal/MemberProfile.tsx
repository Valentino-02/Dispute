'use client'

import { MemberWithProfile } from '@/types'
import UserAvatar from '@/components/shared/UserAvatar'
import { roleIconMap } from '@/util/roleIconMap'

export default function MemberProfile({
  member,
  children,
}: {
  member: MemberWithProfile
  children: React.ReactNode
}) {
  return (
    <div key={member.id} className="flex items-center mb-6 gap-x-2">
      <UserAvatar src={member.profile.imageUrl} />
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center text-xs font-semibold gap-x-1">
          {member.profile.name}
          {roleIconMap[member.role]}
        </div>
        <p className="text-xs text-zinc-500">{member.profile.email}</p>
      </div>
      {children}
    </div>
  )
}
