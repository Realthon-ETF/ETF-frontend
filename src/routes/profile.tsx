import { useState, useEffect } from "react";
import styled from "styled-components";

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
      <ProfileLayout>
        <h1>내 프로필</h1>

        {/* <MainContent>
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
            </SectionHeader> */}
        {/* <InfoFields>
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
                  
                </PhoneSeparator>
                <PhonePart>
                  <FieldText>{phoneParts.part2 || "1234"}</FieldText>
                </PhonePart>
                <PhoneSeparator>
                  
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
          </InfoFields> */}
        {/* </Section>
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
          </Section> */}
        {/* </MainContent> */}
        <div className="basic-info-area">
          <div className="basic-info-header">
            <span>기본 정보</span>
            <button>
              수정
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.6593 2.54817C11.4305 1.77691 12.681 1.77691 13.4522 2.54817C14.2235 3.31943 14.2235 4.56989 13.4522 5.34114L5.03559 13.7578C4.92307 13.8703 4.77046 13.9335 4.61133 13.9335H2.66689C2.33552 13.9335 2.06689 13.6649 2.06689 13.3335V11.3891C2.06689 11.23 2.13011 11.0774 2.24263 10.9648L10.6593 2.54817ZM12.6037 3.3967C12.3011 3.09407 11.8104 3.09407 11.5078 3.3967L3.26689 11.6376V12.7335H4.3628L12.6037 4.49261C12.9063 4.18999 12.9063 3.69933 12.6037 3.3967Z"
                  fill="#5A5C63"
                />
              </svg>
            </button>
          </div>
          <div className="basic-info-content"></div>
        </div>
      </ProfileLayout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  // height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
  // padding: 3rem;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // background: #f7f8fa;
  min-height: calc(100vh - 4rem);
`;

const ProfileLayout = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 0;

  h1 {
    color: #141618;
    text-align: center;
    font-size: 2.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-top: 3.4375rem;
  }
  .basic-info-area {
    display: flex;
    width: 27.8125rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.875rem;
    margin-top: 2.0625rem;

    .basic-info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      span {
        color: #141618;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 600;
        line-height: 130%;
      }

      button {
        display: flex;
        padding: 0.25rem 0.5rem;
        align-items: center;
        gap: 0.25rem;
        border-radius: 0.5rem;
        border: 1px solid #eaebec;
        background: #fff;
        color: #5a5c63;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 130%; /* 1.3rem */
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background: #f7f8fa;
        }
      }
    }

    .basic-info-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
      align-self: stretch;
    }
  }
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

const BasicInfoContainer = styled.div`
  display: flex;
  width: 27.8125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  margin-bottom: 4.25rem;
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

const MainContent = styled.main`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
  // justify-content: center;
  gap: 10px;
  width: 346px;
  box-sizing: border-box;
`;

const FieldText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  color: #5a5c63;
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
  // height: 0;
  position: relative;
  flex-shrink: 0;
  display: flex; /* Add Flexbox */
  align-items: center; /* Vertically center the content (SeparatorLine) */
  justify-content: center;
`;

// const SeparatorLine = styled.div`
//   position: relative;
//   /* Remove top: -0.5px; and bottom: -0.5px; */
//   left: 0;
//   right: 0;
//   align-items: center;

// `;

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
