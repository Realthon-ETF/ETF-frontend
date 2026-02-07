import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import del from "../assets/images/delete-icon.svg";
import { Button } from "../components/Button";
import { EditButton } from "../components/EditButton";
import { useAuth } from "../AuthContext";
import { Helmet } from "react-helmet-async";
import api from "../api";

interface ResumeData {
  userId: number;
  summary: string;
}

export default function Result() {
  const { user } = useAuth();
  const name = user?.username ?? "사용자";
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // Retrieve data from navigation state
  const state = location.state as {
    fileName: string;
    resumeData: ResumeData;
  } | null;

  const fileName = state?.fileName ?? "이력서.pdf";
  const resumeData = state?.resumeData ?? { userId: 0, summary: "" };

  const [editableSummary, setEditableSummary] = useState<string>(
    resumeData.summary
  );

  const handleEditToggle = async () => {
    if (isLoading) return;

    if (isEditable) {
      try {
        setIsLoading(true);
        await api.patch("/auth/resume", {
          summary: editableSummary,
        });
        alert("저장되었습니다.");
      } catch (err) {
        console.error("Resume update failed:", err);
        alert("저장에 실패했습니다.");
        return;
      } finally {
        setIsLoading(false);
      }
    }
    setIsEditable((prev) => !prev);
  };

  const handleServiceStart = async () => {
    setIsLoading(true);

    try {
      // Logic for API calls or processing could go here
      // For now, we simulate a small delay or just navigate
      navigate("/confirmed");
    } catch (error) {
      console.error("Navigation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>분석 결과 | 알려주잡</title>
        <meta name="description" content="이력서 분석 결과" />
      </Helmet>
      <Wrapper>
        <ResultContent>
          {/* Top Resume Indicator */}
          <ResumeBadge>
            <div className="text-group">
              <span className="label">등록된 이력서</span>
              <span className="file-name">{fileName}</span>
            </div>
            <button
              type="button"
              aria-label="Delete resume"
              className="delete-btn"
            >
              <img src={del} alt="" />
            </button>
          </ResumeBadge>

          <Article>
            <SectionHeader>
              {/* div에서 <header>로 바뀜 */}
              <div className="header-content">
                <h1>이력서 분석 결과</h1>
                <EditButton
                  isEditable={isEditable}
                  isLoading={isLoading}
                  onClick={handleEditToggle}
                />
              </div>
              <p>
                AI가 이력서 분석을 완료하고 <strong>{name}</strong>님만을 위한
                맞춤 정보를 자동 완성했습니다.
                <br className="desktop-only" />
                실제 커리어 목표와 다르거나 추가하고 싶은 내용이 있다면 수정하신
                후 서비스 시작 버튼을 눌러주세요.
              </p>
            </SectionHeader>

            {isEditable ? (
              <SummaryTextArea
                value={editableSummary}
                onChange={(e) => setEditableSummary(e.target.value)}
                disabled={isLoading}
                placeholder="이력서 요약을 입력해주세요."
                spellCheck={false}
              />
            ) : (
              <SummaryBox>
                <p>{editableSummary || "AI 분석 내용을 로드 중입니다..."}</p>
              </SummaryBox>
            )}
          </Article>
          <ServiceStartBtn onClick={handleServiceStart} disabled={isLoading}>
            서비스 시작하기
          </ServiceStartBtn>
        </ResultContent>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;
  /* Responsive: Add padding for mobile screens */
  padding: 0 1rem 2rem 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem 2.5rem 1rem;
  }
`;

const ResultContent = styled.main`
  width: 100%;
  max-width: 60rem; /* Keeps content readable on large screens */
  display: flex;
  flex-direction: column;
  align-items: center;

  // previous version
  // flex: 1;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: center;
  // width: 100%;
  // min-height: 0;
`;

// 1. Semantic Change: Using a flexible badge instead of a fixed div
const ResumeBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 19.75rem;
  padding: 0.5rem 1.75rem;
  margin-top: 1.5rem;
  // margin: 1.19rem auto 0 auto;

  border-radius: 2.25rem;
  border: 1px solid #aeb0b6;
  background: #fff;

  .text-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .label {
      color: #5a5c63;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .file-name {
      color: #141618;
      font-size: 0.875rem;
      font-weight: 600;
    }
  }

  .delete-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      width: 1.5rem;
      height: 1.5rem;
      // flex-shrink: 0;
    }
  }
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;

  // original code
  // 원래는 tag도 div였음
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  // gap: 1.125rem;
`;

const SectionHeader = styled.header`
  text-align: center;
  margin-top: 3.5rem;

  .header-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  h1 {
    color: #000;
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
  }

  p {
    color: #5c5c5c;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.6;

    strong {
      color: #06f;
      font-weight: 600;
    }
  }

  .desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.75rem;
    }
  }
`;

const SummaryBox = styled.div`
  width: 100%;
  min-height: 20rem;
  padding: 2rem;
  // align-self: stretch; 없어도 되나?
  border-radius: 0.75rem;
  border: 1px solid #eaf2fe;
  background: #f7fbff;

  p {
    color: #000;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.8;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const SummaryTextArea = styled.textarea`
  width: 100%;
  min-height: 20rem;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #eaf2fe;
  background: #fff;
  color: #000;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.8;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2e3847;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const ServiceStartBtn = styled(Button)`
  margin-top: 3rem;

  @media (max-width: 480px) {
    width: 100%;
  }
`;
