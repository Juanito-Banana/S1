import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import logger from "../middlewares/logger";

const urlUsers = "http://localhost:5173/data/users.json";

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, time);
  });
}

export const fetchUsers = createAsyncThunk("users/all", async () => {
  await delay(1000);
  const response = await fetch(urlUsers);
  const users = await response.json();

  return users;
});

export const fetchUserId = createAsyncThunk("users/user", async () => {
  await delay(1000);
  const response = await fetch(urlUsers);
  const users = await response.json();

  return users;
});

const initialState = {
  users: [], // schéma de données avec un preload des données de l'application
  load: true,
  current: [],
  old: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    search: (state, action) => {
      const { value, type } = action.payload;

      if (type === "name") {
        state.users = state.current;
        const n = value.trim().split(" ").join(" ");

        state.users = state.users.filter((user) => user.lastname.includes(n) || user.firstname.includes(n));
        state.old = state.users;
      }

      if (type === "category") 
        state.users = value === "all" ? state.old :  state.old.filter((user) => user.category.includes(value));
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {});
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.current = action.payload;
      state.load = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {});
  },
});

export const { search } = usersSlice.actions;

export default configureStore({
  reducer: usersSlice.reducer,
  preloadedState: [],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
