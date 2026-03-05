import React, { useState } from "react";
import { Button } from "../components/common/Button";
import styled from "styled-components";
import logo from "../assets/images/logo.svg";
import {
  InputGroup,
  type ValidationStatus,
} from "../components/common/InputGroup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api";

type VerificationState = {
  status: ValidationStatus;
  message: string;
};

export default function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    verificationCode: "",
    password: "",
  });
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [emailVerification, setEmailVerification] =
    useState<VerificationState>({
      status: "default",
      message: "",
    });

  const [codeVerification, setCodeVerification] = useState<VerificationState>({
    status: "default",
    message: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendCode = async () => {
    try {
      await api.post("/auth/email/code", {
        username: formData.name,
        phoneNumber: formData.phone,
        email: formData.email,
      });
      setEmailVerification({
        status: "valid",
        message: "인증번호가 발송되었습니다.",
      });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "인증번호 발송에 실패했습니다.";
      setEmailVerification({
        status: "invalid",
        message,
      });
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await api.post("/auth/email/verify", {
        email: formData.email,
        verificationCode: formData.verificationCode,
      });
      setResetToken(response.data.resetToken);
      setCodeVerification({
        status: "valid",
        message: "인증 완료",
      });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "인증번호가 올바르지 않습니다.";
      setCodeVerification({
        status: "invalid",
        message,
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resetToken || !formData.password || isLoading) return;

    try {
      setIsLoading(true);
      await api.post("/auth/reset", {
        resetToken,
        newPassword: formData.password,
      });
      alert("비밀번호가 변경되었습니다.");
      navigate("/login");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "비밀번호 변경에 실패했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>비밀번호 찾기 | 알려주잡</title>
        <meta
          name="description"
          content="알려주잡 비밀번호를 재설정하세요."
        />
      </Helmet>
      <PageWrapper>
        <ContentContainer>
          <header className="intro-area">
            <img src={logo} alt="Logo" />
            <span className="service-name">알려주잡</span>
            <h1 className="title">비밀번호 찾기</h1>
          </header>

          <StyledForm onSubmit={onSubmit}>
            <FormSection>
              <h2>정보 인증</h2>
              <div className="fields-group">
                <InputGroup
                  label="이름"
                  id="reset-name"
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={onChange}
                />
                <InputGroup
                  label="전화번호"
                  id="reset-phone"
                  type="tel"
                  name="phone"
                  placeholder="전화번호를 입력하세요"
                  value={formData.phone}
                  onChange={onChange}
                />
                <InputGroup
                  label="이메일"
                  id="reset-email"
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={onChange}
                  duplicateCheck
                  duplicateCheckLabel="인증 확인"
                  onCheckDuplicate={handleSendCode}
                  validationStatus={emailVerification.status}
                  validationMessage={emailVerification.message}
                />
                <InputGroup
                  label="인증번호"
                  id="reset-code"
                  name="verificationCode"
                  placeholder="인증번호를 입력하세요"
                  value={formData.verificationCode}
                  onChange={onChange}
                  duplicateCheck
                  duplicateCheckLabel="인증 확인"
                  onCheckDuplicate={handleVerifyCode}
                  validationStatus={codeVerification.status}
                  validationMessage={codeVerification.message}
                />
              </div>
            </FormSection>

            <FormSection>
              <h2>새로운 비밀번호 설정</h2>
              <div className="fields-group">
                <InputGroup
                  label="비밀번호"
                  id="reset-password"
                  type="password"
                  name="password"
                  placeholder="새 비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={onChange}
                />
              </div>
            </FormSection>

            <SubmitButton
              type="submit"
              disabled={isLoading || !resetToken || !formData.password}
              $active={!!resetToken && formData.password !== "" && !isLoading}
            >
              {isLoading ? "처리 중..." : "비밀번호 변경"}
            </SubmitButton>
          </StyledForm>
        </ContentContainer>
      </PageWrapper>
    </>
  );
}

// --- Styled Components ---

const PageWrapper = styled.main`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 30rem;
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
  gap: 4rem;
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
`;

const SubmitButton = styled(Button)<{ $active?: boolean }>`
  width: 100%;
  max-width: 9.3125rem;
  align-self: center;
  padding: 1rem;

  background: ${({ $active }) => ($active ? "#06F" : "#c2c4c8")};

  &:hover {
    background: ${({ $active }) => ($active ? "#0056d2" : "#c2c4c8")};
  }
`;
