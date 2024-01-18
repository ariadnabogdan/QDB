import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { COLORS, HEADER_HEIGHT, PADDING } from "../../constants";

const headerStyle: React.CSSProperties = {
  height: HEADER_HEIGHT,
  backgroundColor: COLORS.BLUE,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: PADDING,
};

interface Props {
  collapsed: boolean;
  handleCollapse: () => void;
}

const { Header } = Layout;

export const SidebarHeader = (props: Props) => {
  const color = COLORS.WHITE;
  const { collapsed, handleCollapse } = props;

  return (
    <Header style={headerStyle}>
      <Button
        type="text"
        icon={
          collapsed ? (
            <MenuUnfoldOutlined style={{ color }} />
          ) : (
            <MenuFoldOutlined style={{ color }} />
          )
        }
        onClick={handleCollapse}
      />
    </Header>
  );
};
