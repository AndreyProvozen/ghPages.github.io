import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FLASH_MESSAGE_TYPE } from '@/constants';
import { type FlashMessageProps } from '@/utils/FlashMessage';

const initialState: FlashMessageProps[] = [];

const flashMessagesSlice = createSlice({
  name: 'flashMessages',
  initialState,
  reducers: {
    addNewFlashMessage: (state, action: PayloadAction<{ type: FLASH_MESSAGE_TYPE; message: string }>) => {
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
