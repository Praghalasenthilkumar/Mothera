import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface InternetIdentityContextValue {
  login: () => Promise<void>;
  clear: () => void;
  loginStatus: "idle" | "logging-in" | "logged-in" | "error";
  identity: null;
}

const InternetIdentityContext = createContext<InternetIdentityContextValue>({
  login: async () => {},
  clear: () => {},
  loginStatus: "idle",
  identity: null,
});

export function InternetIdentityProvider({
  children,
}: { children: ReactNode }) {
  const [loginStatus, setLoginStatus] =
    useState<InternetIdentityContextValue["loginStatus"]>("idle");

  const login = async () => {
    setLoginStatus("logging-in");
    // Placeholder: real implementation uses @dfinity/auth-client
    setLoginStatus("logged-in");
  };

  const clear = () => {
    setLoginStatus("idle");
  };

  return (
    <InternetIdentityContext.Provider
      value={{ login, clear, loginStatus, identity: null }}
    >
      {children}
    </InternetIdentityContext.Provider>
  );
}

export function useInternetIdentity() {
  return useContext(InternetIdentityContext);
}
