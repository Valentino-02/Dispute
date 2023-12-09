import { UserButton } from '@clerk/nextjs'

import { Separator } from '@/components/ui/separator'
import ThemeToggler from '@/components/shared/ThemeToggler'
import CreateServerAction from './CreateServerAction'
import ServersColumn from './ServersColumn'

export default async function NavigationSidebar({
  isSignedIn,
}: {
  isSignedIn: boolean
}) {
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-dark-blue bg-[#E3E5E8] py-3">
      <CreateServerAction isSignedIn={isSignedIn} />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-main-pink rounded-md w-10 mx-auto" />
      <ServersColumn />
      <div className="flex flex-col items-center pb-3 mt-auto gap-y-4">
        <ThemeToggler />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
            },
          }}
        />
      </div>
    </div>
  )
}
