import React, { useEffect, useState } from "react";
import {
  CalendarOutlined,
  BarChartOutlined,
  SendOutlined,
  BellOutlined,
  InfoCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_MENU } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMenuKey } from "../../redux/posts/postsSlice";

interface Props {
  collapsed: boolean;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    label,
    key,
    icon,
    disabled,
    children,
    type,
  } as MenuItem;
}

const { DASHBOARD, BLOGS, DOCUMENTATION, REPORTS, NEED_HELP, SUB } =
  SIDEBAR_MENU;

export const sideBarMenuItems: MenuItem[] = [
  getItem(DASHBOARD.DASHBOARDS, SUB[0], "", false, [
    getItem(DASHBOARD.OVERVIEW, "/dashboard", <BarChartOutlined />),
    getItem(DASHBOARD.CALENDAR, "calendar", <CalendarOutlined />, true),
    getItem(DASHBOARD.SCHEDULE_ACTIONS, "actions", <SendOutlined />, true),
    getItem(DASHBOARD.LIVE_ALERTS, "liveAlerts", <BellOutlined />, true),
  ]),
  getItem(BLOGS.BLOGS, SUB[1], "", false, [
    getItem(BLOGS.ALL, "/blogs/all", <MessageOutlined />),
    getItem(BLOGS.LATEST, "/blogs/latest", <InfoCircleOutlined />),
    getItem(BLOGS.ARCHIVED, "/blogs/archived", <CalendarOutlined />),
  ]),
  getItem(DOCUMENTATION, SUB[2], "", true),
  getItem(REPORTS, SUB[3], "", true),
  getItem(NEED_HELP, SUB[4], "", true),
];

export const SidebarMenu = (props: Props) => {
  const { collapsed } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([SUB[0], SUB[1]]);
  const { menuKey } = useAppSelector((state) => state.postsReducer);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
    dispatch(setMenuKey(e.key));
  };

  useEffect(() => {
    const keys = collapsed ? [] : [SUB[0], SUB[1]];
    setOpenKeys(keys);
  }, [collapsed]);

  return (
    <Menu
      onClick={onClick}
      mode="inline"
      openKeys={openKeys}
      items={sideBarMenuItems}
      selectedKeys={[menuKey]}
      subMenuOpenDelay={2}
      expandIcon=" "
    />
  );
};
