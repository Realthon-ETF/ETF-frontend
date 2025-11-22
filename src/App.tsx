// import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { auth } from "./firebase";

// import Layout from "./components/layout";
// import LoadingScreen from "./components/loading-screen";
// import ProtectedRoute from "./components/protected-route";
import AlarmLists from "./routes/alarm-lists";
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

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <ProtectedRoute>
  //       <Layout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     // {
  //     //   path: "",
  //     //   element: <Home />,
  //     // },
  //     {
  //       path: "/profile",
  //       element: <Profile />,
  //     },
  //   ],
  // },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/confirmed", element: <Confirmed /> },
  { path: "/alarm-lists", element: <AlarmLists /> },
  // {
  //   path:"/reset-password",
  //   element: <ResetPassword />
  // }
]);

// 이 아래의 reset은 브라우저마다 기본적으로 설치되어 있는 스타일을 지워주는 Node.js 패키지이다.
// 즉, 기본 제공 스타일을 초기화시켜 호환성을 맞춘다.

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, Pretendard;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
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
      <>
        <GlobalStyles />
        {/* {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />} */}
        {<RouterProvider router={router} />}
      </>
    </Wrapper>
  );
}
