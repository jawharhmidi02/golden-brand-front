import { createContext } from "react";

export const UserAuthContext = createContext({
  isUserSigned: false,
  loadingUser: true,
  setIsUserSigned: () => {},
  userData: {},
  SetUserData: () => {},
  ChangeUrl: () => {},
  setLoadingPage: () => {},
  items: {},
  setItems: () => {},
  updateCart: () => {},
});

export const AdminAuthContext = createContext({
  isAdminSigned: false,
  loadingAdmin: true,
  setIsAdminSigned: () => {},
  adminData: {},
  SetAdminData: () => {},
  ChangeUrl: () => {},
  setLoadingPage: () => {},
});
