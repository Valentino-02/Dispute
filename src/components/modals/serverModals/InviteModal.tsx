'use client'

import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { useModal } from '@/hooks/useModal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useOrigin from '@/hooks/useOrigin'
import ModalContainer from '../ModalContainer'
import { updateServerInviteCode } from '@/services/servers/guest'

export default function InviteModal() {
  const { openModal, data } = useModal()
  const origin = useOrigin()

  const [isLoading, setIsLoading] = useState(false)

  const { server } = data

  if (!server) return

  const inviteUrl = `${origin}/invite/${server.inviteCode}`

  const onNew = async () => {
    try {
      setIsLoading(true)
      const updatedServer = await updateServerInviteCode(server.id)

      openModal('invite', { server: updatedServer })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ModalContainer title="Invite Friends" modalType="invite">
      <div className="p-6">
        <Label className="text-xs font-bold uppercase ">
          Server invite link
        </Label>
        <div className="flex items-center mt-2 gap-x-2">
          <Input
            disabled={isLoading}
            className="border-0 text-zinc-300 bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={inviteUrl}
          />
          <CopyButton
            disabled={isLoading}
            onClick={() => navigator.clipboard.writeText(inviteUrl)}
          />
        </div>
        <Button
          onClick={onNew}
          disabled={isLoading}
          variant="link"
          size="sm"
          className="mt-4 text-xs text-zinc-300"
        >
          Generate a new link
          <RefreshCw className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </ModalContainer>
  )
}

function CopyButton({
  disabled,
  onClick,
}: {
  disabled: boolean
  onClick: () => void
}) {
  const [copied, setCopied] = useState(false)

  const manageClick = () => {
    onClick()
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <Button
      disabled={disabled}
      onClick={manageClick}
      size="icon"
      title="copy link"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </Button>
  )
}
