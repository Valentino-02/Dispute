'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import ModalContainer from '../ModalContainer'
import FileUploader from '@/components/shared/FileUploader'
import { useModal } from '@/hooks/useModal'
import { sendMessage } from '@/services/messages/socket'

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attachment is required.',
  }),
})

export default function MessageFileModal() {
  const { data, closeModal } = useModal()
  const router = useRouter()

  const { channel } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (channel) {
        await sendMessage(channel, { ...values, content: values.fileUrl })
      }

      form.reset()
      router.refresh()
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ModalContainer
      title="Add an attachment"
      modalType="messageFile"
      description="Send a file as a message"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="px-6 space-y-8">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploader
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter className="px-6 py-4 bg-gray-100">
            <Button variant="primary" disabled={isLoading}>
              Send
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ModalContainer>
  )
}
