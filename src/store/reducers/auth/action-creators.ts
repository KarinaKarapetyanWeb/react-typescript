import { AppDispatch } from "../..";
import {
  AuthActionsEnum,
  setAuthAction,
  setErrorAction,
  setLoadingAction,
  setUserAction,
} from "./types";
import { IUser } from "../../../models/IUser";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
  setUser: (user: IUser): setUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): setAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (payload: boolean): setLoadingAction => ({
    type: AuthActionsEnum.SET_LOADING,
    payload: payload,
  }),
  setError: (payload: string): setErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: payload,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const response = await UserService.getUsers();
          const mockUser = response.data.find(
            (user) => user.username === username && user.password === password
          );
          if (mockUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setIsAuth(true));
          } else {
            dispatch(
              AuthActionCreators.setError(
                "Пользователь ввел некорректный логин или пароль"
              )
            );
          }
          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
      } catch (e) {
        dispatch(
          AuthActionCreators.setError("Произошла ошибка при авторизации")
        );
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};
