import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  element: [],
  load: false,
  add: false,
  addItems: false,
  addFromWishlist: false,
  error: false,
};

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("http://localhost:3005/cart");
    const data = await response.data;
    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

//Add Cart Thunk
export const setCart = createAsyncThunk(
  "cart/setCart",
  async (items, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    items.quantity = 1;
    try {
      const response = await axios.post("http://localhost:3005/cart", {
        items,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
//Add Cart from wishlist Thunk
export const setCartWishlist = createAsyncThunk(
  "cart/setCartWishlist",
  async (items, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post("http://localhost:3005/cart", {
        items,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
// Delete Item Thunk
export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`http://localhost:3005/cart/${id}`);
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateAddValue: (state) => {
      state.add = false;
    },
    updateAddItems: (state) => {
      state.addItems = false;
    },
    updateAddFromWishlist: (state) => {
      state.addFromWishlist = false;
    },
    updateErrorValue: (state) => {
      state.error = false;
    },
    incrementItem: (state, action) => {
      state.element = state.element.map((item) => {
        if (item.items.id === action.payload) {
          item.items.quantity++;
        }
        return item;
      });
    },
    decrementItem: (state, action) => {
      state.element = state.element
        .map((item) => {
          if (item.items.id === action.payload) {
            item.items.quantity--;
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
    },
  },
  extraReducers: (builder) => {
    //Get Cart Items
    builder.addCase(getCart.pending, (state) => {
      state.load = true;
      state.element = [];
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.element = action.payload;
      state.load = false;
    });
    builder.addCase(getCart.rejected, (state) => (state.loading = false));
    // Add Items To Cart
    builder.addCase(setCart.pending, (state) => {
      state.add = false;
      state.addItems =false;
      state.error = false;
      state.load = true;
    });
    builder.addCase(setCart.fulfilled, (state, action) => {
      state.element.push(action.payload);
      state.add = true;
      state.addItems = true;
      state.error = false;
      state.load = false;
    });
    builder.addCase(setCart.rejected, (state) => {
      state.add = false;
      state.addItems = false;
      state.addFromWishlist = false;
      state.error = true;
    });
    // Add Items To Cart From Wishlist
    builder.addCase(setCartWishlist.pending, (state) => {
      state.addFromWishlist = false;
      state.error = false;
    });
    builder.addCase(setCartWishlist.fulfilled, (state, action) => {
      state.element.push(action.payload);
      state.addFromWishlist = true;
      state.error = false;
    });
    builder.addCase(setCartWishlist.rejected, (state) => {
      state.addFromWishlist = false;
      state.error = true;
    });
    // Delete Item From Cart
    builder.addCase(deleteItem.pending, (state) => {
      state.load = true;
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.load = false;
      state.element = state.element.filter((el) => el.id !== action.payload);
    });
    builder.addCase(deleteItem.rejected, (state) => {
      state.load = false;
    });
  },
});

export const {
  updateAddValue,
  updateAddItems,
  updateAddFromWishlist,
  updateErrorValue,
  decrementItem,
  incrementItem,
} = cartSlice.actions;
export default cartSlice.reducer;
