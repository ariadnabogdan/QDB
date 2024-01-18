import { List, Typography } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";
import { BlogPost } from "../../redux/posts/postsSlice";

const listStyle: React.CSSProperties = {
  height: "90%",
  backgroundColor: "white",
};

const listItemStyle: React.CSSProperties = {
  cursor: "pointer",
};

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
          extra={
            <img
              width={200}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
          actions={[<Link>Read more</Link>]}
          onClick={() => {
            handleClick(item.id);
          }}
        >
          <List.Item.Meta title={<Typography>{item.title}</Typography>} />
          {item.body}
        </List.Item>
      )}
    />
  );
};
