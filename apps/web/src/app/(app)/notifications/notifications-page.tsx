"use client";

import {
  KnockFeedProvider,
  NotificationFeed as KnockNotificationFeed,
  KnockProvider,
} from "@knocklabs/react";
import { isDarkTheme, useTheme } from "@/components/theme";

import { useWorkspaceUser } from "@/lib/use-workspace-user";

export const NotificationsPage = () => {
  const user = useWorkspaceUser();
  const { resolvedTheme } = useTheme();

  return (
    <KnockProvider apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} userId={user?.id}>
      <KnockFeedProvider
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}
        colorMode={isDarkTheme(resolvedTheme) ? "dark" : "light"}
      >
        <KnockNotificationFeed />
      </KnockFeedProvider>
    </KnockProvider>
  );
};
