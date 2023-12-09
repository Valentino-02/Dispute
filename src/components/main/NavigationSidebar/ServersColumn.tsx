import { ScrollArea } from '@/components/ui/scroll-area'
import GoToServerAction from './GoToServerAction'
import { getServersIJoined } from '@/services/servers'

export default async function ServersColumn() {
  const servers = await getServersIJoined()

  return (
    <ScrollArea className="flex-1 w-full">
      {servers.map((server) => (
        <div key={server.id} className="mb-4">
          <GoToServerAction
            id={server.id}
            name={server.name}
            imageUrl={server.imageUrl}
          />
        </div>
      ))}
    </ScrollArea>
  )
}
