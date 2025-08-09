import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

export const NavMenu = ({
  className,
  ...props
}: ComponentProps<typeof NavigationMenu>) => {
  const { orientation } = props;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList
        className={cn({
          "flex-col items-start gap-4": orientation === "vertical",
        })}
      >
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: cn({ "text-xl": orientation === "vertical" }),
            })}
          >
            <Link href={"https://x.com/Taquiimam14"} target={"_blank"}>
              Twitter
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: cn({ "text-xl": orientation === "vertical" }),
            })}
          >
            <Link href={"https://github.com/taqui-786"} target={"_blank"}>
              Github
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
