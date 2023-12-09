'use client'

import * as z from 'zod'

import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/useModal'

import ModalContainer from '../ModalContainer'
import ServerForm from './ServerForm'
import { formSchema } from './ServerForm'
import { updateServer } from '@/services/servers'

export default function EditServerModal() {
  const { closeModal, data } = useModal()
  const router = useRouter()

  const { server } = data

  if (!server) return

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateServer(server.id, values)
      router.refresh()
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ModalContainer title="Customize your server" modalType="editServer">
      <ServerForm
        onSubmit={(values) => onSubmit(values)}
        isEdit
        defaultValues={{ name: server.name, imageUrl: server.imageUrl }}
      />
    </ModalContainer>
  )
}
