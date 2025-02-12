import { Link } from "@/lib/utils";
import { createContext } from "react";

export const UserAuthContext = createContext({
  isUserSigned: false,
  loadingUser: true,
  setIsUserSigned: () => {},
  userData: {},
  setUserData: () => {},
  ChangeUrl: () => {},
  router: null,
  pathname: null,
  loadingPage: true,
  setLoadingPage: () => {},
  checkUser: () => {},
  items: {},
  setItems: () => {},
  updateCart: () => {},
  Link: typeof Link,
});

export const AdminAuthContext = createContext({
  isAdminSigned: false,
  loadingAdmin: true,
  setIsAdminSigned: () => {},
  adminData: {},
  router: null,
  ChangeUrl: () => {},
  setAdminData: () => {},
  ChangeUrl: () => {},
  loadingPage: true,
  setLoadingPage: () => {},
  checkAdmin: () => {},
  Link: typeof Link,
});
