import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
  id: number;
  title: string;
  coverImageUrl: string;
  createdAt?: string;
  location?: string;
}

interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
    },
    addBlog(state, action: PayloadAction<Blog>) {
      state.blogs.push(action.payload);
    },
    deleteBlog(state, action: PayloadAction<number>) {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action: PayloadAction<any>) {
      const idx = state.blogs.findIndex((b) => b.id === action.payload.id);
      if (idx !== -1) state.blogs[idx] = action.payload;
    },
  },
});

export const { setBlogs, addBlog, deleteBlog, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;
