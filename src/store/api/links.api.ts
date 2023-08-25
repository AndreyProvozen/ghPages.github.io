import { linkDataListProps, linkDataProps } from '@/constants';

import { queryApi } from './api';

interface getLinksProps {
  perPage?: number | string;
  page?: number | string;
}

export const linksApi = queryApi.injectEndpoints({
  endpoints: build => ({
    getLinks: build.query<linkDataListProps, getLinksProps>({
      query: ({ page, perPage }) => ({
        url: 'link',
        params: { page, limit: perPage },
      }),
      providesTags: result =>
        result
          ? [
              ...result.linksList.map(({ code }) => ({ type: 'Links' as const, id: code })),
              { type: 'Links', id: 'LIST' },
            ]
          : [{ type: 'Links', id: 'LIST' }],
    }),
    addNewLink: build.mutation<
      linkDataProps,
      {
        url: string;
      }
    >({
      query: payload => ({
        url: 'link',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Links', id: 'LIST' }],
    }),

    deleteLink: build.mutation({
      query: ({ code }) => ({ url: 'link', method: 'DELETE', params: { code } }),
      invalidatesTags: [{ type: 'Links', id: 'LIST' }],
    }),
  }),
});

export const { useGetLinksQuery, useAddNewLinkMutation, useDeleteLinkMutation } = linksApi;
