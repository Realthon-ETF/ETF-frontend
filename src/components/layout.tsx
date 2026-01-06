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

import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Layout() {
  return (
    <>
      <Header>
        <NavigationContainer aria-label="Global Navigation">
          <FlexGroup>
            <LogoLink to="/">
              <img src={logo} alt="알려주잡 로고" />
              <span>알려주잡</span>
            </LogoLink>

            <NavList>
              <li>
                <NavLink to="/settings">정보설정</NavLink>
              </li>
              <li>
                <NavLink to="/collection">수집함</NavLink>
              </li>
            </NavList>
          </FlexGroup>
          <ProfileLink to="/profile">내 프로필</ProfileLink>
        </NavigationContainer>
      </Header>

      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Header = styled.header`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #e1e2e4;
  background-color: white;

  /* Sticky positioning */
  position: sticky;
  top: 0;
  z-index: 50;

  display: flex;
  justify-content: center;
`;

// Semantically changed from 'div' to 'nav' to wrap all navigation elements
const NavigationContainer = styled.nav`
  width: 100%;
  /* Max-width constraint for large screens */
  max-width: 80rem;
  height: 100%;
  padding: 0 3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 425px) {
    padding: 0 1.25rem;
  }
`;

const FlexGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 360px) {
    gap: 0.5rem;
  }
`;

const Main = styled.div`
  width: 100%;
  flex: 1;
`;

// --- Navigation Item Components ---

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 360px) {
    gap: 0.5rem;
  }

  /* Reset default list styles */
  list-style: none;
  margin: 0;
  padding: 0;
`;

// Reusable link style to keep code DRY (Don't Repeat Yourself)
const BaseLinkStyle = styled(Link)`
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

const NavLink = styled(BaseLinkStyle)`
  /* You can add specific styles for menu links here if they differ later */
`;

const ProfileLink = styled(BaseLinkStyle)`
  /* Specific styles for profile, distinct from menu if needed */
  color: #141618;
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
