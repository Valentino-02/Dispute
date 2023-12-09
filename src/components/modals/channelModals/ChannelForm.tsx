'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ChannelType } from '@prisma/client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import FormInput from '@/components/shared/FormInput'

export const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.',
    })
    .refine((name) => name !== 'general', {
      message: "Channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
})

interface ChannelFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isEdit?: boolean
  defaultValues?: {
    name: string
    type: ChannelType
  }
}

export default function ChannelForm({
  onSubmit,
  isEdit = false,
  defaultValues = { name: '', type: ChannelType.TEXT },
}: ChannelFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  const isLoading = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-8"
      >
        <div className="px-6 space-y-8">
          <FormInput form={form} name="name" label="Channel name" />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Channel Type</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-white capitalize border-0 outline-none bg-zinc-800 focus:ring-0 ring-offset-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select a channel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup className="text-white capitalize">
                      {Object.values(ChannelType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="px-6 py-4 bg-dark-blue">
          <Button variant="primary" disabled={isLoading}>
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
