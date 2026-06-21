import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Fetch wishlist from API
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist",
    async (thunkAPI) => {
        try {
            const { data } = await axios.get('/api/wishlist')
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Upload wishlist to API
let debounceTimer = null;
export const uploadWishlist = createAsyncThunk("wishlist/uploadWishlist",
    async ({ getToken, wishlistItems }, thunkAPI) => {
        try {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(async () => {
                const { wishlistItems } = thunkAPI.getState().wishlist;
                await axios.post('/api/wishlist', { wishlistItems })
            }, 1000); // debounce time of 1 second
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message)
        }
    }
)

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        total: 0,
        wishlistItems: {},
        status: 'idle',
        error: null
    },
    reducers: {
        addToWishlist: (state, action) => {
            const { productId } = action.payload
            state.wishlistItems[productId] = true
            state.total = Object.values(state.wishlistItems).filter(Boolean).length
        },
        removeFromWishlist: (state, action) => {
            const { productId } = action.payload
            delete state.wishlistItems[productId]
            state.total = Object.values(state.wishlistItems).filter(Boolean).length
        },
        clearWishlist: (state) => {
            state.wishlistItems = {}
            state.total = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.status = 'idle'
                state.wishlistItems = action.payload.wishlistItems || {}
                state.total = Object.values(state.wishlistItems).filter(Boolean).length
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase(uploadWishlist.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(uploadWishlist.fulfilled, (state) => {
                state.status = 'idle'
            })
    }
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
