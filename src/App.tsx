import React, { useEffect, useState } from "react";
import { Layout, Flex } from "antd";
import { PADDING, ROUTES, SIDEBAR_WIDTH } from "./constants";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { AppHeader } from "./components/Header/AppHeader";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserDescription } from "./components/User/UserDescription";
import { Dashboard } from "./components/Dashboards/Dashboard";
import { Blogs } from "./components/Blogs/Blogs";
import { PostPage } from "./components/Blogs/PostPage";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  padding: PADDING,
  height: "100%",
};

export const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentMargin, setContentMargin] = useState(SIDEBAR_WIDTH.COLLAPSED);
  const { HOME, BLOGS, DASHBOARD, POST } = ROUTES;

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const margin = collapsed ? SIDEBAR_WIDTH.COLLAPSED : SIDEBAR_WIDTH.EXPANDED;
    setContentMargin(margin);
  }, [collapsed]);

  const layoutStyle = {
    height: "calc(100vh - 64px)",
    marginLeft: contentMargin,
  };

  return (
    <Provider store={store}>
      <Flex gap="middle" wrap="wrap">
        <Layout>
          <Router>
            <Sidebar collapsed={collapsed} handleCollapse={handleCollapse} />
            <Layout style={layoutStyle}>
              <AppHeader />
              <Content style={contentStyle}>
                <Routes>
                  <Route path={HOME} Component={UserDescription} />
                  <Route path={DASHBOARD} Component={Dashboard} />
                  <Route path={BLOGS} Component={Blogs} />
                  <Route path={POST} Component={PostPage} />
                </Routes>
              </Content>
            </Layout>
          </Router>
        </Layout>
      </Flex>
    </Provider>
  );
};

export default App;
