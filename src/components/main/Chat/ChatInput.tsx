'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useModal } from '@/hooks/useModal'
import EmojiPicker from '@/components/shared/EmojiPicker'
import { sendMessage } from '@/services/messages/socket'
import { Channel } from '@prisma/client'

interface ChatInputProps {
  channel?: Channel
}

export const formSchema = z.object({
  content: z.string().min(1),
})

export default function ChatInput({ channel = undefined }: ChatInputProps) {
  const { openModal } = useModal()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (channel) {
        await sendMessage(channel, values)
      }

      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative p-4 pb-6 ">
                    <button
                      type="button"
                      onClick={() => openModal('messageFile', { channel })}
                      className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                    >
                      <Plus className="text-white dark:text-[#313338]" />
                    </button>
                    <Input
                      disabled={isLoading}
                      className="py-6 border-0 border-none px-14 bg-zinc-200/90 dark:bg-zinc-700/75 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                      placeholder={`Message`}
                      {...field}
                    />
                    <div className="absolute top-7 right-8">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                      />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
