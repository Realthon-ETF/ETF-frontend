import React from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { StyledCheckButton } from "../common/CheckButton";
import deleteIcon from "../../assets/images/delete-icon.svg";
import { Helmet } from "react-helmet-async";

interface UploadStepProps {
  name: string;
  selectedFile: File | null;
  isUploading: boolean;
  isAgreed: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: () => void;
  onButtonClick: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onAgreementToggle: () => void;
  onAnalyzeClick: () => void;
}

export function UploadStep({
  name,
  selectedFile,
  isUploading,
  isAgreed,
  fileInputRef,
  onFileChange,
  onFileDelete,
  onButtonClick,
  onDrop,
  onDragOver,
  onAgreementToggle,
  onAnalyzeClick,
}: UploadStepProps) {
  return (
    <>
      <Helmet>
        <title>홈 | 알려주잡</title>
        <meta name="description" content="분석할 이력서를 업로드하세요." />
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
            onDrop={onDrop}
            onDragOver={onDragOver}
            $isUploaded={!!selectedFile}
          >
            {!selectedFile ? (
              <div className="upload-placeholder">
                <ResumeUploadButton onClick={onButtonClick}>
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
                  <DeleteButton onClick={onFileDelete}>
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
              onChange={onFileChange}
            />
          </UploadSection>

          <AgreementContainer>
            <StyledCheckButton
              onClick={onAgreementToggle}
              disabled={isUploading}
              $isAgreed={isAgreed}
              aria-label="개인정보 수집 동의"
            />
            <label onClick={onAgreementToggle}>
              본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교,
              연락처 등의 기본 정보 수집 및 이용에 동의합니다.
            </label>
          </AgreementContainer>

          <ResumeSubmitButton
            onClick={onAnalyzeClick}
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
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
      fill="currentColor"
    />
  </svg>
);

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
