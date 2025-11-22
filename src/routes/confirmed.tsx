// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e1e2e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`;

const LeftHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;
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

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #141618;
`;

const NavItem = styled.button<{ inactive?: boolean }>`
  background: none;
  border: none;
  color: ${({ inactive }) => (inactive ? "rgba(20, 22, 24, 0.4)" : "#141618")};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  &:hover {
    color: #1d9bf0;
  }
`;

const ProfileTitle = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #141618;
  line-height: 1.2;
  margin: 0;
`;

const ContentWrapper = styled.div`
  position: absolute;
  left: 48px;
  top: 64px;
  width: calc(100% - 96px);
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 906px;
  position: relative;
  margin-top: 1.94rem;
`;

const SuccessMessageContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SuccessTitle = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 38px;
  color: #000;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;

const CheckIcon = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationTimeText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;
  margin-top: 8px;
`;

const TimeText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #5c5c5c;
  line-height: 1.5;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0;
`;

const TimeNumber = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #5c5c5c;
`;

const NotificationCard = styled.div`
  background: #eaf2fe;
  border-radius: 24px;
  width: 464px;
  height: 376px;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-bottom: 200px;
  // margin-top: 3.87rem;
`;

const NotificationContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  box-sizing: border-box;
`;

const NotificationLogo = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const NotificationLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NotificationMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  flex: 1;
  width: 353px;
`;

const NotificationSender = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
  box-sizing: border-box;
`;

const SenderText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #000;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;

const NotificationBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
`;

const NotificationHeader = styled.div`
  background: #fde500;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const NotificationHeaderText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #000;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;

const NotificationBody = styled.div`
  background: #fff;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #000;
  line-height: 1.5;
  white-space: pre-wrap;
  width: 100%;
`;

const NotificationList = styled.ol`
  margin: 0;
  padding-left: 24px;
  list-style-type: decimal;
`;

const NotificationListItem = styled.li`
  margin-bottom: 0;
  line-height: 1.5;
`;

const NotificationButton = styled.div`
  background: #efefef;
  border-radius: 8px;
  padding: 8px 0;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;

const NotificationButtonText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #000;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;

const SettingsButton = styled.button`
  background: #0066ff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.2s;

  &:hover {
    background: #0052cc;
  }
`;

const SettingsButtonText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #eaebec;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;

export default function Confirmed() {
  const navigate = useNavigate();
  // const [userData, setUserData] = useState({
  //   username: "",
  //   alarmTime: "",
  // });

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
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

  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserData({
  //           username: data.username || "",
  //           alarmTime: data.alarmTime || "18:00",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [navigate]);

  // const formatAlarmTime = (time: string) => {
  //   if (!time) return "18";
  //   // Extract hour from "HH:MM:SS" or "HH:MM" format
  //   if (time.includes(":")) {
  //     return time.split(":")[0];
  //   }
  //   return time;
  // };

  const handleSettingsClick = () => {
    navigate("/profile");
  };

  // const alarmHour = formatAlarmTime(userData.alarmTime);

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
                  fill="url(#paint0_radial_confirmed)"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_confirmed"
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
            <NavItem inactive>수집함</NavItem>
          </Nav>
        </LeftHeaderWrapper>
        <ProfileTitle>내프로필</ProfileTitle>
      </Header>
      <ContentWrapper>
        <NotificationCard>
          <NotificationContent>
            <NotificationLogo>
              <NotificationLogoImage
                src="https://www.figma.com/api/mcp/asset/52b29c65-1691-4ad9-a387-6da245f8bd94"
                alt="알려주잡 로고"
              />
            </NotificationLogo>
            <NotificationMessage>
              <NotificationSender>
                <SenderText>알려주잡</SenderText>
              </NotificationSender>
              <NotificationBubble>
                <NotificationHeader>
                  <NotificationHeaderText>알림톡 도착</NotificationHeaderText>
                </NotificationHeader>
                <NotificationBody>
                  <NotificationText>
                    {"김수겸"} 님, 안녕하세요!
                    {"\n"}오늘 AI가 선별한 새로운 게시글 3건이 도착했습니다.
                    {"\n"} {"\n"}
                    <NotificationList>
                      <NotificationListItem>
                        ✨ 학과: 한국대학 교내 기업 인재 특강 일정
                      </NotificationListItem>
                      <NotificationListItem>
                        ⭐ 관심 회사: 데이터 분석 인턴 모집
                      </NotificationListItem>
                      <NotificationListItem>
                        📢 취업 포털: 실무 SQL 집중 1일 워크숍
                      </NotificationListItem>
                    </NotificationList>
                    {"\n"}지금 바로 확인하고 지원/신청하세요!
                    {"\n"}
                  </NotificationText>
                  <NotificationButton>
                    <NotificationButtonText>
                      아티클 확인하기
                    </NotificationButtonText>
                  </NotificationButton>
                </NotificationBody>
              </NotificationBubble>
            </NotificationMessage>
          </NotificationContent>
        </NotificationCard>
        <MainContent>
          <SuccessMessageContainer>
            <SuccessTitle>서비스 신청 완료</SuccessTitle>
            <CheckIcon>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 0C8.059 0 0 8.059 0 18C0 27.941 8.059 36 18 36C27.941 36 36 27.941 36 18C36 8.059 27.941 0 18 0ZM14.625 27L6 18.375L8.325 16.05L14.625 22.35L27.675 9.3L30 11.625L14.625 27Z"
                  fill="#58CF04"
                />
              </svg>
            </CheckIcon>
          </SuccessMessageContainer>
          <NotificationTimeText>
            <TimeText>
              <TimeNumber>{"08:00"}</TimeNumber>시에 알림톡을 통해 필요 정보를
              확인할 수 있어요
            </TimeText>
          </NotificationTimeText>
        </MainContent>
        <SettingsButton onClick={handleSettingsClick}>
          <SettingsButtonText>설정 확인하기</SettingsButtonText>
        </SettingsButton>
      </ContentWrapper>
    </Wrapper>
  );
}
