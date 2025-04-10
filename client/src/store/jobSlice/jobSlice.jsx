import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  state: "ideal",
  loading: false,
};

export const getAllJobsAction = createAsyncThunk("/api/job/", async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/job`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("SOMETHING WENT WRONG IN FETCH ALL JOB POSTINGS ", error);
  }
});

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobsAction.pending, (state, action) => {
        state.loading = true;
        state.state = "pending";
      })
      .addCase(getAllJobsAction.fulfilled, (state, action) => {
        state.state = "fillfiled";
        state.jobs = action.payload.status ? action.payload.jobs : [];
        state.loading = false;
      })
      .addCase(getAllJobsAction.rejected, (state, action) => {
        state.state = "rejected";
        state.loading = false;
      });
  },
});

export const getAllJobs = (state) => state.job.jobs;
export const {} = jobSlice.actions;
export default jobSlice.reducer;
