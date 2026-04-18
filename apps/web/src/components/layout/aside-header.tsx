"use client";

import { useState } from "react";
import Link from "next/link";
import { ProfileAvatar } from "@/components/profile-avatar";
import { Button } from "@repo/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Separator } from "@repo/ui/components/separator";
import { drawerItemVariants } from "@/lib/drawer-item";
import { themes, useTheme } from "@/components/theme";
import { useMediaQuery } from "@repo/ui/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  BookCheckIcon,
  GlobeLockIcon,
  HandshakeIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { useCardStack } from "@/app/(app)/posts/_components/card-stack";
import { getAvatarUrl } from "@/lib/avatars";
import { toggleFeedLayout } from "@/lib/feed-layout-actions";
import { useTRPC } from "@/trpc/react";

export const AsideHeader = () => {
  const trpc = useTRPC();
  const {
    data: { user },
  } = useSuspenseQuery(trpc.auth.workspace.queryOptions());
  const { theme, setTheme } = useTheme();
  const isDesktop = useMediaQuery();
  const { setCurrentIndex } = useCardStack();

  const [open, setOpen] = useState(false);

  const currentThemeIndex = themes.findIndex((t) => t.value === theme);
  const currentTheme = themes[currentThemeIndex];

  const drawerItemClassName = drawerItemVariants({
    className: "w-full justify-start h-10",
  });

  type MenuEntry =
    | { kind: "link"; id: string; condition: unknown; href: string; target?: string; icon: React.ReactNode; label: string }
    | { kind: "action"; id: string; condition: unknown; onClick: () => void | Promise<void>; icon: React.ReactNode; label: string }
    | { kind: "separator"; id: string; condition: unknown };

  const menuItems: MenuEntry[] = [
    {
      kind: "link",
      id: "profile",
      condition: user,
      href: `/profile/${user?.id}`,
      icon: <UserIcon aria-hidden="true" className="size-4" />,
      label: "Profile",
    },
    {
      kind: "link",
      id: "settings",
      condition: user,
      href: "/settings",
      icon: <SettingsIcon aria-hidden="true" className="size-4" />,
      label: "Settings",
    },
    {
      kind: "link",
      id: "login",
      condition: !user,
      href: "/auth/sign-in",
      icon: <UserIcon aria-hidden="true" className="size-4" />,
      label: "Login",
    },
    { kind: "separator", id: "separator-1", condition: true },
    {
      kind: "action",
      id: "theme",
      condition: true,
      onClick: () => {
        setOpen(false);
        const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
        const nextTheme = themes[nextThemeIndex];
        setTheme(nextTheme?.value ?? "system");
      },
      icon: (
        <span className="grid size-4 place-content-center">
          <span
            className="size-3 rounded-full ring"
            style={{ background: currentTheme?.color }}
          />
        </span>
      ),
      label: "Theme",
    },
    {
      kind: "action",
      id: "layout",
      condition: true,
      onClick: async () => {
        await toggleFeedLayout();
        setTimeout(() => {
          setOpen(false);
          setCurrentIndex(0);
        }, 50);
      },
      icon: <LayoutDashboardIcon aria-hidden="true" className="size-4" />,
      label: "Layout",
    },
    { kind: "separator", id: "separator-2", condition: true },
    {
      kind: "link",
      id: "support",
      condition: true,
      href: `mailto:kai@kyh.io?subject=Support: ${user?.id}`,
      target: "_blank",
      icon: <HelpCircleIcon aria-hidden="true" className="size-4" />,
      label: "Support",
    },
    {
      kind: "link",
      id: "about",
      condition: !isDesktop,
      href: "/about",
      icon: <BookCheckIcon aria-hidden="true" className="size-4" />,
      label: "About",
    },
    {
      kind: "link",
      id: "privacy",
      condition: !isDesktop,
      href: "/privacy",
      icon: <GlobeLockIcon aria-hidden="true" className="size-4" />,
      label: "Privacy",
    },
    {
      kind: "link",
      id: "terms",
      condition: !isDesktop,
      href: "/terms",
      icon: <HandshakeIcon aria-hidden="true" className="size-4" />,
      label: "Terms",
    },
  ];

  if (isDesktop) {
    return (
      <div className="area-aside-header">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
          >
            <ProfileAvatar
              className="size-8"
              src={getAvatarUrl(user?.displayName || user?.id)}
              alt="Profile"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            {menuItems.map((item) => {
              if (!item.condition) return null;
              if (item.kind === "separator") return <DropdownMenuSeparator key={item.id} />;
              if (item.kind === "link") {
                return (
                  <DropdownMenuItem
                    key={item.id}
                    render={<Link href={item.href} target={item.target} />}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </DropdownMenuItem>
                );
              }
              return (
                <DropdownMenuItem key={item.id} onClick={item.onClick}>
                  {item.icon}
                  {item.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="area-aside-header">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <ProfileAvatar
              className="size-8"
              src={getAvatarUrl(user?.displayName || user?.id)}
              alt="Profile"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Settings options</DrawerDescription>
          </DrawerHeader>
          {menuItems.map((item) => {
            if (!item.condition) return null;
            if (item.kind === "separator") return <Separator key={item.id} className="my-1" />;
            if (item.kind === "link") {
              return (
                <Link
                  key={item.id}
                  className={drawerItemClassName}
                  href={item.href}
                  target={item.target}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            }
            return (
              <button
                key={item.id}
                type="button"
                className={drawerItemClassName}
                onClick={() => void item.onClick()}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
