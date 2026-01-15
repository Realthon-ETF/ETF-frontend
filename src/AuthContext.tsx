// 사용자 정보와 로그인 상태를 관리하는 global context
// We need to save the token when we log in, and read it when we first load the page.
import {
  useEffect,
  createContext,
  useState,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import api, { setClientToken } from "./api";

interface User {
  userId: string;
  email: string;
  username: string;
}

// Update the login response type based on your API spec
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user?: User; // Optional, depending on if your API returns user info immediately
}

interface AuthContextType {
  user: User | null;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthChecked = useRef(false);

  const fetchUserProfile = async () => {
    try {
      const { data } = await api.get<User>("/auth/me");
      setUser(data);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (isAuthChecked.current) return;
    isAuthChecked.current = true;

    const checkAuth = async () => {
      // 1. Retrieve the refresh token from storage
      const storedRefreshToken = localStorage.getItem("refreshToken");

      // If no token exists, stop immediately (user is not logged in)
      if (!storedRefreshToken) {
        setLoading(false);
        return;
      }

      try {
        // 2. Send the token in the BODY
        const { data } = await api.post<{
          accessToken: string;
          refreshToken?: string;
        }>("/auth/refresh", { refreshToken: storedRefreshToken });

        setClientToken(data.accessToken);

        // Optional: If the server rotates refresh tokens, update storage
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }

        const userRes = await api.get<User>("/auth/me");
        setUser(userRes.data);
      } catch (e) {
        console.log("Session expired or invalid");
        localStorage.removeItem("refreshToken"); // Cleanup
        setUser(null);
        setClientToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (id: string, password: string): Promise<void> => {
    // 3. Capture both tokens from the response
    const { data } = await api.post<LoginResponse>("/auth/login", {
      loginId: id,
      password,
    });

    // 4. Save Refresh Token to Storage
    localStorage.setItem("refreshToken", data.refreshToken);

    // 5. Save Access Token to Memory
    setClientToken(data.accessToken);

    await fetchUserProfile();
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } finally {
      // 6. Cleanup Storage on Logout
      localStorage.removeItem("refreshToken");
      setUser(null);
      setClientToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading ? children : <div>Checking session...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth error");
  return context;
};

// third version
// import {
//   useEffect,
//   createContext,
//   useState,
//   useContext,
//   useRef, // 1. Import useRef
//   type ReactNode,
// } from "react";
// import api, { setClientToken } from "./api";

// interface User {
//   userId: string;
//   email: string;
//   username: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (id: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 2. Add a ref to track if verify has already run
//   const isAuthChecked = useRef(false);

//   const fetchUserProfile = async () => {
//     try {
//       const { data } = await api.get<User>("/auth/me");
//       setUser(data);
//     } catch (e) {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     // 3. Prevent double execution in React Strict Mode
//     if (isAuthChecked.current) return;
//     isAuthChecked.current = true;

//     const checkAuth = async () => {
//       try {
//         const { data } = await api.post("/auth/refresh");
//         setClientToken(data.accessToken);

//         const userRes = await api.get<User>("/auth/me");
//         setUser(userRes.data);
//       } catch (e) {
//         console.log("No active session found");
//         // Ensure user is null if refresh fails
//         setUser(null);
//         setClientToken(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (id: string, password: string): Promise<void> => {
//     const { data } = await api.post<{ user: User; accessToken: string }>(
//       "/auth/login",
//       { loginId: id, password }
//     );
//     setClientToken(data.accessToken);
//     await fetchUserProfile();
//   };

//   const logout = async (): Promise<void> => {
//     try {
//       await api.post("/auth/logout");
//     } finally {
//       setUser(null);
//       setClientToken(null);
//       // Optional: clear local storage if you use it for anything else
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {!loading ? children : <div>Checking session...</div>}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// second version
// React Strict Mode 때문에 2번씩 호출되면서 tokenRefresh 동작 안함
// import {
//   useEffect,
//   createContext,
//   useState,
//   useContext,
//   type ReactNode,
// } from "react";
// import api, { setClientToken } from "./api";

// interface User {
//   userId: string;
//   email: string;
//   username: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (id: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// // 3. Initialize with undefined, but cast to the type to avoid null-checks later
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // 4. Define props for the Provider (standard for children)
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true); // 1. Added loading state

//   // Helper function to fetch user profile
//   const fetchUserProfile = async () => {
//     try {
//       const { data } = await api.get<User>("/auth/me"); // Call a profile endpoint
//       setUser(data);
//     } catch (e) {
//       setUser(null);
//     }
//   };

//   // 2. Silent Refresh logic on mount
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // 1. Get new access token using the Refresh Cookie
//         const { data } = await api.post("/auth/refresh");
//         // 2. IMMEDIATELY update the memory variable in api.ts
//         setClientToken(data.accessToken);
//         // 3. NOW fetch the profile (this request will now have the Bearer token)
//         const userRes = await api.get<User>("/auth/me");
//         setUser(userRes.data);
//       } catch (e) {
//         console.log("No active session found");
//       } finally {
//         setLoading(false); // 3. Stop loading regardless of success/fail
//       }
//     };
//     checkAuth();
//   }, []);

//   const login = async (id: string, password: string): Promise<void> => {
//     const { data } = await api.post<{ user: User; accessToken: string }>(
//       "/auth/login",
//       { loginId: id, password }
//     );

//     setClientToken(data.accessToken);
//     // setUser(data.user);
//     await fetchUserProfile();
//   };

//   const logout = async (): Promise<void> => {
//     try {
//       await api.post("/auth/logout");
//     } finally {
//       setUser(null);
//       setClientToken(null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {/* 4. Don't show the app until auth check is done */}
//       {!loading ? children : <div>Checking session...</div>}
//     </AuthContext.Provider>
//   );
// };

// // 5. Add a safety check in the hook
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// first version
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   // const [loading, setLoading] = useState(true);

//   const login = async (id: string, password: string): Promise<void> => {
//     // Assuming your API returns { user: User, accessToken: string }
//     const { data } = await api.post<{ user: User; accessToken: string }>(
//       "/auth/login",
//       {
//         loginId: id, // Change 'id' to 'loginId' to match your API requirements
//         password: password,
//       }
//     );

//     setUser(data.user);
//     setClientToken(data.accessToken);
//   };

//   const logout = async (): Promise<void> => {
//     await api.post("/auth/logout");
//     setUser(null);
//     setClientToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
