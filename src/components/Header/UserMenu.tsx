import { Image, Dropdown, MenuProps } from "antd";
import React from "react";
import {
  UserOutlined,
  LogoutOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { COLORS, USER_MENU } from "../../constants";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    key === "/" && navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      label: USER_MENU.ACCOUNT,
      key: "/",
      icon: <UserOutlined />,
    },
    {
      label: USER_MENU.LOG_OUT,
      key: "0",
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Dropdown menu={{ items, onClick }}>
      <div>
        <Image
          style={{ borderRadius: "50%" }}
          width={"25px"}
          src="userPicture.jpeg"
          preview={false}
        />
        <CaretDownOutlined style={{ color: COLORS.GREY }} />
      </div>
    </Dropdown>
  );
};
