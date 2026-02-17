import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api";
import type { ProfileResponse } from "../types/auth";

// --- Types ---

interface WebsiteItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

type SettingsTab = "ai" | "category";

// --- Constants ---

const CATEGORIES = [
  "기획/PM",
  "전략",
  "법무",
  "사무",
  "디자인",
  "인사",
  "회계",
  "세무",
  "마케팅",
  "AI",
  "개발",
  "데이터",
];

// TODO: Replace with real API data
const MOCK_WEBSITES: WebsiteItem[] = [
  {
    id: 1,
    title: "하나은행 인재채용",
    description: "IT 부분",
    url: "https://recruit.hanafn.com",
  },
  {
    id: 2,
    title: "서강대학교 입학처 | 입학자료실 | 공지사항",
    description: "입학자료실",
    url: "https://admission.sogang.ac.kr",
  },
  {
    id: 3,
    title: "서강대학교 입학처",
    description: "입학자료실",
    url: "https://www.sogang.ac.kr",
  },
  {
    id: 4,
    title: "서강대학교 입학처",
    description: "입학자료실",
    url: "https://www.sogang.ac.kr/ko/admission",
  },
  {
    id: 5,
    title: "서강대학교 입학처",
    description: "입학자료실",
    url: "https://www.sogang.ac.kr/ko/graduate",
  },
];

// --- Helpers ---

function getFaviconUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}

// --- Carousel scroll hook ---

function useCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = useCallback(() => {
    ref.current?.scrollBy({ left: -332, behavior: "smooth" });
  }, []);
  const scrollRight = useCallback(() => {
    ref.current?.scrollBy({ left: 332, behavior: "smooth" });
  }, []);
  return { ref, scrollLeft, scrollRight };
}

// --- SVG Icons ---

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M9 3.75V14.25M3.75 9H14.25"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12 8.667V12.667C12 13.403 11.403 14 10.667 14H3.333C2.597 14 2 13.403 2 12.667V5.333C2 4.597 2.597 4 3.333 4H7.333"
      stroke="#9B9B9B"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 2H14V6"
      stroke="#9B9B9B"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.667 9.333L14 2"
      stroke="#9B9B9B"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 12L6 8L10 4"
      stroke="#141618"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 12L10 8L6 4"
      stroke="#141618"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowForward = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3.333 8H12.667M8 3.333L12.667 8L8 12.667"
      stroke="#141618"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- WebsiteCard ---

function WebsiteCard({
  item,
  onAdd,
}: {
  item: WebsiteItem;
  onAdd: (url: string, title: string) => void;
}) {
  return (
    <Card>
      <CardTop>
        <CardHeaderRow>
          <CardFavicon src={getFaviconUrl(item.url)} alt="" />
          <ExternalLink
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLinkIcon />
          </ExternalLink>
        </CardHeaderRow>
        <CardTitle>{item.title}</CardTitle>
        <CardDesc>{item.description}</CardDesc>
      </CardTop>
      <AddButton
        type="button"
        onClick={() => onAdd(item.url, item.title)}
        aria-label="웹사이트 등록"
      >
        <PlusIcon />
      </AddButton>
    </Card>
  );
}

// --- CardCarousel section ---

function CardSection({
  highlightText,
  titleLine1Suffix,
  titleLine2,
  websites,
  onAdd,
}: {
  highlightText: string;
  titleLine1Suffix: string;
  titleLine2: string;
  websites: WebsiteItem[];
  onAdd: (url: string, title: string) => void;
}) {
  const { ref, scrollLeft, scrollRight } = useCarousel();

  return (
    <SectionBlock>
      <SectionHeader>
        <div>
          <SectionTitleLine>
            <Highlight>{highlightText}</Highlight> {titleLine1Suffix}
          </SectionTitleLine>
          <SectionTitleLine>{titleLine2}</SectionTitleLine>
        </div>
        <ArrowGroup>
          <ArrowBtn type="button" onClick={scrollLeft} $position="left">
            <ChevronLeft />
          </ArrowBtn>
          <ArrowBtn type="button" onClick={scrollRight} $position="right">
            <ChevronRight />
          </ArrowBtn>
        </ArrowGroup>
      </SectionHeader>
      <CarouselWrapper>
        <ScrollContainer ref={ref}>
          {websites.map((w) => (
            <WebsiteCard key={w.id} item={w} onAdd={onAdd} />
          ))}
        </ScrollContainer>
        <FadeOverlay />
      </CarouselWrapper>
    </SectionBlock>
  );
}

// --- Main Component ---

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>("ai");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userInterest, setUserInterest] = useState("관심 직무");

  useEffect(() => {
    api
      .get<ProfileResponse>("/auth/me")
      .then(({ data }) => {
        if (data.interestFields?.length) {
          setUserInterest(data.interestFields[0]);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddWebsite = async (url: string, _title: string) => {
    try {
      await api.post("/users/me/target-urls", { targetUrl: url });
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("등록에 실패했습니다.");
    }
  };

  const handleGoToProfile = () => {
    setModalOpen(false);
    navigate("/profile", { state: { activeTab: "website" } });
  };

  const categoryParts = selectedCategory.split("/");

  return (
    <>
      <Helmet>
        <title>정보설정 | 알려주잡</title>
        <meta name="description" content="정보설정 페이지" />
      </Helmet>

      <PageWrapper>
        {/* Tab Bar */}
        <TabBarWrapper>
          <TabBar>
            <Tab
              $active={activeTab === "ai"}
              onClick={() => setActiveTab("ai")}
            >
              AI추천
            </Tab>
            <Tab
              $active={activeTab === "category"}
              onClick={() => setActiveTab("category")}
            >
              카테고리
            </Tab>
          </TabBar>
        </TabBarWrapper>

        {/* AI Tab */}
        {activeTab === "ai" && (
          <Content>
            <Banner>
              <BannerTitle>
                원하는 웹사이트를 직접 등록하고 싶다면?
              </BannerTitle>
              <BannerLink
                onClick={() =>
                  navigate("/profile", { state: { activeTab: "website" } })
                }
              >
                등록 웹사이트 바로가기
                <ArrowForward />
              </BannerLink>
            </Banner>

            <SectionsWrapper>
              <CardSection
                highlightText={userInterest}
                titleLine1Suffix="직무를 준비하는 사람들이"
                titleLine2="많이 등록한 웹사이트예요"
                websites={MOCK_WEBSITES}
                onAdd={handleAddWebsite}
              />
              <CardSection
                highlightText={userInterest}
                titleLine1Suffix="과 관련해서"
                titleLine2="좋은 인사이트를 주는 웹사이트예요"
                websites={MOCK_WEBSITES}
                onAdd={handleAddWebsite}
              />
            </SectionsWrapper>
          </Content>
        )}

        {/* Category Tab */}
        {activeTab === "category" && (
          <Content>
            <ChipsRow>
              {CATEGORIES.map((cat) => (
                <Chip
                  key={cat}
                  type="button"
                  $active={cat === selectedCategory}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Chip>
              ))}
            </ChipsRow>

            <SectionsWrapper>
              <CardSection
                highlightText={categoryParts[0]}
                titleLine1Suffix="직무 인턴 공고가 뜨면"
                titleLine2="알람이 갈 수 있어요"
                websites={MOCK_WEBSITES}
                onAdd={handleAddWebsite}
              />
              <CardSection
                highlightText={categoryParts[categoryParts.length - 1]}
                titleLine1Suffix="과 관련해서"
                titleLine2="좋은 인사이트를 주는 웹사이트예요"
                websites={MOCK_WEBSITES}
                onAdd={handleAddWebsite}
              />
            </SectionsWrapper>
          </Content>
        )}
      </PageWrapper>

      {/* Modal */}
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>해당 사이트를 내 웹사이트에 등록했어요</ModalTitle>
            <ModalButtons>
              <ModalSecondaryBtn
                type="button"
                onClick={() => setModalOpen(false)}
              >
                계속 탐색하기
              </ModalSecondaryBtn>
              <ModalPrimaryBtn type="button" onClick={handleGoToProfile}>
                내 웹사이트로 가기
              </ModalPrimaryBtn>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.5rem;

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
`;

// --- Banner ---

const Banner = styled.div`
  margin: 0 3rem;
  background: #f7f7f7;
  border-radius: 0;
  padding: 2.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    margin: 0 1.5rem;
    padding: 1.5rem 1rem;
  }
`;

const BannerTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #141618;
  margin: 0;
  text-align: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const BannerLink = styled.button`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 1rem;
  font-weight: 500;
  color: #141618;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover {
    text-decoration: underline;
  }
`;

// --- Category Chips ---

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 0.5rem;
  }
`;

const Chip = styled.button<{ $active: boolean }>`
  padding: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ $active }) => ($active ? "#E1E2E4" : "#E1E2E4")};
  background: #fff;
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? "600" : "500")};
  line-height: 1.2;
  color: ${({ $active }) => ($active ? "#06F" : "#878A93")};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: #06f;
  }
`;

// --- Card Sections ---

const SectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 4rem;
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SectionTitleLine = styled.p`
  font-size: 1.625rem;
  font-weight: 600;
  line-height: 1.4;
  color: #141618;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Highlight = styled.span`
  font-weight: 700;
  color: #06f;
`;

const ArrowGroup = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const ArrowBtn = styled.button<{ $position: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid #eaebec;
  background: #fff;
  cursor: pointer;
  border-radius: ${({ $position }) =>
    $position === "left" ? "0.25rem 0 0 0.25rem" : "0 0.25rem 0.25rem 0"};

  &:hover {
    background: #f7f8fa;
  }
`;

// --- Carousel ---

const CarouselWrapper = styled.div`
  position: relative;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 3rem;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const FadeOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 5.75rem;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
  pointer-events: none;
`;

// --- Card ---

const Card = styled.div`
  flex-shrink: 0;
  width: 20rem;
  height: 14.375rem;
  min-width: 17.5rem;
  padding: 2rem;
  border: 1px solid #eaebec;
  border-radius: 1.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CardFavicon = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.125rem;
  object-fit: contain;
`;

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
`;

const CardTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: #141618;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #141618;
  opacity: 0.6;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 50%;
  background: #171719;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;

  &:hover {
    background: #333;
  }
`;

// --- Modal ---

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2.5rem 2rem 2rem;
  width: 90%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
`;

const ModalTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #141618;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
`;

const ModalSecondaryBtn = styled.button`
  flex: 1;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #e1e2e4;
  background: #fff;
  color: #141618;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f7f8fa;
  }
`;

const ModalPrimaryBtn = styled.button`
  flex: 1;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: none;
  background: #06f;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0056d2;
  }
`;
