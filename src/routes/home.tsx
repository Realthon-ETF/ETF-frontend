import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import StyledCheckButton from "../components/check-button";

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Uncomment it after API developed
  // Fetch user data on component mount
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         // If no token, redirect to login
  //         navigate("/login");
  //         return;
  //       }

  //       const response = await fetch("https://api.etf.r-e.kr/auth/me", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         // If unauthorized, redirect to login
  //         if (response.status === 401) {
  //           localStorage.removeItem("token");
  //           navigate("/login");
  //           return;
  //         }
  //         throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  //       }

  //       const data = await response.json();
  //       if (data.username) {
  //         setName(data.username);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       // Optionally redirect to login on error
  //       // navigate("/login");
  //     }
  //   };

  //   fetchUserData();
  // }, [navigate]);

  // Handle file selection via button
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 10 * 1024 * 1024
    ) {
      setSelectedFile(file);
    } else {
      alert("10MB 이내의 PDF 파일만 업로드할 수 있습니다.");
    }
  };

  // Handle button click to open file dialog
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle drag-and-drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 10 * 1024 * 1024
    ) {
      setSelectedFile(file);
      // handle upload logic here
    } else {
      alert("10MB 이내의 PDF 파일만 업로드할 수 있습니다.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAgreementClick = () => {
    setIsAgreed((prev) => !prev);
  };

  const handleAnalyzeClick = async () => {
    if (!isAgreed || !selectedFile || isUploading) {
      return;
    }

    try {
      setIsUploading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Upload PDF file
      const response = await fetch("https://api.etf.r-e.kr/resume/pdf", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "파일 업로드에 실패했습니다.",
        }));
        throw new Error(errorData.message || "파일 업로드에 실패했습니다.");
      }

      // Navigate to result page on success
      navigate("/result");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("파일 업로드 중 오류가 발생했습니다.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Wrapper>
      <ResumeUploadLayout>
        <div className="intro-text">
          맞춤 정보를 드리기 위해서는
          <br />
          {name}님의 정보가 담긴 이력서가 필요해요
        </div>
        <div className="limit-text">
          10MB 이내의 PDF 파일만 업로드할 수 있어요
        </div>
        {!selectedFile && (
          <div
            className="file-upload-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <ResumeUploadButton onClick={handleButtonClick}>
              파일 추가 +
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </ResumeUploadButton>
            <span>드래그로 가져올 수 있어요</span>
          </div>
        )}
        {selectedFile && (
          <div className="file-uploaded-area">
            <div className="file-header-area">
              <span>용량</span>
              <div className="file-info-group">
                <span>파일명</span>
                <span>업로드</span>
              </div>
            </div>
            <div className="file-metadata-area">
              <span>
                {selectedFile.name.length > 50
                  ? selectedFile.name.slice(0, 49) + "..."
                  : selectedFile.name}
              </span>
              <div className="file-info-group">
                <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                <span> 완료</span>
              </div>
            </div>
          </div>
        )}
        <AgreementContainer>
          <StyledCheckButton
            onClick={handleAgreementClick}
            disabled={isUploading}
            $isAgreed={isAgreed}
          />
          <span>
            본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교, 연락처
            등의 기본 정보 수집 및 이용에 동의합니다.
          </span>
        </AgreementContainer>
        <ResumeSubmitButton
          onClick={handleAnalyzeClick}
          $active={isAgreed && !!selectedFile && !isUploading}
        >
          {isUploading ? "업로드 중..." : "AI 분석 받기"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
              fill="#EAEBEC"
            />
          </svg>
        </ResumeSubmitButton>
        {/* <AnalyzeButton            
            disabled={!isAgreed || !selectedFile || isUploading}
          >
          </AnalyzeButton> */}
      </ResumeUploadLayout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  // height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
  // align-items: center;
  min-height: calc(100vh - 4rem);
`;

const ResumeUploadLayout = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 0;

  .intro-text {
    color: #141618;
    text-align: center;
    font-size: 2.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-top: 7.0625rem;
  }

  .limit-text {
    color: #141618;
    text-align: center;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    opacity: 0.6;
    margin-top: 1.6875rem;
    margin-bottom: 2.1875rem;
  }

  .file-upload-area {
    // width: 49.72%;
    display: flex;
    flex-direction: column;
    width: 56.6875rem;
    padding: 1.3125rem 0 1.0625rem 0;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    border: 2px dashed #4f95ff;
    background: #fff;
    gap: 0.375rem;
    margin-bottom: 8.0625rem;

    span {
      color: #141618;
      text-align: center;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: 130%;
      opacity: 0.6;
    }
  }

  .file-uploaded-area {
    display: flex;
    flex-direction: column;
    width: 56.6875rem;
    justify-content: flex-start;
    align-items: stretch;

    // justify-content: center;
    // align-items: center;
    border-radius: 0.75rem;
    border: 2px solid #4f95ff;
    background: #fff;
    margin-bottom: 8.0625rem;

    // width: 49.72%;
    // height: 8rem; /* Adjust as needed to match Figma */
    overflow: hidden;
    // padding: 0;

    .file-metadata-area,
    .file-header-area {
      display: flex;
      width: 100%;
      height: 50%;
      padding: 0.75rem 2.875rem;
      justify-content: space-between;
      align-items: center;

      span {
        color: #141618;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
      }
    }

    .file-header-area {
      background-color: #c9defe;
    }
    .file-metadata-area {
      background-color: #fff;
    }

    .file-info-group {
      display: flex;
      gap: 5rem;
      align-items: center;
    }
  }
`;

const AgreementContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 1.75rem;

  span {
    color: #000;
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
  }
`;

const ResumeUploadButton = styled(Button)`
  display: flex;
  padding: 0.625rem 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  background: #06f;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  &:hover {
    cursor: pointer;
  }
`;

const ResumeSubmitButton = styled(Button)<{ $active: boolean }>`
  display: inline-flex;
  padding: 0.625rem 1.25rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  background-color: ${({ $active }) => ($active ? "#06F" : "#c2c5c8")};
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
  transition: background-color 0.2s;
  color: #eaebec;
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

//   &:hover:not(:disabled) {
//     background-color: ${({ active }) => (active ? "#0052cc" : "#c2c5c8")};
//   }

//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.6;
//   }
// `;
