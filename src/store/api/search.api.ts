import { linkDataListProps } from '@/constants';

import { queryApi } from './api';

export const searchApi = queryApi.injectEndpoints({
  endpoints: builder => ({
    fetchLinksBySearchString: builder.query<linkDataListProps, { searchString?: string; favorite?: boolean }>({
      query: ({ searchString, favorite }) => ({ url: 'search', params: { searchString, favorite } }),
    }),
  }),
});

export const { useFetchLinksBySearchStringQuery } = searchApi;
