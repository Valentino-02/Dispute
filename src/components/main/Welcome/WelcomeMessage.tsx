'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModal'

const inviteCode = 'f683d621-8518-4c86-bef6-706748dc2f95'

export default function WelcomeMessage() {
  const { openModal } = useModal()
  const router = useRouter()

  return (
    <div className="z-30 mt-12 basis-2/5 md:mt-32">
      <div>
        <p className="z-10 text-6xl text-center md:text-start text-main-blue">
          First Steps
        </p>
        <p className="mt-10 text-lg text-center mb-7 md:text-start ">
          {'To begin using '}
          <span className=" text-main-pink">Dispute </span>
          {", create your own server, or join someone else's! "}
        </p>
      </div>

      <div className="text-center md:text-start">
        <Button
          onClick={() => openModal('createServer')}
          variant={'link'}
          className="text-2xl text-main-yellow"
        >
          Create your Own Server
        </Button>
      </div>

      <div className="mt-4 text-center md:text-start">
        <Button
          onClick={() => {
            router.push(`/invite/${inviteCode}`)
            router.refresh()
          }}
          variant={'link'}
          className="text-2xl text-main-yellow"
        >
          Join my Public Server
        </Button>
      </div>

      <p className="mt-6 ">
        Beware that this Public Server is in fact, public. Anyone can acces it.
      </p>
    </div>
  )
}
