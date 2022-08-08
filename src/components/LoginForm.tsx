import react, { FunctionComponent, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { rules } from "../utils/rules";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useActions();

  const submitForm = () => {
    login(username, password);
  };

  return (
    <Card>
      <Form onFinish={submitForm}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[rules.required("Пожалуйста, введите имя пользователя")]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[rules.required("Пожалуйста, введите пароль")]}
        >
          <Input
            type={password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
