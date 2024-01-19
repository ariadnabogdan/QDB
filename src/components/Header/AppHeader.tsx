import React from "react";
import { Layout, Input, Button, Badge } from "antd";
import {
  ADD,
  COLORS,
  HEADER_HEIGHT,
  SEARCH_PLACEHOLDER,
} from "../../constants";
import {
  SearchOutlined,
  PlusOutlined,
  BellOutlined,
  MailOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { UserMenu } from "./UserMenu";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  height: HEADER_HEIGHT,
  backgroundColor: COLORS.WHITE,
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 25px",
};

const ActionMenu = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const AppHeader = () => {
  return (
    <Header style={headerStyle}>
      <Input
        style={{ width: "25%" }}
        size="large"
        placeholder={SEARCH_PLACEHOLDER}
        prefix={<SearchOutlined />}
        disabled
      />
      <ActionMenu>
        <Button type="text" icon={<PlusOutlined />} disabled>
          {ADD}
        </Button>
        <Badge dot={true}>
          <BellOutlined style={{ fontSize: "17px" }} />
        </Badge>
        <Badge dot={true}>
          <MailOutlined style={{ fontSize: "17px" }} />
        </Badge>
        <Badge dot={true}>
          <AppstoreAddOutlined style={{ fontSize: "17px" }} />
        </Badge>
        <UserMenu />
      </ActionMenu>
    </Header>
  );
};
