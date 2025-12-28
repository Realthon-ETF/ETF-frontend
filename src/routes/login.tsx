import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import styled from "styled-components";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoading || id === "" || password === "") {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);

      // API request
      const response = await fetch("https://api.etf.r-e.kr/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId: id,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "로그인에 실패했습니다.",
        }));
        throw new Error(errorData.message || "로그인에 실패했습니다.");
      }

      const data = await response.json();

      // Store token if provided
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }

      // Navigate to home page on success
      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // return (
  //           <LoginHeader>
  //             <LogoHeaderHolder>

  //             </LogoHeaderHolder>
  //           </LoginHeader>
  //           <LoginForm onSubmit={onSubmit}>
  //
  //             {error && <ErrorText>{error}</ErrorText>}
  //             <SubmitButton type="submit" disabled={isLoading}>
  //               {isLoading ? "로그인 중..." : "로그인"}
  //             </SubmitButton>
  //           </LoginForm>
  // );

  // const LoginHeader = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   gap: 1.5rem;
  //   align-self: stretch;
  // `;

  // const LoginForm = styled.form`
  //   display: flex;
  //   width: 15.0625rem;
  //   flex-direction: column;
  //   align-items: center;
  //   gap: 3.25rem;
  //   flex-shrink: 0;
  // `;

  // const SubmitButton = styled.button`
  //   display: flex;
  //   padding: 0.625rem 1.25rem;
  //   justify-content: center;
  //   align-items: center;
  //   gap: 0.625rem;
  //   align-self: stretch;
  //   border-radius: 1.25rem;
  //   border: none;
  //   background-color: #06f;
  //   color: #fff;
  //   font-size: 1rem;
  //   font-style: normal;
  //   font-weight: 600;
  //   line-height: 130%;
  //   cursor: pointer;
  //   transition: background-color 0.2s;

  //   &:hover:not(:disabled) {
  //     background-color: #0052cc;
  //   }

  //   &:disabled {
  //     background-color: #c2c5c8;
  //     cursor: not-allowed;
  //   }
  // `;

  // const ErrorText = styled.p`
  //   color: #ff4444;
  //   text-align: center;
  //   font-size: 0.875rem;
  //   font-style: normal;
  //   font-weight: 500;
  //   line-height: 130%;
  //   margin: 0;
  // `;

  return (
    <Wrapper>
      <LoginLayout>
        <div className="intro-area">
          <img src={logo} alt="Logo" />
          <span>알려주잡</span>
          <p>나에게 필요한 정보를 먼저 알아서 찾아주는 AI 서비스</p>
        </div>
        <form className="login-area" onSubmit={onSubmit}>
          <div>
            {/* htmlFor와 id를 연결하면 라벨 클릭 시 입력창에 포커스가 갑니다 */}
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
          </div>
        </form>
        <Link to="/create-account" style={{ color: "#70737C" }}>
          회원가입
        </Link>
      </LoginLayout>
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

const LoginLayout = styled.main`
  display: flex;
  width: 100%;
  padding: 8.6875rem 0 18.325rem 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .intro-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    margin-bottom: 6.25rem;

    img {
      height: 10.8rem;
      width: 10.8rem;
      margin-bottom: 1rem;
    }

    span {
      color: #2e3847;
      font-size: 3rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12rem;
      margin-bottom: 1.5rem;
    }

    p {
      color: #5a5c63;
      text-align: center;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: 130%;
    }
  }

  .login-area {
    display: flex;
    width: 12.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.875rem;
    margin-bottom: 3.25rem;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      align-items: center;

      label {
        color: #141618;
        text-align: center;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 130%;
      }

      input {
        display: flex;
        padding: 0.5rem 0.625rem;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 0.625rem;
        align-self: stretch;
        border-radius: 1.25rem;
        border: 1px solid #c2c4c8;
      }
    }
  }
`;
