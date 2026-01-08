// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import logo from "../assets/logo.svg";
// import checked from "../assets/check-mark.svg";
// import { Button } from "../components/Button";

// export default function Confirmed() {
//   const navigate = useNavigate();
//   // const [userData, setUserData] = useState({
//   //   username: "",
//   //   alarmTime: "",
//   // });

//   // uncomment after login logic developed
//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       if (!token) {
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

//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         setUserData({
//   //           username: data.username || "",
//   //           alarmTime: data.alarmTime || "18:00",
//   //         });
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching user data:", error);
//   //     }
//   //   };

//   //   fetchUserData();
//   // }, [navigate]);

//   // const formatAlarmTime = (time: string) => {
//   //   if (!time) return "18";
//   //   // Extract hour from "HH:MM:SS" or "HH:MM" format
//   //   if (time.includes(":")) {
//   //     return time.split(":")[0];
//   //   }
//   //   return time;
//   // };

//   const handleSettingsClick = () => {
//     navigate("/profile");
//   };

//   // const alarmHour = formatAlarmTime(userData.alarmTime);

//   return (
//     <PageWrapper>
//       <ConfirmedLayout>
//         <ExampleAlarm>
//           <img src={logo} />
//           <div className="alarm-contents-area">
//             <span>알려주잡</span>
//             <div className="alarm-arrival">알림톡 도착</div>
//             <span className="alarm-contents">
//               이디안님 안녕하세요!
//               <br />
//               오늘 AI가 선별한 새로운 게시글 3건이 도착했습니다.
//               <br />
//               <br />
//               1. 학과: 한국대학 교내 기업 인재 특강 일정
//               <br />
//               2. 관심 회사: 데이터 분석 인턴 모집
//               <br />
//               3. 취업 포털: 실무 SQL 집중 1일 워크숍
//               <br />
//               지금 바로 확인하고 지원/신청하세요!
//             </span>
//           </div>
//         </ExampleAlarm>
//         <ServiceRegistered>
//           <div>
//             서비스 신청 완료
//             <img src={checked} />
//           </div>
//           <div className="alarm-time">
//             18시에 알림톡을 통해 필요 정보를 확인할 수 있어요
//           </div>
//         </ServiceRegistered>
//         <ToSettingBtn onClick={handleSettingsClick}>설정 확인하기</ToSettingBtn>
//       </ConfirmedLayout>
//     </PageWrapper>
//   );
// }

// const PageWrapper = styled.div`
//   width: 100%;
//   min-height: calc(100vh - 4rem);
//   background: #f7f8fa;
//   display: flex;
//   justify-content: center;

//   /* Responsive: Add padding for mobile screens */
//   padding: 0 1rem;
// `;

// const ConfirmedLayout = styled.main`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   width: 100%;
//   min-height: 0;
// `;

// const ExampleAlarm = styled.div`
//   display: inline-flex;
//   padding: 1.875rem 2.0625rem 1.8125rem 2rem;
//   justify-content: center;
//   border-radius: 1.5rem;
//   background: #eaf2fe;
//   margin-top: 6.875rem;
//   // align-items: flex-start;
//   align-items: stretch;
//   gap: 0.625rem;

//   img {
//     width: 2.1875rem;
//     height: 2.1875rem;
//     flex-shrink: 0;
//     aspect-ratio: 1/1;
//     background: lightgray 50% / cover no-repeat;
//     border-radius: 0.5rem;
//   }

//   .alarm-contents-area {
//     display: flex;
//     width: 22.0625rem;
//     flex-direction: column;
//     align-items: flex-start;
//     flex: 1;

//     span {
//       color: #000;
//       text-align: center;
//       font-size: 0.8125rem;
//       font-style: normal;
//       font-weight: 600;
//       line-height: 150%; /* 1.21875rem */
//       margin-bottom: 0.25rem;
//     }

//     .alarm-arrival {
//       flex: 1;
//       display: flex;
//       flex-direction: column;
//       align-self: stretch;

//       display: flex;
//       padding: 0.625rem;
//       align-items: center;
//       align-self: stretch;
//       background: #fde500;
//       border-top-left-radius: 0.5rem;
//       border-top-right-radius: 0.5rem;
//       color: #000;
//       text-align: center;
//       font-size: 0.875rem;
//       font-style: normal;
//       font-weight: 600;
//       line-height: 150%;
//     }

//     span.alarm-contents {
//       display: flex;
//       text-align: left;
//       padding: 0.625rem;
//       flex-direction: column;
//       align-items: flex-start;
//       align-self: stretch;
//       background: #fff;
//       color: #000;
//       font-size: 1rem;
//       font-style: normal;
//       font-weight: 500;
//       line-height: 150%;
//       border-bottom-left-radius: 0.5rem;
//       border-bottom-right-radius: 0.5rem;
//     }
//   }
// `;

// const ServiceRegistered = styled.div`
//   display: flex;
//   width: 56.625rem;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 0.5rem;
//   margin-top: 1.9375rem;

//   div {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 0.5rem;
//     align-self: stretch;
//     color: #000;
//     text-align: center;
//     font-size: 2.375rem;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 150%;

//     img {
//       width: 2.25rem;
//       height: 2.25rem;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     &.alarm-time {
//       color: #5c5c5c;
//       text-align: center;
//       font-size: 1.5rem;
//       font-style: normal;
//       font-weight: 500;
//       line-height: 150%;
//     }
//   }
// `;

// const ToSettingBtn = styled(Button)`
//   display: inline-flex;
//   padding: 0.625rem 1.25rem;
//   align-items: center;
//   gap: 0.625rem;
//   border-radius: 0.5rem;
//   background: #06f;
//   margin-top: 1.5rem;
//   color: #eaebec;
//   text-align: center;
//   font-size: 1.25rem;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 150%;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   &:hover {
//     background: #0052cc;
//   }
// `;

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import checked from "../assets/check-mark.svg";
import { Button } from "../components/Button";

export default function Confirmed() {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/profile");
  };

  return (
    <PageWrapper>
      <ContentContainer>
        {/* Semantic: This is a visual figure representing the notification */}
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

        {/* Semantic: The main textual content of the page */}
        <StatusSection>
          <div className="status-header">
            <h1>서비스 신청 완료</h1>
            <img src={checked} alt="Success Checkmark" />
          </div>
          <p className="status-description">
            18시에 알림톡을 통해 필요 정보를 확인할 수 있어요
          </p>
        </StatusSection>

        <ActionButton onClick={handleSettingsClick}>설정 확인하기</ActionButton>
      </ContentContainer>
    </PageWrapper>
  );
}

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #f7f8fa;
  display: flex;
  justify-content: center;
  padding: 0 1rem; /* Horizontal padding for mobile safety */
  padding-bottom: 2rem;
`;

const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px; /* Limit width on large screens for readability */
`;

const AlarmSection = styled.figure`
  display: flex;
  align-items: flex-start; /* Aligns logo with top of message */
  gap: 0.625rem;
  width: 100%;
  max-width: 28rem; /* Reasonable width for a chat bubble */
  padding: 1.875rem;
  margin: 0;
  margin-top: 4rem; /* Reduced from 6.8rem for better fold visibility */
  border-radius: 1.5rem;
  background: #eaf2fe;

  /* Responsive: Less margin on mobile */
  @media (max-width: 480px) {
    margin-top: 2rem;
    padding: 1.25rem;
  }

  .logo {
    width: 2.2rem;
    height: 2.2rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    background-color: #fff; /* Fallback */
  }

  .message-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; /* Prevents flex item from overflowing */
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
    font-size: 0.95rem; /* Slightly reduced for better fit */
    font-weight: 500;
    line-height: 1.5;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    word-break: keep-all; /* Prevents breaking Korean words awkwardly */

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
    flex-wrap: wrap; /* Allows wrapping on very small screens */

    h1 {
      margin: 0;
      color: #000;
      font-size: 2rem; /* responsive base */
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
  padding: 0.625rem 1.25rem;
  background: #06f;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  // width: auto;
  // min-width: 200px;
  justify-content: center;

  &:hover {
    background: #0052cc;
  }

  /* Full width button on mobile feels more native */
  @media (max-width: 480px) {
    width: 100%;
    margin-top: 3rem;
  }
`;
