import React, { useState } from "react";
import styled from "styled-components";
import { InputGroup } from "../components/input-group";
import editicon from "../assets/edit-icon.svg";

export default function Profile() {
  // 1. Refactor: Use a single object for all form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    school: "",
    major: "",
    interest: "",
    alarmPeriod: "",
    alarmTime: "",
    summary: "요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다.",
  });

  const [isProfileEditable, setIsProfileEditable] = useState<boolean>(true);
  const [isResumeEditable, setIsResumeEditable] = useState<boolean>(true);

  // 2. Unified Change Handler
  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileEditBtnClick = () => {
    setIsProfileEditable((prev) => !prev);
  };

  const handleResumeEditBtnClick = () => {
    setIsResumeEditable((prev) => !prev);
  };

  return (
    <PageWrapper>
      <ProfileContainer>
        <h1>내 프로필</h1>

        {/* --- Section 1: Basic Info & Settings --- */}
        <Section>
          <div className="section-header">
            <h2>기본 정보</h2>
            <button type="button" onClick={handleProfileEditBtnClick}>
              {isProfileEditable ? "수정" : "수정 완료"}
              <img src={editicon} alt="edit" />
            </button>
          </div>

          <div className="input-list">
            <InputGroup
              label="이름"
              id="user-name"
              name="name"
              placeholder="성함을 입력하세요"
              value={formData.name}
              onChange={onChange}
              disabled={isProfileEditable}
            />
            <InputGroup
              label="전화번호"
              id="user-phone"
              type="tel"
              name="phone"
              placeholder="전화번호를 입력하세요"
              value={formData.phone}
              onChange={onChange}
              disabled={isProfileEditable}
            />
            <InputGroup
              label="이메일"
              id="user-email"
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={onChange}
              disabled={isProfileEditable}
            />
            <InputGroup
              label="학교"
              id="user-school"
              name="school"
              placeholder="예) 한국대학교"
              value={formData.school}
              onChange={onChange}
              disabled={isProfileEditable}
            />
            <InputGroup
              label="학과"
              id="user-department"
              name="major"
              placeholder="예) 경영학과"
              value={formData.major}
              onChange={onChange}
              disabled={isProfileEditable}
            />
            <InputGroup
              label="관심 직무"
              id="user-interest"
              name="interest"
              placeholder="예) UI/UX 디자인"
              value={formData.interest}
              onChange={onChange}
              disabled={isProfileEditable}
            />

            {/* --- New Custom Selects --- */}

            {/* Alarm Period */}
            <SelectRow>
              <label htmlFor="alarm-period">알림 주기</label>
              <div className="select-wrapper">
                <select
                  id="alarm-period"
                  name="alarmPeriod"
                  value={formData.alarmPeriod}
                  onChange={onChange}
                  disabled={isProfileEditable}
                >
                  <option value="">선택</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <span>일마다 한 번씩</span>
              </div>
            </SelectRow>

            {/* Alarm Time */}
            <SelectRow>
              <label htmlFor="alarm-time">알림 시간</label>
              <div className="select-wrapper">
                <select
                  id="alarm-time"
                  name="alarmTime"
                  value={formData.alarmTime}
                  onChange={onChange}
                  disabled={isProfileEditable}
                >
                  <option value="">선택</option>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
                <span>시에 알람을 받아요</span>
              </div>
            </SelectRow>
          </div>
        </Section>

        {/* --- Section 2: Resume Summary --- */}
        <Section>
          <div className="section-header">
            <h2>이력서 요약 정보</h2>
            <button type="button" onClick={handleResumeEditBtnClick}>
              {isResumeEditable ? "수정" : "수정 완료"}
              <img src={editicon} alt="edit" />
            </button>
          </div>

          <StyledTextArea
            name="summary"
            value={formData.summary}
            onChange={onChange}
            disabled={isResumeEditable}
            placeholder="이력서 요약을 입력해주세요."
            spellCheck={false}
          />
        </Section>
      </ProfileContainer>
    </PageWrapper>
  );
}

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;
`;

const ProfileContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 0 1.5rem;

  h1 {
    color: #141618;
    text-align: center;
    font-size: 2.375rem;
    font-weight: 600;
    margin-top: 3.5rem;
    margin-bottom: 2rem;

    @media (max-width: 480px) {
      font-size: 1.75rem;
      margin-top: 2rem;
    }
  }
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 3rem;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h2 {
      color: #141618;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
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
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #f7f8fa;
      }

      img {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  .input-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

// Integrated your custom CSS here
const SelectRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  label {
    /* Assuming standard label styles usually match InputGroup label */
    font-size: 1rem;
    font-weight: 500;
    min-width: 5rem;
    white-space: nowrap;
    color: #141618; /* Added for consistency */
  }

  .select-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    select {
      padding: 0.8rem 1rem;
      border-radius: 1.25rem;
      border: 1px solid #c2c4c8;
      background-color: white;
      cursor: pointer;
      min-width: 8rem;
      font-size: 1rem;

      /* Visual feedback for disabled state */
      &:disabled {
        background-color: #f7f8fa;
        cursor: not-allowed;
        color: #9da0a8;
      }

      &:focus {
        outline: none;
        border-color: #2e3847;
      }
    }

    span {
      color: #5a5c63;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
    }
  }

  /* Mobile handling */
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    .select-wrapper {
      width: 100%;
      justify-content: space-between; /* Spreads select and text on mobile */

      select {
        flex: 1; /* Makes select take available space */
      }
    }
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #eaebec;
  background: ${(props) => (props.disabled ? "#f7f8fa" : "#fff")};
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2e3847;
  }
`;
// 이전 버전 코드
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { InputGroup } from "../components/input-group";
// import editicon from "../assets/edit-icon.svg";

// export default function Profile() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [school, setSchool] = useState("");
//   const [major, setMajor] = useState("");
//   const [interest, setInterest] = useState("");
//   const [isProfileEditable, setisProfileEditable] = useState<boolean>(true);
//   // const [alarmPeriod, setAlarmPeriod] = useState("");
//   // const [alarmTime, setAlarmTime] = useState("");

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { name, value },
//     } = e;
//     // 아래 코드에서 모든 input에 name을 넣음으로써 input이 변경되었을 때 어떤 input이 변경되었는지 찾을 수 있다.
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "name") {
//       setName(value);
//     } else if (name === "phone") {
//       setPhone(value);
//     } else if (name === "school") {
//       setSchool(value);
//     } else if (name === "major") {
//       setMajor(value);
//     } else if (name === "interest") {
//       setInterest(value);
//     }
//     // Clear error when user starts typing
//     // if (error) {
//     //   setError("");
//     // }
//   };

//   const handleEditBtnClick = () => {
//     setisProfileEditable((prev) => !prev);
//   };
//   // const [userData, setUserData] = useState({
//   //   username: "",
//   //   phoneNumber: "",
//   //   email: "",
//   //   school: "",
//   //   major: "",
//   //   interestField: "",
//   //   intervalDays: "",
//   //   alarmTime: "",
//   // });
//   // const [resumeSummary, setResumeSummary] = useState(
//   //   "요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다."
//   // );

//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       if (!token) {
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
//   //           phoneNumber: data.phoneNumber || "",
//   //           email: data.email || "",
//   //           school: data.school || "",
//   //           major: data.major || "",
//   //           interestField: data.interestField || "",
//   //           intervalDays: data.intervalDays?.toString() || "",
//   //           alarmTime: data.alarmTime || "",
//   //         });
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching user data:", error);
//   //     }
//   //   };

//   //   fetchUserData();
//   // }, []);

//   // const formatPhoneNumber = (phone: string) => {
//   //   if (!phone) return { part1: "", part2: "", part3: "" };
//   //   const cleaned = phone.replace(/-/g, "");
//   //   if (cleaned.length === 11) {
//   //     return {
//   //       part1: cleaned.substring(0, 3),
//   //       part2: cleaned.substring(3, 7),
//   //       part3: cleaned.substring(7, 11),
//   //     };
//   //   }
//   //   return { part1: phone.substring(0, 3), part2: "", part3: "" };
//   // };

//   // const formatAlarmTime = (time: string) => {
//   //   if (!time) return "";
//   //   // Convert "HH:MM:SS" to "HH:MM"
//   //   if (time.includes(":")) {
//   //     const parts = time.split(":");
//   //     return `${parts[0]}:${parts[1]}`;
//   //   }
//   //   return time;
//   // };

//   // const phoneParts = formatPhoneNumber(userData.phoneNumber);

//   return (
//     <Wrapper>
//       <ProfileLayout>
//         <h1>내 프로필</h1>
//         <div className="basic-info-area">
//           <div className="basic-info-header">
//             <span>기본 정보</span>
//             <button onClick={handleEditBtnClick}>
//               {isProfileEditable ? "수정" : "수정 완료"}
//               <img src={editicon} />
//             </button>
//           </div>
//           <div className="basic-info-content">
//             <InputGroup
//               label="이름"
//               id="user-name"
//               type="text"
//               name="name"
//               placeholder="성함을 입력하세요"
//               value={name}
//               onChange={onChange}
//               required
//               disabled={isProfileEditable}
//             />
//             <InputGroup
//               label="전화번호"
//               id="user-phone"
//               type="tel"
//               name="phone"
//               placeholder="전화번호를 입력하세요"
//               value={phone}
//               onChange={onChange}
//               required
//               disabled={isProfileEditable}
//             />
//             <InputGroup
//               label="이메일"
//               id="user-email"
//               type="email"
//               name="email"
//               placeholder="이메일을 입력하세요"
//               value={email}
//               onChange={onChange}
//               required
//               disabled={isProfileEditable}
//             />
//             <InputGroup
//               label="학교"
//               id="user-school"
//               type="text"
//               name="school"
//               placeholder="예) 한국대학교"
//               value={school}
//               onChange={onChange}
//               required
//               disabled={isProfileEditable}
//             />
//             <InputGroup
//               label="학과"
//               id="user-department"
//               type="text"
//               name="major"
//               placeholder="예) 경영학과, 컴퓨터공학과"
//               value={major}
//               onChange={onChange}
//               required
//               disabled={isProfileEditable}
//             />
//             <InputGroup
//               label="관심 직무"
//               id="user-interest"
//               type="text"
//               name="interest"
//               placeholder="예) UI/UX 디자인, AI..."
//               value={interest}
//               onChange={onChange}
//               required
//               disabled={isProfileEditable}
//             />
//           </div>
//         </div>
//         <div className="resume-summary-area">
//           <div className="basic-info-header">
//             <span>이력서 요약 정보</span>
//             <button onClick={handleEditBtnClick}>
//               {isProfileEditable ? "수정" : "수정 완료"}
//               <img src={editicon} />
//             </button>
//           </div>
//           <p>
//             요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다. 요약문을
//             넣습니다.요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다.
//             요약문을 넣습니다.요약문을 넣습니다. 유저가 수정할 수 있는
//             내용입니다. 요약문을 넣습니다.요약문을 넣습니다. 유저가 수정할 수
//             있는 내용입니다. 요약문을 넣습니다.요약문을 넣습니다. 유저가 수정할
//             수 있는 내용입니다. 요약문을 넣습니다.요약문을 넣습니다. 유저가
//             수정할 수 있는 내용입니다. 요약문을 넣습니다.요약문을 넣습니다.
//             유저가 수정할 수 있는 내용입니다. 요약문을 넣습니다.요약문을
//             넣습니다. 유저가 수정할 수 있는 내용입니다. 요약문을
//             넣습니다.요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다.
//             요약문을 넣습니다.요약문을 넣습니다. 유저가 수정할 수 있는
//             내용입니다. 요약문을 넣습니다.요약문을 넣습니다. 유저가 수정할 수
//             있는 내용입니다. 요약문을 넣습니다.요약문을 넣습니다. 유저가 수정할
//             수 있는 내용입니다. 요약문을 넣습니다.요약문을 넣습니다. 유저가
//             수정할 수 있는 내용입니다. 요약문을 넣습니다.요약문을 넣습니다.
//             유저가 수정할 수 있는 내용입니다. 요약문을 넣습니다.요약문을
//             넣습니다. 유저가 수정할 수 있는 내용입니다. 요약문을
//             넣습니다.요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다.
//             요약문을 넣습니다.
//           </p>
//         </div>
//       </ProfileLayout>
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   width: 100%;
//   // height: 100vh;
//   background: #fff;
//   display: flex;
//   flex-direction: column;
//   // padding: 3rem;
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;
//   // background: #f7f8fa;
//   min-height: calc(100vh - 4rem);
// `;

// const ProfileLayout = styled.main`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   width: 100%;
//   min-height: 0;

//   h1 {
//     color: #141618;
//     text-align: center;
//     font-size: 2.375rem;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 150%;
//     margin-top: 3.4375rem;
//   }

//   .basic-info-area {
//     display: flex;
//     width: 27.8125rem;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1.875rem;
//     margin-top: 2.0625rem;

//     .basic-info-content {
//       display: flex;
//       flex-direction: column;
//       align-items: flex-start;
//       gap: 1.5rem;
//       align-self: stretch;
//     }
//   }

//   .resume-summary-area {
//     display: flex;
//     width: 27.8125rem;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1.875rem;
//     margin-top: 5.375rem;

//     p {
//       display: flex;
//       padding: 1rem;
//       align-items: flex-start;
//       gap: 0.625rem;
//       align-self: stretch;
//       flex: 1 0 0;
//       color: #000;
//       font-size: 1rem;
//       font-style: normal;
//       font-weight: 500;
//       line-height: 180%; /* 1.8rem */
//     }
//   }

//   .basic-info-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     align-self: stretch;

//     span {
//       color: #141618;
//       font-size: 1.25rem;
//       font-style: normal;
//       font-weight: 600;
//       line-height: 130%;
//     }

//     button {
//       display: flex;
//       padding: 0.25rem 0.5rem;
//       align-items: center;
//       gap: 0.25rem;
//       border-radius: 0.5rem;
//       border: 1px solid #eaebec;
//       background: #fff;
//       color: #5a5c63;
//       font-size: 1rem;
//       font-style: normal;
//       font-weight: 500;
//       line-height: 130%; /* 1.3rem */
//       cursor: pointer;
//       transition: all 0.2s;
//       &:hover {
//         background: #f7f8fa;
//       }
//     }
//   }
// `;

// 두 버전 이전의 코드
// export default function Profile() {
//   const [userData, setUserData] = useState({
//     username: "",
//     phoneNumber: "",
//     email: "",
//     school: "",
//     major: "",
//     interestField: "",
//     intervalDays: "",
//     alarmTime: "",
//   });
//   const [resumeSummary] = useState(
//     " 고려대학교 컴퓨터학과 재학 중인 2027년 졸업 예정자로, 머신러닝·데이터사이언스·파이썬·클라우드 기반 개발에 강점을 가지고 있으며 AWS Solutions Architect Associate와 AI Practitioner 자격을 보유하고 있다. React, Next.js, Firebase, GCP, LLM 파인튜닝 등을 활용해 유료 사용자 기반 웹서비스인 '1 Cup English'를 처음부터 끝까지 직접 기획·개발·운영했고, Supabase와 PostgreSQL을 활용한 해커톤 우승 프로젝트 'K Saju'도 팀 기반 협업으로 완성했다. 또한 Sendbird, CJ Foods, 한미연합사에서 총 6년 이상 전문 통역 경험을 쌓았고, 경영진 미팅·고객 협상·엔지니어링 회의 등 고난도 환경에서 실시간 통역을 수행해왔다. 기술 역량과 실전 제품 개발 경험, 그리고 뛰어난 커뮤니케이션 능력이 결합된 드문 프로필이다."
//   );

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           return;
//         }

//         const response = await fetch("https://api.etf.r-e.kr/auth/me", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUserData({
//             username: data.username || "",
//             phoneNumber: data.phoneNumber || "",
//             email: data.email || "",
//             school: data.school || "",
//             major: data.major || "",
//             interestField: data.interestField || "",
//             intervalDays: data.intervalDays?.toString() || "",
//             alarmTime: data.alarmTime || "",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const formatPhoneNumber = (phone: string) => {
//     if (!phone) return { part1: "", part2: "", part3: "" };
//     const cleaned = phone.replace(/-/g, "");
//     if (cleaned.length === 11) {
//       return {
//         part1: cleaned.substring(0, 3),
//         part2: cleaned.substring(3, 7),
//         part3: cleaned.substring(7, 11),
//       };
//     }
//     return { part1: phone.substring(0, 3), part2: "", part3: "" };
//   };

//   const formatAlarmTime = (time: string) => {
//     if (!time) return "";
//     // Convert "HH:MM:SS" to "HH:MM"
//     if (time.includes(":")) {
//       const parts = time.split(":");
//       return `${parts[0]}:${parts[1]}`;
//     }
//     return time;
//   };

//   const phoneParts = formatPhoneNumber(userData.phoneNumber);

//   return (
//     <Wrapper>
//       <MainContent>
//         <Section>
//           <SectionHeader>
//             <SectionTitle>기본정보</SectionTitle>
//             <EditButton>
//               <EditButtonText>수정</EditButtonText>
//               <PencilIcon>
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M11.3333 2.00004C11.5084 1.82493 11.7163 1.68605 11.9444 1.59129C12.1726 1.49654 12.4163 1.44775 12.6625 1.44775C12.9087 1.44775 13.1524 1.49654 13.3806 1.59129C13.6087 1.68605 13.8166 1.82493 13.9917 2.00004C14.1668 2.17515 14.3057 2.38306 14.4004 2.61119C14.4952 2.83932 14.544 3.08301 14.544 3.32921C14.544 3.57541 14.4952 3.8191 14.4004 4.04723C14.3057 4.27536 14.1668 4.48327 13.9917 4.65838L5.32498 13.325L1.33331 14.6667L2.67498 10.675L11.3333 2.00004Z"
//                     stroke="#5a5c63"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </PencilIcon>
//             </EditButton>
//           </SectionHeader>
//           <InfoFields>
//
//           </InfoFields>
//         </Section>
//         <Section>
//           <SectionHeader alignEnd>
//             <SectionTitle>이력서 요약 정보</SectionTitle>
//             <EditButton>
//               <EditButtonText>수정</EditButtonText>
//               <PencilIcon>
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M11.3333 2.00004C11.5084 1.82493 11.7163 1.68605 11.9444 1.59129C12.1726 1.49654 12.4163 1.44775 12.6625 1.44775C12.9087 1.44775 13.1524 1.49654 13.3806 1.59129C13.6087 1.68605 13.8166 1.82493 13.9917 2.00004C14.1668 2.17515 14.3057 2.38306 14.4004 2.61119C14.4952 2.83932 14.544 3.08301 14.544 3.32921C14.544 3.57541 14.4952 3.8191 14.4004 4.04723C14.3057 4.27536 14.1668 4.48327 13.9917 4.65838L5.32498 13.325L1.33331 14.6667L2.67498 10.675L11.3333 2.00004Z"
//                     stroke="#5a5c63"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </PencilIcon>
//             </EditButton>
//           </SectionHeader>
//           <ResumeSummaryBox>
//             <ResumeSummaryText>{resumeSummary}</ResumeSummaryText>
//           </ResumeSummaryBox>
//         </Section>
//       </MainContent>
//     </Wrapper>
//   );
// }
