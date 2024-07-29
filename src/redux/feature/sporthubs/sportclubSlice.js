// src/redux/feature/sporthubs/sportclubSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SportHub_Base_Url } from "../../api";

const initialState = {
  sporthubs: [],
  status: "idle",
  error: null,
};

export const fetchSportHubProducts = createAsyncThunk(
  "sporthubs/fetchSportHubProducts",
  async () => {
    const response = await fetch(`${SportHub_Base_Url}sportclubs/all/`);
    const data = await response.json();
    console.log("API Response:", data); // Log the API response
    return data.results; // Ensure it returns the data array
  }
);
// export const fetchSportHubProducts = createAsyncThunk(
//   'sporthubs/fetchSportHubProducts',
//   async () => {
//     let allResults = [];
//     let nextPage = `${SportHub_Base_Url}sportclubs/all/`;
    
//     while (nextPage) {
//       const response = await fetch(nextPage);
//       const data = await response.json();
//       console.log('API Response:', data);
//       allResults = [...allResults, ...data.results];
//       nextPage = data.next; 
//     }

//     return allResults;
//   }
// );
const sportclubSlice = createSlice({
  name: "sporthubs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSportHubProducts.pending, (state) => {
        state.status = "loading";
        console.log("State is loading");
      })
      .addCase(fetchSportHubProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sporthubs = action.payload;
        console.log("Fetch succeeded", action.payload);
      })
      .addCase(fetchSportHubProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("Fetch failed", action.error.message);
      });
  },
});

export const selectAllSportHubs = (state) => state.sporthubs.sporthubs;
export const getSportHubsStatus = (state) => state.sporthubs.status;
export const getSportHubsError = (state) => state.sporthubs.error;

export default sportclubSlice.reducer;
