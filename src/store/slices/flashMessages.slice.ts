import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { flashMessageType } from '@/constants';
import { FlashMessage } from '@/utils/FlashMessage';

const initialState: FlashMessage[] = [];

const flashMessagesSlice = createSlice({
  name: 'flashMessages',
  initialState,
  reducers: {
    addNewFlashMessage: (state, action: PayloadAction<{ type: flashMessageType; message: string }>) => {
      if (state.length > 2) state.shift();

      state.push(action.payload);
    },
    removeFlashMessage: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addNewFlashMessage, removeFlashMessage } = flashMessagesSlice.actions;

export default flashMessagesSlice.reducer;
