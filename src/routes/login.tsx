import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import { Button } from "../components/Button";
import { Helmet } from "react-helmet-async";
import { Mixpanel } from "../utils/mixpanel";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "id") setId(value);
    else if (name === "password") setPassword(value);
    // Clear error when user starts typing
    if (error) setError("");
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

      // 3. Use the login function from Context instead of fetch
      // This internally calls api.post and handles setClientToken
      await login(id, password);

      // 4. Success! AuthContext now has the user and token.
      Mixpanel.track("Signup Success", { Status: "Success" });
      navigate("/");
    } catch (err: any) {
      // Axios errors usually hold message in response.data.message
      const message = err.response?.data?.message || "로그인에 실패했습니다.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          알려주잡 | 나에게 필요한 정보를 먼저 알아서 찾아주는 AI 서비스
        </title>
        <meta
          name="description"
          content="나에게 필요한 정보를 먼저 찾아주는 AI 서비스 알려주잡에 로그인하세요."
        />
        {/* <meta name="description">NoInfluences Search Engine ranking and click-through rates.<meta property="og:..." />NoControls how the link looks when shared on KakaoTalk/Slack. */}
      </Helmet>
      <PageWrapper>
        <LoginLayout>
          <div className="intro-area">
            <img src={logo} alt="Logo" />
            <span>알려주잡</span>
            <p>
              나에게 필요한 정보를
              <br />
              먼저 알아서 찾아주는 AI 서비스
            </p>
          </div>

          {/* Added error message display */}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form className="login-area" onSubmit={onSubmit}>
            <div>
              <label htmlFor="user-id">아이디</label>
              <input
                id="user-id"
                type="text"
                name="id"
                placeholder="아이디를 입력하세요"
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
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={onChange}
                required
                disabled={isLoading}
              />
            </div>
            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </LoginButton>
          </form>

          <Link to="/create-account" style={{ color: "#70737C" }}>
            회원가입
          </Link>
        </LoginLayout>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;

  /* Responsive: Add padding for mobile screens */
  padding: 0 1rem;
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
      font-family: "BareunDotumOTFPro2";
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

        &:focus {
          border-color: #69a5ff;
        }
      }
    }
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: 0.8rem;
  background-color: #69a5ff; /* Specific login blue */
  border-radius: 1.25rem;
`;
