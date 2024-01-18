import React from "react";
import { Button, Popover, Layout } from "antd";
import { UserData } from "../../redux/user/userSlice";
import { MailOutlined, PhoneOutlined, CrownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { CaretDownOutlined } from "@ant-design/icons";

interface Props {
  user: UserData;
  isCollapsed: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Information = styled.div`
  display: flex;
  gap: 10px;
`;

const contentStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

const { Content } = Layout;

export const UserDetails = (props: Props) => {
  const { user, isCollapsed } = props;
  const color = COLORS.BLUE;

  const content = (
    <Container>
      <Information>
        <PhoneOutlined style={{ color }} /> {user.phone}
      </Information>
      <Information>
        <MailOutlined style={{ color }} /> {user.email}
      </Information>
      <Information>
        <CrownOutlined style={{ color }} /> {user.company.name}
      </Information>
    </Container>
  );

  return (
    <Content style={contentStyle}>
      <Popover
        content={content}
        title={user.name}
        trigger="hover"
        placement={isCollapsed ? "right" : "bottom"}
      >
        <Button icon={<CaretDownOutlined />} type="text">
          {user.name}
        </Button>
      </Popover>
    </Content>
  );
};
