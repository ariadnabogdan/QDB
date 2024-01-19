import React from "react";
import { Avatar, Button, Dropdown, MenuProps, Typography } from "antd";
import styled from "styled-components";
import {
  SortAscendingOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  BLOGS_HEADER,
  COLORS,
  COMPANY,
  DATE,
  RELEVANCE,
  SORT,
} from "../../constants";
import { useAppSelector } from "../../redux/store";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const AvatarContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  margin: 8px 5px;
  flex-direction: column;
  justify-content: space-between;
`;

const { Text } = Typography;

export const BlogsHeader = () => {
  const { postType } = useAppSelector((state) => state.postsReducer);
  const avatarIcon =
    postType === "all" ? (
      <MessageOutlined />
    ) : postType === "latest" ? (
      <InfoCircleOutlined />
    ) : (
      <CalendarOutlined />
    );

  const items: MenuProps["items"] = [
    {
      label: DATE,
      key: "date",
    },
    {
      label: RELEVANCE,
      key: "relevance",
    },
  ];

  return (
    <Container>
      <AvatarContainer>
        <Avatar
          shape="square"
          size={64}
          icon={avatarIcon}
          style={{ backgroundColor: COLORS.BLUE }}
        />
        <TitleContainer>
          <Text strong>{BLOGS_HEADER[postType]}</Text>
          <Text type="secondary">{COMPANY}</Text>
        </TitleContainer>
      </AvatarContainer>

      <Dropdown menu={{ items }}>
        <Button icon={<SortAscendingOutlined />}>{SORT}</Button>
      </Dropdown>
    </Container>
  );
};
