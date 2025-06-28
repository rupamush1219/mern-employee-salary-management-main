import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_TIMEOUT = 5000; // 5 seconds

const validatePayload = (payload) => {
  if (!payload.username || !payload.password) {
    throw new Error("Invalid payload");
  }
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      validatePayload(user);
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          username: user.username,
          password: user.password,
        },
        {
          timeout: API_TIMEOUT,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("An error occurred");
      }
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/me", {
      withCredentials: true,
      timeout: API_TIMEOUT,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    } else {
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (_, thunkAPI) => {
  try {
    const response = await axios.delete("http://localhost:5000/logout", {
      timeout: API_TIMEOUT,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    } else {
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
});
