import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import itemService from "./itemService"

const initialState = {
  items: [],
  filterItems: [],
  cartItems: [],
  favouriteItems: [],
  subTotal: 0.0,
  discount: 0.0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const getItems = createAsyncThunk(
  "items/getItems",
  async (itemType, thunkAPI) => {
    try {
      return await itemService.getItems(itemType)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const filterItem = createAsyncThunk(
  "items/filterItem",
  async (searchValue, thunkAPI) => {
    try {
      const items = thunkAPI.getState().items.items
      return await itemService.filterItems(searchValue, items)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const addFavouriteItem = createAsyncThunk(
  "items/addFavouriteItem",
  async (favouriteItemKey, thunkAPI) => {
    try {
      const items = thunkAPI.getState().items.items
      return await itemService.addFavouriteItems(favouriteItemKey, items)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const removeFavouriteItem = createAsyncThunk(
  "items/removeFavouriteItem",
  async (unfavouriteItemName, thunkAPI) => {
    try {
      return unfavouriteItemName
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addToCart = createAsyncThunk(
  "items/addToCart",
  async (cartItem, thunkAPI) => {
    try {
      const items = thunkAPI.getState().items.items
      return await itemService.addToCarts(cartItem, items)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const removeCartItem = createAsyncThunk(
  "items/removeCartItem",
  async (removeitem, thunkAPI) => {
    try {
      return removeitem
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addQuantity = createAsyncThunk(
  "items/addQuantity",
  async (itemName, thunkAPI) => {
    try {
      const cartItems = thunkAPI.getState().items.cartItems
      return await itemService.addQuantities(itemName, cartItems)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const removeQuantity = createAsyncThunk(
  "items/removeQuantity",
  async (itemName, thunkAPI) => {
    try {
      const cartItems = thunkAPI.getState().items.cartItems
      return await itemService.removeQuantities(itemName, cartItems)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const calculateSubTotal = createAsyncThunk(
  "items/calculateSubTotal",
  async (_, thunkAPI) => {
    try {
      const cartItems = thunkAPI.getState().items.cartItems
      return await itemService.calculateSubTotal(cartItems)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const DiscountAmount = createAsyncThunk(
  "items/DiscountAmount",
  async (amount, thunkAPI) => {
    try {
      return amount
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reset: (state) => {
      state.cartItems = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items = action.payload
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(filterItem.pending, (state) => {
        state.filterItems = []
      })
      .addCase(filterItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.filterItems = action.payload
      })
      .addCase(filterItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.filterItems = []
        state.message = action.payload
      })
      .addCase(addFavouriteItem.pending, (state) => {})
      .addCase(addFavouriteItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favouriteItems = [...state.favouriteItems, action.payload]
      })
      .addCase(addFavouriteItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeFavouriteItem.pending, (state) => {})
      .addCase(removeFavouriteItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favouriteItems = state.favouriteItems.filter(
          (item) => item.name !== action.payload
        )
      })
      .addCase(removeFavouriteItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addToCart.pending, (state) => {})
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = [...state.cartItems, action.payload]
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeCartItem.pending, (state) => {})
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = state.cartItems.filter(
          (item) => item.name !== action.payload
        )
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addQuantity.pending, (state) => {})
      .addCase(addQuantity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = action.payload
      })
      .addCase(addQuantity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeQuantity.pending, (state) => {})
      .addCase(removeQuantity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = action.payload
      })
      .addCase(removeQuantity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(calculateSubTotal.pending, (state) => {})
      .addCase(calculateSubTotal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subTotal = action.payload
      })
      .addCase(calculateSubTotal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(DiscountAmount.pending, (state) => {})
      .addCase(DiscountAmount.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.discount = action.payload
      })
      .addCase(DiscountAmount.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = itemsSlice.actions
export default itemsSlice.reducer
