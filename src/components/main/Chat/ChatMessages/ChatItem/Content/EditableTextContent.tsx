'use client'

import { useEffect } from 'react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Channel, Message } from '@prisma/client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { updateMessage } from '@/services/messages/socket'

const formSchema = z.object({
  content: z.string().min(1),
})

export default function EditableTextContent({
  message,
  channel,
  setIsEditing,
}: {
  channel: Channel
  message: Message
  setIsEditing: (value: boolean) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: message.content,
    },
  })
  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setIsEditing(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keyDown', handleKeyDown)
  }, [setIsEditing])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (channel) {
        await updateMessage(channel.serverId, message, values.content)
      }
      form.reset()
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex items-center w-full pt-2 gap-x-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    disabled={isLoading}
                    className="p-2 border-0 border-none bg-zinc-200/90 dark:bg-zinc-700/75 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder="Edited message"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isLoading} size="sm" variant="primary">
          Save
        </Button>
      </form>
      <span className="text-[10px] mt-1 text-zinc-400">
        Press escape to cancel, enter to save
      </span>
    </Form>
  )
}
