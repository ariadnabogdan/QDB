import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface BlogPost {
  id: number;
  title: string;
  body: string;
}

interface AllPosts {
  all: BlogPost[];
  latest: BlogPost[];
  archived: BlogPost[];
}

export type PostType = "all" | "latest" | "archived";

interface Posts {
  isLoading: boolean;
  posts: AllPosts;
  selectedPost?: BlogPost;
  postType: PostType;
  menuKey: string;
}

const initialState: Posts = {
  isLoading: false,
  posts: {
    all: [],
    latest: [],
    archived: [],
  },
  postType: "all",
  menuKey: "",
};

export const fetchPosts = createAsyncThunk(
  "blog/getPosts",
  async (userId: number) => {
    const baseURL = process.env.REACT_APP_USERS_URL || "";
    const fetchPostsURL = `${baseURL}/${userId}/posts`;
    try {
      const response = await axios.get(fetchPostsURL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "blog/fetchPostById",
  async (data: { id: number; type: PostType }) => {
    const { id, type } = data;
    const fetchPostsURL = process.env.REACT_APP_ALL_POSTS_URL || "";
    try {
      const response = await axios.get(fetchPostsURL);
      const post = response.data.find((res: BlogPost) => res.id === id);
      return {
        post: { id: post.id, title: post.title, body: post.body },
        type,
      };
    } catch (error) {
      console.error(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async (data: BlogPost) => {
    const baseURL = process.env.REACT_APP_ALL_POSTS_URL || "";
    const fetchPostsURL = `${baseURL}/${data.id}`;
    try {
      const response = await axios.put(fetchPostsURL, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (data: { id: number; type: PostType }) => {
    const { id, type } = data;
    const baseURL = process.env.REACT_APP_ALL_POSTS_URL || "";
    const postsURL = `${baseURL}/${id}`;
    try {
      await axios.delete(postsURL);
      return { id, type };
    } catch (error) {
      console.error(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    selectPost: (
      state: Posts,
      action: PayloadAction<{ id: number; type: PostType }>
    ) => {
      const selectedPost = state.posts[action.payload.type].find(
        (post) => post.id === action.payload.id
      );
      state.selectedPost = selectedPost;
    },
    setMenuKey: (state: Posts, action: PayloadAction<string>) => {
      state.menuKey = action.payload;
    },
    setPostType: (state: Posts, action: PayloadAction<PostType>) => {
      state.postType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.all = action.payload;
      state.posts.latest = [action.payload[0]];
      state.posts.archived = [action.payload[1]];
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      const postType = action.payload?.type ?? "all";
      state.selectedPost = action.payload?.post;
      state.postType = postType;
      state.isLoading = false;
    });
    builder.addCase(fetchPostById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedBlogIndex = state.posts.all.findIndex(
        (post) => post.id === action.payload.id
      );
      const updatedPosts = state.posts.all;
      updatedPosts[updatedBlogIndex] = action.payload;
      state.posts.all = updatedPosts;
      state.selectedPost = action.payload;
      state.posts.latest = [updatedPosts[0]];
      state.posts.archived = [updatedPosts[1]];
    });
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const type = action.payload?.type ?? "all";
      const id = action.payload?.id;
      const postIndex = state.posts.all.findIndex((post) => post.id === id);
      const allPosts = state.posts.all.filter((post) => post.id !== id);
      const posts = state.posts[type].filter((post) => post.id !== id);
      state.posts[type] = posts;
      if (type === "all") {
        if (postIndex === 0) state.posts.latest = [];
        if (postIndex === 1) state.posts.archived = [];
      }
      state.posts.all = allPosts;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default postsSlice.reducer;
export const { selectPost, setPostType, setMenuKey } = postsSlice.actions;
