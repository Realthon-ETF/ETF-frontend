import React, { useState } from "react";
import { Button } from "../components/Button";
import styled from "styled-components";
import logo from "../assets/images/logo.svg";
import { StyledCheckButton } from "../components/CheckButton";
import { InputGroup, type ValidationStatus } from "../components/InputGroup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api";
import { JobCategoryModal } from "../components/JobCategoryModal";

type VerificationState = {
  status: ValidationStatus;
  message: string;
};

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
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

  const [idVerification, setIdVerification] = useState<VerificationState>({
    status: "default",
    message: "",
  });

  const [phoneVerification, setPhoneVerification] = useState<VerificationState>(
    {
      status: "default",
      message: "",
    },
  );

  const [emailVerification, setEmailVerification] = useState<VerificationState>(
    {
      status: "default",
      message: "",
    },
  );

  // Handlers
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (name === "id") {
      setIdVerification({ status: "default", message: "" });
    }
    if (name === "phone") {
      setPhoneVerification({ status: "default", message: "" });
    }
  };

  const handleAgreementClick = () => {
    setIsAgreed((prev) => !prev);
  };

  const handleInterestConfirm = (items: string[]) => {
    setSelectedInterests(items);
    const display = items.map((key) => key.split("|").join(" - ")).join(", ");
    setFormData((prev) => ({ ...prev, interest: display }));
  };

  // const checkIdDuplicate = async (id: string) => {
  //   try {
  //     // 이 부분 logic update 필요, 실제 response body에 따라
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/auth/check-login-id?loginId=${id}`,
  //     );
  //     const data = await response.json();
  //     if (data.isDuplicate) {
  //       setIdVerification({
  //         status: "invalid",
  //         message: "이미 사용 중인 아이디입니다.",
  //       });
  //     } else {
  //       setIdVerification({
  //         status: "valid",
  //         message: "사용 가능한 아이디입니다.",
  //       });
  //     }
  //   } catch (err) {
  //     // alert("연결 오류가 발생했습니다.");
  //     setIdVerification({
  //       status: "default",
  //       message: "확인 중 오류가 발생했습니다.",
  //     });
  //   }
  // };
  const checkIdDuplicate = async (id: string) => {
    if (!id) return;

    try {
      // Axios syntax for GET with query parameters
      const response = await api.get(`/auth/check-login-id`, {
        params: { loginId: id },
      });

      // Axios stores the JSON body in 'data'
      // Note: If your backend returns a boolean directly, check that logic
      if (response.data.available) {
        setIdVerification({
          status: "valid",
          message: "사용 가능한 아이디입니다.",
        });
      } else {
        setIdVerification({
          status: "invalid",
          message: "이미 사용 중인 아이디입니다.",
        });
      }
    } catch (err: any) {
      // Handle 404 or other errors
      const message =
        err.response?.status === 404
          ? "엔드포인트를 찾을 수 없습니다 (404)."
          : "중복 확인 중 오류가 발생했습니다.";

      setIdVerification({
        status: "default",
        message: message,
      });
    }
  };

  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/auth/check-phone?phoneNumber=${phone}`,
  //     );
  //     const data = await response.json();
  const checkPhoneDuplicate = async (phone: string) => {
    if (!phone) return;

    try {
      const response = await api.get(`/auth/check-phone?phoneNumber=${phone}`);

      if (response.data.available === true) {
        setPhoneVerification({
          status: "valid",
          message: "사용 가능한 전화번호입니다.",
        });
      } else {
        setPhoneVerification({
          status: "invalid",
          message: "이미 사용 중인 전화번호입니다.",
        });
      }
    } catch (err: any) {
      // Handle 404 or other errors
      const message =
        err.response?.status === 404
          ? "엔드포인트를 찾을 수 없습니다 (404)."
          : "중복 확인 중 오류가 발생했습니다.";

      setPhoneVerification({
        status: "default",
        message: message,
      });
    }
  };

  const checkEmailDuplicate = async (email: string) => {
    if (!email) return;

    try {
      const response = await api.get(`/auth/check-email?email=${email}`);

      if (response.data.available === true) {
        setEmailVerification({
          status: "valid",
          message: "사용 가능한 이메일입니다.",
        });
      } else {
        setEmailVerification({
          status: "invalid",
          message: "이미 사용 중인 이메일입니다.",
        });
      }
    } catch (err: any) {
      const message =
        err.response?.status === 404
          ? "엔드포인트를 찾을 수 없습니다 (404)."
          : "중복 확인 중 오류가 발생했습니다.";

      setEmailVerification({
        status: "default",
        message: message,
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Note: You might want to prevent submit if idVerification.status !== 'valid'
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
        // 전화번호에 - 넣는 것은 VARCHAR라 영항 없음
        phoneNumber: formData.phone,
        email: formData.email,
        school: formData.school,
        major: formData.major,
        interestFields: selectedInterests.map((key) => key.split("|")[2]),
        intervalDays: parseInt(formData.alarmPeriod, 10),
        alarmTime: `${formData.alarmTime.padStart(2, "0")}:00:00`,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }

      navigate("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "회원가입 중 오류가 발생했습니다.",
      );
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
          content="나에게 필요한 정보를 먼저 찾아주는 AI 서비스 알려주잡에 회원가입하세요."
        />
      </Helmet>
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
                  validationStatus={idVerification.status}
                  validationMessage={idVerification.message}
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
                  validationStatus={phoneVerification.status}
                  validationMessage={phoneVerification.message}
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
                  onCheckDuplicate={checkEmailDuplicate}
                  validationStatus={emailVerification.status}
                  validationMessage={emailVerification.message}
                  required
                  duplicateCheck={true}
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
                <InterestField>
                  <label>
                    관심 직무<span style={{ color: "red" }}> *</span>
                  </label>
                  <SelectorInput
                    type="button"
                    onClick={() => !isLoading && setIsInterestModalOpen(true)}
                    $hasValue={selectedInterests.length > 0}
                    disabled={isLoading}
                  >
                    {selectedInterests.length > 0
                      ? selectedInterests.map((key) => key.split("|").join(" - ")).join(", ")
                      : "관심 직무를 선택하세요"}
                  </SelectorInput>
                </InterestField>

                <InputGroup
                  label="알림 주기"
                  id="alarm-period"
                  name="alarmPeriod"
                  value={formData.alarmPeriod}
                  onChange={onChange}
                  disabled={isLoading}
                  options={[
                    { value: "", label: "선택" },
                    ...[1, 2, 3, 4, 5, 6, 7].map((v) => ({
                      value: v,
                      label: String(v),
                    })),
                  ]}
                  suffix="일마다 한 번씩"
                />

                <InputGroup
                  label="알림 시간"
                  id="alarm-time"
                  name="alarmTime"
                  value={formData.alarmTime}
                  onChange={onChange}
                  disabled={isLoading}
                  options={[
                    { value: "", label: "선택" },
                    ...Array.from({ length: 24 }, (_, i) => ({
                      value: i.toString().padStart(2, "0"),
                      label: `${i.toString().padStart(2, "0")}:00`,
                    })),
                  ]}
                  suffix="시에 알람을 받아요"
                />
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
              disabled={
                isLoading || !isAgreed || !formData.id || !formData.password
              }
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

      <JobCategoryModal
        isOpen={isInterestModalOpen}
        onClose={() => setIsInterestModalOpen(false)}
        initialSelected={selectedInterests}
        onConfirm={handleInterestConfirm}
      />
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

const InterestField = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  min-height: 2.125rem;

  label {
    color: #141618;
    font-size: 0.875rem;
    font-weight: 500;
    flex: 0 0 4.5rem;
    white-space: nowrap;
  }

  @media (min-width: 769px) {
    gap: 1rem;

    label {
      font-size: 1rem;
      flex: 0 0 6rem;
    }
  }
`;

const SelectorInput = styled.button<{ $hasValue: boolean }>`
  flex: 1;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  border: 1px solid #c2c4c8;
  background: #fff;
  color: ${({ $hasValue }) => ($hasValue ? "#141618" : "#5a5c63")};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    border-color: #2e3847;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;
