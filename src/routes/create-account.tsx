// // 현재 구버전 코드 로드중
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { Button } from "../components/Button";
// import logo from "../assets/logo.svg";
// import StyledCheckButton from "../components/check-button";
// import { InputGroup } from "../components/input-group";

// export default function Login() {
//   const navigate = useNavigate();
//   const [isAgreed, setIsAgreed] = useState(false);
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [school, setSchool] = useState("");
//   const [major, setMajor] = useState("");
//   const [interest, setInterest] = useState("");
//   const [alarmPeriod, setAlarmPeriod] = useState("");
//   const [alarmTime, setAlarmTime] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { name, value },
//     } = e;
//     // 아래 코드에서 모든 input에 name을 넣음으로써 input이 변경되었을 때 어떤 input이 변경되었는지 찾을 수 있다.
//     if (name === "id") {
//       setId(value);
//     } else if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
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
//     if (error) {
//       setError("");
//     }
//   };

//   const handleAgreementClick = () => {
//     setIsAgreed((prev) => !prev);
//   };

//   const formatAlarmTime = (hour: string): string => {
//     const hourNum = parseInt(hour, 10);
//     const formattedHour = hourNum.toString().padStart(2, "0");
//     return `${formattedHour}:00:00`;
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     // Validate required fields
//     if (
//       !isAgreed ||
//       !id ||
//       !password ||
//       !name ||
//       !phone ||
//       !email ||
//       !school ||
//       !major ||
//       !interest ||
//       !alarmPeriod ||
//       !alarmTime
//     ) {
//       setError("모든 필드를 입력하고 동의를 확인해주세요.");
//       return;
//     }

//     if (isLoading) {
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Format alarmTime from hour value to "HH:MM:SS" format
//       const formattedAlarmTime = formatAlarmTime(alarmTime);

//       // Prepare request body
//       const requestBody = {
//         loginId: id,
//         password: password,
//         username: name,
//         phoneNumber: phone,
//         email: email,
//         school: school,
//         major: major,
//         interestField: interest,
//         intervalDays: parseInt(alarmPeriod, 10),
//         alarmTime: formattedAlarmTime,
//       };

//       // API request
//       const response = await fetch("https://api.etf.r-e.kr/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({
//           message: "회원가입에 실패했습니다.",
//         }));
//         throw new Error(errorData.message || "회원가입에 실패했습니다.");
//       }

//       // Parse response to ensure it's valid JSON
//       await response.json();

//       // Navigate to login page on success
//       navigate("/login");
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("회원가입 중 오류가 발생했습니다.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Wrapper>
//       <SignupForm onSubmit={onSubmit}>
//         <SignupLayout>
//           <div className="intro-area">
//             <img src={logo} alt="Logo" />
//             <span id="service-name">알려주잡</span>
//             <span id="create-account">회원가입</span>
//           </div>
//           <LoginInfoContainer>
//             <span>로그인 정보</span>
//             {/* <form className="login-area" onSubmit={onSubmit}> */}
//             <div className="login-area">
//               <InputGroup
//                 label="아이디"
//                 id="user-id"
//                 name="id"
//                 placeholder="아이디를 입력하세요"
//                 value={id}
//                 onChange={onChange}
//                 required
//                 disabled={isLoading}
//               />

//               <InputGroup
//                 label="비밀번호"
//                 id="user-pw"
//                 type="password"
//                 name="password"
//                 placeholder="비밀번호를 입력하세요"
//                 value={password}
//                 onChange={onChange}
//                 required
//                 disabled={isLoading}
//               />
//               {/* </form> */}
//             </div>
//           </LoginInfoContainer>
//           <BasicInfoContainer>
//             <span>기본 정보</span>
//             {/* <form className="basic-info-area" onSubmit={onSubmit}> */}
//             <div className="basic-info-area">
//               <InputGroup
//                 label="이름"
//                 id="user-name"
//                 type="text"
//                 name="name"
//                 placeholder="성함을 입력하세요"
//                 value={name}
//                 onChange={onChange}
//                 required
//                 disabled={isLoading}
//               />
//               <InputGroup
//                 label="전화번호"
//                 id="user-phone"
//                 type="tel"
//                 name="phone"
//                 placeholder="전화번호를 입력하세요"
//                 value={phone}
//                 onChange={onChange}
//                 required
//                 disabled={isLoading}
//               />
//               <InputGroup
//                 label="이메일"
//                 id="user-email"
//                 type="email"
//                 name="email"
//                 placeholder="이메일을 입력하세요"
//                 value={email}
//                 onChange={onChange}
//                 required
//                 disabled={isLoading}
//               />
//               <InputGroup
//                 label="학교"
//                 id="user-school"
//                 type="text"
//                 name="school"
//                 placeholder="예) 한국대학교"
//                 value={school}
//                 onChange={onChange}
//                 required
//                 disabled={isLoading}
//               />
//               <InputGroup
//                 label="학과"
//                 id="user-department"
//                 type="text"
//                 name="major"
//                 placeholder="예) 경영학과, 컴퓨터공학과"
//                 value={major}
//                 onChange={onChange}
//                 required
//                 disabled={isLoading}
//               />
//               <InputGroup
//                 label="관심 직무"
//                 id="user-interest"
//                 type="text"
//                 name="interest"
//                 placeholder="예) UI/UX 디자인, AI..."
//                 value={interest}
//                 onChange={onChange}
//                 required
//                 disabled={isLoading}
//               />
//               <div className="selector-container">
//                 <label htmlFor="alarm-period">알림 주기</label>
//                 <div className="input-wrapper">
//                   <select
//                     id="alarm-period"
//                     name="alarmPeriod"
//                     value={alarmPeriod}
//                     onChange={(e) => setAlarmPeriod(e.target.value)}
//                     required
//                     disabled={isLoading}
//                   >
//                     <option value="">선택</option>
//                     {[1, 2, 3, 4, 5, 6, 7].map((v) => (
//                       <option key={v} value={v}>
//                         {v}
//                       </option>
//                     ))}
//                   </select>
//                   <span> 일마다 한 번씩</span>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="alarm-time">알림 시간</label>
//                 <div className="input-wrapper">
//                   <select
//                     id="alarm-time"
//                     name="alarmTime"
//                     value={alarmTime}
//                     onChange={(e) => setAlarmTime(e.target.value)}
//                     required
//                     disabled={isLoading}
//                   >
//                     <option value="">선택</option>
//                     {Array.from({ length: 24 }).map((_, i) => (
//                       <option key={i} value={i}>
//                         {i.toString().padStart(2, "0")}:00
//                       </option>
//                     ))}
//                   </select>
//                   <span> 시에 알람을 받아요</span>
//                 </div>
//               </div>
//               {/* </form> */}
//             </div>
//           </BasicInfoContainer>
//           <AgreementContainer>
//             {/* <button
//               id="agreement"
//               type="button"
//               onClick={handleAgreementClick}
//               disabled={isLoading}
//               isAgreed={isAgreed}
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="12" cy="12" r="12" fill="none" />
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M17.4458 8.61395C17.5614 8.72952 17.5614 8.9169 17.4458 9.03248L10.315 16.1633C10.1994 16.2789 10.012 16.2789 9.89643 16.1633L6.55445 12.8213C6.43888 12.7058 6.43888 12.5184 6.55445 12.4028L7.33172 11.6256C7.44729 11.51 7.63468 11.51 7.75025 11.6256L10.1057 13.981L16.25 7.83668C16.3656 7.72111 16.553 7.72111 16.6685 7.83668L17.4458 8.61395Z"
//                   fill="white"
//                 />
//               </svg>
//             </button> */}
//             <StyledCheckButton
//               onClick={handleAgreementClick}
//               disabled={isLoading}
//               $isAgreed={isAgreed}
//             />
//             <span>
//               본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교,
//               연락처 등의 기본 정보 수집 및 이용에 동의합니다.
//             </span>
//           </AgreementContainer>
//           <SignupFinishButton type="submit">회원가입</SignupFinishButton>
//         </SignupLayout>
//       </SignupForm>
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: #fff;
//   display: flex;
//   flex-direction: column;
// `;

// const SignupForm = styled.form`
//   width: 100%;
//   align-items: center;
// `;

// const SignupLayout = styled.div`
//   display: flex;
//   width: 100%;
//   padding-top: 3rem;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;

//   .intro-area {
//     display: flex;
//     width: 15.0625rem;
//     flex-direction: column;
//     align-items: center;
//     margin-bottom: 3.25rem;

//     img {
//       width: 4.86rem;
//       height: 4.86rem;
//       margin-bottom: 0.45rem;
//     }

//     #service-name {
//       color: #2e3847;
//       font-size: 1.35rem;
//       font-style: normal;
//       font-weight: 500;
//       line-height: normal;
//       letter-spacing: -0.054rem;
//       margin-bottom: 0.75rem;
//     }

//     #create-account {
//       color: #141618;
//       text-align: center;
//       font-size: 2.375rem;
//       font-style: normal;
//       font-weight: 600;
//       line-height: 150%;
//     }
//   }
// `;

// const LoginInfoContainer = styled.div`
//   display: flex;
//   width: 27.8125rem;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 1.875rem;
//   margin-bottom: 4.25rem;

//   span {
//     color: #141618;
//     font-size: 1.25rem;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 130%;
//     align-self: stretch;
//   }

//   .login-area {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1.5rem;
//     align-self: stretch;

//     div {
//       display: flex;
//       width: 27.8125rem;
//       justify-content: space-between;
//       align-items: center;

//       label {
//         color: #141618;
//         font-size: 1rem;
//         font-style: normal;
//         font-weight: 500;
//         line-height: 130%;
//       }
//       input {
//         display: flex;
//         width: 21.625rem;
//         padding: 0.5rem 1rem;
//         align-items: center;
//         gap: 0.625rem;
//         flex-shrink: 0;
//         border-radius: 1.25rem;
//         border: 1px solid #c2c4c8;
//       }
//     }
//   }
// `;

// const BasicInfoContainer = styled.div`
//   display: flex;
//   width: 27.8125rem;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 1.875rem;
//   margin-bottom: 5.625rem;

//   span {
//     color: #141618;
//     font-size: 1.25rem;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 130%;
//   }

//   .basic-info-area {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1.5rem;
//     align-self: stretch;

//     div {
//       display: flex;
//       width: 27.8125rem;
//       justify-content: space-between;
//       align-items: center;

//       label {
//         color: #141618;
//         font-size: 1rem;
//         font-style: normal;
//         font-weight: 500;
//         line-height: 130%;
//       }

//       .input-wrapper {
//         justify-content: flex-start;
//         width: 21.625rem;
//         display: flex;
//         align-items: center;
//         gap: 0.375rem;

//         select {
//           display: flex;
//           width: 7.5rem;
//           padding: 0.5rem 1rem;
//           justify-content: space-between;
//           align-items: center;
//           border-radius: 1.25rem;
//           border: 1px solid #c2c4c8;
//         }

//         span {
//           color: #5a5c63;
//           text-align: center;
//           font-size: 0.875rem;
//           font-style: normal;
//           font-weight: 500;
//           line-height: 130%;
//         }
//       }

//       input {
//         display: flex;
//         width: 21.625rem;
//         padding: 0.5rem 1rem;
//         align-items: center;
//         gap: 0.625rem;
//         flex-shrink: 0;
//         border-radius: 1.25rem;
//         border: 1px solid #c2c4c8;
//       }

//       // select {
//       //   display: flex;
//       //   width: 7.5rem;
//       //   padding: 0.5rem 1rem;
//       //   justify-content: space-between;
//       //   align-items: center;
//       //   border-radius: 1.25rem;
//       //   border: 1px solid #c2c4c8;
//       // }

//       // span {
//       //   color: #5a5c63;
//       //   text-align: center;
//       //   font-size: 0.875rem;
//       //   font-style: normal;
//       //   font-weight: 500;
//       //   line-height: 130%;
//       // }
//     }
//   }
// `;

// const AgreementContainer = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.375rem;
//   margin-bottom: 1.75rem;

//   #agreement {
//     width: 1.5rem;
//     height: 1.5rem;
//     flex-shrink: 0;
//     border-radius: 0.75rem;
//     align-items: center;
//     justify-content: center;
//     border: none;
//     padding: 0;
//     cursor: pointer;
//     transition: background-color 0.2s ease;
//   }

//   span {
//     color: #000;
//     text-align: center;
//     font-size: 0.875rem;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 130%;
//   }
// `;

// const SignupFinishButton = styled(Button)`
//   padding: 0.625rem 1.25rem;
//   gap: 0.625rem;
//   border-radius: 0.5rem;
//   background: #c2c4c8;
//   color: #eaebec;
//   font-size: 1.25rem;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 150%;
// `;

// --- 두 버전 이전의 코드
import React, { useState } from "react";
import { Button } from "../components/Button";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import StyledCheckButton from "../components/check-button";
import { InputGroup } from "../components/input-group";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();

  // State
  const [isAgreed, setIsAgreed] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
    password: "",
    phone: "",
    school: "",
    major: "",
    interest: "",
    alarmPeriod: "",
    alarmTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handlers
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleAgreementClick = () => {
    setIsAgreed((prev) => !prev);
  };

  const checkIdDuplicate = async (id: string) => {
    try {
      const response = await fetch(
        `https://api.etf.r-e.kr/auth/check-id?loginId=${id}`
      );
      const data = await response.json();
      if (data.isDuplicate) {
        alert("이미 사용 중인 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    } catch (err) {
      alert("연결 오류가 발생했습니다.");
    }
  };

  const checkPhoneDuplicate = async (phone: string) => {
    try {
      const response = await fetch(
        `https://api.etf.r-e.kr/auth/check-id?loginId=${phone}`
      );
      const data = await response.json();
      if (data.isDuplicate) {
        alert("이미 사용 중인 전화번호입니다.");
      } else {
        alert("사용 가능한 전화번호입니다.");
      }
    } catch (err) {
      alert("연결 오류가 발생했습니다.");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Check for empty values
    const values = Object.values(formData);
    if (!isAgreed || values.some((v) => v === "")) {
      setError("모든 필드를 입력하고 동의를 확인해주세요.");
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      const requestBody = {
        loginId: formData.id,
        password: formData.password,
        username: formData.name,
        phoneNumber: formData.phone,
        email: formData.email,
        school: formData.school,
        major: formData.major,
        interestField: formData.interest,
        intervalDays: parseInt(formData.alarmPeriod, 10),
        alarmTime: `${formData.alarmTime.padStart(2, "0")}:00:00`,
      };

      const response = await fetch("https://api.etf.r-e.kr/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }

      navigate("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "회원가입 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <ContentContainer>
        {/* Header Section */}
        <header className="intro-area">
          <img src={logo} alt="Logo" />
          <span className="service-name">알려주잡</span>
          <h1 className="title">회원가입</h1>
        </header>

        <StyledForm onSubmit={onSubmit}>
          {/* Section 1: Login Info */}
          <FormSection>
            <h2>로그인 정보</h2>
            <div className="fields-group">
              <InputGroup
                label="아이디"
                id="user-id"
                name="id"
                placeholder="아이디를 입력하세요"
                value={formData.id}
                onChange={onChange}
                disabled={isLoading}
                duplicateCheck={true}
                onCheckDuplicate={checkIdDuplicate}
                required
              />
              <InputGroup
                label="비밀번호"
                id="user-pw"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={onChange}
                disabled={isLoading}
                required
              />
            </div>
          </FormSection>

          {/* Section 2: Basic Info */}
          <FormSection>
            <h2>기본 정보</h2>
            <div className="fields-group">
              <InputGroup
                label="이름"
                id="user-name"
                name="name"
                placeholder="성함을 입력하세요"
                value={formData.name}
                onChange={onChange}
                disabled={isLoading}
                required
              />
              <InputGroup
                label="전화번호"
                id="user-phone"
                type="tel"
                name="phone"
                placeholder="전화번호를 입력하세요"
                value={formData.phone}
                onChange={onChange}
                disabled={isLoading}
                onCheckDuplicate={checkPhoneDuplicate}
                required
                duplicateCheck={true}
              />
              <InputGroup
                label="이메일"
                id="user-email"
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={onChange}
                disabled={isLoading}
                required
              />
              <InputGroup
                label="학교"
                id="user-school"
                name="school"
                placeholder="예) 한국대학교"
                value={formData.school}
                onChange={onChange}
                disabled={isLoading}
              />
              <InputGroup
                label="학과"
                id="user-department"
                name="major"
                placeholder="예) 경영학과"
                value={formData.major}
                onChange={onChange}
                disabled={isLoading}
              />
              <InputGroup
                label="관심 직무"
                id="user-interest"
                name="interest"
                placeholder="예) UI/UX 디자인"
                value={formData.interest}
                onChange={onChange}
                disabled={isLoading}
                required
              />

              {/* Custom Select Inputs */}
              <div className="custom-select-row">
                <label htmlFor="alarm-period">알림 주기</label>
                <div className="select-wrapper">
                  <select
                    id="alarm-period"
                    name="alarmPeriod"
                    value={formData.alarmPeriod}
                    onChange={onChange}
                    disabled={isLoading}
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
              </div>

              <div className="custom-select-row">
                <label htmlFor="alarm-time">알림 시간</label>
                <div className="select-wrapper">
                  <select
                    id="alarm-time"
                    name="alarmTime"
                    value={formData.alarmTime}
                    onChange={onChange}
                    disabled={isLoading}
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
              </div>
            </div>
          </FormSection>

          {/* Agreement Section */}
          <AgreementSection>
            <StyledCheckButton
              onClick={handleAgreementClick}
              disabled={isLoading}
              $isAgreed={isAgreed}
              // type="button"
            />
            <label onClick={!isLoading ? handleAgreementClick : undefined}>
              본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교,
              연락처 등의 기본 정보 수집 및 이용에 동의합니다.
            </label>
          </AgreementSection>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton
            type="submit"
            disabled={isLoading || !isAgreed}
            $active={
              isAgreed &&
              !isLoading &&
              formData.id !== "" &&
              formData.password !== "" &&
              formData.name !== "" &&
              formData.phone !== "" &&
              formData.email !== ""
            }
          >
            {isLoading ? "처리 중..." : "회원가입"}
          </SubmitButton>
        </StyledForm>
      </ContentContainer>
    </PageWrapper>
  );
}

// --- Styled Components ---

const PageWrapper = styled.main`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;

  /* Responsive: Add padding for mobile screens */
  padding: 0 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 30rem; /* Replaces fixed width 27.8125rem */
  padding-top: 3rem;
  padding-bottom: 3rem;

  .intro-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3.25rem;

    img {
      width: 4.8rem;
      height: 4.8rem;
      margin-bottom: 0.5rem;
    }

    .service-name {
      color: #2e3847;
      font-size: 1.35rem;
      font-weight: 500;
      letter-spacing: -0.05rem;
      margin-bottom: 0.75rem;
    }

    .title {
      color: #141618;
      font-size: 2.375rem;
      font-weight: 600;
      line-height: 1.5;
    }
  }
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem; /* Replaces large margins between sections */
`;

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  h2 {
    color: #141618;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .fields-group {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Styling for the custom Select rows to match InputGroup */
  .custom-select-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    label {
      font-size: 1rem;
      font-weight: 500;
      min-width: 5rem;
      white-space: nowrap;
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

    /* Mobile handling for selects */
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;

      .select-wrapper {
        width: 100%;
      }
    }
  }
`;

const AgreementSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: -1rem; /* Adjustment if gap in form is too large */

  label {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4b4b;
  font-size: 0.9rem;
  text-align: center;
  margin-top: -2rem;
`;

const SubmitButton = styled(Button)<{ $active: boolean }>`
  width: 100%;
  max-width: 9.3125rem;
  justify-content: center;
  align-self: center;

  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;

  background: ${({ $active }) =>
    $active ? "#06F" : "#c2c4c8"}; /* Darker color for active */
  color: #eaebec;
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
  transition: background-color 0.3s;

  // &:hover {
  //   background: ${({ $active }) => ($active ? "#141618" : "#c2c4c8")};
  // }
`;
