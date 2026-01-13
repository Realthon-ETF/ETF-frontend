// import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
// import LoadingScreen from "./components/loading-screen";
// import AlarmLists from "./routes/alarm-lists";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import Result from "./routes/result";
// import ResetPassword from "./routes/reset-password";

import reset from "styled-reset";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Confirmed from "./routes/confirmed";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/confirmed",
        element: <Confirmed />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

// 이 아래의 reset은 브라우저마다 기본적으로 설치되어 있는 스타일을 지워주는 Node.js 패키지이다.
// 즉, 기본 제공 스타일을 초기화시켜 호환성을 맞춘다.

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #f7f8fa;
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, Pretendard;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh; // Ensures the app covers the full screen
  // This is the modern, "safe" way to ensure your background covers the whole screen even if you have almost no content on the page.
  // for mobile support, use 100dvh instead of 100vh
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center; // Only keep this if your Layout has a fixed width
  // If your Layout is meant to be full-width, this might shrink it to the center if it doesn't have width: 100%.
`;

export default function App() {
  // const [isLoading, setLoading] = useState(true);
  // const init = async () => {
  //   await auth.authStateReady();
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  return (
    <Wrapper>
      {/* <> */}
      <GlobalStyles />
      {/* {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />} */}
      <AuthProvider>{<RouterProvider router={router} />}</AuthProvider>
      {/* 1. RouterProvider와 Wrapper의 관계
RouterProvider 자체는 화면에 아무런 HTML 태그를 남기지 않습니다. 그 안에 들어가는 Layout이나 Home 같은 컴포넌트들이 실제로 렌더링되죠.

주의점: 만약 App.tsx의 Wrapper에도 가로 너비 제한이 있고, 그 안의 Layout 컴포넌트에도 또 너비 제한이 있다면 스타일이 충돌하거나 불필요하게 중복될 수 있습니다. */}
      {/* </> */}
    </Wrapper>
  );
}
