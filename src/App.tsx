import { Layout } from "antd";
import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import "./App.css";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";

function App() {
  const { setIsAuth, setUser } = useActions();
  useEffect(() => {
    if (localStorage.getItem("username") !== "") {
      setUser({ username: localStorage.getItem("username") } as IUser);
      setIsAuth(true);
    }
  }, []);
  return (
    <Layout className="App">
      <Navbar />

      <Layout.Content style={{ overflow: "auto" }}>
        <div
          style={{
            maxWidth: "1220px",
            minWidth: "768px",
            overflow: "scroll",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <AppRouter />
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default App;
