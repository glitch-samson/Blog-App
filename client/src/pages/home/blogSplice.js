import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch blogs from backend
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await fetch("http://localhost:3000/blogs");
  const data = await response.json();
  return data;
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    isLoading: false,
    isError: false,
    error: ""
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
});

export default blogsSlice.reducer;
