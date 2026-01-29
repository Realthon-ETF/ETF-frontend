import type { CategoryType } from "../components/notifications/constants";

export interface APINotificationItem {
  notificationId: number;
  category: string;
  title: string;
  sourceName: string;
  summary: string;
  originalUrl: string;
  createdAt: string;
  liked: boolean;
}

export interface LikedResponse {
  totalCount: number;
  notifications: APINotificationItem[];
}

export interface NotificationsResponse {
  totalCount: number;
  notifications: APINotificationItem[];
}

// UI Item Type
export interface NotificationItem {
  id: string;
  category: CategoryType;
  title: string;
  source: string;
  url?: string;
  isLiked: boolean;
}
