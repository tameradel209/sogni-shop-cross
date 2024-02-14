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
  extraReducers: {
    [getCategories.pending]: (state: ICategorySlice) => {
      state.isLoadingCategories = true;
    },
    [getCategories.fulfilled]: (state: ICategorySlice, action) => {
      state.categories = action.payload;
      state.isLoadingCategories = false;
    },
    [getCategories.rejected]: (state: ICategorySlice) => {
      state.isLoadingCategories = false;
    },
  },
});

export const {chooseCategory} = categorySlice.actions;
export default categorySlice.reducer;
