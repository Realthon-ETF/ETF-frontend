import styled from "styled-components";
import { Button } from "../common/Button";
import { EditButton } from "../common/EditButton";
import deleteIcon from "../../assets/images/delete-icon.svg";
import { Helmet } from "react-helmet-async";

interface ResultStepProps {
  name: string;
  fileName: string;
  editableSummary: string;
  isEditable: boolean;
  isLoading: boolean;
  onEditToggle: () => void;
  onSummaryChange: (value: string) => void;
  onServiceStart: () => void;
}

export function ResultStep({
  name,
  fileName,
  editableSummary,
  isEditable,
  isLoading,
  onEditToggle,
  onSummaryChange,
  onServiceStart,
}: ResultStepProps) {
  return (
    <>
      <Helmet>
        <title>분석 결과 | 알려주잡</title>
        <meta name="description" content="이력서 분석 결과" />
      </Helmet>
      <ResultWrapper>
        <ResultContent>
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
              <img src={deleteIcon} alt="" />
            </button>
          </ResumeBadge>

          <Article>
            <SectionHeader>
              <div className="header-content">
                <h1>이력서 분석 결과</h1>
                <EditButton
                  isEditable={isEditable}
                  isLoading={isLoading}
                  onClick={onEditToggle}
                />
              </div>
              <p>
                AI가 이력서 분석을 완료하고 <strong>{name}</strong>님만을
                위한 맞춤 정보를 자동 완성했습니다.
                <br className="desktop-only" />
                실제 커리어 목표와 다르거나 추가하고 싶은 내용이 있다면
                수정하신 후 서비스 시작 버튼을 눌러주세요.
              </p>
            </SectionHeader>

            {isEditable ? (
              <SummaryTextArea
                value={editableSummary}
                onChange={(e) => onSummaryChange(e.target.value)}
                disabled={isLoading}
                placeholder="이력서 요약을 입력해주세요."
                spellCheck={false}
              />
            ) : (
              <SummaryBox>
                <p>
                  {editableSummary || "AI 분석 내용을 로드 중입니다..."}
                </p>
              </SummaryBox>
            )}
          </Article>
          <ServiceStartBtn
            onClick={onServiceStart}
            disabled={isLoading}
          >
            서비스 시작하기
          </ServiceStartBtn>
        </ResultContent>
      </ResultWrapper>
    </>
  );
}

const ResultWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 0 1rem 2rem 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem 2.5rem 1rem;
  }
`;

const ResultContent = styled.main`
  width: 100%;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResumeBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 19.75rem;
  padding: 0.5rem 1.75rem;
  margin-top: 1.5rem;
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
    }
  }
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
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
