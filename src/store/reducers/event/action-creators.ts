import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import { EventActionsEnum, setEventsAction, setGuestsAction } from "./types";
import { IEvent } from "../../../models/IEvent";
import UserService from "../../../api/UserService";

export const EventsActionCreators = {
  setGuests: (guests: IUser[]): setGuestsAction => ({
    type: EventActionsEnum.SET_GUESTS,
    payload: guests,
  }),
  setEvents: (events: IEvent[]): setEventsAction => ({
    type: EventActionsEnum.SET_EVENTS,
    payload: events,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventsActionCreators.setGuests(response.data));
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventsActionCreators.setEvents(json));
      localStorage.setItem("events", JSON.stringify(json));
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(
        (ev) => ev.author === username || ev.guest === username
      );
      dispatch(EventsActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.log(e);
    }
  },
};
