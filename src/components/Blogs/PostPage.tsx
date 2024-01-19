import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "antd/es/layout/layout";
import { Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchPostById,
  BlogPost,
  PostType,
  updatePost,
  deletePost,
} from "../../redux/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { EditPostForm } from "./EditPostForm";

const { Text } = Typography;
const { Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  lineHeight: "64px",
  backgroundColor: "#d6e4ff",
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  padding: "50px",
  lineHeight: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  textAlign: "justify",
  backgroundColor: "white",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  height: "100px",
  display: "flex",
  gap: "30px",
  justifyContent: "flex-end",
  backgroundColor: "white",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  height: "100%",
};

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const { id, type } = useParams();
  const navigate = useNavigate();

  const { selectedPost, postType } = useAppSelector(
    (state) => state.postsReducer
  );

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!selectedPost && id && type) {
      const postId = parseInt(id);
      const postType = type as PostType;
      dispatch(fetchPostById({ id: postId, type: postType }));
    }
  }, []);

  const handleShowForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = async () => {
    setIsFormOpen(false);
  };

  const handleSave = (post: BlogPost) => {
    dispatch(updatePost(post));
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    selectedPost && dispatch(deletePost(selectedPost.id));
    navigate(`/blogs/${postType}`);
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Text strong>Post {selectedPost?.id}</Text>
      </Header>
      <Content style={contentStyle}>
        <Text strong> {selectedPost?.title}</Text>
        <span>{selectedPost?.body}</span>
      </Content>
      <Footer style={footerStyle}>
        <Button icon={<EditOutlined />} onClick={handleShowForm} size="large">
          Edit
        </Button>
        <Button
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          size="large"
          danger
        >
          Delete
        </Button>
      </Footer>
      {selectedPost && (
        <EditPostForm
          isModalOpen={isFormOpen}
          handleClose={handleCloseForm}
          handleSave={handleSave}
          post={selectedPost}
        />
      )}
    </Layout>
  );
};
