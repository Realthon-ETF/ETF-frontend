import { useState } from "react";
import styled from "styled-components";

// Color tokens
const COLORS = {
  primary: "#141618",
  textSecondary: "#5A5C63",
  white: "#FFFFFF",
  borderLight: "#EAEBEC",
  badgeRed: "#FF4242",
  badgeBlue: "#EAF2FE",
  badgeOrange: "#FEF4E6",
  badgeLime: "#E6FFD4",
};

// Types
interface NotificationItem {
  id: string;
  title: string;
  category: "new" | "학과 공지" | "회사 공고" | "취업 포털";
  source: string;
  sourceIcon?: string;
  isNew: boolean;
}

// Mock data
const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title:
      "2025 하반기 고려대학교X삼성SDS 현직자 멘토링(SW 직무) 안내 / Notice on 2025 Second Half Korea University X Samsung SDS In-service Professional Mentoring (SW Job)",
    category: "학과 공지",
    source: "고려대학교 기술대학",
    isNew: true,
  },
  {
    id: "2",
    title:
      "[산업혁신인재성장지원(해외연계) 사업] 독일, 덴마크 지능형 로봇 분야 '파견연구자 모집'",
    category: "학과 공지",
    source: "고려대학교 기술대학",
    isNew: true,
  },
  {
    id: "3",
    title: "Frontend Platform Assistant 모집",
    category: "회사 공고",
    source: "토스 채용",
    isNew: true,
  },
  {
    id: "4",
    title: "AI와 함께 디자이너 커리어 확장하는 방법",
    category: "취업 포털",
    source: "잡코리아",
    isNew: true,
  },
  {
    id: "5",
    title: "대구경북과학기술원 2025년도 제4차 일반직원(일반정규직) 공개채용",
    category: "취업 포털",
    source: "잡코리아",
    isNew: false,
  },
  {
    id: "6",
    title: "게시글 제목입니다",
    category: "취업 포털",
    source: "웹사이트 이름",
    isNew: false,
  },
];

type CategoryType = "학과 공지" | "회사 공고" | "취업 포털";

function getNotificationBadgeColor(category: CategoryType) {
  switch (category) {
    case "학과 공지":
      return COLORS.badgeBlue;
    case "회사 공고":
      return COLORS.badgeOrange;
    case "취업 포털":
      return COLORS.badgeLime;
    default:
      return COLORS.badgeBlue;
  }
}

interface NotificationCardProps {
  item: NotificationItem;
}

function NotificationCard({ item }: NotificationCardProps) {
  return (
    <NotificationCardWrapper>
      <BadgeContainer>
        {item.isNew && <NewBadge>new</NewBadge>}
        <CategoryBadge
          bgColor={getNotificationBadgeColor(item.category as CategoryType)}
        >
          {item.category}
        </CategoryBadge>
      </BadgeContainer>
      <ContentWrapper>
        <NotificationTitle>{item.title}</NotificationTitle>
        <SourceInfo>
          <SourceIcon />
          <SourceName>{item.source}</SourceName>
        </SourceInfo>
      </ContentWrapper>
    </NotificationCardWrapper>
  );
}

export default function Notifications() {
  const [filterType] = useState<string>("전체");
  const newNotificationsCount = NOTIFICATIONS.filter((n) => n.isNew).length;

  return (
    <PageWrapper>
      <NotificationsContainer>
        {/* Header with notification count and filter */}
        <HeaderSection>
          <NotificationCountInfo>
            <CountText>
              <strong>{newNotificationsCount}</strong>개의 새로운 히스토리가
              있습니다
            </CountText>
          </NotificationCountInfo>
          <FilterDropdown>
            <FilterButton>
              {filterType}
              <DropdownIcon>▼</DropdownIcon>
            </FilterButton>
          </FilterDropdown>
        </HeaderSection>

        {/* Notifications List */}
        <NotificationsListWrapper>
          {NOTIFICATIONS.map((notification) => (
            <NotificationCard key={notification.id} item={notification} />
          ))}
        </NotificationsListWrapper>
      </NotificationsContainer>
    </PageWrapper>
  );
}

// Styled Components
const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: ${COLORS.white};
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;
`;

const NotificationsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const HeaderSection = styled.div`
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
`;

const NotificationCountInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const CountText = styled.p`
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.primary};
  line-height: 1.3;
  margin: 0;

  strong {
    font-weight: 600;
    margin-right: 0.25rem;
  }

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`;

const FilterDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.borderLight};
  border-radius: 0.5rem;
  padding: 0.375rem 0.5rem;
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.primary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${COLORS.textSecondary};
    background-color: #f9f9f9;
  }

  @media (max-width: 640px) {
    font-size: 0.8rem;
    padding: 0.25rem 0.375rem;
  }
`;

const DropdownIcon = styled.span`
  font-size: 0.75rem;
  display: inline-block;
  transition: transform 0.2s ease;
`;

const NotificationsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const NotificationCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
    padding: 0.5rem;
    padding-top: 0;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

interface BadgeProps {
  bgColor?: string;
}

const NewBadge = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.badgeRed};
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${COLORS.badgeRed};
  display: inline-block;
  min-width: max-content;
`;

const CategoryBadge = styled.div<BadgeProps>`
  background-color: ${(props) => props.bgColor || COLORS.badgeBlue};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${COLORS.primary};
  display: inline-block;
  min-width: max-content;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NotificationTitle = styled.h3`
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.primary};
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SourceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
`;

const SourceIcon = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 0.125rem;
  background-color: #d9d9d9;
  flex-shrink: 0;
`;

const SourceName = styled.p`
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.textSecondary};
  line-height: 1.3;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
