import {
  useEffect,
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
import api, { setClientToken } from "./api";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 3. Initialize with undefined, but cast to the type to avoid null-checks later
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Define props for the Provider (standard for children)
interface AuthProviderProps {
  children: ReactNode;
}
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 1. Added loading state

  // 2. Silent Refresh logic on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call the refresh endpoint as soon as the app loads
        const { data } = await api.post("/auth/refresh");
        setUser(data.user);
        setClientToken(data.accessToken);
      } catch (e) {
        console.log("No active session found");
      } finally {
        setLoading(false); // 3. Stop loading regardless of success/fail
      }
    };
    checkAuth();
  }, []);

  const login = async (id: string, password: string): Promise<void> => {
    const { data } = await api.post<{ user: User; accessToken: string }>(
      "/auth/login",
      { loginId: id, password }
    );
    setUser(data.user);
    setClientToken(data.accessToken);
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      setClientToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* 4. Don't show the app until auth check is done */}
      {!loading ? children : <div>Checking session...</div>}
    </AuthContext.Provider>
  );
};

// 5. Add a safety check in the hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
