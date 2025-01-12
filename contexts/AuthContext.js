import { createContext } from "react";

export const UserAuthContext = createContext({
  isUserSigned: false,
  loadingUser: true,
  setIsUserSigned: () => {},
  userData: {},
  setUserData: () => {},
  ChangeUrl: () => {},
  setLoadingPage: () => {},
  checkUser: () => {},
  items: {},
  setItems: () => {},
  updateCart: () => {},
});

export const AdminAuthContext = createContext({
  isAdminSigned: false,
  loadingAdmin: true,
  setIsAdminSigned: () => {},
  adminData: {},
  setAdminData: () => {},
  ChangeUrl: () => {},
  setLoadingPage: () => {},
  checkAdmin: () => {},
});
