import { IUser } from "../../../models/IUser";

export interface AuthState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: null | string;
}

export enum AuthActionsEnum {
  SET_AUTH = "SET_AUTH",
  SET_ERROR = "SET_ERROR",
  SET_LOADING = "SET_LOADING",
  SET_USER = "SET_USER",
}

export interface setAuthAction {
  type: AuthActionsEnum.SET_AUTH;
  payload: boolean;
}

export interface setErrorAction {
  type: AuthActionsEnum.SET_ERROR;
  payload: string;
}

export interface setLoadingAction {
  type: AuthActionsEnum.SET_LOADING;
  payload: boolean;
}

export interface setUserAction {
  type: AuthActionsEnum.SET_USER;
  payload: IUser;
}

export type AuthAction =
  | setAuthAction
  | setErrorAction
  | setLoadingAction
  | setUserAction;
