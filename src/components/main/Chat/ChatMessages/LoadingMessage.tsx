import { Loader2 } from 'lucide-react'

export default function LoadingMessage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Loader2 className="my-4 h-7 w-7 text-zinc-500 animate-spin" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Loading messages...
      </p>
    </div>
  )
}
