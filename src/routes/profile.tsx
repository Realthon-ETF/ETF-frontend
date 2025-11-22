import { useState, useEffect } from "react";
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

const NavItem = styled.button`
  background: none;
  border: none;
  color: #141618;
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

const PageTitle = styled.h1`
  position: absolute;
  top: 118.96px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 38px;
  color: #141618;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;

const MainContent = styled.main`
  position: absolute;
  left: calc(37.5% + 25px);
  top: 209px;
  width: 445px;
  display: flex;
  flex-direction: column;
  gap: 86px;
  align-items: flex-start;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  width: 100%;
`;

const SectionHeader = styled.div<{ alignEnd?: boolean }>`
  display: flex;
  align-items: ${({ alignEnd }) => (alignEnd ? "flex-end" : "center")};
  justify-content: space-between;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #141618;
  line-height: 1.3;
  margin: 0;
`;

const EditButton = styled.button`
  background: #fff;
  border: 1px solid #eaebec;
  border-radius: 8px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #5a5c63;
  transition: all 0.2s;

  &:hover {
    background: #f7f8fa;
  }
`;

const EditButtonText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #5a5c63;
`;

const PencilIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const InfoFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 440px;
`;

const InfoField = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap || "71px"};
  width: 100%;
`;

const FieldLabel = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #141618;
  line-height: 1.3;
  margin: 0;
  flex-shrink: 0;
`;

const FieldValue = styled.div`
  border-radius: 20px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 346px;
  box-sizing: border-box;
`;

const FieldText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #5a5c63;
  text-align: center;
  margin: 0;
  width: 100%;
`;

const PhoneNumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  width: 346px;
`;

const PhonePart = styled.div`
  border-radius: 20px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 84px;
  box-sizing: border-box;
`;

const PhoneSeparator = styled.div`
  width: 10.5px;
  height: 0;
  position: relative;
  flex-shrink: 0;
`;

const SeparatorLine = styled.div`
  position: absolute;
  top: -0.5px;
  bottom: -0.5px;
  left: 0;
  right: 0;
`;

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const NotificationValue = styled.div`
  border-radius: 20px;
  padding: 8px 6px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NotificationText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #5a5c63;
  text-align: center;
  margin: 0;
`;

const ResumeSummaryBox = styled.div`
  background: #f7fbff;
  border: 1px solid #eaf2fe;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const ResumeSummaryText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #000;
  line-height: 1.8;
  white-space: pre-wrap;
  flex: 1;
  min-height: 0;
`;

export default function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    school: "",
    major: "",
    interestField: "",
    intervalDays: "",
    alarmTime: "",
  });
  const [resumeSummary] = useState(
    "요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다."
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await fetch("https://api.etf.r-e.kr/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            username: data.username || "",
            phoneNumber: data.phoneNumber || "",
            email: data.email || "",
            school: data.school || "",
            major: data.major || "",
            interestField: data.interestField || "",
            intervalDays: data.intervalDays?.toString() || "",
            alarmTime: data.alarmTime || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return { part1: "", part2: "", part3: "" };
    const cleaned = phone.replace(/-/g, "");
    if (cleaned.length === 11) {
      return {
        part1: cleaned.substring(0, 3),
        part2: cleaned.substring(3, 7),
        part3: cleaned.substring(7, 11),
      };
    }
    return { part1: phone.substring(0, 3), part2: "", part3: "" };
  };

  const formatAlarmTime = (time: string) => {
    if (!time) return "";
    // Convert "HH:MM:SS" to "HH:MM"
    if (time.includes(":")) {
      const parts = time.split(":");
      return `${parts[0]}:${parts[1]}`;
    }
    return time;
  };

  const phoneParts = formatPhoneNumber(userData.phoneNumber);

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
        <ProfileTitle>내프로필</ProfileTitle>
      </Header>
      <PageTitle>내 프로필</PageTitle>
      <MainContent>
        <Section>
          <SectionHeader>
            <SectionTitle>기본정보</SectionTitle>
            <EditButton>
              <EditButtonText>수정</EditButtonText>
              <PencilIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3333 2.00004C11.5084 1.82493 11.7163 1.68605 11.9444 1.59129C12.1726 1.49654 12.4163 1.44775 12.6625 1.44775C12.9087 1.44775 13.1524 1.49654 13.3806 1.59129C13.6087 1.68605 13.8166 1.82493 13.9917 2.00004C14.1668 2.17515 14.3057 2.38306 14.4004 2.61119C14.4952 2.83932 14.544 3.08301 14.544 3.32921C14.544 3.57541 14.4952 3.8191 14.4004 4.04723C14.3057 4.27536 14.1668 4.48327 13.9917 4.65838L5.32498 13.325L1.33331 14.6667L2.67498 10.675L11.3333 2.00004Z"
                    stroke="#5a5c63"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </PencilIcon>
            </EditButton>
          </SectionHeader>
          <InfoFields>
            <InfoField>
              <FieldLabel>이름</FieldLabel>
              <FieldValue>
                <FieldText>{userData.username || "길민경"}</FieldText>
              </FieldValue>
            </InfoField>
            <InfoField gap="43px">
              <FieldLabel>전화번호</FieldLabel>
              <PhoneNumberContainer>
                <PhonePart>
                  <FieldText>{phoneParts.part1 || "010"}</FieldText>
                </PhonePart>
                <PhoneSeparator>
                  <SeparatorLine>
                    <svg
                      width="11"
                      height="1"
                      viewBox="0 0 11 1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.5"
                        y1="0.5"
                        x2="10.5"
                        y2="0.5"
                        stroke="#AEB0B6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </SeparatorLine>
                </PhoneSeparator>
                <PhonePart>
                  <FieldText>{phoneParts.part2 || "1234"}</FieldText>
                </PhonePart>
                <PhoneSeparator>
                  <SeparatorLine>
                    <svg
                      width="11"
                      height="1"
                      viewBox="0 0 11 1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.5"
                        y1="0.5"
                        x2="10.5"
                        y2="0.5"
                        stroke="#AEB0B6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </SeparatorLine>
                </PhoneSeparator>
                <PhonePart>
                  <FieldText>{phoneParts.part3 || "5678"}</FieldText>
                </PhonePart>
              </PhoneNumberContainer>
            </InfoField>
            <InfoField gap="57px">
              <FieldLabel>이메일</FieldLabel>
              <FieldValue>
                <FieldText>
                  {userData.email || "dkffuwnwkq@job.ac.kr"}
                </FieldText>
              </FieldValue>
            </InfoField>
            <InfoField>
              <FieldLabel>학교</FieldLabel>
              <FieldValue>
                <FieldText>{userData.school || "한국대학교"}</FieldText>
              </FieldValue>
            </InfoField>
            <InfoField>
              <FieldLabel>학과</FieldLabel>
              <FieldValue>
                <FieldText>{userData.major || "경영학과"}</FieldText>
              </FieldValue>
            </InfoField>
            <InfoField gap="43px">
              <FieldLabel>관심직무</FieldLabel>
              <FieldValue>
                <FieldText>
                  {userData.interestField || "UIUX디자인, UX디자인"}
                </FieldText>
              </FieldValue>
            </InfoField>
            <InfoField gap="53px">
              <FieldLabel>알림주기</FieldLabel>
              <NotificationContainer>
                <NotificationValue>
                  <NotificationText>
                    {userData.intervalDays || "1"}
                  </NotificationText>
                </NotificationValue>
                <NotificationText>일 마다 한 번씩</NotificationText>
              </NotificationContainer>
            </InfoField>
            <InfoField gap="53px">
              <FieldLabel>알림시간</FieldLabel>
              <NotificationContainer>
                <NotificationValue>
                  <NotificationText>
                    {formatAlarmTime(userData.alarmTime) || "18:00"}
                  </NotificationText>
                </NotificationValue>
                <NotificationText>시에 알람을 받아요</NotificationText>
              </NotificationContainer>
            </InfoField>
          </InfoFields>
        </Section>
        <Section>
          <SectionHeader alignEnd>
            <SectionTitle>이력서 요약 정보</SectionTitle>
            <EditButton>
              <EditButtonText>수정</EditButtonText>
              <PencilIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3333 2.00004C11.5084 1.82493 11.7163 1.68605 11.9444 1.59129C12.1726 1.49654 12.4163 1.44775 12.6625 1.44775C12.9087 1.44775 13.1524 1.49654 13.3806 1.59129C13.6087 1.68605 13.8166 1.82493 13.9917 2.00004C14.1668 2.17515 14.3057 2.38306 14.4004 2.61119C14.4952 2.83932 14.544 3.08301 14.544 3.32921C14.544 3.57541 14.4952 3.8191 14.4004 4.04723C14.3057 4.27536 14.1668 4.48327 13.9917 4.65838L5.32498 13.325L1.33331 14.6667L2.67498 10.675L11.3333 2.00004Z"
                    stroke="#5a5c63"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </PencilIcon>
            </EditButton>
          </SectionHeader>
          <ResumeSummaryBox>
            <ResumeSummaryText>{resumeSummary}</ResumeSummaryText>
          </ResumeSummaryBox>
        </Section>
      </MainContent>
    </Wrapper>
  );
}
