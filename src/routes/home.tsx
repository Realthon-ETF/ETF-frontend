// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { Button } from "../components/Button";
// import StyledCheckButton from "../components/check-button";

// export default function Home() {
//   const navigate = useNavigate();
//   const [name, setName] = useState<string>("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const [isAgreed, setIsAgreed] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Uncomment it after API developed
//   // Fetch user data on component mount
//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       if (!token) {
//   //         // If no token, redirect to login
//   //         navigate("/login");
//   //         return;
//   //       }

//   //       const response = await fetch("https://api.etf.r-e.kr/auth/me", {
//   //         method: "GET",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });

//   //       if (!response.ok) {
//   //         // If unauthorized, redirect to login
//   //         if (response.status === 401) {
//   //           localStorage.removeItem("token");
//   //           navigate("/login");
//   //           return;
//   //         }
//   //         throw new Error("사용자 정보를 가져오는데 실패했습니다.");
//   //       }

//   //       const data = await response.json();
//   //       if (data.username) {
//   //         setName(data.username);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching user data:", error);
//   //       // Optionally redirect to login on error
//   //       // navigate("/login");
//   //     }
//   //   };

//   //   fetchUserData();
//   // }, [navigate]);

//   // Handle file selection via button
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (
//       file &&
//       file.type === "application/pdf" &&
//       file.size <= 10 * 1024 * 1024
//     ) {
//       setSelectedFile(file);
//     } else {
//       alert("10MB 이내의 PDF 파일만 업로드할 수 있습니다.");
//     }
//   };

//   // Handle button click to open file dialog
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   // Handle drag-and-drop
//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (
//       file &&
//       file.type === "application/pdf" &&
//       file.size <= 10 * 1024 * 1024
//     ) {
//       setSelectedFile(file);
//       // handle upload logic here
//     } else {
//       alert("10MB 이내의 PDF 파일만 업로드할 수 있습니다.");
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleAgreementClick = () => {
//     setIsAgreed((prev) => !prev);
//   };

//   const handleAnalyzeClick = async () => {
//     if (!isAgreed || !selectedFile || isUploading) {
//       return;
//     }

//     try {
//       setIsUploading(true);
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("로그인이 필요합니다.");
//         navigate("/login");
//         return;
//       }

//       // Create FormData for file upload
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       // Upload PDF file
//       const response = await fetch("https://api.etf.r-e.kr/resume/pdf", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({
//           message: "파일 업로드에 실패했습니다.",
//         }));
//         throw new Error(errorData.message || "파일 업로드에 실패했습니다.");
//       }

//       // Navigate to result page on success
//       navigate("/result");
//     } catch (error) {
//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert("파일 업로드 중 오류가 발생했습니다.");
//       }
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Wrapper>
//       <ResumeUploadLayout>
//         <div className="intro-text">
//           맞춤 정보를 드리기 위해서는
//           <br />
//           {name}님의 정보가 담긴 이력서가 필요해요
//         </div>
//         <div className="limit-text">
//           10MB 이내의 PDF 파일만 업로드할 수 있어요
//         </div>
//         {!selectedFile && (
//           <div
//             className="file-upload-area"
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//           >
//             <ResumeUploadButton onClick={handleButtonClick}>
//               파일 추가 +
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="application/pdf"
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//             </ResumeUploadButton>
//             <span>드래그로 가져올 수 있어요</span>
//           </div>
//         )}
//         {selectedFile && (
//           <div className="file-uploaded-area">
//             <div className="file-header-area">
//               <span>용량</span>
//               <div className="file-info-group">
//                 <span>파일명</span>
//                 <span>업로드</span>
//               </div>
//             </div>
//             <div className="file-metadata-area">
//               <span>
//                 {selectedFile.name.length > 50
//                   ? selectedFile.name.slice(0, 49) + "..."
//                   : selectedFile.name}
//               </span>
//               <div className="file-info-group">
//                 <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
//                 <span> 완료</span>
//               </div>
//             </div>
//           </div>
//         )}
//         <AgreementContainer>
//           <StyledCheckButton
//             onClick={handleAgreementClick}
//             disabled={isUploading}
//             $isAgreed={isAgreed}
//           />
//           <span>
//             본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교, 연락처
//             등의 기본 정보 수집 및 이용에 동의합니다.
//           </span>
//         </AgreementContainer>
//         <ResumeSubmitButton
//           onClick={handleAnalyzeClick}
//           $active={isAgreed && !!selectedFile && !isUploading}
//         >
//           {isUploading ? "업로드 중..." : "AI 분석 받기"}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             viewBox="0 0 16 16"
//             fill="none"
//           >
//             <path
//               d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
//               fill="#EAEBEC"
//             />
//           </svg>
//         </ResumeSubmitButton>
//         {/* <AnalyzeButton
//             disabled={!isAgreed || !selectedFile || isUploading}
//           >
//           </AnalyzeButton> */}
//       </ResumeUploadLayout>
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   width: 100%;
//   min-height: calc(100vh - 4rem);
//   background: #f7f8fa;
//   display: flex;
//   flex-direction: column;
//   // align-items: center;
// `;

// const ResumeUploadLayout = styled.main`

//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   width: 100%;
//   min-height: 0;

//   .intro-text {
//     color: #141618;
//     text-align: center;
//     font-size: 2.375rem;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 150%;
//     margin-top: 7.0625rem;
//   }

//   .limit-text {
//     color: #141618;
//     text-align: center;
//     font-size: 1.5rem;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 130%;
//     opacity: 0.6;
//     margin-top: 1.6875rem;
//     margin-bottom: 2.1875rem;
//   }

//   .file-upload-area {
//     display: flex; //
//     flex-direction: column; //
//     width: 56.6875rem; // moved to <main> tag
//     padding: 1.3125rem 0 1.0625rem 0;
//     justify-content: center; //
//     align-items: center; //
//     border-radius: 0.75rem; //
//     border: 2px dashed #4f95ff; //
//     background: #fff; //
//     gap: 0.375rem;
//     margin-bottom: 8.0625rem; //

//     span {
//       color: #141618;
//       text-align: center;
//       font-size: 0.75rem;
//       font-style: normal;
//       font-weight: 500;
//       line-height: 130%;
//       opacity: 0.6;
//     }
//   }

//   .file-uploaded-area {
//     display: flex;
//     flex-direction: column;
//     width: 56.6875rem;
//     justify-content: flex-start;
//     align-items: stretch;

//     // justify-content: center;
//     // align-items: center;
//     border-radius: 0.75rem;
//     border: 2px solid #4f95ff;
//     background: #fff;
//     margin-bottom: 8.0625rem;

//     // width: 49.72%;
//     // height: 8rem; /* Adjust as needed to match Figma */
//     overflow: hidden;
//     // padding: 0;

//     .file-metadata-area,
//     .file-header-area {
//       display: flex;
//       width: 100%;
//       height: 50%;
//       padding: 0.75rem 2.875rem;
//       justify-content: space-between;
//       align-items: center;

//       span {
//         color: #141618;
//         font-size: 1rem;
//         font-style: normal;
//         font-weight: 500;
//         line-height: 150%;
//       }
//     }

//     .file-header-area {
//       background-color: #c9defe;
//     }
//     .file-metadata-area {
//       background-color: #fff;
//     }

//     .file-info-group {
//       display: flex;
//       gap: 5rem;
//       align-items: center;
//     }
//   }
// `;

// const AgreementContainer = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.375rem;
//   margin-bottom: 1.75rem;

//   span {
//     color: #000;
//     text-align: center;
//     font-size: 0.875rem;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 130%;
//   }
// `;

// const ResumeUploadButton = styled(Button)`
//   display: flex;
//   padding: 0.625rem 0.75rem; //
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 0.625rem;
//   background: #06f; //
//   border-radius: 0.25rem; //
//   color: #fff; //
//   font-size: 1rem;
//   font-style: normal;
//   font-weight: 600; //
//   line-height: 150%;
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const ResumeSubmitButton = styled(Button)<{ $active: boolean }>`
//   display: inline-flex;
//   padding: 0.625rem 1.25rem;
//   align-items: center;
//   gap: 0.625rem;
//   border-radius: 0.5rem;
//   background-color: ${({ $active }) => ($active ? "#06F" : "#c2c5c8")};
//   cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
//   transition: background-color 0.2s;
//   color: #eaebec;
//   text-align: center;
//   font-size: 1.25rem;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 150%;

//   &:hover:not(:disabled) {
//     background-color: ${({ $active }) => ($active ? "#0052cc" : "#c2c5c8")};
//   }

//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.6;
//   }
// `;

// after refactoring
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import StyledCheckButton from "../components/check-button";

export default function Home() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock user name (In real app, this might come from Context or Props)
  const name = "사용자";

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
      const token = localStorage.getItem("token");

      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("https://api.etf.r-e.kr/resume/pdf", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "파일 업로드에 실패했습니다.");
      }

      navigate("/result");
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <PageWrapper>
      <ContentContainer>
        {/* Semantic: h1 for main page title */}
        <h1 className="intro-text">
          맞춤 정보를 드리기 위해서는
          <br />
          {name}님의 정보가 담긴 이력서가 필요해요
        </h1>

        <p className="limit-text">10MB 이내의 PDF 파일만 업로드할 수 있어요</p>

        {/* Semantic: Use section for the upload area */}
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
              <span className="drag-guide">드래그로 가져올 수 있어요</span>
            </div>
          ) : (
            <div className="file-info-card">
              <div className="card-header">
                <span className="label">파일명</span>
                <span className="label">용량</span>
                <span className="label status">상태</span>
              </div>
              <div className="card-body">
                <span className="value filename" title={selectedFile.name}>
                  {selectedFile.name}
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
            본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교, 연락처
            등의 기본 정보 수집 및 이용에 동의합니다.
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
      </ContentContainer>
    </PageWrapper>
  );
}

// Icon Component separated for cleanliness
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
      fill="currentColor" // Uses parent color
    />
  </svg>
);

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;

  /* Responsive: Add padding for mobile screens */
  padding: 0 1rem;
`;

const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 56.6875rem; /* ~900px, replaces fixed width */
  padding-top: 7rem;
  padding-bottom: 4rem;

  /* Responsive Typography using simple media queries or clamp */
  .intro-text {
    color: #141618;
    text-align: center;
    font-size: clamp(1.5rem, 4vw, 2.375rem); /* Responsive font size */
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

  /* Conditional styling based on state */
  border: 2px ${({ $isUploaded }) => ($isUploaded ? "solid" : "dashed")} #4f95ff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* Responsive Height: Use padding instead of fixed height for safety,
     but ensure minimum touch area */
  min-height: 10rem;
  padding: ${({ $isUploaded }) => ($isUploaded ? "0" : "1.5rem")};

  /* 1. Empty State Styles */
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

  /* 2. Uploaded State Styles */
  .file-info-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Grid layout for the file info to ensure alignment */
  .card-header,
  .card-body {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr; /* Name takes more space */
    padding: 0.75rem 1rem;
    align-items: center;
    gap: 1rem;
    flex: 1;

    @media (max-width: 425px) {
      grid-template-columns: 1fr; /* Stack on mobile */
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

    /* Hide headers on mobile if stacked */
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

const AgreementContainer = styled.div`
  display: flex;
  align-items: flex-start; /* Aligns checkbox with top of text */
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
  background: #06f;
  color: #fff;
  padding: 0.625rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0056d6;
  }
`;

const ResumeSubmitButton = styled(Button)<{ $active: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;

  font-size: 1.25rem;
  font-weight: 600;

  /* Theme-aware colors */
  background-color: ${({ $active }) => ($active ? "#06F" : "#c2c5c8")};
  color: #eaebec;
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};

  transition: all 0.2s ease-in-out;

  svg {
    transition: transform 0.2s;
  }

  &:hover {
    /* Only lift if active */
    transform: ${({ $active }) => ($active ? "translateY(-2px)" : "none")};
    svg {
      transform: ${({ $active }) => ($active ? "translateX(2px)" : "none")};
    }
  }
`;
