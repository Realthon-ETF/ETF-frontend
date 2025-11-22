import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  height: 100vh;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const StatusBar = styled.div`
  width: 100%;
  height: 46.642px;
  background: #fff;
  padding: 19.59px 0 0 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 14.925px;
  padding-right: 14.925px;
`;

const StatusTime = styled.p`
  font-family: "SF Pro", sans-serif;
  font-weight: 600;
  font-size: 15.86px;
  color: #000;
  line-height: 20.522px;
  margin: 0;
`;

const StatusIcons = styled.div`
  display: flex;
  gap: 6.53px;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 20px;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.p`
  font-family: "BareunDotumOTFPro", sans-serif;
  color: #2e3847;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.8px;
  margin: 0;
`;

const MenuButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const FilterSection = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  box-sizing: border-box;
`;

const HistoryCount = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const HistoryCountText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: #141618;
  line-height: 1.3;
  margin: 0;
`;

const HistoryCountNumber = styled.span`
  font-weight: 600;
`;

const HistoryCountLabel = styled.span`
  font-weight: 500;
`;

const FilterButton = styled.button`
  background: #fff;
  border: 1px solid #eaebec;
  border-radius: 8px;
  padding: 6px 8px;
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;

const FilterButtonText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #141618;
  line-height: 1.3;
  margin: 0;
`;

const ContentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 38px;
`;

const HistoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
`;

const NewBadge = styled.div`
  background: transparent;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
`;

const NewBadgeText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #ff4242;
  line-height: 1.3;
  margin: 0;
`;

const CategoryBadge = styled.div<{ category: "school" | "company" | "portal" }>`
  background: ${({ category }) => {
    if (category === "school") return "#eaf2fe";
    if (category === "company") return "#fef4e6";
    if (category === "portal") return "#e6ffd4";
    return "#eaf2fe";
  }};
  border-radius: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
`;

const CategoryBadgeText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #141618;
  line-height: 1.3;
  margin: 0;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemTitle = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #141618;
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const ItemSource = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const SourceLogo = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 2px;
  overflow: hidden;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SourceLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SourceText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #5a5c63;
  line-height: 1.3;
  margin: 0;
`;

interface AlarmItem {
  id: number;
  isNew: boolean;
  category: "school" | "company" | "portal";
  categoryLabel: string;
  title: string;
  sourceLogo?: string;
  sourceName: string;
}

const mockAlarms: AlarmItem[] = [
  {
    id: 1,
    isNew: true,
    category: "school",
    categoryLabel: "학과 공지",
    title:
      "2025 하반기 고려대학교X삼성SDS 현직자 멘토링(SW 직무) 안내 / Notice on 2025 Second Half Korea University X Samsung SDS In-service Professional Mentoring (SW Job)",
    sourceLogo:
      "https://www.figma.com/api/mcp/asset/2fc9871e-8296-4c4a-9c09-0d26347447d2",
    sourceName: "고려대학교 기술대학",
  },
  {
    id: 2,
    isNew: true,
    category: "school",
    categoryLabel: "학과 공지",
    title:
      "[산업혁신인재성장지원(해외연계) 사업] 독일, 덴마크 지능형 로봇 분야 '파견연구자 모집'",
    sourceLogo:
      "https://www.figma.com/api/mcp/asset/2fc9871e-8296-4c4a-9c09-0d26347447d2",
    sourceName: "고려대학교 기술대학",
  },
  {
    id: 3,
    isNew: true,
    category: "company",
    categoryLabel: "회사 공고",
    title: "Frontend Platform Assistant 모집",
    sourceLogo:
      "https://www.figma.com/api/mcp/asset/c9da8f0d-ce6e-4ece-8477-2687e81c0c94",
    sourceName: "토스 채용",
  },
  {
    id: 4,
    isNew: true,
    category: "portal",
    categoryLabel: "취업 포털",
    title: "AI와 함께 디자이너 커리어 확장하는 방법",
    sourceLogo:
      "https://www.figma.com/api/mcp/asset/65c3d510-9e5b-4bf2-8821-0b3cce568b98",
    sourceName: "잡코리아",
  },
  {
    id: 5,
    isNew: false,
    category: "portal",
    categoryLabel: "취업 포털",
    title: "대구경북과학기술원 2025년도 제4차 일반직원(일반정규직) 공개채용",
    sourceLogo:
      "https://www.figma.com/api/mcp/asset/65c3d510-9e5b-4bf2-8821-0b3cce568b98",
    sourceName: "잡코리아",
  },
  {
    id: 6,
    isNew: false,
    category: "portal",
    categoryLabel: "취업 포털",
    title: "게시글 제목입니다",
    sourceName: "웹사이트 이름",
  },
];

export default function AlarmLists() {
  const [filter, setFilter] = useState("전체");
  const newCount = mockAlarms.filter((item) => item.isNew).length;

  return (
    <Wrapper>
      <StatusBar>
        <StatusTime>9:41</StatusTime>
        <StatusIcons>
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
            <path
              d="M0 10V9C0 7.89543 0.895431 7 2 7H3C3.55228 7 4 6.55228 4 6V5C4 3.89543 4.89543 3 6 3H7C7.55228 3 8 2.55228 8 2V1C8 0.447715 8.44772 0 9 0H9.01C9.56228 0 10.01 0.447715 10.01 1V2C10.01 2.55228 10.4577 3 11.01 3H12.01C13.1146 3 14.01 3.89543 14.01 5V6C14.01 6.55228 14.4577 7 15.01 7H16.01C17.1146 7 18.01 7.89543 18.01 9V10"
              stroke="#000"
              strokeWidth="1.5"
            />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path
              d="M8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0Z"
              fill="#000"
            />
            <path
              d="M0 10C0 7.79086 1.79086 6 4 6H12C14.2091 6 16 7.79086 16 10V12H0V10Z"
              fill="#000"
            />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect
              x="1"
              y="6"
              width="20"
              height="5"
              rx="1"
              stroke="#000"
              strokeWidth="1.5"
            />
            <path
              d="M23 7V10"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </StatusIcons>
      </StatusBar>
      <Header>
        <LogoContainer>
          <LogoIcon>
            <svg
              width="36"
              height="36"
              viewBox="0 0 78 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="77.76" height="77.76" fill="white" />
              <path
                d="M46.6025 29.3325C46.0465 25.8052 50.7705 24.1041 52.5908 27.1763L59.3271 38.5464L61.5459 34.3101C63.7057 30.1878 69.9363 31.6392 70.0518 36.2915C70.2693 45.0592 66.8813 53.5322 60.6797 59.7339L59.7598 60.6548C53.5423 66.8722 45.0469 70.2685 36.2568 70.0503C31.598 69.9346 30.1385 63.6998 34.2617 61.5278L38.6641 59.2095L27.2314 52.5181C24.1494 50.7138 25.8267 45.9805 29.3574 46.519L38.6641 47.938L31.5967 37.2104C29.149 33.4947 33.5367 29.085 37.2646 31.5142L48.0557 38.5464L46.6025 29.3325ZM17.8164 9.52393C18.0338 8.34517 19.724 8.34516 19.9414 9.52393L21.4326 17.6187C21.5138 18.0592 21.8583 18.4047 22.2988 18.4858L30.3936 19.9771C31.5724 20.1944 31.5725 21.8838 30.3936 22.1011L22.2988 23.5923C21.8583 23.6734 21.5138 24.018 21.4326 24.4585L19.9414 32.5532C19.7242 33.7323 18.0336 33.7323 17.8164 32.5532L16.3252 24.4585C16.244 24.018 15.8995 23.6734 15.459 23.5923L7.36426 22.1011C6.18527 21.8838 6.18534 20.1944 7.36426 19.9771L15.459 18.4858C15.8996 18.4047 16.244 18.0592 16.3252 17.6187L17.8164 9.52393Z"
                fill="url(#paint0_radial_alarm)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_alarm"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="matrix(29.4277 29.4291 -29.4277 29.4277 35.3823 37.5416)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4F95FF" />
                  <stop offset="0.27707" stopColor="#5698F8" />
                  <stop offset="0.518714" stopColor="#75A7D9" />
                  <stop offset="1" stopColor="#FFEA4F" />
                </radialGradient>
              </defs>
            </svg>
          </LogoIcon>
          <LogoText>알려주잡</LogoText>
        </LogoContainer>
        <MenuButton>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="#1E1E1E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </MenuButton>
      </Header>
      <FilterSection>
        <HistoryCount>
          <HistoryCountText>
            <HistoryCountNumber>{newCount}</HistoryCountNumber>
            <HistoryCountLabel>
              개의 새로운 히스토리가 있습니다
            </HistoryCountLabel>
          </HistoryCountText>
        </HistoryCount>
        <FilterButton
          onClick={() => setFilter(filter === "전체" ? "필터" : "전체")}
        >
          <FilterButtonText>{filter}</FilterButtonText>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#141618"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </FilterButton>
      </FilterSection>
      <ContentList>
        {mockAlarms.map((item) => (
          <HistoryItem key={item.id}>
            <TagsContainer>
              {item.isNew && (
                <NewBadge>
                  <NewBadgeText>new</NewBadgeText>
                </NewBadge>
              )}
              <CategoryBadge category={item.category}>
                <CategoryBadgeText>{item.categoryLabel}</CategoryBadgeText>
              </CategoryBadge>
            </TagsContainer>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemSource>
                {item.sourceLogo ? (
                  <SourceLogo>
                    <SourceLogoImage
                      src={item.sourceLogo}
                      alt={item.sourceName}
                    />
                  </SourceLogo>
                ) : (
                  <SourceLogo />
                )}
                <SourceText>{item.sourceName}</SourceText>
              </ItemSource>
            </ItemContent>
          </HistoryItem>
        ))}
      </ContentList>
    </Wrapper>
  );
}
