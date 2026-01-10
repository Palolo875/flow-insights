<<<<<<< HEAD

"use client"

import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
=======
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
>>>>>>> cf3e05132150222b3d83d232386d7bbe7a415c0a
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
<<<<<<< HEAD
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
=======
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
>>>>>>> cf3e05132150222b3d83d232386d7bbe7a415c0a

export function UserNav() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
<<<<<<< HEAD
            {userAvatar && <Image
              src={userAvatar.imageUrl}
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full"
            />}
=======
            {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt="User Avatar"
                className="rounded-full"
              />
            )}
>>>>>>> cf3e05132150222b3d83d232386d7bbe7a415c0a
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Junior</p>
            <p className="text-xs leading-none text-muted-foreground">
              Artisan du Numérique
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
<<<<<<< HEAD
          <Link href="/dashboard/settings">
=======
          <Link to="/dashboard/settings">
>>>>>>> cf3e05132150222b3d83d232386d7bbe7a415c0a
            <DropdownMenuItem>
              Paramètres
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> cf3e05132150222b3d83d232386d7bbe7a415c0a
}
