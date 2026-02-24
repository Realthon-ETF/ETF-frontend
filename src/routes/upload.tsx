import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import { StyledCheckButton } from "../components/CheckButton";
import { EditButton } from "../components/EditButton";
import deleteIcon from "../assets/images/delete-icon.svg";
import logo from "../assets/images/logo.svg";
import checked from "../assets/images/check-mark.svg";
import { useAuth } from "../AuthContext";
import api from "../api";
import { Helmet } from "react-helmet-async";

type Step = "upload" | "result" | "confirmed";

export default function UploadFlow() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const name = user?.username ?? "사용자";

  // Step management
  const [currentStep, setCurrentStep] = useState<Step>("upload");

  // Upload step state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Result step state
  const [fileName, setFileName] = useState<string>("");
  const [editableSummary, setEditableSummary] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Upload step handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | undefined) => {
    if (!file) return;
    if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file);
    } else {
      alert("10MB 이내의 PDF 파일만 업로드할 수 있습니다.");
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    validateAndSetFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAnalyzeClick = async () => {
    if (!isAgreed || !selectedFile || isUploading) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await api.post("/resumes/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update state and move to result step
      setFileName(selectedFile.name);
      setEditableSummary(response.data.summary);
      setCurrentStep("result");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "오류가 발생했습니다.";
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  // Result step handlers
  const handleEditToggle = () => {
    if (isLoading) return;
    // Just toggle edit mode without API call
    setIsEditable((prev) => !prev);
  };

  const handleServiceStart = async () => {
    setIsLoading(true);
    try {
      // Send PATCH request to save the edited summary
      await api.patch("/auth/resume", {
        summary: editableSummary,
      });

      // Move to confirmed step
      setCurrentStep("confirmed");
    } catch (error: any) {
      console.error("Resume update failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "저장에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Confirmed step handlers
  const handleSettingsClick = () => {
    navigate("/profile");
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case "upload":
        return (
          <>
            <Helmet>
              <title>홈 | 알려주잡</title>
              <meta
                name="description"
                content="분석할 이력서를 업로드하세요."
              />
            </Helmet>
            <UploadPageWrapper>
              <UploadContentContainer>
                <h1 className="intro-text">
                  맞춤 정보를 드리기 위해서는
                  <br />
                  {name}님의 정보가 담긴 이력서가 필요해요
                </h1>

                <p className="limit-text">
                  10MB 이내의 PDF 파일만 업로드할 수 있어요
                </p>

                <UploadSection
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  $isUploaded={!!selectedFile}
                >
                  {!selectedFile ? (
                    <div className="upload-placeholder">
                      <ResumeUploadButton onClick={handleButtonClick}>
                        파일 추가 +
                      </ResumeUploadButton>
                      <span className="drag-guide">
                        드래그로 가져올 수 있어요
                      </span>
                    </div>
                  ) : (
                    <div className="file-info-card">
                      <div className="card-header">
                        <span></span>
                        <span className="label">파일명</span>
                        <span className="label">용량</span>
                        <span className="label status">상태</span>
                      </div>
                      <div className="card-body">
                        <DeleteButton onClick={handleFileDelete}>
                          <img src={deleteIcon} alt="delete" />
                        </DeleteButton>
                        <span
                          className="value filename"
                          title={selectedFile.name}
                        >
                          {selectedFile.name}{" "}
                        </span>
                        <span className="value size">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <span className="value status-text">완료</span>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </UploadSection>

                <AgreementContainer>
                  <StyledCheckButton
                    onClick={() => setIsAgreed(!isAgreed)}
                    disabled={isUploading}
                    $isAgreed={isAgreed}
                    aria-label="개인정보 수집 동의"
                  />
                  <label onClick={() => setIsAgreed(!isAgreed)}>
                    본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교,
                    연락처 등의 기본 정보 수집 및 이용에 동의합니다.
                  </label>
                </AgreementContainer>

                <ResumeSubmitButton
                  onClick={handleAnalyzeClick}
                  disabled={!isAgreed || !selectedFile || isUploading}
                  $active={isAgreed && !!selectedFile && !isUploading}
                >
                  {isUploading ? "업로드 중..." : "AI 분석 받기"}
                  <ArrowIcon />
                </ResumeSubmitButton>
              </UploadContentContainer>
            </UploadPageWrapper>
          </>
        );

      case "result":
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
                        onClick={handleEditToggle}
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
                      onChange={(e) => setEditableSummary(e.target.value)}
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
                  onClick={handleServiceStart}
                  disabled={isLoading}
                >
                  서비스 시작하기
                </ServiceStartBtn>
              </ResultContent>
            </ResultWrapper>
          </>
        );

      case "confirmed":
        return (
          <>
            <Helmet>
              <title>서비스 신청 완료 | 알려주잡</title>
              <meta
                name="description"
                content="이력서 분석 및 서비스 신청이 완료되었습니다."
              />
            </Helmet>
            <ConfirmedPageWrapper>
              <ConfirmedContentContainer>
                <AlarmSection aria-label="Example Notification Preview">
                  <img src={logo} alt="Service Logo" className="logo" />

                  <div className="message-box">
                    <span className="sender-name">알려주잡</span>

                    <div className="message-bubble">
                      <header className="bubble-header">알림톡 도착</header>
                      <div className="bubble-body">
                        <p>
                          이디안님 안녕하세요!
                          <br />
                          오늘 AI가 선별한 새로운 게시글 3건이 도착했습니다.
                        </p>
                        <ul>
                          <li>1. 학과: 한국대학 교내 기업 인재 특강 일정</li>
                          <li>2. 관심 회사: 데이터 분석 인턴 모집</li>
                          <li>3. 취업 포털: 실무 SQL 집중 1일 워크숍</li>
                        </ul>
                        <p>지금 바로 확인하고 지원/신청하세요!</p>
                      </div>
                    </div>
                  </div>
                </AlarmSection>

                <StatusSection>
                  <div className="status-header">
                    <h1>서비스 신청 완료</h1>
                    <img src={checked} alt="Success Checkmark" />
                  </div>
                  <p className="status-description">
                    18시에 알림톡을 통해 필요 정보를 확인할 수 있어요
                  </p>
                </StatusSection>

                <ActionButton onClick={handleSettingsClick}>
                  설정 확인하기
                </ActionButton>
              </ConfirmedContentContainer>
            </ConfirmedPageWrapper>
          </>
        );

      default:
        return null;
    }
  };

  return <>{renderStepContent()}</>;
}

// Arrow Icon Component
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
      fill="currentColor"
    />
  </svg>
);

// ========== UPLOAD STEP STYLES ==========
const UploadPageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
`;

const UploadContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 56.6875rem;
  padding-top: 7rem;
  padding-bottom: 4rem;

  .intro-text {
    color: #141618;
    text-align: center;
    font-size: clamp(1.5rem, 4vw, 2.375rem);
    font-weight: 600;
    line-height: 150%;
    margin-bottom: 1.5rem;
  }

  .limit-text {
    color: #141618;
    text-align: center;
    font-size: clamp(1rem, 3vw, 1.5rem);
    font-weight: 500;
    opacity: 0.6;
    margin-bottom: 2.2rem;
  }
`;

const UploadSection = styled.section<{ $isUploaded: boolean }>`
  width: 100%;
  background: #fff;
  border-radius: 0.75rem;
  margin-bottom: 5rem;
  border: 2px ${({ $isUploaded }) => ($isUploaded ? "solid" : "dashed")} #4f95ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 10rem;
  padding: ${({ $isUploaded }) => ($isUploaded ? "0" : "1.5rem")};

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .drag-guide {
      font-size: 0.875rem;
      opacity: 0.6;
      margin-top: 0.5rem;
    }
  }

  .file-info-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .card-header,
  .card-body {
    display: grid;
    grid-template-columns: 24px 4fr 1fr 1fr;
    padding: 0.75rem 1rem;
    align-items: center;
    gap: 1rem;
    flex: 1;

    @media (max-width: 425px) {
      grid-template-columns: 1fr;
      gap: 0.5rem;
      text-align: center;
    }
  }

  .card-header {
    background-color: #c9defe;

    .label {
      font-weight: 600;
      font-size: 1rem;
    }

    @media (max-width: 425px) {
      display: none;
    }
  }

  .card-body {
    background-color: #fff;

    .value {
      font-size: 1rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const AgreementContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 2rem;
  max-width: 100%;

  label {
    color: #000;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 140%;
    cursor: pointer;
    text-align: left;
  }
`;

const ResumeUploadButton = styled(Button)`
  border-radius: 0.25rem;
`;

const ResumeSubmitButton = styled(Button)<{ $active: boolean }>`
  gap: 0.625rem;
  padding: 0.8rem 2rem;
  background-color: ${({ $active }) => ($active ? "#06F" : "#c2c5c8")};

  svg {
    transition: transform 0.2s;
  }

  &:hover {
    background-color: ${({ $active }) => ($active ? "#0056d2" : "#c2c5c8")};
    transform: ${({ $active }) => ($active ? "translateY(-2px)" : "none")};

    svg {
      transform: ${({ $active }) => ($active ? "translateX(2px)" : "none")};
    }
  }
`;

// ========== RESULT STEP STYLES ==========
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

// ========== CONFIRMED STEP STYLES ==========
const ConfirmedPageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #f7f8fa;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  padding-bottom: 2rem;
`;

const ConfirmedContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const AlarmSection = styled.figure`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
  max-width: 28rem;
  padding: 1.875rem;
  margin: 0;
  margin-top: 4rem;
  border-radius: 1.5rem;
  background: #eaf2fe;

  @media (max-width: 480px) {
    margin-top: 2rem;
    padding: 1.25rem;
  }

  .logo {
    width: 2.2rem;
    height: 2.2rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    background-color: #fff;
  }

  .message-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .sender-name {
    color: #000;
    font-size: 0.8125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .message-bubble {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .bubble-header {
    background: #fde500;
    color: #000;
    padding: 0.625rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .bubble-body {
    background: #fff;
    color: #000;
    padding: 0.75rem;
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.5;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    word-break: keep-all;

    ul {
      list-style: none;
      padding: 0;
      margin: 0.5rem 0;
    }
  }
`;

const StatusSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
  gap: 0.5rem;
  width: 100%;

  .status-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    h1 {
      margin: 0;
      color: #000;
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.5;

      @media (max-width: 480px) {
        font-size: 1.75rem;
      }
    }

    img {
      width: 2.25rem;
      height: 2.25rem;
    }
  }

  .status-description {
    margin: 0;
    color: #5c5c5c;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.5;
    word-break: keep-all;

    @media (max-width: 480px) {
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
`;

const ActionButton = styled(Button)`
  margin-top: 2rem;

  @media (max-width: 480px) {
    width: 100%;
    margin-top: 3rem;
  }
`;
