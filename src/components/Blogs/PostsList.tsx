import { List, Typography } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";
import styled from "styled-components";
import { BlogPost } from "../../redux/posts/postsSlice";

const listStyle: React.CSSProperties = {
  height: "90%",
  backgroundColor: "white",
};

const listItemStyle: React.CSSProperties = {
  cursor: "pointer",
};

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DescriptionContainer = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const { Text } = Typography;

interface Props {
  displayedPosts: BlogPost[];
  handleClick: (id: number) => void;
}

export const PostsList = (props: Props) => {
  const { displayedPosts, handleClick } = props;
  return (
    <List
      style={listStyle}
      itemLayout="vertical"
      size="large"
      dataSource={displayedPosts}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          style={listItemStyle}
          onClick={() => {
            handleClick(item.id);
          }}
        >
          <List.Item.Meta
            avatar={<img width={200} height={150} alt="logo" src={item.img} />}
            title={
              <TitleContainer>
                <Typography>{item.title}</Typography>
                <Text type="secondary">{item.date}</Text>
              </TitleContainer>
            }
            description={
              <DescriptionContainer>
                {item.body}
                <Link>Read more</Link>
              </DescriptionContainer>
            }
          />
        </List.Item>
      )}
    />
  );
};
