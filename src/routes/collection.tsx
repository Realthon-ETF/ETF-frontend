import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import api from "../api";
import {
  COLORS,
  type CategoryType,
} from "../components/notifications/constants";
import type {
  NotificationItem,
  NotificationsResponse,
} from "../components/notifications/types";
import { NotificationCard } from "../components/notifications/NotificationCard";
import type { LikedResponse } from "../types/notification";
import type { NotificationItem as LikedNotificationItem } from "../types/notification";

type CollectionTab = "notifications" | "likes";

const ITEMS_PER_PAGE = 20;

const FILTER_OPTIONS = [
  "전체",
  "좋아요",
  "학과 공지",
  "회사 공고",
  "취업 포털",
  "인턴 공고",
];

export default function Collection() {
  const [activeTab, setActiveTab] = useState<CollectionTab>("notifications");

  // --- Notifications tab state ---
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notifPage, setNotifPage] = useState(1);
  const [isNotifLoading, setIsNotifLoading] = useState(true);
  const [filterType, setFilterType] = useState("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- Likes tab state ---
  const [likedNotifications, setLikedNotifications] = useState<
    LikedNotificationItem[]
  >([]);
  const [likesPage, setLikesPage] = useState(1);
  const [isLikesLoading, setIsLikesLoading] = useState(true);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsNotifLoading(true);
        const { data } = await api.get<NotificationsResponse>("/notifications");
        const transformed: NotificationItem[] = data.notifications.map(
          (notif) => ({
            id: notif.notificationId.toString(),
            category: (notif.category as CategoryType) || "취업 포털",
            title: notif.title,
            source: notif.sourceName,
            url: notif.originalUrl,
            isLiked: notif.liked,
          }),
        );
        setNotifications(transformed);
        setNotifPage(1);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setIsNotifLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch liked notifications
  useEffect(() => {
    const fetchLiked = async () => {
      try {
        setIsLikesLoading(true);
        const { data } = await api.get<LikedResponse>("/notifications/likes");
        const transformed: LikedNotificationItem[] = data.notifications.map(
          (notif) => ({
            id: notif.notificationId.toString(),
            category: (notif.category as CategoryType) || "취업 포털",
            title: notif.title,
            source: notif.sourceName,
            url: notif.originalUrl,
            isLiked: notif.liked,
          }),
        );
        setLikedNotifications(transformed);
        setLikesPage(1);
      } catch (err) {
        console.error("Failed to fetch liked notifications:", err);
      } finally {
        setIsLikesLoading(false);
      }
    };

    fetchLiked();
  }, []);

  // --- Notifications filtering ---
  const filteredNotifications = useMemo(() => {
    if (filterType === "전체") return notifications;
    if (filterType === "좋아요") return notifications.filter((n) => n.isLiked);
    return notifications.filter((n) => n.category === filterType);
  }, [notifications, filterType]);

  const handleFilterSelect = (type: string) => {
    setFilterType(type);
    setIsDropdownOpen(false);
    setNotifPage(1);
  };

  const handleNotifToggleLike = (id: string, newStatus: boolean) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: newStatus } : item,
      ),
    );
  };

  const handleLikedToggleLike = (id: string) => {
    const previousState = [...likedNotifications];
    setLikedNotifications((prev) => prev.filter((item) => item.id !== id));

    api.post(`/notifications/${id}/like`).catch(() => {
      setLikedNotifications(previousState);
    });
  };

  // --- Notifications pagination ---
  const notifTotalCount = filteredNotifications.length;
  const notifTotalPages = Math.ceil(notifTotalCount / ITEMS_PER_PAGE);
  const notifStartIndex = (notifPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = filteredNotifications.slice(
    notifStartIndex,
    notifStartIndex + ITEMS_PER_PAGE,
  );

  // --- Likes pagination ---
  const LIKES_PER_PAGE = 5;
  const likesTotalPages = Math.ceil(likedNotifications.length / LIKES_PER_PAGE);
  const likesStartIndex = (likesPage - 1) * LIKES_PER_PAGE;
  const paginatedLikes = likedNotifications.slice(
    likesStartIndex,
    likesStartIndex + LIKES_PER_PAGE,
  );

  return (
    <>
      <Helmet>
        <title>수집함 | 알려주잡</title>
        <meta name="description" content="수집함 페이지" />
      </Helmet>

      <PageWrapper>
        <TabBarWrapper>
          <TabBar>
            <Tab
              $active={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
            >
              기본 수집함
            </Tab>
            <Tab
              $active={activeTab === "likes"}
              onClick={() => setActiveTab("likes")}
            >
              좋아요한 정보
            </Tab>
          </TabBar>
        </TabBarWrapper>

        {/* 기본 수집함 tab */}
        {activeTab === "notifications" && (
          <ContentLayout>
            {isNotifLoading ? (
              <LoadingText>불러오는 중...</LoadingText>
            ) : notifications.length === 0 ? (
              <EmptyText>알림이 없습니다.</EmptyText>
            ) : (
              <ContentContainer>
                <SectionHeader>
                  <div className="count-info">
                    <p>
                      <strong>{notifTotalCount}</strong>개의 히스토리
                    </p>
                  </div>
                  <div className="filter-wrapper">
                    <FilterContainer>
                      <button
                        type="button"
                        className="filter-btn"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        {filterType} <span>{isDropdownOpen ? "▲" : "▼"}</span>
                      </button>
                      {isDropdownOpen && (
                        <DropdownMenu>
                          {FILTER_OPTIONS.map((option) => (
                            <li key={option}>
                              <button
                                type="button"
                                onClick={() => handleFilterSelect(option)}
                                className={
                                  filterType === option ? "selected" : ""
                                }
                              >
                                {option}
                              </button>
                            </li>
                          ))}
                        </DropdownMenu>
                      )}
                    </FilterContainer>
                  </div>
                </SectionHeader>

                <NotificationList>
                  {paginatedNotifications.length > 0 ? (
                    paginatedNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        item={notification}
                        onToggleLike={handleNotifToggleLike}
                      />
                    ))
                  ) : (
                    <div className="no-result">해당하는 알림이 없습니다.</div>
                  )}
                </NotificationList>

                {notifTotalPages > 1 && (
                  <PaginationNav aria-label="Pagination">
                    <button
                      className="nav-btn"
                      onClick={() => setNotifPage((p) => Math.max(p - 1, 1))}
                      disabled={notifPage === 1}
                    >
                      ← 이전
                    </button>
                    <div className="page-numbers">
                      {Array.from(
                        { length: notifTotalPages },
                        (_, i) => i + 1,
                      ).map((page) => (
                        <button
                          key={page}
                          className={`num-btn ${notifPage === page ? "active" : ""}`}
                          onClick={() => setNotifPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      className="nav-btn"
                      onClick={() =>
                        setNotifPage((p) => Math.min(p + 1, notifTotalPages))
                      }
                      disabled={notifPage === notifTotalPages}
                    >
                      다음 →
                    </button>
                  </PaginationNav>
                )}
              </ContentContainer>
            )}
          </ContentLayout>
        )}

        {/* 좋아요된 정보 tab */}
        {activeTab === "likes" && (
          <ContentLayout>
            {isLikesLoading ? (
              <LoadingText>불러오는 중...</LoadingText>
            ) : (
              <ContentContainer>
                <NotificationList>
                  {paginatedLikes.length > 0 ? (
                    paginatedLikes.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        item={notification}
                        onToggleLike={() =>
                          handleLikedToggleLike(notification.id)
                        }
                      />
                    ))
                  ) : (
                    <div className="no-result">저장된 알림이 없습니다.</div>
                  )}
                </NotificationList>

                {likesTotalPages > 1 && (
                  <PaginationNav aria-label="Pagination">
                    <button
                      className="nav-btn"
                      onClick={() => setLikesPage((p) => Math.max(p - 1, 1))}
                      disabled={likesPage === 1}
                    >
                      ← 이전
                    </button>
                    <div className="page-numbers">
                      {Array.from(
                        { length: likesTotalPages },
                        (_, i) => i + 1,
                      ).map((page) => (
                        <button
                          key={page}
                          className={`num-btn ${likesPage === page ? "active" : ""}`}
                          onClick={() => setLikesPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      className="nav-btn"
                      onClick={() =>
                        setLikesPage((p) => Math.min(p + 1, likesTotalPages))
                      }
                      disabled={likesPage === likesTotalPages}
                    >
                      다음 →
                    </button>
                  </PaginationNav>
                )}
              </ContentContainer>
            )}
          </ContentLayout>
        )}
      </PageWrapper>
    </>
  );
}

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  background: #fff;
  min-height: calc(100vh - 4rem);
`;

const TabBarWrapper = styled.div`
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const TabBar = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: none;
  padding-top: 1rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  background: none;
  border: none;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid #141618" : "2px solid transparent"};
  color: ${({ $active }) => ($active ? "#141618" : "#9B9B9B")};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #141618;
  }
`;

const ContentLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;
`;

const ContentContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${COLORS.textSecondary};
  font-size: 1rem;
  font-weight: 500;
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${COLORS.textSecondary};
  font-size: 1rem;
  font-weight: 500;
`;

const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid ${COLORS.borderLight};
  padding-bottom: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .count-info p {
    font-family: "Pretendard", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${COLORS.primary};
    margin: 0;

    strong {
      font-weight: 600;
      margin-right: 0.25rem;
    }
  }

  .filter-wrapper {
    .filter-btn {
      background: ${COLORS.white};
      border: 1px solid ${COLORS.borderLight};
      border-radius: 0.5rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      color: ${COLORS.primary};
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 100px;
      justify-content: space-between;

      &:hover {
        border-color: ${COLORS.textSecondary};
        background-color: ${COLORS.bgHover};
      }

      span {
        font-size: 0.6rem;
        color: #999;
      }
    }
  }
`;

const FilterContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.borderLight};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  list-style: none;
  width: 120px;
  z-index: 10;

  li {
    width: 100%;
  }

  button {
    width: 100%;
    text-align: left;
    padding: 0.5rem;
    font-size: 0.875rem;
    color: ${COLORS.primary};
    background: none;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-family: "Pretendard", sans-serif;

    &:hover {
      background-color: ${COLORS.bgHover};
    }

    &.selected {
      font-weight: 700;
      color: ${COLORS.primary};
      background-color: #f0f0f0;
    }
  }
`;

const NotificationList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;
  list-style: none;

  .no-result {
    text-align: center;
    padding: 3rem;
    color: #878a93;
    background: #f7f8fa;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const PaginationNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${COLORS.borderLight};

  @media (max-width: 640px) {
    gap: 0.5rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
  }

  button {
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${COLORS.white};
    border: 1px solid ${COLORS.borderLight};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: #f5f5f5;
    }
  }

  .nav-btn {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${COLORS.primary};

    &:hover:not(:disabled) {
      border-color: ${COLORS.primary};
      background-color: ${COLORS.bgHover};
    }
  }

  .page-numbers {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .num-btn {
    border-radius: 0.375rem;
    padding: 0.375rem 0.625rem;
    font-size: 0.875rem;
    font-weight: 500;
    min-width: 2rem;
    color: ${COLORS.primary};

    &.active {
      background: ${COLORS.primary};
      color: ${COLORS.white};
      border-color: ${COLORS.primary};
      font-weight: 600;
    }

    &:hover:not(.active) {
      border-color: ${COLORS.primary};
      background-color: ${COLORS.bgHover};
    }
  }
`;
