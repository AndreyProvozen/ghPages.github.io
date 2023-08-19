import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { flashMessageType, linkDataListProps, linkDataProps } from '@/constants';
import customFetch from '@/utils/customFetch';

import { addNewFlashMessage } from './flashMessages.slice';

export const fetchLinksList = createAsyncThunk<
  linkDataListProps,
  { userEmail: string; perPage?: number | string; page?: number | string }
>('links/fetchLinksList', async ({ userEmail, perPage = 0, page = 0 }) => {
  const data: linkDataListProps = await customFetch(
    `api/link?userEmail=${encodeURIComponent(userEmail)}&limit=${perPage}&page=${page}`
  );

  return data;
});

export const fetchFavoriteLinks = createAsyncThunk<linkDataListProps, { userEmail: string }>(
  'links/fetchFavoriteLinks',
  async ({ userEmail }) => {
    const data: linkDataListProps = await customFetch(`api/favorite?userEmail=${encodeURIComponent(userEmail)}`);

    return data;
  }
);

export const fetchLinksBySearchString = createAsyncThunk<linkDataListProps, { searchString: string }>(
  'links/fetchLinksBySearchString',
  async ({ searchString }) => {
    const data: linkDataListProps = await customFetch(`api/search?search=${searchString}`);

    return data;
  }
);

export const deleteLink = createAsyncThunk<string, string>('links/deleteLink', async endpointUrl => {
  const data: string = await customFetch(endpointUrl, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
  });

  return data;
});

export const addNewLink = createAsyncThunk<
  linkDataProps,
  { url: string; userEmail: string },
  {
    dispatch: Dispatch;
  }
>('links/addNewLink', async ({ userEmail, url }, { dispatch }) => {
  const data: linkDataProps = await customFetch(`api/link`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ url, userEmail }),
  });

  if (typeof data === 'string') {
    dispatch(addNewFlashMessage({ message: data, type: flashMessageType.ERROR }));
    return null;
  }

  dispatch(addNewFlashMessage({ message: 'Shortened link successfully added', type: flashMessageType.SUCCESSFUL }));
  return data;
});

const initialState: { count?: number; linksList: linkDataProps[] } = {
  count: undefined,
  linksList: [],
};

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLinksList.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.linksList = action.payload.urlsList;
      })
      .addCase(fetchFavoriteLinks.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.linksList = action.payload.urlsList;
      })
      .addCase(fetchLinksBySearchString.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.linksList = action.payload.urlsList;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.linksList = state.linksList.filter(({ code }) => code !== action.payload);
        state.count--;
      })
      .addCase(addNewLink.fulfilled, (state, action) => {
        if (!action.payload) return;
        const list =
          state.linksList.length > 4
            ? [action.payload, ...state.linksList].slice(0, -1)
            : [action.payload, ...state.linksList];

        state.linksList = list;
        state.count = list.length;
      });
  },
});

export default linksSlice.reducer;
