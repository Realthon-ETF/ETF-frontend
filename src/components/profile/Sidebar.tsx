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
          마이페이지
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
        </ul>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        로그아웃
      </button>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  width: 30%;
  background: #f7fbff;
  padding: 3.5rem 2rem;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid #eaebec;

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    padding: 2rem;
  }

  .sidebar-header {
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
  }

  .nav-menu {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }

  .logout-btn {
    margin-top: auto;
    text-decoration: underline;
    color: #878a93;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    font-weight: 500;
    text-align: left;
  }
`;

const NavButton = styled.button<{ $isActive: boolean }>`
  font-size: 1.25rem;
  font-weight: 500;
  color: #46474c;
  cursor: pointer;
  transition: all 0.2s;

  background: none;
  border: none;
  text-align: left;
  padding: 0;
  font-family: inherit;
  width: 100%;

  color: ${(props) => (props.$isActive ? "#06f" : "#46474c")};
  font-weight: ${(props) => (props.$isActive ? 700 : "normal")};

  &:hover {
    color: #06f;
  }
`;
