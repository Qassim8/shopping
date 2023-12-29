import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { item: [], loading: false, added: false};

export const getWishlist = createAsyncThunk("wishlist/getWishlist", async(_,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios.get("http://localhost:3005/wishlist");
        const data = await response.data;
        return data
    }catch(error){
        rejectWithValue(error);
    }
});

//Add WishList Thunk
export const setWishlist = createAsyncThunk(
  "wishlist/setWishlist",
  async (items, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post("http://localhost:3005/wishlist", {
      items,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
//Delete Item Thunk
export const deletedItem = createAsyncThunk("wishlist/deleteItem", async (id, thunkAPI) =>{
  const {rejectWithValue} = thunkAPI;
  try{
    await axios.delete(`http://localhost:3005/wishlist/${id}`);
    return id
  }catch(error){
    rejectWithValue(error)
  }
});
//Delete Using Heart
export const deleteFromHeart = createAsyncThunk(
  "wishlist/deleteFromHeart",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`http://localhost:3005/wishlist/${id}`);
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updateAddedValue: (state) =>{
      state.added = false;
    }
  },
  extraReducers: (builder) => {
    //Get Washlist Items
    builder.addCase(getWishlist.pending, (state) => {
      state.loading = true;
      state.item = [];
    });
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.item = action.payload;
      state.loading = false;
    });
    builder.addCase(getWishlist.rejected, (state) => (state.loading = false));
    // Add Items To WishList
    builder.addCase(setWishlist.pending, (state) => {
      state.added = false;
    });
    builder.addCase(setWishlist.fulfilled, (state, action) => {
      state.item.push(action.payload);
      state.added = true;
    });
    builder.addCase(setWishlist.rejected, (state) => (state.added = false));
    // Delete Item From WishList
    builder.addCase(deletedItem.pending, (state) => {
      state.load = true;
    });
    builder.addCase(deletedItem.fulfilled, (state, action) => {
      state.load = false;
      state.item = state.item.filter((el) => el.id !== action.payload);
    });
    builder.addCase(deletedItem.rejected, (state) => {
      state.load = false;
    });
  }
});

export const { updateAddedValue, removeBtn } = wishlistSlice.actions;
export default wishlistSlice.reducer;
