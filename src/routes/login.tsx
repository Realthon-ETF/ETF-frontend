import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  gap: 4.25rem;
  align-self: stretch;
`;

const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  align-self: stretch;
`;

// const LogoHolder = styled.div`
//   width: 10.8rem;
//   height: 10.8rem;
//   background-color: "tomato";
// `;

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

const RegisterText = styled.h4`
  color: #70737c;
  text-align: center;
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

const LoginForm = styled.form`
  display: flex;
  width: 15.0625rem;
  flex-direction: column;
  align-items: center;
  gap: 3.25rem;
  flex-shrink: 0;
`;

const SubmitButton = styled.button`
  display: flex;
  padding: 0.625rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 1.25rem;
  border: none;
  background-color: #06f;
  color: #fff;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #0052cc;
  }

  &:disabled {
    background-color: #c2c5c8;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #ff4444;
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  margin: 0;
`;

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  setIsLoading(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/home");
    }, 700);
  };

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError("");

  //   if (isLoading || id === "" || password === "") {
  //     setError("아이디와 비밀번호를 입력해주세요.");
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);

  //     // API request
  //     const response = await fetch("https://api.etf.r-e.kr/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         loginId: id,
  //         password: password,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({
  //         message: "로그인에 실패했습니다.",
  //       }));
  //       throw new Error(errorData.message || "로그인에 실패했습니다.");
  //     }

  //     const data = await response.json();

  //     // Store token if provided
  //     if (data.accessToken) {
  //       localStorage.setItem("token", data.accessToken);
  //     }

  //     // Navigate to home page on success
  //     navigate("/home");
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError("로그인 중 오류가 발생했습니다.");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
            <LoginForm onSubmit={onSubmit}>
              <InputWrapper>
                <InputTypeHolder>
                  <InputText>아이디</InputText>
                  <InputHolder
                    name="id"
                    value={id}
                    onChange={onChange}
                    placeholder="입력"
                    type="text"
                    required
                    disabled={isLoading}
                  />
                </InputTypeHolder>
                <InputTypeHolder>
                  <InputText>비밀번호</InputText>
                  <InputHolder
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="입력"
                    type="password"
                    required
                    disabled={isLoading}
                  />
                </InputTypeHolder>
              </InputWrapper>
              {error && <ErrorText>{error}</ErrorText>}
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
              </SubmitButton>
            </LoginForm>
          </LoginWrapper>
          <Link to="/create-account">
            <RegisterText>회원가입</RegisterText>
          </Link>
        </OuterWrapper>
      </LoginLayout>
    </Wrapper>
  );
}
