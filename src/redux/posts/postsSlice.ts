import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

const today = moment().format("ll");

export type PostType = "all" | "latest" | "archived";
export interface BlogPost {
  id: number;
  title: string;
  body: string;
  type?: PostType;
  date?: string;
  img?: string;
}

interface AllPosts {
  all: BlogPost[];
  latest: BlogPost[];
  archived: BlogPost[];
}

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
  async (id: number) => {
    const baseURL = process.env.REACT_APP_ALL_POSTS_URL || "";
    const postsURL = `${baseURL}/${id}`;
    try {
      await axios.delete(postsURL);
      return id;
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
      const fetchedPosts = action.payload;
      const posts = fetchedPosts.map((post: BlogPost, index: number) => ({
        ...post,
        date: today,
        img: `/post${index}.jpg`,
      }));
      posts[0] = { ...posts[0], type: "latest" };
      posts[1] = { ...posts[1], type: "archived" };
      state.posts.all = posts;
      state.posts.latest = [posts[0]];
      state.posts.archived = [posts[1]];
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      const postType = action.payload?.type ?? "all";
      const post = action.payload?.post;
      const postWithDate = post && { ...post, date: today };
      state.selectedPost = postWithDate;
      state.postType = postType;
      state.isLoading = false;
    });
    builder.addCase(fetchPostById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedPostIndex = state.posts.all.findIndex(
        (post) => post.id === action.payload.id
      );
      const updatedPosts = state.posts.all;
      updatedPosts[updatedPostIndex] = action.payload;
      state.posts.all = updatedPosts;
      state.selectedPost = action.payload;
      const postType = updatedPosts[updatedPostIndex].type;
      if (postType) {
        state.posts[postType] = [{ ...action.payload, type: postType }];
      }
    });
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const id = action.payload;
      const post = state.posts.all.find((post) => post.id === id);
      if (post?.type) {
        const type = post.type;
        state.posts[type] = [];
      }
      const allPosts = state.posts.all.filter((post) => post.id !== id);
      state.posts.all = allPosts;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default postsSlice.reducer;
export const { selectPost, setPostType, setMenuKey } = postsSlice.actions;
