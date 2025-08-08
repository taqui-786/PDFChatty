'use client'
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/db/auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface HeaderUserMenuProps {
    email?: string,
    avatarUrl?: string
    fullname?: string
}

export default function HeaderUserMenu({ email, avatarUrl,fullname = "MD"  }: HeaderUserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={avatarUrl} alt="Profile image" />
            <AvatarFallback>{fullname.charAt(0)
              .toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {fullname || "User Name"}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email || "Email not provided"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Chat</DropdownMenuItem>
          <DropdownMenuItem>Admin</DropdownMenuItem>
          <DropdownMenuItem>ContactUs</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
