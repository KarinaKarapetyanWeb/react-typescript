import react, { FunctionComponent } from "react";
import { Badge, Calendar } from "antd";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FunctionComponent<EventCalendarProps> = ({ events }) => {
  const dateCellRender = (value: Moment) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter((ev) => ev.date === formatedDate);

    return (
      <>
        {currentDayEvents.map((item, i) => (
          <div key={i}>
            <Badge color="#2db7f5" text={item.description} />
          </div>
        ))}
      </>
    );
  };

  return <Calendar dateCellRender={dateCellRender}></Calendar>;
};

export default EventCalendar;
