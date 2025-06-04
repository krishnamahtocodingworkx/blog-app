import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
  id: string;
  title: string;
  image: string;
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
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
