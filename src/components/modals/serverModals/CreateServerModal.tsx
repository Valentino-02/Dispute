'use client'

import * as z from 'zod'
import { useRouter } from 'next/navigation'

import ModalContainer from '../ModalContainer'
import ServerForm from './ServerForm'
import { formSchema } from './ServerForm'
import { useModal } from '@/hooks/useModal'
import { createServer } from '@/services/servers'

export default function CreateServerModal() {
  const { closeModal } = useModal()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createServer(values)
      router.refresh()
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ModalContainer
      title="Customize your server"
      description="Give your server a personality with a name and an image. You can
    always change it later."
      modalType="createServer"
    >
      <ServerForm onSubmit={(values) => onSubmit(values)} />
    </ModalContainer>
  )
}
