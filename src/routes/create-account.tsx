import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import logo from "../assets/logo.svg";
import StyledCheckButton from "../components/check-button";
import { InputGroup } from "../components/input-group";
export default function Login() {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");
  const [alarmPeriod, setAlarmPeriod] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    // 아래 코드에서 모든 input에 name을 넣음으로써 input이 변경되었을 때 어떤 input이 변경되었는지 찾을 수 있다.
    if (name === "id") {
      setId(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "school") {
      setSchool(value);
    } else if (name === "major") {
      setMajor(value);
    } else if (name === "interest") {
      setInterest(value);
    }
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleAgreementClick = () => {
    setIsAgreed((prev) => !prev);
  };

  const formatAlarmTime = (hour: string): string => {
    const hourNum = parseInt(hour, 10);
    const formattedHour = hourNum.toString().padStart(2, "0");
    return `${formattedHour}:00:00`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (
      !isAgreed ||
      !id ||
      !password ||
      !name ||
      !phone ||
      !email ||
      !school ||
      !major ||
      !interest ||
      !alarmPeriod ||
      !alarmTime
    ) {
      setError("모든 필드를 입력하고 동의를 확인해주세요.");
      return;
    }

    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      // Format alarmTime from hour value to "HH:MM:SS" format
      const formattedAlarmTime = formatAlarmTime(alarmTime);

      // Prepare request body
      const requestBody = {
        loginId: id,
        password: password,
        username: name,
        phoneNumber: phone,
        email: email,
        school: school,
        major: major,
        interestField: interest,
        intervalDays: parseInt(alarmPeriod, 10),
        alarmTime: formattedAlarmTime,
      };

      // API request
      const response = await fetch("https://api.etf.r-e.kr/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "회원가입에 실패했습니다.",
        }));
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }

      // Parse response to ensure it's valid JSON
      await response.json();

      // Navigate to login page on success
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  // return (
  //   <Wrapper>
  //     <LoginLayout>
  //       <SignupForm onSubmit={onSubmit}>
  //         <HeaderContainer>
  //           <LogoTitleHolder>
  //             <LogoHolder>
  //              <svg>
  //             </LogoHolder>
  //             <TitleText>알려주잡</TitleText>
  //           </LogoTitleHolder>
  //           <RegisterText>회원가입</RegisterText>
  //         </HeaderContainer>
  //         <LoginFormContainer>
  //           <LoginInfo>로그인 정보</LoginInfo>
  //           <FormWrapper>
  //             <InputWrapper>
  //               <InputTypeHolder>
  //                 <InputText>아이디</InputText>
  //                 <InputHolder
  //                   onChange={onChange}
  //                   name="id"
  //                   value={id}
  //                   type="text"
  //                   required
  //                   placeholder="아이디를 입력하세요"
  //                   disabled={isLoading}
  //                 />
  //               </InputTypeHolder>
  //               <InputTypeHolder>
  //                 <InputText>비밀번호</InputText>
  //                 <InputHolder
  //                   onChange={onChange}
  //                   name="password"
  //                   value={password}
  //                   type="password"
  //                   required
  //                   placeholder="비밀번호를 입력하세요"
  //                   disabled={isLoading}
  //                 />
  //               </InputTypeHolder>
  //             </InputWrapper>
  //           </FormWrapper>
  //         </LoginFormContainer>
  //         <BasicInfoContainer>
  //           <LoginInfo>기본 정보</LoginInfo>
  //           <FormWrapper>
  //             <InputWrapper>
  //               <InputTypeHolder>
  //                 <InputText>이름</InputText>
  //                 <InputHolder
  //                   onChange={onChange}
  //                   name="name"
  //                   value={name}
  //                   type="text"
  //                   required
  //                   placeholder="성함을 입력하세요"
  //                   disabled={isLoading}
  //                 />
  //               </InputTypeHolder>
  //               <InputTypeHolder>
  //                 <InputText>전화번호</InputText>
  //                 <InputHolder
  //                   onChange={onChange}
  //                   name="phone"
  //                   value={phone}
  //                   type="tel"
  //                   required
  //                   placeholder="입력"
  //                   disabled={isLoading}
  //                 />
  //               </InputTypeHolder>
  //               <InputTypeHolder>
  //                 <InputText>이메일</InputText>
  //                 <InputHolder
  //                   onChange={onChange}
  //                   name="email"
  //                   value={email}
  //                   type="email"
  //                   required
  //                   placeholder="이메일을 입력하세요"
  //                   disabled={isLoading}
  //                 />
  //               </InputTypeHolder>
  //               <InputTypeHolder>
  //                 <InputText>학교</InputText>
  //                 <InputHolder
  //                   onChange={onChange}
  //                   name="school"
  //                   value={school}
  //                   type="text"
  //                   required
  //                   placeholder="예) 한국대학교"
  //                   disabled={isLoading}
  //                 />
  //               </InputTypeHolder>
  //               <InputTypeHolder>
  //                 <InputText>학과</InputText>
  //                 <InputHolder
  //                   onChange={onChange}
  //                   name="major"
  //                   value={major}
  //                   type="text"
  //                   required
  //                   placeholder="예) 경영학과, 컴퓨터공학과"
  //                   disabled={isLoading}
  //                 />
  //               </InputTypeHolder>
  //               <InputTypeHolder>
  //                 <InputText>관심 직무</InputText>
  //                 <InputHolder
  //                   onChange={onChange}
  //                   name="interest"
  //                   value={interest}
  //                   type="text"
  //                   required
  //                   placeholder="예) UI/UX 디자인, UX리서치, UX디자인"
  //                   disabled={isLoading}
  //                 />
  //               </InputTypeHolder>
  //               {/* <InputTypeHolder>
  //               <InputText>알림 주기</InputText> */}
  //               {/* <InputHolder placeholder="예) UI/UX 디자인, UX리서치, UX디자인" /> */}
  //               <InputTypeHolder>
  //                 <InputText>알림 주기</InputText>
  //                 <PeriodHolder>
  //                   <SelectHolder
  //                     name="alarmPeriod"
  //                     value={alarmPeriod}
  //                     onChange={(e) => setAlarmPeriod(e.target.value)}
  //                     required
  //                     disabled={isLoading}
  //                   >
  //                     <option value="">선택</option>
  //                     <option value="1">1</option>
  //                     <option value="2">2</option>
  //                     <option value="3">3</option>
  //                     <option value="4">4</option>
  //                     <option value="5">5</option>
  //                     <option value="6">6</option>
  //                     <option value="7">7</option>
  //                   </SelectHolder>
  //                   <h5> 일마다 한 번씩</h5>
  //                 </PeriodHolder>
  //               </InputTypeHolder>
  //               {/* </InputTypeHolder> */}
  //               <InputTypeHolder>
  //                 <InputText>알림 시간</InputText>
  //                 <PeriodHolder>
  //                   <SelectHolder
  //                     name="alarmTime"
  //                     value={alarmTime}
  //                     onChange={(e) => setAlarmTime(e.target.value)}
  //                     required
  //                     disabled={isLoading}
  //                   >
  //                     <option value="">선택</option>
  //                     <option value="0">00:00</option>
  //                     <option value="1">01:00</option>
  //                     <option value="2">02:00</option>
  //                     <option value="3">03:00</option>
  //                     <option value="4">04:00</option>
  //                     <option value="5">05:00</option>
  //                     <option value="6">06:00</option>
  //                     <option value="7">07:00</option>
  //                     <option value="8">08:00</option>
  //                     <option value="9">09:00</option>
  //                     <option value="10">10:00</option>
  //                     <option value="11">11:00</option>
  //                     <option value="12">12:00</option>
  //                     <option value="13">13:00</option>
  //                     <option value="14">14:00</option>
  //                     <option value="15">15:00</option>
  //                     <option value="16">16:00</option>
  //                     <option value="17">17:00</option>
  //                     <option value="18">18:00</option>
  //                     <option value="19">19:00</option>
  //                     <option value="20">20:00</option>
  //                     <option value="21">21:00</option>
  //                     <option value="22">22:00</option>
  //                     <option value="23">23:00</option>
  //                   </SelectHolder>
  //                   <h5> 에 알림을 받아요</h5>
  //                 </PeriodHolder>
  //               </InputTypeHolder>
  //             </InputWrapper>
  //           </FormWrapper>
  //         </BasicInfoContainer>
  //         <AgreementBox>
  //           <CheckButton
  //             type="button"
  //             active={isAgreed}
  //             onClick={handleAgreementClick}
  //             disabled={isLoading}
  //           >
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="12"
  //               height="9"
  //               viewBox="0 0 12 9"
  //               fill="none"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 clipRule="evenodd"
  //                 d="M10.978 0.863948C11.0936 0.979522 11.0936 1.1669 10.978 1.28248L3.84718 8.41332C3.73161 8.52889 3.54423 8.52889 3.42865 8.41332L0.0866802 5.07135C-0.0288934 4.95577 -0.0288934 4.76839 0.0866802 4.65282L0.863948 3.87555C0.979521 3.75998 1.1669 3.75998 1.28248 3.87555L3.63792 6.23099L9.78223 0.0866802C9.8978 -0.0288934 10.0852 -0.0288934 10.2008 0.0866802L10.978 0.863948Z"
  //                 fill="white"
  //               />
  //             </svg>
  //           </CheckButton>
  //           <h5>
  //             이력서 내용을 AI 분석용 데이터로 활용하고, 분석 결과 기반 맞춤
  //             정보를 받는 데 동의합니다.
  //           </h5>
  //         </AgreementBox>
  //         {error && <ErrorText>{error}</ErrorText>}
  //         <AnalyzeButton
  //           type="submit"
  //           active={isAgreed}
  //           disabled={isLoading || !isAgreed}
  //         >
  //           <AnalyzeText>{isLoading ? "처리 중..." : "회원가입"}</AnalyzeText>
  //         </AnalyzeButton>
  //       </SignupForm>
  //     </LoginLayout>
  //   </Wrapper>
  // );
  return (
    <Wrapper>
      <SignupForm onSubmit={onSubmit}>
        <SignupLayout>
          <div className="intro-area">
            <img src={logo} alt="Logo" />
            <span id="service-name">알려주잡</span>
            <span id="create-account">회원가입</span>
          </div>
          <LoginInfoContainer>
            <span>로그인 정보</span>
            {/* <form className="login-area" onSubmit={onSubmit}> */}
            <div className="login-area">
              {/* <div>
                <label htmlFor="user-id">아이디</label>
                <input
                  id="user-id"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  name="id"
                  value={id}
                  onChange={onChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="user-pw">비밀번호</label>
                <input
                  id="user-pw"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  disabled={isLoading}
                />
              </div> */}
              <InputGroup
                label="아이디"
                id="user-id"
                name="id"
                placeholder="아이디를 입력하세요"
                value={id}
                onChange={onChange}
                required
                disabled={isLoading}
              />

              <InputGroup
                label="비밀번호"
                id="user-pw"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={onChange}
                required
                disabled={isLoading}
              />
              {/* </form> */}
            </div>
          </LoginInfoContainer>
          <BasicInfoContainer>
            <span>기본 정보</span>
            {/* <form className="basic-info-area" onSubmit={onSubmit}> */}
            <div className="basic-info-area">
              {/* <div>
                <label htmlFor="user-name">이름</label>
                <input
                  id="user-name"
                  type="text"
                  placeholder="성함을 입력하세요"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  disabled={isLoading}
                />
              </div> */}
              <InputGroup
                label="이름"
                id="user-name"
                type="text"
                name="name"
                placeholder="성함을 입력하세요"
                value={name}
                onChange={onChange}
                required
                disabled={isLoading}
              />
              {/* <div>
                <label htmlFor="user-phone">전화번호</label>
                <input
                  id="user-phone"
                  type="tel"
                  placeholder="전화번호를 입력하세요"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  required
                  disabled={isLoading}
                />
              </div> */}
              <InputGroup
                label="전화번호"
                id="user-phone"
                type="tel"
                name="phone"
                placeholder="전화번호를 입력하세요"
                value={phone}
                onChange={onChange}
                required
                disabled={isLoading}
              />
              {/* <div>
                <label htmlFor="user-email">이메일</label>
                <input
                  id="user-email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  disabled={isLoading}
                />
              </div> */}
              <InputGroup
                label="이메일"
                id="user-email"
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={onChange}
                required
                disabled={isLoading}
              />
              {/* <div>
                <label htmlFor="user-school">학교</label>
                <input
                  id="user-school"
                  type="text"
                  placeholder="예) 한국대학교"
                  name="school"
                  value={school}
                  onChange={onChange}
                  required
                  disabled={isLoading}
                />
              </div> */}
              <InputGroup
                label="학교"
                id="user-school"
                type="text"
                name="school"
                placeholder="예) 한국대학교"
                value={school}
                onChange={onChange}
                required
                disabled={isLoading}
              />
              <InputGroup
                label="학과"
                id="user-department"
                type="text"
                name="major"
                placeholder="예) 경양학과, 컴퓨터공학과"
                value={major}
                onChange={onChange}
                required
                disabled={isLoading}
              />
              {/* <div>
                <label htmlFor="user-interest">관심 직무</label>
                <input
                  id="user-interest"
                  type="text"
                  placeholder="예) UI/UX 디자인, AI..."
                  name="interest"
                  value={interest}
                  onChange={onChange}
                  required
                  disabled={isLoading}
                />
              </div> */}
              <InputGroup
                label="관심 직무"
                id="user-interest"
                type="text"
                name="interest"
                placeholder="예) UI/UX 디자인, AI..."
                value={interest}
                onChange={onChange}
                required
                disabled={isLoading}
              />
              <div className="selector-container">
                <label htmlFor="alarm-period">알림 주기</label>
                <div className="input-wrapper">
                  <select
                    id="alarm-period"
                    name="alarmPeriod"
                    value={alarmPeriod}
                    onChange={(e) => setAlarmPeriod(e.target.value)}
                    required
                    disabled={isLoading}
                  >
                    <option value="">선택</option>
                    {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>

                  <span> 일마다 한 번씩</span>
                </div>
              </div>
              <div>
                <label htmlFor="alarm-time">알림 시간</label>
                <div className="input-wrapper">
                  <select
                    id="alarm-time"
                    name="alarmTime"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                    required
                    disabled={isLoading}
                  >
                    <option value="">선택</option>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}:00
                      </option>
                    ))}
                  </select>
                  <span> 시에 알람을 받아요</span>
                </div>
              </div>
              {/* </form> */}
            </div>
          </BasicInfoContainer>
          <AgreementContainer>
            {/* <button
              id="agreement"
              type="button"
              onClick={handleAgreementClick}
              disabled={isLoading}
              isAgreed={isAgreed}
            >

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="none" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.4458 8.61395C17.5614 8.72952 17.5614 8.9169 17.4458 9.03248L10.315 16.1633C10.1994 16.2789 10.012 16.2789 9.89643 16.1633L6.55445 12.8213C6.43888 12.7058 6.43888 12.5184 6.55445 12.4028L7.33172 11.6256C7.44729 11.51 7.63468 11.51 7.75025 11.6256L10.1057 13.981L16.25 7.83668C16.3656 7.72111 16.553 7.72111 16.6685 7.83668L17.4458 8.61395Z"
                  fill="white"
                />
              </svg>
            </button> */}
            <StyledCheckButton
              onClick={handleAgreementClick}
              disabled={isLoading}
              $isAgreed={isAgreed}
            />
            <span>
              본 서비스 제공(회원 관리, 알림톡 발송 등)을 위해 이름, 학교,
              연락처 등의 기본 정보 수집 및 이용에 동의합니다.
            </span>
          </AgreementContainer>
          <SignupFinishButton type="submit">회원가입</SignupFinishButton>
        </SignupLayout>
      </SignupForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const SignupForm = styled.form`
  width: 100%;
  align-items: center;
`;

const SignupLayout = styled.div`
  display: flex;
  width: 100%;
  padding-top: 3rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .intro-area {
    display: flex;
    width: 15.0625rem;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3.25rem;

    img {
      width: 4.86rem;
      height: 4.86rem;
      margin-bottom: 0.45rem;
    }

    #service-name {
      color: #2e3847;
      font-size: 1.35rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.054rem;
      margin-bottom: 0.75rem;
    }

    #create-account {
      color: #141618;
      text-align: center;
      font-size: 2.375rem;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;
    }
  }
`;

const LoginInfoContainer = styled.div`
  display: flex;
  width: 27.8125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  margin-bottom: 4.25rem;

  span {
    color: #141618;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    align-self: stretch;
  }

  .login-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    align-self: stretch;

    div {
      display: flex;
      width: 27.8125rem;
      justify-content: space-between;
      align-items: center;

      label {
        color: #141618;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 130%;
      }
      input {
        display: flex;
        width: 21.625rem;
        padding: 0.5rem 1rem;
        align-items: center;
        gap: 0.625rem;
        flex-shrink: 0;
        border-radius: 1.25rem;
        border: 1px solid #c2c4c8;
      }
    }
  }
`;

const BasicInfoContainer = styled.div`
  display: flex;
  width: 27.8125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  margin-bottom: 5.625rem;

  span {
    color: #141618;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
  }

  .basic-info-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    align-self: stretch;

    div {
      display: flex;
      width: 27.8125rem;
      justify-content: space-between;
      align-items: center;

      label {
        color: #141618;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 130%;
      }

      .input-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        width: 21.625rem;

        select {
          display: flex;
          width: 7.5rem;
          padding: 0.5rem 1rem;
          justify-content: space-between;
          align-items: center;
          border-radius: 1.25rem;
          border: 1px solid #c2c4c8;
        }

        span {
          color: #5a5c63;
          text-align: center;
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 500;
          line-height: 130%;
        }
      }

      input {
        display: flex;
        width: 21.625rem;
        padding: 0.5rem 1rem;
        align-items: center;
        gap: 0.625rem;
        flex-shrink: 0;
        border-radius: 1.25rem;
        border: 1px solid #c2c4c8;
      }

      // select {
      //   display: flex;
      //   width: 7.5rem;
      //   padding: 0.5rem 1rem;
      //   justify-content: space-between;
      //   align-items: center;
      //   border-radius: 1.25rem;
      //   border: 1px solid #c2c4c8;
      // }

      // span {
      //   color: #5a5c63;
      //   text-align: center;
      //   font-size: 0.875rem;
      //   font-style: normal;
      //   font-weight: 500;
      //   line-height: 130%;
      // }
    }
  }
`;

const AgreementContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 1.75rem;

  #agreement {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    border-radius: 0.75rem;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  span {
    color: #000;
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
  }
`;

const SignupFinishButton = styled(Button)`
  padding: 0.625rem 1.25rem;
  gap: 0.625rem;
  border-radius: 0.5rem;
  background: #c2c4c8;
  color: #eaebec;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
