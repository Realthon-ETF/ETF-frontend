import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InputGroup } from "../components/input-group";
import editicon from "../assets/edit-icon.svg";
import api from "../api"; // Import your axios instance
// import { useAuth } from "../AuthContext";

interface ProfileFormData {
  name: string;
  phone: string;
  email: string;
  school: string;
  major: string;
  interest: string; // Managed as a string in the UI
  alarmPeriod: string; // Managed as string to match <select> value
  alarmTime: string; // Managed as "09" (string)
  summary: string;
}

interface ProfileResponse {
  userId: number;
  loginId: string;
  username: string;
  phoneNumber: string;
  email: string;
  school: string;
  major: string;
  interestFields: string[];
  intervalDays: number;
  alarmTime: string; // response는 "09:30:00"와 같이 받지만,
  // 실제 저장은 '시/분/초' 중 '시'만 저장함
}

interface ResumeResponse {
  userId: number;
  summary: string;
}

export default function Profile() {
  // const { user } = useAuth();
  // const [isLoading, setIsLoading] = useState(true);
  // 1. Refactor: Use a single object for all form data
  const [formData, setFormData] = useState<ProfileFormData>({
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

  const [isProfileEditable, setIsProfileEditable] = useState<boolean>(false);
  const [isResumeEditable, setIsResumeEditable] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      // try {
      //   // setIsLoading(true);
      //   // api.ts automatically attaches the Bearer token
      //   const { data } = await api.get<ProfileResponse>("/auth/me");
      //   // const { data: resume } = await api.get<ResumeResponse>("/resumes/pdf");

      //   // 3. Map API data to local state
      //   setFormData((prev) => ({
      //     ...prev,
      //     name: data.username,
      //     phone: data.phoneNumber,
      //     email: data.email,
      //     school: data.school, // not required
      //     major: data.major, // not required
      //     interest: data.interestFields.join(", "), // Array to String
      //     alarmPeriod: data.intervalDays.toString(), // default value exists
      //     // alarmPeriod: data.parseInt(formData.alarmPeriod, 10),
      //     // alarmTime:
      //     alarmTime: data.alarmTime.split(":")[0], // "09:30:00" -> "09"
      //     // alarmTime: parseInt(data.alarmTime, 10);
      //     // default value exists
      //   }));

      //   // setFormData((prev) => ({
      //   //   ...prev,
      //   //   summary: resume.summary,
      //   // }));
      // } catch (err) {
      //   console.error("Failed to fetch profile:", err);
      //   alert("프로필 정보를 불러오는데 실패했습니다.");
      // } finally {
      //   // setIsLoading(false);
      // }
      try {
        const { data } = await api.get<ProfileResponse>("/auth/me");
        setFormData((prev) => ({
          ...prev,
          name: data.username,
          phone: data.phoneNumber,
          email: data.email,
          school: data.school,
          major: data.major,
          interest: data.interestFields.join(", "),
          alarmPeriod: data.intervalDays.toString(),
          alarmTime: data.alarmTime.split(":")[0],
        }));
      } catch (err) {
        console.error("Profile fetch failed:", err);
        // Optional: alert("프로필 정보를 불러오는데 실패했습니다.");
      }

      // 2. Fetch Resume Data independently
      try {
        const { data } = await api.get<ResumeResponse>("/auth/resume");
        setFormData((prev) => ({
          ...prev,
          summary: data.summary,
        }));
      } catch (err) {
        console.error("Resume fetch failed:", err);
      }
    };

    fetchProfile();
  }, []);

  // 2. Unified Change Handler
  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileEditBtnClick = async () => {
    if (isProfileEditable) {
      // If we are currently in "Edit Mode" and clicking "수정 완료"
      try {
        // update할 필요가 없다면 const {data}로 return을 받아올 필요가 없음
        await api.patch("/auth/me", {
          username: formData.name,
          phoneNumber: formData.phone,
          email: formData.email,
          school: formData.school,
          major: formData.major,
          intervalDays: parseInt(formData.alarmPeriod, 10),
          // alarmTime: `${formData.alarmTime.padStart(2, "0")}:00:00`,
          alarmTime: `${formData.alarmTime || "3".padStart(2, "0")}:00:00`,
        });
        // todo: update username if modified
        // updateUser(data.username);
        // This requires adding a 'setUser' or 'updateUser' method to your AuthContext
        alert("저장되었습니다.");
      } catch (err) {
        alert("저장에 실패했습니다.");
        return; // Don't exit edit mode if save fails
      }
    }
    setIsProfileEditable((prev) => !prev);
  };

  const handleResumeEditBtnClick = async () => {
    if (isResumeEditable) {
      // If we are currently in "Edit Mode" and clicking "수정 완료"
      try {
        await api.patch("/auth/resume", {
          summary: formData.summary,
        });
        alert("저장되었습니다.");
      } catch (err) {
        alert("저장에 실패했습니다.");
        return; // Don't exit edit mode if save fails
      }
    }
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
              {isProfileEditable ? "완료" : "수정"}
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
              disabled={!isProfileEditable}
            />
            <InputGroup
              label="전화번호"
              id="user-phone"
              type="tel"
              name="phone"
              placeholder="전화번호를 입력하세요"
              value={formData.phone}
              onChange={onChange}
              disabled={!isProfileEditable}
            />
            <InputGroup
              label="이메일"
              id="user-email"
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={onChange}
              disabled={!isProfileEditable}
            />
            <InputGroup
              label="학교"
              id="user-school"
              name="school"
              placeholder="예) 한국대학교"
              value={formData.school}
              onChange={onChange}
              disabled={!isProfileEditable}
            />
            <InputGroup
              label="학과"
              id="user-department"
              name="major"
              placeholder="예) 경영학과"
              value={formData.major}
              onChange={onChange}
              disabled={!isProfileEditable}
            />
            <InputGroup
              label="관심 직무"
              id="user-interest"
              name="interest"
              placeholder="예) UI/UX 디자인"
              value={formData.interest}
              onChange={onChange}
              disabled={!isProfileEditable}
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
                  disabled={!isProfileEditable}
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
                  disabled={!isProfileEditable}
                >
                  <option value="">선택</option>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, "0")}>
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
              {isResumeEditable ? "완료" : "수정"}
              <img src={editicon} alt="edit" />
            </button>
          </div>

          <StyledTextArea
            name="summary"
            value={formData.summary}
            onChange={onChange}
            disabled={!isResumeEditable}
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
  const PageWrapper = styled.div
  padding: 0 1rem;
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
        background-color: #f5f5f5;
        cursor: not-allowed;
        color: #999;
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
