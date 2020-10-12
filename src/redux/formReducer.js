import { createSlice } from '@reduxjs/toolkit';

const state = {
  items: [
    {
      name: '',
      amount: '',
      id: 0,
    },
  ],
};

export const formSlice = createSlice({
  name: 'piechart',
  initialState: state,
  reducers: {
    addForm: (state, { payload }) => ({
      items: [...state.items, payload],
    }),
    writeData: (state, { payload }) => ({
      items: state.items.map((item, idx) =>
        idx === payload.id ? { ...item, ...payload } : item,
      ),
    }),
  },
});
