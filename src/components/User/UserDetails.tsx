import React from "react";
import { Dropdown, MenuProps, Space } from "antd";
import { UserData } from "../../redux/user/userSlice";
import { MailOutlined, PhoneOutlined, CrownOutlined } from "@ant-design/icons";
import { COLORS } from "../../constants";
import { CaretDownOutlined } from "@ant-design/icons";

interface Props {
  user: UserData;
  isCollapsed: boolean;
}

export const UserDetails = (props: Props) => {
  const { user, isCollapsed } = props;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: user.phone,
      icon: <PhoneOutlined />,
    },
    {
      key: "2",
      label: user.email,
      icon: <MailOutlined />,
    },
    {
      key: "3",
      label: user.company.name,
      icon: <CrownOutlined />,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement={isCollapsed ? "bottomRight" : "bottom"}
    >
      <Space>
        {user.name}
        <CaretDownOutlined style={{ color: COLORS.GREY }} />
      </Space>
    </Dropdown>
  );
};
