import { Link as UserLink } from "@/lib/utils";
import Link from "next/link";
import { createContext } from "react";

export const UserAuthContext = createContext({
  isUserSigned: false,
  loadingUser: true,
  setIsUserSigned: () => {},
  userData: {},
  setUserData: () => {},
  ChangeUrl: () => {},
  OldChangeUrl: () => {},
  router: null,
  pathname: null,
  loadingPage: true,
  setLoadingPage: () => {},
  checkUser: () => {},
  items: {},
  setItems: () => {},
  updateCart: () => {},
  Link: UserLink,
});

export const AdminAuthContext = createContext({
  isAdminSigned: false,
  loadingAdmin: true,
  setIsAdminSigned: () => {},
  adminData: {},
  router: null,
  setAdminData: () => {},
  ChangeUrl: () => {},
  loadingPage: true,
  setLoadingPage: () => {},
  checkAdmin: () => {},
  Link: Link,
});
