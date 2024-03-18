import * as signalR from "@microsoft/signalr";
import { ApiSClient } from "../api/s-client";
import { ApiSServer } from "../api/s-server";

import BalanceModel from "../api/types/BalanceModel";
import LanguageModel from "../api/types/LanguageModel";
import UserModel from "../api/types/UserModel";

import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";

import { Countries } from "../types/countries";

import { routes } from "../constantes/routes";

import { Account, LoginKind, ReverceRestrictions, Roles } from "../types/auth";

type Nulable<T> = T | null;

type Context = {
  user: null | string | false;
  hubConnection: Nulable<signalR.HubConnection>;
  logOut: () => void;
  login: (token: string) => void;
  loading: boolean;
  signIn: (n: string, c: string | null) => void;
  isCheckAccount: null | boolean;
  setIsCheckAccount: (v: null | boolean) => void;
  authPhone: string;
  setAuthPhone: (v: string) => void;
  account: UserModel | null;
  setAccount: (account: UserModel | null) => void;
  setLanguage: (l: string) => void;
  countries: Countries[];
  authSelectCountry: Countries | null;
  setAuthSelectCountry: (authSelectCountry: Countries | null) => void;
  langs: LanguageModel[];
  setLangs: (langs: LanguageModel[]) => void;
  balance: null | BalanceModel;
  setBalance: (balance: null | BalanceModel) => void;
  role: "user" | "actor" | null;
  setRole: (role: "user" | "actor" | null) => void;
  setIsLogin: (v: boolean) => void;
};

export const AppContext = React.createContext<Context>({
  hubConnection: null,
  user: null,
  logOut: () => undefined,
  login: () => undefined,
  loading: true,
  signIn: (n: string, c: string | null) => undefined,
  isCheckAccount: null,
  setIsCheckAccount: () => undefined,
  authPhone: "",
  setAuthPhone: () => undefined,
  account: null,
  setAccount: () => undefined,
  setLanguage: () => undefined,
  countries: [],
  authSelectCountry: null,
  setAuthSelectCountry: () => undefined,
  langs: [],
  setLangs: () => undefined,
  balance: null,
  setBalance: () => undefined,
  role: null,
  setRole: () => undefined,
  setIsLogin: () => undefined,
});

export const HubProvider = ({ children }: any) => {
  const [hubConnection, setHubConnection] =
    useState<Nulable<signalR.HubConnection>>(null);
  const [user, setUser] = useState<null | string | false>(null);
  const [account, setAccount] = useState<null | UserModel>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<null | BalanceModel>(null);
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);
  const [isCheckAccount, setIsCheckAccount] = useState<null | boolean>(null);

  const [log, setLog] = useState(false);
  const [authPhone, setAuthPhone] = useState("");
  const [countries, setCountries] = useState<Countries[]>([]);
  const [authSelectCountry, setAuthSelectCountry] = useState<null | Countries>(
    null
  );
  const [role, setRole] = useState<"user" | "actor" | null>(null);

  const [langs, setLangs] = useState<LanguageModel[]>([]);
  const navigate = useNavigate();
  const client = new ApiSClient(hubConnection as signalR.HubConnection);
  const api = new ApiSServer(hubConnection as signalR.HubConnection);
  const [incoingCall, setIncoingCall] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(`/api/main`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        setHubConnection(hubConnection);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    return function cleanup() {
      if (hubConnection !== null) {
        hubConnection.stop();
      }
    };
  }, [log]);

  useEffect(() => {
    (function init100vh() {
      function setHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
      setHeight();
      window.addEventListener("resize", setHeight);
    })();
  }, []);

  useEffect(() => {
    if (!hubConnection) return;
    getLangs();
  }, [hubConnection]);

  const getLangs = async () => {
    try {
      const res = await api.getLanguages("en");
      setLangs(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (hubConnection) {
      getSigned();
    }
    return function cleanup() {
      if (hubConnection !== null) {
        hubConnection.stop();
      }
    };
  }, [hubConnection, log]);

  const getSigned = async () => {
    if (hubConnection) {
      api
        .getSigned()
        .then((res: any) => {
          if (res) {
            setUser(res.userName);
            setLoading(false);
            setAccount(res);
            const role = localStorage.getItem("role");
            const roles = localStorage.getItem("roles");
            if (res.roles && res.roles.length) {
              if (role) {
                setRole(role as any);
              } else {
                setRole(res.roles[0] as any);
                localStorage.setItem("role", res.roles[0]);
              }
            }
            if (isLogin) {
              if (res && !res.email) {
                // navigate(routes.youEmail);
              } else if (res && res.roles && res.roles.length > 1) {
                // navigate(routes.selectRole);
              } else {
                navigate(routes.main);
              }
            }
          }
        })
        .catch((err: any) => {
          setUser(false);
          setAccount(null);
          setIsAdmin(false);
          setLoading(false);
          localStorage.removeItem("admin");
        });
    }
  };

  const signIn = async (name: string, code: string | null) => {
    try {
      const res = await fetch(`/api/v1/auth/signin`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
          Login: name,
          Password: code,
          SignInMethod: LoginKind.PhoneNumber,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      login("g");
      setIsLogin(true);

      navigate(routes.contracts);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    try {
      await fetch(`/api/v1/auth/signout`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      login("g");

      navigate(routes.main);
      localStorage.removeItem("role");
    } catch (e) {
      console.log(e);
    }
  };

  const login = (token: string) => {
    setLog((l) => !l);
    setLanguage(window.navigator.language || "en");
  };

  const setLanguage = async (languageCode: string) => {
    try {
      hubConnection?.invoke("SetLanguage", languageCode);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (hubConnection) {
      getCountries();
    }
  }, [hubConnection]);

  const getCountries = async () => {
    if (!hubConnection) return;
    try {
      const res = await hubConnection.invoke<Countries[]>("GetCountries", "en");
      setCountries(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        hubConnection,
        user,
        logOut,
        loading,
        login,
        signIn,
        isCheckAccount,
        setIsCheckAccount,
        authPhone,
        setAuthPhone,
        account,
        setAccount,
        setLanguage,
        countries,
        authSelectCountry,
        setAuthSelectCountry,
        langs,
        setLangs,
        balance,
        setBalance,
        role,
        setRole,
        setIsLogin,
      }}
    >
      {children}
      <Outlet />
    </AppContext.Provider>
  );
};
