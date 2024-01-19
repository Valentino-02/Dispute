import axios from 'axios'

import { db } from '@/lib/db'
import { getProfile } from '@/services/profile'
import { Member, MemberRole, Server } from '@prisma/client'

export async function updateMemberRole(member: Member, role: MemberRole) {
  const response = await axios.patch(`/api/members/${member.id}`, {
    role: role,
    serverId: member.serverId,
  })

  const server: Server = response.data

  return server
}

export async function deleteMember(member: Member) {
  const response = await axios.delete(`/api/members/${member.id}`, {
    data: { serverId: member.serverId },
  })

  const server: Server = response.data

  return server
}

export async function getMyMember(serverId: string) {
  const profile = await getProfile()

  if (!profile) return

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  })

  return member
}
