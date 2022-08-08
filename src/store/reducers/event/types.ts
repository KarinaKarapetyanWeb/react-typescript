import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";

export interface EventState {
  guests: IUser[];
  events: IEvent[];
  //   isLoading: boolean;
  //   error: null | string;
}

export enum EventActionsEnum {
  SET_GUESTS = "SET_GUESTS",
  SET_EVENTS = "SET_EVENTS",
  //   SET_ERROR = "SET_ERROR",
  //   SET_LOADING = "SET_LOADING",
}

export interface setGuestsAction {
  type: EventActionsEnum.SET_GUESTS;
  payload: IUser[];
}

export interface setEventsAction {
  type: EventActionsEnum.SET_EVENTS;
  payload: IEvent[];
}

export type EventAction = setGuestsAction | setEventsAction;
