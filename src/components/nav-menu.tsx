import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

const links = [
  {
    href: "https://x.com/Taquiimam14",
    label: "Twitter"
  },
  {
    href: "https://github.com/taqui-786",
    label: "Github"
  },

];

export const NavMenu = ({
  className,
  ...props
}: ComponentProps<typeof NavigationMenu>) => {
  const { orientation } = props;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList
        className={cn({
          "flex-col items-start gap-4": orientation === "vertical"
        })}
      >
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle({
                className: cn({ "text-xl": orientation === "vertical" })
              })}
            >
              <Link href={link.href}>{link.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
