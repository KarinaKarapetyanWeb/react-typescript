import react, { FunctionComponent, useState } from "react";
import { Button, Card, DatePicker, Form, Input, Row, Select } from "antd";
import { rules } from "../utils/rules";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FunctionComponent<EventFormProps> = ({ guests, submit }) => {
  const [event, setEvent] = useState<IEvent>({
    author: "string",
    guest: "string",
    date: "string",
    description: "string",
  } as IEvent);
  const { user } = useTypedSelector((state) => state.auth);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) });
    }
  };

  const submitForm = () => {
    submit({ ...event, author: user.username });
  };

  return (
    <Card>
      <Form onFinish={submitForm} {...layout}>
        <Form.Item
          label="Описание события"
          name="description"
          rules={[rules.required()]}
        >
          <Input
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Дата события"
          name="date"
          rules={[
            rules.required(),
            rules.isDateAfter("Нельзя добавить событие на прошедшую дату"),
          ]}
        >
          {/* <ConfigProvider locale={locale}> */}
          <DatePicker onChange={(date) => selectDate(date)} />
          {/* </ConfigProvider> */}
        </Form.Item>
        <Form.Item label="Гость" name="guest" rules={[rules.required()]}>
          <Select
            onChange={(guest: string) => setEvent({ ...event, guest: guest })}
          >
            {guests.map((guest, i) => (
              <Select.Option value={guest.username} key={i}>
                {guest.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Row justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default EventForm;
