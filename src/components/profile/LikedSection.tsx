import { useState, useEffect } from "react";
import styled from "styled-components";
import { NotificationCard } from "../notifications/NotificationCard";
import type { NotificationItem } from "../../types/notification";

interface LikedSectionProps {
  notifications: NotificationItem[];
  onToggleLike: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

export const LikedSection = ({
  notifications,
  onToggleLike,
}: LikedSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate Pagination
  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = notifications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset to page 1 if list shrinks (e.g., user unlikes items) and current page becomes empty
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [notifications.length, totalPages, currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <SectionContainer>
      <div className="section-header">
        <h2>좋아요 목록</h2>
      </div>

      <NotificationList>
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              item={notification}
              onToggleLike={() => onToggleLike(notification.id)}
            />
          ))
        ) : (
          <div className="no-result">저장된 알림이 없습니다.</div>
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`num-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
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
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 3rem;

  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .section-header {
    h2 {
      color: #141618;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 300px; /* Prevent layout shift when empty */

  .no-result {
    text-align: center;
    padding: 3rem;
    color: #878a93;
    background: #f7f8fa;
    border-radius: 8px;
  }
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;

  .nav-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #eaebec;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    color: #5a5c63;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
      background: #f7f8fa;
    }
  }

  .page-numbers {
    display: flex;
    gap: 0.5rem;
  }

  .num-btn {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eaebec;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    color: #5a5c63;

    &.active {
      background: #06f;
      color: #fff;
      border-color: #06f;
      font-weight: 700;
    }

    &:hover:not(.active) {
      background: #f7f8fa;
    }
  }
`;
