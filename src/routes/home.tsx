import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e5e8eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  box-sizing: border-box;
`;

const LeftHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1d9bf0;
  letter-spacing: -0.5px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: #222;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: #1d9bf0;
  }
`;

const ProfileTitle = styled.div`
  color: #222;
  font-size: 1.125rem;
  font-weight: 600;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 0;
`;

const ResumeWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AnnouncmentBox = styled.div`
  color: #141618;
  text-align: center;
  font-size: 2.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 3.5625rem */
  margin-top: 7.06rem;
`;

const Restriction = styled.div`
  color: #141618;
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  margin-top: 1.69rem;
  opacity: 0.6;
`;

const FileUploadBox = styled.div`
  display: flex;
  width: 49.72%;
  padding: 1.3125rem 0 1.0625rem 0;
  justify-content: center;
  align-items: center;
  margin-top: 2.19rem;
  border-radius: 0.75rem;
  border: 2px dashed #4f95ff;
  background: #fff;
`;

const FileUploaderContainer = styled.div`
  display: flex;
  width: 11.125rem;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
`;

const FileUploadButton = styled.button`
  display: flex;
  padding: 0.625rem 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: #06f;
  // border-color: #06f;
  border: none;
`;

const FileUploadText = styled.h4`
  color: #fff;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const FileUploadedBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 49.72%;
  height: 8rem; /* Adjust as needed to match Figma */
  justify-content: flex-start;
  align-items: stretch;
  margin-top: 2.19rem;
  border-radius: 0.75rem;
  border: 2px solid #4f95ff;
  background: #fff;
  overflow: hidden;
  padding: 0;
`;

const FileMetadata = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding: 0.75rem 2.875rem;
  justify-content: space-between;
  align-items: center;
  background-color: #c9defe;
`;

const FileMetadataText = styled.h4`
  color: #141618;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  // white-space: nowrap; // Prevents line breaks
  // overflow: hidden; // Hides overflow
  // text-overflow: ellipsis;
`;

// Add this for the lower half if you want to display file info or actions
const FileUploadedBottom = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding: 0.75rem 2.875rem;
  align-items: center;
  background: #fff;
  justify-content: space-between;
  align-items: center;
`;

// const FileUploadedBox = styled.div`
//   display: flex;

//   width: 49.72%;
//   padding: 1.3125rem 0 1.0625rem 0;
//   justify-content: center;
//   align-items: center;
//   margin-top: 2.19rem;
//   border-radius: 0.75rem;
//   border: 2px solid #4f95ff;
//   background: #fff;
// `;

// const FileMetadata = styled.div`
//   display: flex;
//   width: 56.6875rem;
//   height: 50%;
//   padding: 0.75rem 2.875rem;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #c9defe;
// `;

const FileSizeAndUploaded = styled.div`
  display: flex;
  // width: 9.4375rem;
  align-items: center;
  gap: 5rem;
  flex-shrink: 0;
`;

const DragNotification = styled.h6`
  color: #141618;
  text-align: center;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  opacity: 0.6;
`;

const AgreementBox = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.375rem;
  margin-top: 8.06rem;
`;

const CheckButton = styled.button<{ active: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background-color: ${({ active }) => (active ? "#06F" : "#c2c5c8")};
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
`;

const AnalyzeButton = styled.button<{ active: boolean }>`
  display: inline-flex;
  padding: 0.625rem 1.25rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border-width: 0;
  background-color: ${({ active }) => (active ? "#06F" : "#c2c5c8")};
  margin-top: 1.38rem;
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ active }) => (active ? "#0052cc" : "#c2c5c8")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const AnalyzeText = styled.h3`
  color: #eaebec;
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // If no token, redirect to login
          navigate("/login");
          return;
        }

        const response = await fetch("https://api.etf.r-e.kr/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // If unauthorized, redirect to login
          if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error("사용자 정보를 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        if (data.username) {
          setName(data.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally redirect to login on error
        // navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle file selection via button
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 10 * 1024 * 1024
    ) {
      setSelectedFile(file);
      // handle upload logic here
    } else {
      alert("PDF 파일만 10MB 이내로 업로드할 수 있습니다.");
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
      alert("PDF 파일만 10MB 이내로 업로드할 수 있습니다.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const [isAgreed, setIsAgreed] = useState(false);

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
      <Header>
        <LeftHeaderWrapper>
          <Logo>로고</Logo>
          <Nav>
            <NavItem>정보설정</NavItem>
            <NavItem>수집함</NavItem>
          </Nav>
        </LeftHeaderWrapper>
        <ProfileTitle>내 프로필</ProfileTitle>
      </Header>
      <Main>
        <ResumeWrapper>
          <AnnouncmentBox>
            맞춤 정보를 드리기 위해서는
            <br />
            {name}님의 정보가 담긴 이력서가 필요해요
          </AnnouncmentBox>
          <Restriction>PDF, 10MB 이내만 업로드할 수 있어요</Restriction>

          {!selectedFile && (
            <FileUploadBox onDrop={handleDrop} onDragOver={handleDragOver}>
              <FileUploaderContainer>
                <FileUploadButton onClick={handleButtonClick}>
                  <FileUploadText>파일 추가 +</FileUploadText>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </FileUploadButton>
                <DragNotification>드래그로 가져올 수 있어요</DragNotification>
              </FileUploaderContainer>
            </FileUploadBox>
          )}

          {/* Show FileUploadedBox only when a file is uploaded */}
          {selectedFile && (
            <FileUploadedBox>
              <FileMetadata>
                <div>
                  <FileMetadataText>파일명</FileMetadataText>
                </div>
                <FileSizeAndUploaded>
                  <FileMetadataText>용량</FileMetadataText>
                  <FileMetadataText>업로드</FileMetadataText>
                </FileSizeAndUploaded>
              </FileMetadata>
              <FileUploadedBottom>
                <div>
                  <FileMetadataText>
                    {selectedFile.name.length > 20
                      ? selectedFile.name.slice(0, 17) + "..."
                      : selectedFile.name}
                  </FileMetadataText>
                </div>
                <FileSizeAndUploaded>
                  {/* <FileMetadataText>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</FileMetadataText>
                  <FileMetadataText>
                    완료
                  </FileMetadataText> */}
                  <FileMetadataText>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </FileMetadataText>
                  <FileMetadataText>완료</FileMetadataText>
                </FileSizeAndUploaded>
              </FileUploadedBottom>
            </FileUploadedBox>
          )}
          <AgreementBox>
            <CheckButton active={isAgreed} onClick={handleAgreementClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.978 0.863948C11.0936 0.979522 11.0936 1.1669 10.978 1.28248L3.84718 8.41332C3.73161 8.52889 3.54423 8.52889 3.42865 8.41332L0.0866802 5.07135C-0.0288934 4.95577 -0.0288934 4.76839 0.0866802 4.65282L0.863948 3.87555C0.979521 3.75998 1.1669 3.75998 1.28248 3.87555L3.63792 6.23099L9.78223 0.0866802C9.8978 -0.0288934 10.0852 -0.0288934 10.2008 0.0866802L10.978 0.863948Z"
                  fill="white"
                />
              </svg>
            </CheckButton>
            <h5>
              이력서 내용을 AI 분석용 데이터로 활용하고, 분석 결과 기반 맞춤
              정보를 받는 데 동의합니다.
            </h5>
          </AgreementBox>
          <AnalyzeButton
            active={isAgreed && !!selectedFile && !isUploading}
            onClick={handleAnalyzeClick}
            disabled={!isAgreed || !selectedFile || isUploading}
          >
            <AnalyzeText>
              {isUploading ? "업로드 중..." : "AI 분석 받기"}
            </AnalyzeText>
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
          </AnalyzeButton>
        </ResumeWrapper>
      </Main>
    </Wrapper>
  );
}
