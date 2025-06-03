import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
  blog: string;
}

const initialState: BlogState = {
  blog: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog(state, action: PayloadAction<string>) {
      state.blog = action.payload;
    },
  },
});

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;
