import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import {
  BORDER_RADIUS,
  COLORS,
  PADDING,
  ROUTES,
  SIDEBAR_MENU,
} from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { PostType } from "../../redux/posts/postsSlice";

const items: TabsProps["items"] = [
  {
    key: "all",
    label: SIDEBAR_MENU.BLOGS.ALL,
  },
  {
    key: "latest",
    label: SIDEBAR_MENU.BLOGS.LATEST,
  },
  {
    key: "archived",
    label: SIDEBAR_MENU.BLOGS.ARCHIVED,
  },
];

const tabsStyle: React.CSSProperties = {
  padding: PADDING,
  backgroundColor: COLORS.WHITE,
  borderTopRightRadius: BORDER_RADIUS,
  borderTopLeftRadius: BORDER_RADIUS,
};

export const PostTabs = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const { BLOGS_ALL, BLOGS_LATEST, BLOGS_ARCHIVED } = ROUTES;
  const navpaths = {
    all: BLOGS_ALL,
    latest: BLOGS_LATEST,
    archived: BLOGS_ARCHIVED,
  };

  const [activeTab, setActiveTab] = useState<string>(SIDEBAR_MENU.BLOGS.ALL);

  const onChange = (key: string) => {
    const tabKey = key as PostType;
    navigate(navpaths[tabKey]);
  };

  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  return (
    <Tabs
      items={items}
      onChange={onChange}
      activeKey={activeTab}
      style={tabsStyle}
    />
  );
};
