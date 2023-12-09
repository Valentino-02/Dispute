'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FileUploader from '@/components/shared/FileUploader'
import FormInput from '@/components/shared/FormInput'

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
})

interface ServerFormsProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isEdit?: boolean
  defaultValues?: {
    name: string
    imageUrl: string
  }
}

export default function ServerForm({
  onSubmit,
  isEdit = false,
  defaultValues = { name: '', imageUrl: '' },
}: ServerFormsProps) {
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
          <div className="flex items-center justify-center text-center">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader
                      endpoint="serverImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormInput form={form} name="name" label="Server name" />
        </div>
        <DialogFooter className="px-6 py-4 ">
          <Button variant="primary" disabled={isLoading}>
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
