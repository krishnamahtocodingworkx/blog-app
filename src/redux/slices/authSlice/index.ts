import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
  id: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  token: null,
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; token: string }>) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { login, setEmail, setId, logout } = authSlice.actions;
export default authSlice.reducer;
