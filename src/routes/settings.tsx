import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import UploadFlow from "./upload";
import Recommendations from "./recommendations";

type Tab = "upload" | "recommendations";

export default function Settings() {
  const { hasResume } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>(
    hasResume ? "recommendations" : "upload",
  );

  return (
    <PageWrapper>
      <TabBarWrapper>
        <TabBar>
          <TabButton
            $active={activeTab === "upload"}
            onClick={() => setActiveTab("upload")}
          >
            이력서 업로드
          </TabButton>
          <TabButton
            $active={activeTab === "recommendations"}
            onClick={() => setActiveTab("recommendations")}
          >
            추천 설정
          </TabButton>
        </TabBar>
      </TabBarWrapper>

      {activeTab === "upload" ? <UploadFlow /> : <Recommendations />}
    </PageWrapper>
  );
}

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

const TabButton = styled.button<{ $active: boolean }>`
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
