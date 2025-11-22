// import React, { useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AnalyzeButton = styled.button`
  display: inline-flex;
  padding: 0.625rem 1.25rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border-width: 0;
  background-color: #06f;
  margin-top: 1.38rem;
  margin-bottom: 18.19rem;
`;

const AnalyzeText = styled.h3`
  color: #eaebec;
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const RegisteredResume = styled.div`
  display: flex;
  width: 19.75rem;
  padding: 0.5rem 1.75rem;
  justify-content: center;
  align-items: center;
  margin: 1.19rem auto 0 auto;
  border-radius: 2.25rem;
  border: 1px solid #aeb0b6;
  background: #fff;
`;
const ResumeName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // gap: 0.75rem;
  align-self: stretch;
`;

const ResumeUpperName = styled.h5`
  color: #5a5c63;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const ResumeLowerName = styled.h5`
  color: #141618;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const AnalyzeResult = styled.p`
  color: #000;
  text-align: center;
  font-size: 2.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-top: 3.75rem;
`;

const AnalyzeExplain = styled.h4`
  color: #5c5c5c;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.4rem */
`;

const ResumeWrapper = styled.div`
  // align-items: center;
  // justify-content: center;
  // width: 47.18%;
  width: 47.18%;
  height: 100%;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AnalyzeResultContainer = styled.div`
  display: flex;
  height: 22.1875rem;
  padding: 1rem;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.75rem;
  border: 1px solid #eaf2fe;
  background-color: #f7fbff;
  margin-top: 1.12rem;
  width: 100%;
`;

// const AnalyzeButton = styled.button`
//   display: inline-flex;
//   padding: 0.625rem 1.25rem;
//   align-items: center;
//   gap: 0.625rem;
//   border-radius: 0.5rem;
//   border-width: 0;
//   background-color: #06f;
//   margin-top: 1.38rem;
//   margin-bottom: 3.25rem;
// `;

// const AnalyzeText = styled.h3`
//   color: #eaebec;
//   text-align: center;
//   font-size: 1.25rem;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 150%;
// `;

export default function Home() {
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
      <ResumeWrapper>
        <RegisteredResume>
          <ResumeName>
            <ResumeUpperName>등록된 이력서</ResumeUpperName>
            <ResumeLowerName>길민경_이력서_최종.pdf</ResumeLowerName>
          </ResumeName>
        </RegisteredResume>
        <AnalyzeResult>이력서 분석 결과</AnalyzeResult>
        <AnalyzeExplain>
          AI가 이력서 분석을 완료하고 민경 님만을 위한 맞춤 정보를 자동
          완성했습니다.
          <br />
          실제 커리어 목표와 다르거나 추가하고 싶은 내용이 있다면 수정하신 후
          서비스 시작 버튼을 눌러주세요.
        </AnalyzeExplain>
        <AnalyzeResultContainer>tmptmptpmtmp</AnalyzeResultContainer>
      </ResumeWrapper>
      <AnalyzeButton>
        <AnalyzeText>서비스 시작하기</AnalyzeText>
      </AnalyzeButton>
      {/* <Main>
        <ResumeWrapper>
          <AnnouncmentBox>
            맞춤 정보를 드리기 위해서는
            <br />
            민경님의 정보가 담긴 이력서가 필요해요
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
          )} */}

      {/* <AgreementBox>
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
          <AnalyzeButton active={isAgreed}>
            <AnalyzeText>AI 분석 받기</AnalyzeText>
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
      </Main> */}
    </Wrapper>
  );
}
