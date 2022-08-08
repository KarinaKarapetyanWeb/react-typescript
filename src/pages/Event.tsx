import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Layout, Modal, Row, Space } from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

interface EventProps {}

const Event: FunctionComponent<EventProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { guests, events } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false);
    createEvent(event);
  };

  return (
    <Layout>
      <Layout.Content>
        <Space direction="vertical">
          <Row justify="end">
            <Button onClick={() => setModalVisible(true)}>
              Добавить событие
            </Button>
          </Row>
          <Modal
            title="Добавить событие"
            visible={modalVisible}
            footer={null}
            onCancel={() => setModalVisible(false)}
          >
            <EventForm guests={guests} submit={addNewEvent} />
          </Modal>

          <EventCalendar events={events}></EventCalendar>
        </Space>
      </Layout.Content>
    </Layout>
  );
};

export default Event;
