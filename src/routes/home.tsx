// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { Button } from "../components/Button";
// import StyledCheckButton from "../components/check-button";
// import deleteIcon from "../assets/delete-icon.svg";
// import { useAuth } from "../AuthContext";
// import api from "../api";

// export default function Home() {
//   const navigate = useNavigate();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const [isAgreed, setIsAgreed] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   // user name을 local state로 관리하지 않고 AuthContext를 통해 globally 관리
//   const { user } = useAuth();

//   // Mock user name (In real app, this might come from Context or Props)
//   const name = user?.username ?? "사용자";

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     validateAndSetFile(file);
//   };

//   const validateAndSetFile = (file: File | undefined) => {
//     if (!file) return;
//     if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
//       setSelectedFile(file);
//     } else {
//       alert("10MB 이내의 PDF 파일만 업로드할 수 있습니다.");
//     }
//   };

//   const handleFileDelete = () => {
//     setSelectedFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     validateAndSetFile(file);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleAnalyzeClick = async () => {
//     if (!isAgreed || !selectedFile || isUploading) return;

//     try {
//       setIsUploading(true);
//       // const token = localStorage.getItem("token");

//       // if (!token) {
//       //   alert("로그인이 필요합니다.");
//       //   navigate("/login");
//       //   return;
//       // }

//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       const { data } = await api.post(
//         "/resumes/pdf",
//         `form-data: file {$formData}`,
//       );

//       // const response = await fetch("https://api.etf.r-e.kr/resume/pdf", {
//       //   method: "POST",
//       //   headers: { Authorization: `Bearer ${token}` },
//       //   body: formData,
//       // });

//       // if (!response.ok) {
//       //   const errorData = await response.json().catch(() => ({}));
//       //   throw new Error(errorData.message || "파일 업로드에 실패했습니다.");
//       // }

//       // const responseData = await response.json();

//       // Pass both file name and API response to result page
//       navigate("/result", {
//         state: {
//           fileName: selectedFile.name,
//           resumeData: responseData,
//         },
//       });
//     } catch (error) {
//       alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <PageWrapper>
//       <ContentContainer>
//         {/* Semantic: h1 for main page title */}
//         <h1 className="intro-text">
//           맞춤 정보를 드리기 위해서는
//           <br />
//           {name}님의 정보가 담긴 이력서가 필요해요
//         </h1>

//         <p className="limit-text">10MB 이내의 PDF 파일만 업로드할 수 있어요</p>

//         {/* Semantic: Use section for the upload area */}
//         <UploadSection
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           $isUploaded={!!selectedFile}
//         >
//           {!selectedFile ? (
//             <div className="upload-placeholder">
//               <ResumeUploadButton onClick={handleButtonClick}>
//                 파일 추가 +
//               </ResumeUploadButton>
//               <span className="drag-guide">드래그로 가져올 수 있어요</span>
//             </div>
//           ) : (
//             <div className="file-info-card">
//               <div className="card-header">
//                 <span></span>
//                 <span className="label">파일명</span>
//                 <span className="label">용량</span>
//                 <span className="label status">상태</span>
//               </div>
//               <div className="card-body">
//                 <DeleteButton onClick={handleFileDelete}>
//                   <img src={deleteIcon} />
//                 </DeleteButton>
//                 <span className="value filename" title={selectedFile.name}>
//                   {selectedFile.name}{" "}
//                 </span>
//                 <span className="value size">
//                   {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                 </span>
//                 <span className="value status-text">완료</span>
//               </div>
//             </div>
//           )}

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="application/pdf"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//           />
//         </UploadSection>

//         <AgreementContainer>
//           <StyledCheckButton
//             onClick={() => setIsAgreed(!isAgreed)}
//             disabled={isUploading}
//             $isAgreed={isAgreed}
//             aria-label="개인정보 수집 동의"
//           />
//           <label onClick={() => setIsAgreed(!isAgreed)}>
//             본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교, 연락처
//             등의 기본 정보 수집 및 이용에 동의합니다.
//           </label>
//         </AgreementContainer>

//         <ResumeSubmitButton
//           onClick={handleAnalyzeClick}
//           disabled={!isAgreed || !selectedFile || isUploading}
//           $active={isAgreed && !!selectedFile && !isUploading}
//         >
//           {isUploading ? "업로드 중..." : "AI 분석 받기"}
//           <ArrowIcon />
//         </ResumeSubmitButton>
//       </ContentContainer>
//     </PageWrapper>
//   );
// }

// // Icon Component separated for cleanliness
// const ArrowIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//     <path
//       d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
//       fill="currentColor" // Uses parent color
//     />
//   </svg>
// );

// // --- Styled Components ---

// const PageWrapper = styled.div`
//   width: 100%;
//   min-height: calc(100vh - 4rem);
//   background: #fff;
//   display: flex;
//   justify-content: center;

//   /* Responsive: Add padding for mobile screens */
//   padding: 0 1rem;
// `;

// const ContentContainer = styled.main`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   max-width: 56.6875rem; /* ~900px, replaces fixed width */
//   padding-top: 7rem;
//   padding-bottom: 4rem;

//   /* Responsive Typography using simple media queries or clamp */
//   .intro-text {
//     color: #141618;
//     text-align: center;
//     font-size: clamp(1.5rem, 4vw, 2.375rem); /* Responsive font size */
//     font-weight: 600;
//     line-height: 150%;
//     margin-bottom: 1.5rem;
//   }

//   .limit-text {
//     color: #141618;
//     text-align: center;
//     font-size: clamp(1rem, 3vw, 1.5rem);
//     font-weight: 500;
//     opacity: 0.6;
//     margin-bottom: 2.2rem;
//   }
// `;

// const UploadSection = styled.section<{ $isUploaded: boolean }>`
//   width: 100%;
//   background: #fff;
//   border-radius: 0.75rem;
//   margin-bottom: 5rem;

//   /* Conditional styling based on state */
//   border: 2px ${({ $isUploaded }) => ($isUploaded ? "solid" : "dashed")} #4f95ff;

//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;

//   /* Responsive Height: Use padding instead of fixed height for safety,
//      but ensure minimum touch area */
//   min-height: 10rem;
//   padding: ${({ $isUploaded }) => ($isUploaded ? "0" : "1.5rem")};

//   /* 1. Empty State Styles */
//   .upload-placeholder {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 0.5rem;

//     .drag-guide {
//       font-size: 0.875rem;
//       opacity: 0.6;
//       margin-top: 0.5rem;
//     }
//   }

//   /* 2. Uploaded State Styles */
//   .file-info-card {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     // When the parent (.file-info-card) is a flexbox, giving the children flex: 1 tells them to grow and share the available vertical space equally (50/50).
//     // display: grid remains: flex: 1 and display: grid can exist on the same element. The "flex" property determines how the element fits into its parent, while "grid" determines how its own children are laid out.
//     // 혹은 display: grid; grid-template-rows: 1fr 1fr;로 하면 역시 child의 높이를 동등하게 맞출 수 있음
//     flex-direction: column;
//   }

//   /* Grid layout for the file info to ensure alignment */
//   .card-header,
//   .card-body {
//     display: grid;
//     grid-template-columns: 24px 4fr 1fr 1fr; /* Name takes more space */
//     padding: 0.75rem 1rem;
//     align-items: center;
//     gap: 1rem;
//     flex: 1;

//     @media (max-width: 425px) {
//       // 600px을 기준으로 수정해볼까
//       grid-template-columns: 1fr; /* Stack on mobile */
//       gap: 0.5rem;
//       text-align: center;
//     }
//   }

//   .card-header {
//     background-color: #c9defe;

//     .label {
//       font-weight: 600;
//       font-size: 1rem;
//     }

//     /* Hide headers on mobile if stacked */
//     @media (max-width: 425px) {
//       display: none;
//     }
//   }

//   .card-body {
//     background-color: #fff;

//     .value {
//       font-size: 1rem;
//       font-weight: 500;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }
//   }
// `;

// const DeleteButton = styled.button`
//   background: none;
//   border: none;
//   padding: 4px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 4px;
//   transition: background-color 0.2s ease;

//   &:hover {
//     background-color: #f0f0f0; /* Light grey hover effect */
//   }
// `;

// const AgreementContainer = styled.div`
//   display: flex;
//   align-items: flex-start; /* Aligns checkbox with top of text */
//   gap: 0.5rem;
//   margin-bottom: 2rem;
//   max-width: 100%;

//   label {
//     color: #000;
//     font-size: 0.875rem;
//     font-weight: 500;
//     line-height: 140%;
//     cursor: pointer;
//     text-align: left;
//   }
// `;

// const ResumeUploadButton = styled(Button)`
//   background: #06f;
//   color: #fff;
//   padding: 0.625rem 1rem;
//   border-radius: 0.25rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background 0.2s;

//   &:hover {
//     background: #0056d6;
//   }
// `;

// const ResumeSubmitButton = styled(Button)<{ $active: boolean }>`
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   gap: 0.625rem;
//   padding: 0.8rem 2rem;
//   border-radius: 0.5rem;

//   font-size: 1.25rem;
//   font-weight: 600;

//   /* Theme-aware colors */
//   background-color: ${({ $active }) => ($active ? "#06F" : "#c2c5c8")};
//   color: #eaebec;
//   cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};

//   transition: all 0.2s ease-in-out;

//   svg {
//     transition: transform 0.2s;
//   }

//   &:hover {
//     /* Only lift if active */
//     transform: ${({ $active }) => ($active ? "translateY(-2px)" : "none")};
//     svg {
//       transform: ${({ $active }) => ($active ? "translateX(2px)" : "none")};
//     }
//   }
// `;

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import StyledCheckButton from "../components/check-button";
import deleteIcon from "../assets/delete-icon.svg";
import { useAuth } from "../AuthContext";
import api from "../api"; // Assuming this is your axios instance with interceptors

export default function Home() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  // 1. Ref is used to trigger the hidden native input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const name = user?.username ?? "사용자";

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
    // Reset the native input so the user can select the same file again if they want
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    // Trigger the hidden native input click
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

  // --- UPDATED LOGIC HERE ---
  const handleAnalyzeClick = async () => {
    if (!isAgreed || !selectedFile || isUploading) return;

    try {
      setIsUploading(true);

      // 1. Create FormData object
      const formData = new FormData();
      // 'file' is the key expected by the server
      formData.append("file", selectedFile);

      // 2. Send POST request
      // Note: 'Content-Type': 'multipart/form-data' is usually set automatically by Axios when passing FormData,
      // but you can explicitely set it if needed.
      // Auth header is handled by your api instance interceptor.
      const response = await api.post("/resumes/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 3. Navigate with State
      // We pass the response.data directly to the result page
      navigate("/result", {
        state: {
          fileName: selectedFile.name,
          resumeData: response.data, // This contains { userId: 1, summary: "..." }
        },
      });
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

  return (
    <PageWrapper>
      <ContentContainer>
        <h1 className="intro-text">
          맞춤 정보를 드리기 위해서는
          <br />
          {name}님의 정보가 담긴 이력서가 필요해요
        </h1>

        <p className="limit-text">10MB 이내의 PDF 파일만 업로드할 수 있어요</p>

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
                <span></span>
                <span className="label">파일명</span>
                <span className="label">용량</span>
                <span className="label status">상태</span>
              </div>
              <div className="card-body">
                <DeleteButton onClick={handleFileDelete}>
                  <img src={deleteIcon} alt="delete" />
                </DeleteButton>
                <span className="value filename" title={selectedFile.name}>
                  {selectedFile.name}{" "}
                </span>
                <span className="value size">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <span className="value status-text">완료</span>
              </div>
            </div>
          )}

          {/* Hidden Native Input */}
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

// ... (Rest of your Styled Components remain the same)
// Added Icon Component definition for context
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
      fill="currentColor"
    />
  </svg>
);

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
    // When the parent (.file-info-card) is a flexbox, giving the children flex: 1 tells them to grow and share the available vertical space equally (50/50).
    // display: grid remains: flex: 1 and display: grid can exist on the same element. The "flex" property determines how the element fits into its parent, while "grid" determines how its own children are laid out.
    // 혹은 display: grid; grid-template-rows: 1fr 1fr;로 하면 역시 child의 높이를 동등하게 맞출 수 있음
    flex-direction: column;
  }

  /* Grid layout for the file info to ensure alignment */
  .card-header,
  .card-body {
    display: grid;
    grid-template-columns: 24px 4fr 1fr 1fr; /* Name takes more space */
    padding: 0.75rem 1rem;
    align-items: center;
    gap: 1rem;
    flex: 1;

    @media (max-width: 425px) {
      // 600px을 기준으로 수정해볼까
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
    background-color: #f0f0f0; /* Light grey hover effect */
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
