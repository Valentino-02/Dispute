'use client'

import { Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

import { ActionTooltip } from '@/components/shared/ActionTooltip'
import { useModal } from '@/hooks/useModal'

export default function CreateServerAction() {
  const { openModal } = useModal()
  const { data: session } = useSession()

  const onClick = async () => {
    if (!session) {
      toast('Sign in to create a server!')
      return
    }
    openModal('createServer')
  }

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button onClick={onClick} className="flex items-center group">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background  group-hover:bg-main-pink">
            <Plus
              className="transition group-hover:text-white text-main-pink"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
