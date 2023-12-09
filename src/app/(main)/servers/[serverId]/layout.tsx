import { redirect } from 'next/navigation'

import { getServerIJoined } from '@/services/servers'

import ServerSidebar from '@/components/main/ServerSidebar'

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) {
  const server = await getServerIJoined(params.serverId)

  if (!server) {
    return redirect('/')
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 flex-col hidden h-full md:flex w-60">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  )
}
