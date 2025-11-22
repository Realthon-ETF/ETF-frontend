// import React, { useRef, useState } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  overflow-y: auto;
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
  margin-bottom: 5.19rem;
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
  margin: 0 auto 0 auto;
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

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.p`
  font-family: "BareunDotumOTFPro", sans-serif;
  color: #2e3847;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.8px;
  margin: 0;
`;

const ResumeWrapper = styled.div`
  width: 47.18%;
  max-width: 900px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  overflow: scroll;
`;

const AnalyzeResultText = styled.p`
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 180%; /* 1.8rem */
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

export default function Result() {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <div></div>; // Or return null to show nothing
  }

  return (
    <Wrapper>
      <Header>
        <LeftHeaderWrapper>
          <LogoContainer>
            <LogoIcon>
              <svg
                width="36"
                height="36"
                viewBox="0 0 78 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="77.76" height="77.76" fill="white" />
                <path
                  d="M46.6025 29.3325C46.0465 25.8052 50.7705 24.1041 52.5908 27.1763L59.3271 38.5464L61.5459 34.3101C63.7057 30.1878 69.9363 31.6392 70.0518 36.2915C70.2693 45.0592 66.8813 53.5322 60.6797 59.7339L59.7598 60.6548C53.5423 66.8722 45.0469 70.2685 36.2568 70.0503C31.598 69.9346 30.1385 63.6998 34.2617 61.5278L38.6641 59.2095L27.2314 52.5181C24.1494 50.7138 25.8267 45.9805 29.3574 46.519L38.6641 47.938L31.5967 37.2104C29.149 33.4947 33.5367 29.085 37.2646 31.5142L48.0557 38.5464L46.6025 29.3325ZM17.8164 9.52393C18.0338 8.34517 19.724 8.34516 19.9414 9.52393L21.4326 17.6187C21.5138 18.0592 21.8583 18.4047 22.2988 18.4858L30.3936 19.9771C31.5724 20.1944 31.5725 21.8838 30.3936 22.1011L22.2988 23.5923C21.8583 23.6734 21.5138 24.018 21.4326 24.4585L19.9414 32.5532C19.7242 33.7323 18.0336 33.7323 17.8164 32.5532L16.3252 24.4585C16.244 24.018 15.8995 23.6734 15.459 23.5923L7.36426 22.1011C6.18527 21.8838 6.18534 20.1944 7.36426 19.9771L15.459 18.4858C15.8996 18.4047 16.244 18.0592 16.3252 17.6187L17.8164 9.52393Z"
                  fill="url(#paint0_radial_profile)"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_profile"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(29.4277 29.4291 -29.4277 29.4277 35.3823 37.5416)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4F95FF" />
                    <stop offset="0.27707" stopColor="#5698F8" />
                    <stop offset="0.518714" stopColor="#75A7D9" />
                    <stop offset="1" stopColor="#FFEA4F" />
                  </radialGradient>
                </defs>
              </svg>
            </LogoIcon>
            <LogoText>알려주잡</LogoText>
          </LogoContainer>
          <Nav>
            <NavItem>정보설정</NavItem>
            <NavItem>수집함</NavItem>
          </Nav>
        </LeftHeaderWrapper>
        <ProfileTitle>내 프로필</ProfileTitle>
      </Header>
      <Main>
        <ResumeWrapper>
          <RegisteredResume>
            <ResumeName>
              <ResumeUpperName>등록된 이력서</ResumeUpperName>
              <ResumeLowerName>[KR] 이력서 최신본.pdf</ResumeLowerName>
            </ResumeName>
          </RegisteredResume>
          <AnalyzeResult>이력서 분석 결과</AnalyzeResult>
          <AnalyzeExplain>
            AI가 이력서 분석을 완료하고 김수겸 님만을 위한 맞춤 정보를 자동
            완성했습니다.
            <br />
            실제 커리어 목표와 다르거나 추가하고 싶은 내용이 있다면 수정하신 후
            서비스 시작 버튼을 눌러주세요.
          </AnalyzeExplain>
          <AnalyzeResultContainer>
            <AnalyzeResultText>
              수겸(Kyle) 김은 고려대학교 컴퓨터학과 재학 중인 2027년 졸업
              예정자로, 머신러닝·데이터사이언스·파이썬·클라우드 기반 개발에
              강점을 가지고 있으며 AWS Solutions Architect Associate와 AI
              Practitioner 자격을 보유하고 있다. React, Next.js, Firebase, GCP,
              LLM 파인튜닝 등을 활용해 유료 사용자 기반 웹서비스인 '1 Cup
              English'를 처음부터 끝까지 직접 기획·개발·운영했고, Supabase와
              PostgreSQL을 활용한 해커톤 우승 프로젝트 'K Saju'도 팀 기반
              협업으로 완성했다. 또한 Sendbird, CJ Foods, 한미연합사에서 총 6년
              이상 전문 통역 경험을 쌓았고, 경영진 미팅·고객 협상·엔지니어링
              회의 등 고난도 환경에서 실시간 통역을 수행해왔다. 기술 역량과 실전
              제품 개발 경험, 그리고 뛰어난 커뮤니케이션 능력이 결합된 드문
              프로필이다.
            </AnalyzeResultText>
          </AnalyzeResultContainer>
        </ResumeWrapper>
        <AnalyzeButton
          onClick={() => {
            setTimeout(() => {
              navigate("/confirmed");
            }, 700);
          }}
        >
          <AnalyzeText>서비스 시작하기</AnalyzeText>
        </AnalyzeButton>
      </Main>
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
