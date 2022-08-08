import { Layout, Row } from "antd";
import React, { FunctionComponent } from "react";
import LoginForm from "../components/LoginForm";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <LoginForm />
      </Row>
    </Layout>
  );
};

export default Login;
