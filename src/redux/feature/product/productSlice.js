import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, SportHub_Base_Url } from "../../api";

const initialState = {
  sporthubs: [],
  products: [],
  product: {},
  // idle -> |pending|fulfill|rejected|
  status: "idle",
  error: null
};

// fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${BASE_URL}products`);
    const data = await response.json();
    console.log("data", data.results);
    return data.results;
  }
);

// fetch product by id
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    console.log("data", data);
    return data;
  }
);
export const fetchSportHubProducts = createAsyncThunk(
  "sporthubs/fetchSportHubProducts",
  async () => {
    const response = await fetch(`${SportHub_Base_Url}sportclubs/all/`);
    const data = await response.json();
    console.log("sprothub", data);
    return data.results;
  }
);


export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "success";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

// export reducer
export default productSlice.reducer;
export const selectAllProducts = (state) => state.product.products;
// export const selectProductById = (state) => state.product.product;
