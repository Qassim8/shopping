import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {products:[], loading:false, record:null, product:null};

// All Products Thunk
export const getProducts = createAsyncThunk('products/getProducts',async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try{
        const res = await axios.get("http://localhost:3005/products");
    const data = await res.data;
    return data
    }catch(error){
        return rejectWithValue(error)
    }
});

// Limited Products Thunk
export const getLimitedProducts = createAsyncThunk("products/getLimitProducts", async (_, thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios.get("http://localhost:3005/products?_limit=9");
        const data = await response.data;
        return data
    }
    catch(error){
        return rejectWithValue(error)
    }
})

// Products Details Thunk 
export const getProductDetails = createAsyncThunk("products/getProductDetails",async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios.get(`http://localhost:3005/products/${id}`);
        const data = await response.data;
        return data;
    }catch(error){
        rejectWithValue(error);
    }
});

// Filter By Search
export const getItems = createAsyncThunk(
  "products/getItems",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`http://localhost:3005/products?q=${item}`);
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanProducts: (state) => {
      state.products = [];
    },
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Data From API
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Get Limited Data From API
    builder.addCase(getLimitedProducts.pending, (state) => {
      state.loading = true;
      state.record = null;
    });
    builder.addCase(getLimitedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.record = action.payload;
    });
    builder.addCase(getLimitedProducts.rejected, (state) => {
      state.loading = false;
    });
    // Get Product Details
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
      state.product = null;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.loading = false;
    });
    // Filter Item
    builder.addCase(getItems.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getItems.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {cleanProducts, cleanRecord} = productSlice.actions;
export default productSlice.reducer;