import { MemberRole, Server } from '@prisma/client'
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import HeaderMenuItem from './HeaderMenuItem'
import { ModalType } from '@/hooks/useModal'

interface ServerHeaderProps {
  server: Server
  role: MemberRole
}

interface MenuItemData {
  conditionToRender: Array<MemberRole>
  name: string
  modalType: ModalType
  icon: React.ReactNode
  className?: string
}

const menuItemsData: Array<MenuItemData> = [
  {
    conditionToRender: [MemberRole.ADMIN, MemberRole.MODERATOR],
    name: 'Invite People',
    modalType: 'invite',
    icon: <UserPlus className="w-4 h-4 ml-auto" />,
    className:
      'px-3 py-2 text-sm text-indigo-600 cursor-pointer dark:text-indigo-400',
  },
  {
    conditionToRender: [MemberRole.ADMIN],
    name: 'Server Settings',
    modalType: 'editServer',
    icon: <Settings className="w-4 h-4 ml-auto" />,
  },
  {
    conditionToRender: [MemberRole.ADMIN],
    name: 'Manage Members',
    modalType: 'members',
    icon: <Users className="w-4 h-4 ml-auto" />,
  },
  {
    conditionToRender: [MemberRole.ADMIN, MemberRole.MODERATOR],
    name: 'Create Channel',
    modalType: 'createChannel',
    icon: <PlusCircle className="w-4 h-4 ml-auto" />,
  },
  {
    conditionToRender: [MemberRole.ADMIN],
    name: 'Delete Server',
    modalType: 'deleteServer',
    icon: <Trash className="w-4 h-4 ml-auto" />,
    className: 'px-3 py-2 text-sm cursor-pointer text-rose-500',
  },
  {
    conditionToRender: [MemberRole.MODERATOR, MemberRole.GUEST],
    name: 'Leave Server',
    modalType: 'leaveServer',
    icon: <LogOut className="w-4 h-4 ml-auto" />,
    className: 'px-3 py-2 text-sm cursor-pointer text-rose-500',
  },
]

export default async function ServerHeader({
  server,
  role,
}: ServerHeaderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex items-center w-full h-12 px-3 font-semibold transition border-b-2 text-md border-neutral-200 dark:border-main-pink hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="w-5 h-5 mt-1 ml-auto mr-8 md:mr-0 " />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {menuItemsData.map((menuItem) => {
          if (menuItem.conditionToRender.includes(role)) {
            return (
              <HeaderMenuItem
                key={menuItem.name}
                name={menuItem.name}
                modalType={menuItem.modalType}
                server={server}
                className={menuItem.className ? menuItem.className : undefined}
              >
                {menuItem.icon}
              </HeaderMenuItem>
            )
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
