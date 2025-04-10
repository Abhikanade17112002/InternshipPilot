import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  state: "ideal",
  loading: false,
};

export const getAdminCreatedCompaniesAction = createAsyncThunk(
  "/api/company",
  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/company`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.log(
        "SOMETHING WENT WRONG IN FETCH ALL ADMIN CREATED COMPANIES ",
        error
      );
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCreatedCompaniesAction.pending, (state, action) => {
        state.loading = true;
        state.state = "pending";
      })
      .addCase(getAdminCreatedCompaniesAction.fulfilled, (state, action) => {
        state.state = "fillfiled";
        state.companies = action.payload.status ? action.payload.companies : [];
        state.loading = false;
      })
      .addCase(getAdminCreatedCompaniesAction.rejected, (state, action) => {
        state.state = "rejected";
        state.loading = false;
      });
  },
});

export const getAllCompanies = (state) => state.company.companies;
export const {} = companySlice.actions;
export default companySlice.reducer;
