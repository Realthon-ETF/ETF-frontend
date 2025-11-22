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
  flex: 1;
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
  width: 10.8rem;
  height: 10.8rem;
  background-color: "tomato";
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
  width: 15.0625rem;
  flex-direction: column;
  align-items: center;
  gap: 3.25rem;
  flex-shrink: 0;
`;

const RegisterText = styled.h4`
  color: #70737c;
  text-align: center
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 1.3rem */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 12.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
`;

const InputTypeHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  align-self: stretch;
`;

const InputHolder = styled.input`
  display: flex;
  padding: 0.5rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 1.25rem;
  border: 1px solid #c2c4c8;
`;

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

export default function Login() {
  return (
    <Wrapper>
      <LoginLayout>
        <OuterWrapper>
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
          <Link to="/create-account">
            <RegisterText>회원가입</RegisterText>
          </Link>
        </OuterWrapper>
      </LoginLayout>
    </Wrapper>
  );
}
