// componented version
import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api"; // Adjust path as needed

// Imports from split files
import {
  COLORS,
  type CategoryType,
} from "../components/notifications/constants";
import type {
  NotificationItem,
  NotificationsResponse,
} from "../components/notifications/types";
import NotificationCard from "../components/notifications/notification-card";

const ITEMS_PER_PAGE = 20;

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterType] = useState<string>("전체");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get<NotificationsResponse>("/notifications");

        const transformedNotifications: NotificationItem[] =
          data.notifications.map((notif) => ({
            id: notif.notificationId.toString(),
            category: (notif.category as CategoryType) || "취업 포털",
            title: notif.title,
            source: notif.sourceName,
            url: notif.originalUrl,
            isLiked: notif.liked,
            // createdAt: "2025-12-30T09:30:00Z",
            // isLiked: true,
            // 위 2개가 없고,
            // isNew 판단이 API에 없음
            // isNew: false, // API doesn't have isNew, you can set based on createdAt if needed
          }));

        setNotifications(transformedNotifications);
        setTotalCount(data.totalCount);
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        // Fallback to mock data
        // setNotifications(NOTIFICATIONS_MOCK);
        // setTotalCount(NOTIFICATIONS_MOCK.length);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNotifications = notifications.slice(startIndex, endIndex);

  // const newNotificationsCount = notifications.filter((n) => n.isNew).length;

  // const handlePreviousPage = () => {
  //   setCurrentPage((prev) => Math.max(prev - 1, 1));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // };

  const handlePageClick = (page: number) => setCurrentPage(page);

  if (totalCount === 0 && !isLoading) {
    return (
      <Layout>
        <div className="empty-state">알림이 없습니다.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ContentContainer>
        {/* Semantic: Header for the section */}
        <SectionHeader>
          <div className="count-info">
            <p>
              <strong>{totalCount}</strong>개의 히스토리
            </p>
          </div>
          <div className="filter-wrapper">
            <button type="button" className="filter-btn">
              {filterType} <span>▼</span>
            </button>
          </div>
        </SectionHeader>

        <NotificationList>
          {paginatedNotifications.map((notification) => (
            <NotificationCard key={notification.id} item={notification} />
          ))}
        </NotificationList>

        {/* Semantic: Navigation for pagination */}
        {totalPages > 1 && (
          <PaginationNav aria-label="Pagination">
            <button
              className="nav-btn"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ← 이전
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`num-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageClick(page)}
                    // aria-current={currentPage === page ? "page" : undefined}
                    // isActive={currentPage === page}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              className="nav-btn"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              다음 →
            </button>
          </PaginationNav>
        )}
      </ContentContainer>
    </Layout>
  );
}

const Layout = styled.main`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: ${COLORS.white};
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;

  .empty-state {
    text-align: center;
    padding: 3rem 2rem;
    color: ${COLORS.textSecondary};
    font-size: 1rem;
    font-weight: 500;
  }
`;

const ContentContainer = styled.div`
  width: 80%; // 조절해서 알림의 width 수정
  max-width: 1200px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }
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
      padding: 0.375rem 0.5rem;
      font-size: 0.875rem;
      color: ${COLORS.primary};
      display: flex;
      align-items: center;
      gap: 0.25rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: ${COLORS.textSecondary};
        background-color: ${COLORS.bgHover};
      }

      span {
        font-size: 0.75rem;
      }
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
