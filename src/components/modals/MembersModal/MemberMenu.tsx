'use client'

import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react'
import { useState } from 'react'
import { MemberRole } from '@prisma/client'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/useModal'
import { MemberWithProfile } from '@/types'
import { deleteMember, updateMemberRole } from '@/services/members'

export default function MemberMenu({ member }: { member: MemberWithProfile }) {
  const router = useRouter()
  const { openModal } = useModal()
  const [loading, setLoading] = useState(false)

  const onKick = async () => {
    try {
      setLoading(true)

      const server = await deleteMember(member)

      router.refresh()
      openModal('members', { server: server })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onRoleChange = async (role: MemberRole) => {
    if (role === member.role) return
    try {
      setLoading(true)

      const server = await updateMemberRole(member, role)

      router.refresh()
      openModal('members', { server: server })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading)
    return <Loader2 className="w-4 h-4 ml-auto animate-spin text-zinc-500" />

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="w-4 h-4 text-zinc-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center">
              <ShieldQuestion className="w-4 h-4 mr-2" />
              <span>Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => onRoleChange('GUEST')}>
                  <Shield className="w-4 h-4 mr-2" />
                  Guest
                  {member.role === 'GUEST' && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRoleChange('MODERATOR')}>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Moderator
                  {member.role === 'MODERATOR' && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onKick()}>
            <Gavel className="w-4 h-4 mr-2" />
            Kick
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
