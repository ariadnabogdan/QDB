import { Layout, Pagination } from "antd";
import { Footer } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PAGE_SIZE } from "../../constants";
import {
  BlogPost,
  fetchPosts,
  PostType,
  selectPost,
  setMenuKey,
  setPostType,
} from "../../redux/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PostsList } from "./PostsList";
import { PostTabs } from "./PostTabs";

const layoutStyle = {
  height: "95%",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const footerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "white",
};

const { Content } = Layout;
export const Blogs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { type } = useParams();

  const path = window.location.pathname;
  const { posts } = useAppSelector((state) => state.postsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const [postsToDisplay, setPostsToDisplay] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (posts.all.length === 0 && user.id) {
      dispatch(fetchPosts(user.id));
    }
  }, [user]);

  useEffect(() => {
    dispatch(setMenuKey(path));
    if (type) dispatch(setPostType(type as PostType));
  }, [path]);

  useEffect(() => {
    if (type) {
      const postType = type as PostType;
      const postsList = posts[postType];
      setPostsToDisplay(postsList);

      if (postsList.length >= PAGE_SIZE) {
        setDisplayedPosts(postsList.slice(0, 4));
      } else {
        setDisplayedPosts(postsList);
      }
    }
  }, [posts, path]);

  const handleClick = (id: number) => {
    if (id && type) {
      const postType = type as PostType;
      navigate(`/blogs/${type}/${id}`);
      dispatch(selectPost({ id, type: postType }));
    }
  };
  const handleChangePage = (page: number) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;
    setDisplayedPosts(postsToDisplay.slice(startIndex, endIndex));
  };

  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        <PostTabs />
        <PostsList displayedPosts={displayedPosts} handleClick={handleClick} />
        <Footer style={footerStyle}>
          <Pagination
            defaultCurrent={1}
            total={postsToDisplay.length}
            pageSize={PAGE_SIZE}
            onChange={handleChangePage}
          />
        </Footer>
      </Content>
    </Layout>
  );
};
