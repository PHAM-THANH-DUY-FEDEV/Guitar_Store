import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface AuthAdminContextType {
  tokenAdmin: string | null;
  setTokenAdmin: (tokenAdmin: string | null) => void;
}

const AuthAdminContext = createContext<AuthAdminContextType | undefined>(
  undefined
);

interface AuthAdminProviderProps {
  children: ReactNode;
}

const AuthAdminProvider: React.FC<AuthAdminProviderProps> = ({ children }) => {
  const [tokenAdmin, setTokenAdminState] = useState<string | null>(() => {
    const jwtStringAdmin = localStorage.getItem("JWTAdmin");
    if (!jwtStringAdmin) return null;
    try {
      const jwtObj = JSON.parse(jwtStringAdmin);
      return typeof jwtObj.token === "string" ? jwtObj.token : null;
    } catch {
      return null;
    }
  });
  const setTokenAdmin = (newToken: string | null) => {
    setTokenAdminState(newToken);
  };

  const contextValue = useMemo<AuthAdminContextType>(() => {
    return { tokenAdmin, setTokenAdmin };
  }, [tokenAdmin]);

  useEffect(() => {
    if (tokenAdmin) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokenAdmin}`;
      localStorage.setItem("tokenAdmin", tokenAdmin);
      console.log("JWT:", tokenAdmin);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("tokenAdmin");
      console.log("JWT cleared");
    }
  }, [tokenAdmin]);

  return (
    <AuthAdminContext.Provider value={contextValue}>
      {children}
    </AuthAdminContext.Provider>
  );
};

export const useAuthAdmin = (): AuthAdminContextType => {
  const context = useContext(AuthAdminContext);
  if (!context) {
    throw new Error("useAuthAdmin must be used within an AuthAdminProvider");
  }
  return context;
};

export default AuthAdminProvider;
