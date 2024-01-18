import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserData {
  id: number | undefined;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface User {
  isLoading: boolean;
  user: UserData;
}
const initialState: User = {
  isLoading: false,
  user: {
    id: undefined,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "string",
      zipcode: "string",
      geo: { lat: "string", lng: "string" },
    },
    phone: "string",
    website: "string",
    company: {
      name: "string",
      catchPhrase: "string",
      bs: "string",
    },
  },
};

export const fetchUserDetails = createAsyncThunk("user/getUser", async () => {
  const baseURL = process.env.REACT_APP_USERS_URL || "";
  const randomUser = Math.floor(Math.random() * 10) + 1;
  const fetchUserURL = `${baseURL}/${randomUser}`;
  try {
    const response = await axios.get(fetchUserURL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default userSlice.reducer;
