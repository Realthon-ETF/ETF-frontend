import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
// useNavigate from react-router-dom
// import { auth } from "../firebase";

export default function Layout() {
  // const navigate = useNavigate();
  // const onLogOut = async () => {
  //   const ok = window.confirm("Are you sure you want to log out?");
  //   if (ok) {
  //     console.log(auth);
  //     await auth.signOut();
  //     navigate("/login");
  //   }
  // };

  return (
    <>
      <HeaderContainer>
        <nav className="nav-group">
          {/* 로고 클릭 시 홈으로 이동 */}
          <Link to="/" className="logo-area">
            <img src={logo} alt="Logo" />
            <span>알려주잡</span>
          </Link>
          <ul className="menu-list">
            <li>
              <Link to="/settings">정보설정</Link>
            </li>
            <li>
              <Link to="/collection">수집함</Link>
            </li>
          </ul>
        </nav>

        {/* 프로필도 Link로 변경 */}
        <Link to="/profile" className="profile-link">
          내 프로필
        </Link>
      </HeaderContainer>
      <Outlet />
    </>
    // <Header>
    //   <LeftHeaderWrapper>
    //     <LogoContainer>
    //       <LogoIcon>

    //       </LogoIcon>
    //       <LogoText>알려주잡</LogoText>
    //     </LogoContainer>
    //     <Nav>
    //       <NavItem>정보설정</NavItem>
    //       <NavItem>수집함</NavItem>
    //     </Nav>
    //   </LeftHeaderWrapper>
    //   <ProfileTitle>내 프로필</ProfileTitle>
    // </Header>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 120rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  border-bottom: 1px solid #e1e2e4;

  /* Link 태그의 기본 밑줄 제거 및 색상 초기화 */
  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
  }

  .nav-group,
  .logo-area {
    display: flex;
    align-items: center;
  }

  .nav-group {
    gap: 4rem;
  }

  .logo-area {
    gap: 0.25rem;
    span {
      color: #2e3847;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.05rem;
    }
  }

  .menu-list {
    display: flex;
    list-style: none; /* 점 제거 */
    padding: 0;
    margin: 0;
    gap: 1.25rem;

    li a {
      color: #141618;
      font-size: 1rem;
      font-weight: 500;
      &:hover {
        color: #007bff;
      }
    }
  }

  .profile-link {
    color: #141618;
    font-size: 1rem;
    font-weight: 500;
    line-height: 120%;
    &:hover {
      color: #007bff;
    }
  }
`;
