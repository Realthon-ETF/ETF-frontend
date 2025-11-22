// import { useState } from "react";
// // import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// // import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
// // import { FirebaseError } from "firebase/app";
// import { Link } from "react-router-dom";
// import {
//   Wrapper,
//   Title,
//   Form,
//   Input,
//   Error,
//   Switcher,
// } from "../components/auth-components";

// export default function CreateAccount() {
//   const navigate = useNavigate();
//   const [isLoading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [school, setSchool] = useState("");
//   const [major, setMajor] = useState("");
//   const [tel, setTel] = useState("");
//   const [interest, setInterest] = useState("");
//   const [error, setError] = useState("");

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { name, value },
//     } = e;
//     // 아래 코드에서 모든 input에 name을 넣음으로써 input이 변경되었을 때 어떤 input이 변경되었는지 찾을 수 있다.
//     if (name === "name") {
//       setName(value);
//     } else if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     } else if (name === "school") {
//       setSchool(value);
//     } else if (name === "major") {
//       setMajor(value);
//     } else if (name === "tel") {
//       setTel(value);
//     } else if (name === "interest") {
//       setInterest(value);
//     }
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     if (
//       isLoading ||
//       name === "" ||
//       email === "" ||
//       password === "" ||
//       school === "" ||
//       major === "" ||
//       tel === "" ||
//       name === ""
//     )
//       return;
//     try {
//       setLoading(true);
//       // const credentials = await createUserWithEmailAndPassword(
//       //   auth,
//       //   email,
//       //   password
//       // );
//       // await updateProfile(credentials.user, {
//       //   displayName: name,
//       // });
//       navigate("/");
//     } catch (e) {
//       // if (e instanceof FirebaseError) {
//       //   setError(e.message);
//       // }
//     } finally {
//       setLoading(false);
//     }
//     // console.log(name, email, password);
//   };

//   return (
//     <Wrapper>
//       <Title>회원가입</Title>
//       <Form onSubmit={onSubmit}>
//         <Input
//           onChange={onChange}
//           name="name"
//           value={name}
//           placeholder="이름"
//           type="text"
//           required
//         />
//         <Input
//           onChange={onChange}
//           name="email"
//           value={email}
//           placeholder="이메일"
//           type="email"
//           required
//         />
//         <Input
//           onChange={onChange}
//           name="password"
//           value={password}
//           placeholder="비밀번호"
//           type="password"
//           required
//         />
//         <Input
//           onChange={onChange}
//           name="school"
//           value={school}
//           placeholder="학교"
//           type="text"
//           required
//         />
//         <Input
//           onChange={onChange}
//           name="major"
//           value={major}
//           placeholder="학과"
//           type="text"
//           required
//         />
//         <Input
//           onChange={onChange}
//           name="tel"
//           value={tel}
//           placeholder="전화번호"
//           type="tel"
//           // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//           required
//         />
//         <Input
//           onChange={onChange}
//           name="interest"
//           value={interest}
//           placeholder="관심 분야"
//           type="text"
//           required
//         />
//         <Input
//           type="submit"
//           value={isLoading ? "Loading..." : "Create Account"}
//         />
//       </Form>
//       {error !== "" ? <Error>{error}</Error> : null}
//       <Switcher>
//         Already have an account? <Link to="/login">Log In &rarr;</Link>
//       </Switcher>
//       <Switcher>
//         Forgot Password?{" "}
//         <Link to="/reset-password">Reset Password via Email &rarr;</Link>
//       </Switcher>
//     </Wrapper>
//   );
// }

// import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { FirebaseError } from "firebase/app";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../firebase";
// import { Link } from "react-router-dom";
// import {
//   Wrapper,
//   Title,
//   Form,
//   Input,
//   // Error,
//   Switcher,
// } from "../components/auth-components";

// export default function CreateAccount() {
//   // const navigate = useNavigate();
//   // const [isLoading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [error, setError] = useState("");

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { name, value },
//     } = e;
//     // 아래 코드에서 모든 input에 name을 넣음으로써 input이 변경되었을 때 어떤 input이 변경되었는지 찾을 수 있다.
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     }
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // setError("");
//     // if (isLoading || email === "" || password === "") return;
//     // try {
//     //   setLoading(true);
//     //   await signInWithEmailAndPassword(auth, email, password);
//     //   navigate("/");
//     // } catch (e) {
//     //   if (e instanceof FirebaseError) {
//     //     setError(e.message);
//     //   }
//     // } finally {
//     //   setLoading(false);
//     // }
//     console.log(email, password);
//   };

//   return (
//     <Wrapper>
//       <Title>로그인</Title>
//       <Form onSubmit={onSubmit}>
//         <Input
//           onChange={onChange}
//           name="email"
//           value={email}
//           placeholder="Email"
//           type="email"
//           required
//         />
//         <Input
//           onChange={onChange}
//           name="password"
//           value={password}
//           placeholder="Password"
//           type="password"
//           required
//         />
//         {/* <Input type="submit" value={isLoading ? "Loading..." : "Log In"} /> */}
//         <Input type="submit" value="Loading..." />
//       </Form>
//       {/* {error !== "" ? <Error>{error}</Error> : null} */}
//       <Switcher>
//         Don't have account? <Link to="/create-account">Create one &rarr;</Link>
//       </Switcher>
//       <Switcher>
//         Forgot Password?{" "}
//         <Link to="/reset-password">Reset Password via Email &rarr;</Link>
//       </Switcher>
//     </Wrapper>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const LoginLayout = styled.div`
  // flex: 1;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.25rem;
  align-self: stretch;
`;

const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  align-self: stretch;
`;

const LogoHolder = styled.div`
  width: 4.86rem;
  height: 4.86rem;
`;

const LogoHeaderHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const HeaderText = styled.h1`
  color: #2e3847;
  font-size: 3rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.12rem;
`;

const IntroText = styled.h2`
  color: #5a5c63;
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 1.95rem */
`;

const FormWrapper = styled.div`
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  flex-shrink: 0;
  align-self: stretch;
`;

// const RegisterText = styled.h4`
//   color: #70737c;
//   text-align: center
//   font-size: 1rem;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 130%; /* 1.3rem */
//   text-decoration-line: underline;
//   text-decoration-style: solid;
//   text-decoration-skip-ink: auto;
//   text-decoration-thickness: auto;
//   text-underline-offset: auto;
//   text-underline-position: from-font;
// `;

const InputWrapper = styled.div`
  display: flex;
  width: 12.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
`;

const InputTypeHolder = styled.div`
  display: flex;
  width: 27.8125rem;
  justify-content: space-between;
  align-items: center;
`;

const InputHolder = styled.input`
  display: flex;
  width: 21.625rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 1.25rem;
  border: 1px solid #c2c4c8;
`;

const PeriodHolder = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 21.625rem;
  gap: 0.375rem;
`;

// display: flex;
// width: 21.625rem;
// padding: 0.5rem 1rem;
// align-items: center;
// gap: 0.625rem;
// flex-shrink: 0;

const InputText = styled.h4`
  color: #141618;

  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const OuterWrapper = styled.div`
  display: flex;
  width: 15.0625rem;
  flex-direction: column;
  align-items: center;
  gap: 3.25rem;
  flex-shrink: 0;
`;

const HeaderContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  width: 15.0625rem;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const RegisterText = styled.p`
  color: #141618;
  text-align: center;
  font-size: 2.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 3.5625rem */
`;

const LogoTitleHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
`;
// const LogoHolder

const TitleText = styled.h2`
  color: #2e3847;
  font-size: 1.35rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.054rem;
`;

const LoginFormContainer = styled.div`
  display: flex;
  width: 27.8125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  margin-top: 3.25rem;
`;

const LoginInfo = styled.h2`
  color: #141618;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 1.625rem */
`;

// const IdPwContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 1.5rem;
//   align-self: stretch;
// `;

const BasicInfoContainer = styled.div`
  display: flex;
  width: 27.8125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  margin-top: 3.25rem;
`;

const AgreementBox = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.375rem;
  margin-top: 5.62rem;
`;

const CheckButton = styled.button<{ active: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background-color: ${({ active }) => (active ? "#06F" : "#c2c5c8")};
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
`;

const AnalyzeButton = styled.button<{ active: boolean }>`
  display: inline-flex;
  padding: 0.625rem 1.25rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border-width: 0;
  background-color: ${({ active }) => (active ? "#06F" : "#c2c5c8")};
  margin-top: 1.38rem;
  margin-bottom: 3.25rem;
`;

const AnalyzeText = styled.h3`
  color: #eaebec;
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const SelectHolder = styled.select`
  display: flex;
  width: 7.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  border: 1px solid #c2c4c8;
  font-size: 1rem;
  background: #fff;
`;

export default function Login() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [dept, setDept] = useState("");
  const [interest, setInterest] = useState("");
  const [alarmPeriod, setAlarmPeriod] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  // const [error, setError] = useState("");

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
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "school") {
      setSchool(value);
    } else if (name === "dept") {
      setDept(value);
    } else if (name === "interest") {
      setInterest(value);
    }
  };
  const handleAgreementClick = () => {
    setIsAgreed((prev) => !prev);
  };
  return (
    <Wrapper>
      <LoginLayout>
        <HeaderContainer>
          <LogoTitleHolder>
            <LogoHolder>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="78"
                height="78"
                viewBox="0 0 78 78"
                fill="none"
              >
                <rect width="77.76" height="77.76" fill="white" />
                <path
                  d="M46.6025 29.3325C46.0465 25.8052 50.7705 24.1041 52.5908 27.1763L59.3271 38.5464L61.5459 34.3101C63.7057 30.1878 69.9363 31.6392 70.0518 36.2915C70.2693 45.0592 66.8813 53.5322 60.6797 59.7339L59.7598 60.6548C53.5423 66.8722 45.0469 70.2685 36.2568 70.0503C31.598 69.9346 30.1385 63.6998 34.2617 61.5278L38.6641 59.2095L27.2314 52.5181C24.1494 50.7138 25.8267 45.9805 29.3574 46.519L38.6641 47.938L31.5967 37.2104C29.149 33.4947 33.5367 29.085 37.2646 31.5142L48.0557 38.5464L46.6025 29.3325ZM17.8164 9.52393C18.0338 8.34517 19.724 8.34516 19.9414 9.52393L21.4326 17.6187C21.5138 18.0592 21.8583 18.4047 22.2988 18.4858L30.3936 19.9771C31.5724 20.1944 31.5725 21.8838 30.3936 22.1011L22.2988 23.5923C21.8583 23.6734 21.5138 24.018 21.4326 24.4585L19.9414 32.5532C19.7242 33.7323 18.0336 33.7323 17.8164 32.5532L16.3252 24.4585C16.244 24.018 15.8995 23.6734 15.459 23.5923L7.36426 22.1011C6.18527 21.8838 6.18534 20.1944 7.36426 19.9771L15.459 18.4858C15.8996 18.4047 16.244 18.0592 16.3252 17.6187L17.8164 9.52393Z"
                  fill="url(#paint0_radial_102_263)"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_102_263"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(29.4277 29.4291 -29.4277 29.4277 35.3823 37.5416)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#4F95FF" />
                    <stop offset="0.27707" stop-color="#5698F8" />
                    <stop offset="0.518714" stop-color="#75A7D9" />
                    <stop offset="1" stop-color="#FFEA4F" />
                  </radialGradient>
                </defs>
              </svg>
            </LogoHolder>
            <TitleText>알려주잡</TitleText>
          </LogoTitleHolder>
          <RegisterText>회원가입</RegisterText>
        </HeaderContainer>
        <LoginFormContainer>
          <LoginInfo>로그인 정보</LoginInfo>
          <FormWrapper>
            <InputWrapper>
              <InputTypeHolder>
                <InputText>아이디</InputText>
                <InputHolder
                  onChange={onChange}
                  name="id"
                  value={id}
                  type="text"
                  required
                  placeholder="아이디를 입력하세요"
                />
              </InputTypeHolder>
              <InputTypeHolder>
                <InputText>비밀번호</InputText>
                <InputHolder
                  onChange={onChange}
                  name="password"
                  value={password}
                  type="password"
                  required
                  placeholder="비밀번호를 입력하세요"
                />
              </InputTypeHolder>
            </InputWrapper>
          </FormWrapper>
        </LoginFormContainer>
        <BasicInfoContainer>
          <LoginInfo>기본 정보</LoginInfo>
          <FormWrapper>
            <InputWrapper>
              <InputTypeHolder>
                <InputText>이름</InputText>
                <InputHolder
                  onChange={onChange}
                  name="name"
                  value={name}
                  type="text"
                  required
                  placeholder="성함을 입력하세요"
                />
              </InputTypeHolder>
              <InputTypeHolder>
                <InputText>전화번호</InputText>
                <InputHolder
                  onChange={onChange}
                  name="phone"
                  value={phone}
                  type="number"
                  required
                  placeholder="입력"
                />
              </InputTypeHolder>
              <InputTypeHolder>
                <InputText>이메일</InputText>
                <InputHolder
                  onChange={onChange}
                  name="email"
                  value={email}
                  type="email"
                  required
                  placeholder="이메일을 입력하세요"
                />
              </InputTypeHolder>
              <InputTypeHolder>
                <InputText>학교</InputText>
                <InputHolder
                  onChange={onChange}
                  name="school"
                  value={school}
                  type="text"
                  required
                  placeholder="예) 한국대학교"
                />
              </InputTypeHolder>
              <InputTypeHolder>
                <InputText>학과</InputText>
                <InputHolder
                  onChange={onChange}
                  name="dept"
                  value={dept}
                  type="text"
                  required
                  placeholder="예) 경영학과, 컴퓨터공학과"
                />
              </InputTypeHolder>
              <InputTypeHolder>
                <InputText>관심 직무</InputText>
                <InputHolder
                  onChange={onChange}
                  name="interest"
                  value={interest}
                  type="text"
                  required
                  placeholder="예) UI/UX 디자인, UX리서치, UX디자인"
                />
              </InputTypeHolder>
              {/* <InputTypeHolder>
                <InputText>알림 주기</InputText> */}
              {/* <InputHolder placeholder="예) UI/UX 디자인, UX리서치, UX디자인" /> */}
              <InputTypeHolder>
                <InputText>알림 주기</InputText>
                <PeriodHolder>
                  <SelectHolder
                    name="alarmPeriod"
                    value={alarmPeriod}
                    onChange={(e) => setAlarmPeriod(e.target.value)}
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </SelectHolder>
                  <h5> 일마다 한 번씩</h5>
                </PeriodHolder>
              </InputTypeHolder>
              {/* </InputTypeHolder> */}
              <InputTypeHolder>
                <InputText>알림 주기</InputText>
                <PeriodHolder>
                  <SelectHolder
                    name="alarmTime"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                    required
                  >
                    <option value="0">00:00</option>
                    <option value="1">01:00</option>
                    <option value="2">02:00</option>
                    <option value="3">03:00</option>
                    <option value="4">04:00</option>
                    <option value="5">05:00</option>
                    <option value="6">06:00</option>
                    <option value="7">07:00</option>
                    <option value="8">08:00</option>
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                    <option value="22">22:00</option>
                    <option value="23">23:00</option>
                  </SelectHolder>
                  <h5> 에 알림을 받아요</h5>
                </PeriodHolder>
              </InputTypeHolder>
            </InputWrapper>
          </FormWrapper>
        </BasicInfoContainer>
        <AgreementBox>
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
        </AnalyzeButton>
        {/* <OuterWrapper>
          <LoginWrapper>
            <LoginHeader>
              <LogoHeaderHolder>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="142"
                  height="137"
                  viewBox="0 0 142 137"
                  fill="none"
                >
                  <path
                    d="M89.1621 45.9844C87.926 38.1457 98.4224 34.3656 102.468 41.1924L117.438 66.458L122.37 57.0449C127.17 47.8844 141.013 51.1098 141.27 61.4482C141.753 80.9322 134.226 99.7625 120.444 113.544L118.398 115.59C104.582 129.406 85.7042 136.953 66.1709 136.468C55.818 136.211 52.574 122.357 61.7363 117.53L71.5195 112.376L46.1152 97.5068C39.2658 93.4974 42.9918 82.9792 50.8379 84.1758L71.5195 87.3301L55.8145 63.4893C50.3755 55.2322 60.1251 45.4342 68.4092 50.832L92.3916 66.458L89.1621 45.9844ZM25.1924 1.96484C25.6753 -0.654908 29.43 -0.654821 29.9131 1.96484L33.2275 19.9531C33.4079 20.9321 34.1735 21.6984 35.1523 21.8789L53.1406 25.1924C55.7609 25.6751 55.7609 29.4304 53.1406 29.9131L35.1523 33.2275C34.1736 33.408 33.408 34.1736 33.2275 35.1523L29.9131 53.1406C29.4304 55.7609 25.6751 55.7609 25.1924 53.1406L21.8789 35.1523C21.6984 34.1734 20.9321 33.4079 19.9531 33.2275L1.96484 29.9131C-0.65476 29.43 -0.654847 25.6754 1.96484 25.1924L19.9531 21.8789C20.9322 21.6985 21.6985 20.9322 21.8789 19.9531L25.1924 1.96484Z"
                    fill="url(#paint0_radial_102_203)"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_102_203"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(65.3953 65.3987 -65.3953 65.3956 64.2266 64.2263)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#4F95FF" />
                      <stop offset="0.27707" stop-color="#5698F8" />
                      <stop offset="0.518714" stop-color="#75A7D9" />
                      <stop offset="1" stop-color="#FFEA4F" />
                    </radialGradient>
                  </defs>
                </svg>
                <HeaderText>알려주잡</HeaderText>
              </LogoHeaderHolder>
              <IntroText>
                나에게 필요한 정보를
                <br />
                먼저 알아서 찾아주는 AI 서비스
              </IntroText>
            </LoginHeader>
            <FormWrapper>
              <InputWrapper>
                <InputTypeHolder>
                  <InputText>아이디</InputText>
                  <InputHolder placeholder="입력" />
                </InputTypeHolder>
                <InputTypeHolder>
                  <InputText>비밀번호</InputText>
                  <InputHolder placeholder="입력" />
                </InputTypeHolder>
              </InputWrapper>
            </FormWrapper>
          </LoginWrapper>
          <RegisterText>회원가입</RegisterText>
        </OuterWrapper> */}
      </LoginLayout>
    </Wrapper>
  );
}
