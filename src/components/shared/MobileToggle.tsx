import { Menu } from 'lucide-react'
import { getProfile } from '@/lib/profile'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import NavigationSidebar from '@/components/main/NavigationSidebar'
import ServerSidebar from '@/components/main/ServerSidebar'

export default async function MobileToggle({ serverId }: { serverId: string }) {
  const profile = await getProfile()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="w-[72px]">
          <NavigationSidebar isSignedIn={profile ? true : false} />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}
