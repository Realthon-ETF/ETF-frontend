import React, { useState } from "react";
import { Button } from "../components/Button";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import StyledCheckButton from "../components/check-button";
import { InputGroup, type ValidationStatus } from "../components/input-group";
import { useNavigate } from "react-router-dom";

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

  // --- New Verification State ---
  const [idVerification, setIdVerification] = useState<VerificationState>({
    status: "default",
    message: "",
  });

  const [phoneVerification, setPhoneVerification] = useState<VerificationState>(
    {
      status: "default",
      message: "",
    }
  );

  // Handlers
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const checkIdDuplicate = async (id: string) => {
    try {
      // 이 부분 logic update 필요, 실제 response body에 따라
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/check-id?loginId=${id}`
      );
      const data = await response.json();
      if (data.isDuplicate) {
        setIdVerification({
          status: "invalid",
          message: "이미 사용 중인 아이디입니다.",
        });
      } else {
        setIdVerification({
          status: "valid",
          message: "사용 가능한 아이디입니다.",
        });
      }
    } catch (err) {
      // alert("연결 오류가 발생했습니다.");
      setIdVerification({
        status: "default",
        message: "확인 중 오류가 발생했습니다.",
      });
    }
  };

  const checkPhoneDuplicate = async (phone: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/check-phone?phone=${phone}`
      );
      const data = await response.json();
      // todo: 중복 확인여부의 response JSON data 확인 후 update
      if (data.isDuplicate) {
        setPhoneVerification({
          status: "invalid",
          message: "이미 사용 중인 전화번호입니다.",
        });
      } else {
        setPhoneVerification({
          status: "valid",
          message: "사용 가능한 전화번호입니다.",
        });
      }
    } catch (err) {
      setPhoneVerification({
        status: "default",
        message: "확인 중 오류가 발생했습니다.",
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
        // todo: 관심 직무를 카테고리화 할지? 유저 입력으로 받은 후 parsing할지?
        // interestFields: [formData.interest],
        // 혅재 자료형이 ENUM이라 고정해두기
        interestFields: ["BACKEND", "AI"],
        intervalDays: parseInt(formData.alarmPeriod, 10),
        alarmTime: `${formData.alarmTime.padStart(2, "0")}:00:00`,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

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
