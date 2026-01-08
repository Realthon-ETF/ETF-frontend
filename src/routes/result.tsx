// import { useState } from "react";
// import styled from "styled-components";
// import del from "../assets/delete-icon.svg";
// import { Button } from "../components/Button";

// export default function Result() {
//   const [name, setName] = useState<string>("");

//   return (
//     <PageWrapper>
//       <ResumeResultLayout>
//         <ResumeInfo>
//           <div>
//             <span>등록된 이력서</span>
//             <span className="resume-file-name">테스트</span>
//           </div>
//           <img src={del} />
//         </ResumeInfo>
//         <ResumeBody>
//           <ResultHeader>
//             <h1>이력서 분석 결과</h1>
//             <h2>
//               AI가 이력서 분석을 완료하고 {name}님만을 위한 맞춤 정보를 자동
//               완성했습니다.
//               <br />
//               실제 커리어 목표와 다르거나 추가하고 싶은 내용이 있다면 수정하신
//               후 서비스 시작 버튼을 눌러주세요.
//             </h2>
//           </ResultHeader>
//           <ResumeSummary>
//             <span>Dummy Text</span>
//           </ResumeSummary>
//         </ResumeBody>
//         <ServiceStartBtn>서비스 시작하기</ServiceStartBtn>
//       </ResumeResultLayout>
//     </PageWrapper>
//   );
// }

// const PageWrapper = styled.div`
//   width: 100%;
//   min-height: calc(100vh - 4rem);
//   background: #fff;
//   display: flex;
//   justify-content: center;

//   /* Responsive: Add padding for mobile screens */
//   padding: 0 1rem;
// `;

// const ResumeResultLayout = styled.main`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   width: 100%;
//   min-height: 0;
// `;

// const ResultHeader = styled.div`
//   h1 {
//     align-self: stretch;
//     color: #000;
//     text-align: center;
//     font-size: 2.375rem;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 150%;
//     margin-top: 3.75rem;
//   }

//   h2 {
//     align-self: stretch;
//     color: #5c5c5c;
//     text-align: center;
//     font-size: 1rem;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 140%;
//     margin-top: 0.25rem;
//   }
// `;

// const ResumeInfo = styled.div`
//   display: flex;
//   width: 19.75rem;
//   padding: 0.5rem 1.75rem;
//   justify-content: center;
//   align-items: center;
//   border-radius: 2.25rem;
//   border: 1px solid #aeb0b6;
//   background: #fff;
//   margin-top: 1.1875rem;
//   // margin: 1.19rem auto 0 auto;

//   div {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     align-self: stretch;
//     flex: 1 0 0;

//     span {
//       flex-direction: column;
//       align-items: flex-start;
//       gap: 0.75rem;
//       align-self: stretch;
//       color: #5a5c63;
//       font-size: 0.875rem;
//       font-style: normal;
//       font-weight: 500;
//       line-height: 150%;

//       &.resume-file-name {
//         color: #141618;
//         font-weight: 600;
//       }
//     }

//   img {
//     width: 1.5rem;
//     height: 1.5rem;
//     flex-shrink: 0;
//   }
// `;

// const ResumeBody = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 1.125rem;
// `;

// const ResumeSummary = styled.div`
//   display: flex;
//   height: 22.1875rem;
//   padding: 1rem;
//   align-items: flex-start;
//   gap: 0.625rem;
//   align-self: stretch;
//   border-radius: 0.75rem;
//   border: 1px solid #eaf2fe;
//   background: #f7fbff;

//   span {
//     color: #000;
//     font-size: 1.5rem;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 180%;
//   }
// `;

// const ServiceStartBtn = styled(Button)`
//   display: inline-flex;
//   padding: 0.625rem 1.25rem;
//   border-radius: 0.5rem;
//   background: #06f;
//   margin-top: 2.25rem;
//   color: #eaebec;
//   text-align: center;
//   font-size: 1.25rem;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 150%;

//   &:hover {
//     cursor: pointer;
//   }
// `;

import { useState } from "react";
import styled from "styled-components";
import del from "../assets/delete-icon.svg";
import { Button } from "../components/Button";

export default function Result() {
  // Assuming name comes from somewhere else or an API later
  const [name] = useState<string>("홍길동");

  return (
    <Wrapper>
      <ResultContent>
        {/* Top Resume Indicator */}
        <ResumeBadge>
          <div className="text-group">
            <span className="label">등록된 이력서</span>
            <span className="file-name">테스트_이력서.pdf</span>
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
            <h1>이력서 분석 결과</h1>
            <p>
              AI가 이력서 분석을 완료하고 <strong>{name}</strong>님만을 위한
              맞춤 정보를 자동 완성했습니다.
              <br className="desktop-only" />
              실제 커리어 목표와 다르거나 추가하고 싶은 내용이 있다면 수정하신
              후 서비스 시작 버튼을 눌러주세요.
            </p>
          </SectionHeader>

          <SummaryBox>
            <p>Dummy Text - AI Analysis content goes here...</p>
          </SummaryBox>
        </Article>
        <ServiceStartBtn>서비스 시작하기</ServiceStartBtn>
      </ResultContent>
    </Wrapper>
  );
}

// --- Styled Components ---

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 0 1.25rem 4rem 1.25rem;
`;

const ResultContent = styled.main`
  width: 100%;
  max-width: 60rem; /* Keeps content readable on large screens */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 1. Semantic Change: Using a flexible badge instead of a fixed div
const ResumeBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 20rem;
  padding: 0.6rem 1.5rem;
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
      font-size: 0.75rem;
      font-weight: 500;
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
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionHeader = styled.header`
  text-align: center;
  margin-top: 3.5rem;

  h1 {
    color: #000;
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.75rem;
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
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.8;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const ServiceStartBtn = styled(Button)`
  margin-top: 3rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  background: #06f;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  transition: transform 0.1s, background-color 0.2s;

  &:hover {
    background-color: #0056d2;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
