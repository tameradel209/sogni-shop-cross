import {createSlice} from '@reduxjs/toolkit';
import {getStores} from '../actions/storesActions';
import {IStoreSlice} from '../models';

const initialState: IStoreSlice = {
  stores: [],
  storeSelected: null,
  isLoadingStores: false,
  isLoadingStore: false,
  error: null,
};

export const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    chooseStore: (state: IStoreSlice, action) => {
      console.log('store selected', action.payload);
      state.storeSelected = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStores.pending, (state, action) => {
        state.error = null;
        state.isLoadingStores = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.isLoadingStores = false;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingStores = false;
      });
  },
});

export const {chooseStore} = storeSlice.actions;
export default storeSlice.reducer;
