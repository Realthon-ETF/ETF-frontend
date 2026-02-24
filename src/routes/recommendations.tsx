import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api";
import type { ProfileResponse } from "../types/auth";
import { ArrowForward } from "../components/recommendations/icons";
import { CardSection } from "../components/recommendations/CardSection";
import { AddWebsiteModal } from "../components/recommendations/AddWebsiteModal";
import type { WebsiteItem } from "../components/recommendations/WebsiteCard";

// --- Types ---

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
              <BannerTitle>원하는 웹사이트를 직접 등록하고 싶다면?</BannerTitle>
              <BannerLink
                onClick={() =>
                  navigate("/profile", { state: { activeTab: "website" } })
                }
              >
                웹사이트 등록 페이지 바로가기
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

      {modalOpen && (
        <AddWebsiteModal
          onClose={() => setModalOpen(false)}
          onGoToProfile={handleGoToProfile}
        />
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

const SectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 4rem;
`;
