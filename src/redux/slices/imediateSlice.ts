import {createSlice} from '@reduxjs/toolkit';
import {getWidthThreshold} from '../../config/helpers/thresholds';

interface IImediateState {
  widthSmallThreshold: number;
  widthBigThreshold: number;
}

const initialState: IImediateState = {
  widthSmallThreshold: 0,
  widthBigThreshold: 0,
};

export const imediateSlice = createSlice({
  name: 'imediates',
  initialState,
  reducers: {
    setWidthThreshold: (state, action) => {
      console.log('imediateSlice', action.payload);
      state.widthSmallThreshold = getWidthThreshold(action.payload.value1);
      state.widthBigThreshold = getWidthThreshold(action.payload.value2);
    },
  },
});

export const {setWidthThreshold} = imediateSlice.actions;

export default imediateSlice.reducer;
