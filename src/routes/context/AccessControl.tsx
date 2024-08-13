import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface TokenPayload {
  email: string;
  acesso: Role;
}

interface AccessControlContextType {
  email: string | null;
  acesso: Role | null;
  setAccessControl: (email: string, acesso: Role) => void;
}

export enum Role {
  Cliente = "Cliente",
  Funcionario = "Funcionário",
  Admin = "Admin",
  Gestor = "Gestor",
}

const AccessControlContext = createContext<AccessControlContextType>({
  email: null,
  acesso: null,
  setAccessControl: () => {},
});

export const AccessControlProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [acesso, setAcesso] = useState<Role | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        setEmail(decodedToken.email);
        setAcesso(decodedToken.acesso);
      } catch (error) {
        console.error("Token inválido:", error);
      }
    }
  }, []);

  const setAccessControl = (email: string, acesso: Role) => {
    setEmail(email);
    setAcesso(acesso);
  };

  return (
    <AccessControlContext.Provider value={{ email, acesso, setAccessControl }}>
      {children}
    </AccessControlContext.Provider>
  );
};

export const useAccessControl = (): AccessControlContextType => {
  const context = useContext(AccessControlContext);
  if (context === undefined) {
    throw new Error(
      "o controle de acesso deve ser usado dentro de um provedor de controle de acesso",
    );
  }
  return context;
};
