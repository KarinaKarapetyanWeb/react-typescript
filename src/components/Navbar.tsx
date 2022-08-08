import { Layout, Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import react, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RouteNames } from "../router";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { logout } = useActions();

  return (
    <Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: "white", padding: "0 15px" }}>
              {user.username}
            </div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item key={1}>
                <Link to="/" onClick={logout}>
                  Выйти
                </Link>
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key={1}>
              <Link to={RouteNames.LOGIN}>Логин</Link>
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Header>
  );
};

export default Navbar;
