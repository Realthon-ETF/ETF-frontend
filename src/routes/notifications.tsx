import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
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
import { Helmet } from "react-helmet-async";

const ITEMS_PER_PAGE = 20;

const FILTER_OPTIONS = [
  "전체",
  "좋아요",
  "학과 공지",
  "회사 공고",
  "취업 포털",
  "인턴 공고",
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  // We remove the separate totalCount state because count depends on the filter
  // const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filter States
  const [filterType, setFilterType] = useState<string>("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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
        // setTotalCount(data.totalCount);
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // --- Filtering Logic ---
  const filteredNotifications = useMemo(() => {
    if (filterType === "전체") return notifications;
    if (filterType === "좋아요") return notifications.filter((n) => n.isLiked);
    // For specific categories
    return notifications.filter((n) => n.category === filterType);
  }, [notifications, filterType]);

  // --- Handlers ---

  const handleFilterSelect = (type: string) => {
    setFilterType(type);
    setIsDropdownOpen(false);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Crucial: Update parent state so "좋아요" filter works dynamically
  const handleToggleLike = (id: string, newStatus: boolean) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: newStatus } : item,
      ),
    );
  };

  // --- Pagination Logic (based on filtered data) ---
  const currentTotalCount = filteredNotifications.length;
  const totalPages = Math.ceil(currentTotalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    endIndex,
  );

  const handlePageClick = (page: number) => setCurrentPage(page);

  // Show empty state if initialized and no data found (globally)
  if (notifications.length === 0 && !isLoading) {
    return (
      <Layout>
        <div className="empty-state">알림이 없습니다.</div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>알림 목록 | 알려주잡</title>
        <meta
          name="description"
          content="이력서 분석 결과에 기반한 맞춤 취업 정보 알림 목록입니다."
        />
      </Helmet>
      <Layout>
        <ContentContainer>
          <SectionHeader>
            <div className="count-info">
              <p>
                <strong>{currentTotalCount}</strong>개의 히스토리
              </p>
            </div>

            {/* Dropdown Area */}
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
                          className={filterType === option ? "selected" : ""}
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
                  onToggleLike={handleToggleLike} // Pass handler down
                />
              ))
            ) : (
              <div className="no-result">해당하는 알림이 없습니다.</div>
            )}
          </NotificationList>

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
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                className="nav-btn"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                다음 →
              </button>
            </PaginationNav>
          )}
        </ContentContainer>
      </Layout>
    </>
  );
}

// --- Styles Updates ---

const FilterContainer = styled.div`
  position: relative; /* For absolute positioning of dropdown */
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

// ... (Rest of Layout, ContentContainer styles remain the same) ...

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
    /* Styles for the main filter button */
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

const NotificationList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;
  list-style: none;

  .no-result {
    text-align: center;
    padding: 2rem;
    color: #888;
    font-size: 0.9rem;
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
