import NavigationSidebar from '@/components/main/NavigationSidebar'
import { getProfile } from '@/lib/profile'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getProfile()

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar isSignedIn={profile ? true : false} />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  )
}

export default MainLayout
