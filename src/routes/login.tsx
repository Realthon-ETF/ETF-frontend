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
  flex: 1;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  overflow: auto;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const LoginLayout = styled.main`
  display: flex;
  width: 100%;
  max-width: 32rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  .intro-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

    img {
      height: 6rem;
      width: 6rem;

      @media (max-width: 768px) {
        height: 5rem;
        width: 5rem;
      }
    }

    span {
      font-family: "BareunDotumOTFPro2";
      color: #2e3847;
      font-size: 2rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.08rem;

      @media (max-width: 768px) {
        font-size: 1.75rem;
      }
    }

    p {
      color: #5a5c63;
      text-align: center;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.4;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }

  .login-area {
    display: flex;
    width: 100%;
    max-width: 14rem;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
      max-width: 13rem;
      gap: 1.25rem;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 100%;
      align-items: center;

      label {
        color: #141618;
        text-align: center;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.3;

        @media (max-width: 768px) {
          font-size: 0.8125rem;
        }
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
        font-size: 0.875rem;
        font-family: inherit;

        &::placeholder {
          color: #aeb0b6;
        }

        &:focus {
          outline: none;
          border-color: #69a5ff;
        }

        &:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          font-size: 0.8125rem;
          padding: 0.45rem 0.5rem;
        }
      }
    }
  }

  > a {
    font-size: 0.875rem;
    text-decoration: none;
    margin-top: 0.5rem;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      font-size: 0.8125rem;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.875rem;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: 0.625rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.9375rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;
