import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const queryApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Links'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: () => ({}),
});
