'use client'

import { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FormInputProps {
  form: UseFormReturn<any>
  name: string
  label: string
  placeholder?: string
}

export default function FormInput({
  form,
  name,
  label,
  placeholder = '',
}: FormInputProps) {
  const isLoading = form.formState.isSubmitting
  const placeholderMessage = placeholder
    ? placeholder
    : `Enter ${label.toLowerCase()}`

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-bold uppercase ">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              disabled={isLoading}
              className="text-white border-0 bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={placeholderMessage}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
