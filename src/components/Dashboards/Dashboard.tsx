import React, { useEffect } from "react";
import {
  CalendarOutlined,
  InfoCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { COLORS, SIDEBAR_MENU } from "../../constants";
import { fetchPosts } from "../../redux/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.userReducer);
  const { posts } = useAppSelector((state) => state.postsReducer);

  useEffect(() => {
    if (posts.all.length === 0 && user.id) dispatch(fetchPosts(user.id));
  }, [user]);

  const color = COLORS.BLUE;

  const items = [
    {
      title: SIDEBAR_MENU.BLOGS.ALL,
      value: posts.all.length,
      icon: <MessageOutlined />,
    },
    {
      title: SIDEBAR_MENU.BLOGS.LATEST,
      value: posts.latest.length,
      icon: <InfoCircleOutlined />,
    },
    {
      title: SIDEBAR_MENU.BLOGS.LATEST,
      value: posts.archived.length,
      icon: <CalendarOutlined />,
    },
  ];

  return (
    <Row gutter={16}>
      {items.map((item, index) => (
        <Col span={6} key={index}>
          <Card bordered={false}>
            <Statistic
              title={item.title}
              value={item.value}
              valueStyle={{ color }}
              prefix={item.icon}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
