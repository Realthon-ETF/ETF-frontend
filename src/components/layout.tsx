// // 현재 refactoring 이전의 layout.tsx 로드 중
// import styled from "styled-components";
// import { Link, Outlet } from "react-router-dom";
// import logo from "../assets/logo.svg";
// // useNavigate from react-router-dom
// // import { auth } from "../firebase";

// export default function Layout() {
//   // const navigate = useNavigate();
//   // const onLogOut = async () => {
//   //   const ok = window.confirm("Are you sure you want to log out?");
//   //   if (ok) {
//   //     console.log(auth);
//   //     await auth.signOut();
//   //     navigate("/login");
//   //   }
//   // };

//   return (
//     <>
//       <HeaderContainer>
//         <nav className="nav-group">
//           {/* 로고 클릭 시 홈으로 이동 */}
//           <Link to="/" className="logo-area">
//             <img src={logo} alt="Logo" />
//             <span>알려주잡</span>
//           </Link>
//           <ul className="menu-list">
//             <li>
//               <Link to="/settings">정보설정</Link>
//             </li>
//             <li>
//               <Link to="/collection">수집함</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* 프로필도 Link로 변경 */}
//         <Link to="/profile" className="profile-link">
//           내 프로필
//         </Link>
//       </HeaderContainer>
//       <Outlet />
//     </>
//     // <Header>
//     //   <LeftHeaderWrapper>
//     //     <LogoContainer>
//     //       <LogoIcon>

//     //       </LogoIcon>
//     //       <LogoText>알려주잡</LogoText>
//     //     </LogoContainer>
//     //     <Nav>
//     //       <NavItem>정보설정</NavItem>
//     //       <NavItem>수집함</NavItem>
//     //     </Nav>
//     //   </LeftHeaderWrapper>
//     //   <ProfileTitle>내 프로필</ProfileTitle>
//     // </Header>
//   );
// }

// const HeaderContainer = styled.header`
//   width: 100%;
//   max-width: 120rem;
//   height: 4rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 3rem;
//   border-bottom: 1px solid #e1e2e4;

//   /* Link 태그의 기본 밑줄 제거 및 색상 초기화 */
//   a {
//     text-decoration: none;
//     color: inherit;
//     display: flex;
//     align-items: center;
//   }

//   .nav-group,
//   .logo-area {
//     display: flex;
//     align-items: center;
//   }

//   .nav-group {
//     gap: 4rem;
//   }

//   .logo-area {
//     gap: 0.25rem;
//     span {
//       color: #2e3847;
//       font-size: 1.25rem;
//       font-style: normal;
//       font-weight: 500;
//       line-height: normal;
//       letter-spacing: -0.05rem;
//     }
//   }

//   .menu-list {
//     display: flex;
//     list-style: none; /* 점 제거 */
//     padding: 0;
//     margin: 0;
//     gap: 1.25rem;

//     li a {
//       color: #141618;
//       font-size: 1rem;
//       font-weight: 500;
//       &:hover {
//         color: #007bff;
//       }
//     }
//   }

//   .profile-link {
//     color: #141618;
//     font-size: 1rem;
//     font-weight: 500;
//     line-height: 120%;
//     &:hover {
//       color: #007bff;
//     }
//   }
// `;

// 1차 refactoring code
// import styled from "styled-components";
// import { Link, Outlet } from "react-router-dom";
// import logo from "../assets/logo.svg";

// export default function Layout() {
//   return (
//     <>
//       <HeaderWrapper>
//         <HeaderContent>
//           <nav className="nav-group">
//             {/* Logo Area */}
//             <Link to="/" className="logo-area">
//               <img src={logo} alt="알려주잡 로고" />
//               <span className="logo-text">알려주잡</span>
//             </Link>

//             {/* Navigation Menu */}
//             <ul className="menu-list">
//               <li>
//                 <Link to="/settings">정보설정</Link>
//               </li>
//               <li>
//                 <Link to="/collection">수집함</Link>
//               </li>
//             </ul>
//           </nav>

//           {/* Profile Link */}
//           <Link to="/profile" className="profile-link">
//             내 프로필
//           </Link>
//         </HeaderContent>
//       </HeaderWrapper>

//       {/* Semantic Main tag for page content */}
//       <Main>
//         <Outlet />
//       </Main>
//     </>
//   );
// }

// // --- Styled Components ---

// // 1. Outer Wrapper: Handles full-width background and border
// const HeaderWrapper = styled.header`
//   width: 100%;
//   height: 4rem;
//   border-bottom: 1px solid #e1e2e4;
//   background-color: white;

//   /* Sticky header ensures nav is always accessible */
//   position: sticky;
//   top: 0;
//   z-index: 50;

//   display: flex;
//   justify-content: center;
// `;

// // 2. Inner Content: Handles max-width and layout alignment
// const HeaderContent = styled.div`
//   width: 100%;
//   // max-width: 120rem; /* Matches your design system preference */
//   height: 100%;
//   padding: 0 3rem;

//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   /* Responsive: Reduce padding on tablets/mobile */
//   @media (max-width: 425px) {
//     padding: 0 1.25rem;
//   }

//   /* Shared Link Styles */
//   a {
//     text-decoration: none;
//     color: inherit;
//     display: flex;
//     align-items: center;
//     transition: color 0.2s ease-in-out;
//   }

//   /* --- Navigation Group (Logo + Menu) --- */
//   .nav-group {
//     display: flex;
//     align-items: center;
//     gap: 4rem;

//     /* Responsive: Reduce gap on smaller screens */
//     @media (max-width: 768px) {
//       gap: 1.5rem;
//     }
//   }

//   /* --- Logo Area --- */
//   .logo-area {
//     gap: 0.25rem;

//     img {
//       height: 24px; /* Ensure logo doesn't jump in size */
//       width: auto;
//     }

//     .logo-text {
//       color: #2e3847;
//       font-size: 1.25rem;
//       font-weight: 600; /* Slightly bolder for hierarchy */
//       letter-spacing: -0.05rem;
//       white-space: nowrap; /* Prevent logo text wrap */
//     }
//   }

//   /* --- Menu List --- */
//   .menu-list {
//     display: flex;
//     align-items: center;
//     gap: 1.25rem;

//     /* Reset List Styles */
//     list-style: none;
//     margin: 0;
//     padding: 0;

//     li a {
//       color: #141618;
//       font-size: 1rem;
//       font-weight: 500;
//       white-space: nowrap;

//       &:hover {
//         color: #007bff;
//       }
//     }
//   }

//   /* --- Profile Link --- */
//   .profile-link {
//     color: #141618;
//     font-size: 1rem;
//     font-weight: 500;
//     white-space: nowrap;

//     &:hover {
//       color: #007bff;
//     }
//   }
// `;

// // 3. Main Container for Page Content
// const Main = styled.main`
//   width: 100%;
//   // max-width: 120rem;
//   /* Add consistent padding for all child pages if desired */
//   /* padding: 2rem 3rem; */

//   /* Ensure it takes remaining height if needed */
//   flex: 1;
// `;

import { useState } from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import Footer from "./footer";
import { useAuth } from "../AuthContext";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMobileMenu();
  };

  return (
    <>
      <Header>
        <NavigationContainer aria-label="Global Navigation">
          {/* Desktop Navigation */}
          <FlexGroup>
            <LogoLink to="/" onClick={closeMobileMenu}>
              <img src={logo} alt="알려주잡 로고" />
              <span>알려주잡</span>
            </LogoLink>
            <DesktopNavList>
              <li>
                <NavLink to="/settings">정보설정</NavLink>
              </li>
              <li>
                <NavLink to="/collection">수집함</NavLink>
              </li>
            </DesktopNavList>
          </FlexGroup>

          <DesktopProfileLink to="/profile">마이페이지</DesktopProfileLink>

          {/* Mobile Hamburger/Close Button */}
          <HamburgerButton
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMobileMenuOpen}
            $isOpen={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </HamburgerButton>
        </NavigationContainer>
      </Header>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay $isOpen={isMobileMenuOpen}>
        <MobileMenuContent>
          {user && (
            <>
              <UserName>{user.username}님</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}

          <MobileNavList>
            <li>
              <MobileNavLink to="/settings" onClick={closeMobileMenu}>
                정보설정
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/collection" onClick={closeMobileMenu}>
                수집함
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/profile" onClick={closeMobileMenu}>
                마이페이지
              </MobileNavLink>
            </li>
          </MobileNavList>
        </MobileMenuContent>
      </MobileMenuOverlay>

      {/* Backdrop */}
      {isMobileMenuOpen && <Backdrop onClick={closeMobileMenu} />}

      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}

// --- Styled Components ---

const Header = styled.header`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #e1e2e4;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 300;
  display: flex;
  justify-content: center;
`;

const NavigationContainer = styled.nav`
  width: 100%;
  max-width: 80rem;
  height: 100%;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const FlexGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const Main = styled.div`
  width: 100%;
  flex: 1;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  color: inherit;

  img {
    height: 24px;
    width: auto;
  }

  span {
    color: #2e3847;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.05rem;
    white-space: nowrap;
  }
`;

// Desktop Navigation
const DesktopNavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #141618;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #007bff;
  }
`;

const DesktopProfileLink = styled(Link)`
  text-decoration: none;
  color: #141618;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Hamburger/Close Button (Mobile Only)
const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 301;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #141618;
    border-radius: 2px;
    transition: all 0.3s ease;

    &:nth-child(1) {
      top: ${({ $isOpen }) => ($isOpen ? "50%" : "4px")};
      transform: ${({ $isOpen }) =>
        $isOpen ? "translateY(-50%) rotate(45deg)" : "translateY(0) rotate(0)"};
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
    }

    &:nth-child(3) {
      bottom: ${({ $isOpen }) => ($isOpen ? "50%" : "4px")};
      transform: ${({ $isOpen }) =>
        $isOpen ? "translateY(50%) rotate(-45deg)" : "translateY(0) rotate(0)"};
    }
  }

  &:hover span {
    background-color: #007bff;
  }
`;

// Mobile Menu Overlay
const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100vh - 4rem);
  background-color: white;
  z-index: 200;
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-100%)")};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

const UserName = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #141618;
  margin: 0;
  letter-spacing: -0.02em;
  text-align: left;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #878a93;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-bottom: 2.5rem;
  transition: color 0.2s ease;
  text-align: left;

  &:hover {
    color: #141618;
  }
`;

const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: #141618;
  font-size: 1.25rem;
  font-weight: 600;
  transition: color 0.2s ease;
  letter-spacing: -0.01em;
  text-align: left;

  &:hover {
    color: #007bff;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 150;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
`;
