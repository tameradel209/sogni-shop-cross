import {createSlice} from '@reduxjs/toolkit';
import {getCategories} from '../actions/categoryActions';
import {ICategorySlice} from '../models';

const initialState: ICategorySlice = {
  categories: [],
  category: null,
  isLoadingCategories: false,
  isLoadingCategory: false,
};

export const categorySlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    chooseCategory: (state: ICategorySlice, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.isLoadingCategories = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoadingCategories = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoadingCategories = false;
      });
  },
});

export const {chooseCategory} = categorySlice.actions;
export default categorySlice.reducer;
