import styled from "styled-components";
import dividerIcon from "../assets/images/divider.svg";

// Color tokens
const COLORS = {
  primary: "#141618",
  neutral60: "#878A93",
  white: "#FFFFFF",
  bgPrimary: "#F2F2F7",
};

export function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        {/* Links Section */}
        <LinksSection>
          <Link href="#privacy">개인정보 취급방침</Link>
          <Link href="#terms">이용약관</Link>
        </LinksSection>

        {/* Company Info Section */}
        <CompanyInfoSection>
          {/* Desktop First Row */}
          <DesktopInfoRow>
            <InfoItem>네이티브피티</InfoItem>
            <Divider src={dividerIcon} alt="" />
            <InfoItem>549-04-02156</InfoItem>
            <Divider src={dividerIcon} alt="" />
            <InfoItem>대표자 김수겸</InfoItem>
            <Divider src={dividerIcon} alt="" />
            <InfoItem>이메일 hello@1cupenglish.com</InfoItem>
          </DesktopInfoRow>

          {/* Desktop Second Row */}
          <DesktopInfoRow>
            <InfoItem>서울특별시 성북구 안암로9가길 9-8, 303호</InfoItem>
            <Divider src={dividerIcon} alt="" />
            <InfoItem>통신판매업 신고번호 제2022-서울종로-1744호</InfoItem>
          </DesktopInfoRow>

          {/* Mobile Layout */}
          <MobileInfoRow>
            <InfoItem>네이티브피티</InfoItem>
            <Divider src={dividerIcon} alt="" />
            <InfoItem>549-04-02156</InfoItem>
          </MobileInfoRow>

          <MobileInfoRow>
            <InfoItem>대표자 김수겸</InfoItem>
            <Divider src={dividerIcon} alt="" />
            <InfoItem>이메일 hello@1cupenglish.com</InfoItem>
          </MobileInfoRow>

          <MobileInfoRow>
            <InfoItem>서울특별시 성북구 안암로9가길 9-8, 303호</InfoItem>
          </MobileInfoRow>

          <MobileInfoRow>
            <InfoItem>통신판매업 신고번호 제2022-서울종로-1744호</InfoItem>
          </MobileInfoRow>

          {/* Copyright */}
          <CopyrightRow>
            <InfoItem>©2026 All Rights Reserved</InfoItem>
          </CopyrightRow>
        </CompanyInfoSection>
      </FooterContainer>
    </FooterWrapper>
  );
}

// Styled Components
const FooterWrapper = styled.footer`
  width: 100%;
  background-color: ${COLORS.bgPrimary};
  padding: 2rem 1rem;
  margin-top: auto;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;
`;

const LinksSection = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 1.5rem;
  }
`;

const Link = styled.a`
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.primary};
  text-decoration: none;
  line-height: 1.3;
  transition: color 0.2s ease;

  &:hover {
    color: ${COLORS.neutral60};
  }

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const CompanyInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  align-items: center;
`;

const DesktopInfoRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    display: none;
  }
`;

const MobileInfoRow = styled.div`
  display: none;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    display: flex;
  }
`;

const CopyrightRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InfoItem = styled.p`
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${COLORS.neutral60};
  margin: 0;
  line-height: 1.3;
  white-space: nowrap;

  @media (max-width: 640px) {
    white-space: normal;
  }
`;

const Divider = styled.img`
  width: auto;
  height: 0.625rem;
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    display: flex;
  }
`;
