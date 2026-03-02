import styled from "styled-components";
import { useAuth } from "../../AuthContext";

type TabType = "basic" | "summary" | "website" | "likes";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SidebarWrapper>
      <div className="sidebar-header">
        <h1>
          {user?.username}님의
          <br />
          내 정보
        </h1>
      </div>
      <div className="divider" />

      <nav className="nav-menu">
        <ul>
          <li>
            <NavButton
              $isActive={activeTab === "basic"}
              onClick={() => setActiveTab("basic")}
            >
              기본 정보
            </NavButton>
          </li>
          <li>
            <NavButton
              $isActive={activeTab === "summary"}
              onClick={() => setActiveTab("summary")}
            >
              내 요약 정보
            </NavButton>
          </li>
          <li>
            <NavButton
              $isActive={activeTab === "website"}
              onClick={() => setActiveTab("website")}
            >
              내 웹사이트
            </NavButton>
          </li>
          <li>
            <NavButton
              $isActive={activeTab === "likes"}
              onClick={() => setActiveTab("likes")}
            >
              좋아요
            </NavButton>
          </li>
          <li className="logout-item">
            <LogoutNavButton onClick={handleLogout}>
              로그아웃
            </LogoutNavButton>
          </li>
        </ul>
      </nav>

    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  width: 100%;
  background: transparent;
  padding: 0.75rem 1.25rem;
  min-height: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-right: none;
  border-bottom: 1px solid #eaebec;

  @media (min-width: 769px) {
    width: 30%;
    background: #f7fbff;
    padding: 3.5rem 2rem;
    gap: 2rem;
    border-right: 1px solid #eaebec;
    border-bottom: none;
    min-height: calc(100vh - 4rem);
  }

  .sidebar-header {
    display: none;

    @media (min-width: 769px) {
      display: block;
    }

    h1 {
      color: #141618;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
      white-space: pre-wrap;
      line-height: 1.3;
    }

    .subtitle {
      color: #06f;
      font-size: 1.25rem;
      font-weight: 700;
      margin-top: 1rem;
      margin-bottom: 0;
    }
  }

  .divider {
    height: 1px;
    background: #eaebec;
    width: 100%;
    display: none;

    @media (min-width: 769px) {
      display: block;
    }
  }

  .nav-menu {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      @media (min-width: 769px) {
        flex-direction: column;
        gap: 2rem;
      }
    }
  }

  .logout-item {
    display: none;

    @media (min-width: 769px) {
      display: list-item;
    }
  }
`;

const NavButton = styled.button<{ $isActive: boolean }>`
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.625rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.$isActive ? "#06f" : "#eaebec")};
  color: ${(props) => (props.$isActive ? "#fff" : "#46474c")};
  border: none;
  text-align: center;
  white-space: nowrap;
  font-family: inherit;
  flex-shrink: 0;

  &:hover {
    background: ${(props) => (props.$isActive ? "#0055dd" : "#d9d9d9")};
  }

  @media (min-width: 769px) {
    font-size: 1.25rem;
    font-weight: 500;
    padding: 0;
    background: none;
    color: ${(props) => (props.$isActive ? "#06f" : "#46474c")};
    border-radius: 0;
    flex-shrink: initial;
    width: 100%;
    text-align: left;

    &:hover {
      color: #06f;
      background: none;
    }
  }
`;

const LogoutNavButton = styled.button`
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.625rem;
  border-radius: 1rem;
  cursor: pointer;
  background: none;
  color: #878a93;
  border: none;
  text-decoration: underline;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    color: #141618;
  }

  @media (min-width: 769px) {
    font-size: 1rem;
    font-weight: 500;
    padding: 0;
    text-align: left;
    width: 100%;
  }
`;
