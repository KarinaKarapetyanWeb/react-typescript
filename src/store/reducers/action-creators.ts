import { AuthActionCreators } from "./auth/action-creators";
import { EventsActionCreators } from "./event/action-creators";

export const allActionCreators = {
  ...AuthActionCreators,
  ...EventsActionCreators,
};
