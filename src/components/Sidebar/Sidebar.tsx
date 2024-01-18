import React, { useEffect } from "react";
import { Button, Layout, Typography, Image } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import { LIVE_METRICS, PADDING, SIDEBAR_WIDTH } from "../../constants";
import { SidebarHeader } from "./SidebarHeader";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchUserDetails } from "../../redux/user/userSlice";
import { UserDetails } from "../User/UserDetails";
import { SidebarMenu } from "./SidebarMenu";

const { Sider, Content } = Layout;
const { Text } = Typography;

const siderStyle: React.CSSProperties = {
  padding: 0,
  backgroundColor: "white",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  height: "100vh",
};

const contentStyle: React.CSSProperties = {
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  paddingTop: PADDING,
};

const buttonStyle: React.CSSProperties = {
  width: "60%",
};

export interface Props {
  collapsed: boolean;
  handleCollapse: () => void;
}

export const Sidebar = (props: Props) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.userReducer);
  const { collapsed, handleCollapse } = props;

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  return (
    <Sider
      width={SIDEBAR_WIDTH.EXPANDED}
      style={siderStyle}
      collapsed={collapsed}
      collapsedWidth={SIDEBAR_WIDTH.COLLAPSED}
    >
      <SidebarHeader collapsed={collapsed} handleCollapse={handleCollapse} />
      <Content style={contentStyle}>
        <>
          <Image
            style={{ borderRadius: "50%" }}
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Text type="secondary">Hello</Text>
          {!isLoading && <UserDetails user={user} isCollapsed={collapsed} />}
          <Button
            disabled
            type="primary"
            icon={<ProfileOutlined />}
            style={buttonStyle}
          >
            {LIVE_METRICS}
          </Button>
          <SidebarMenu collapsed={collapsed} />
        </>
      </Content>
    </Sider>
  );
};
