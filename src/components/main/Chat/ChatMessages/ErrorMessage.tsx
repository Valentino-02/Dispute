import { ServerCrash } from 'lucide-react'

export default function ErrorMessage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Something went wrong!
      </p>
    </div>
  )
}
