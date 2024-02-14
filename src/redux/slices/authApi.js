import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://10.0.2.2:3000/api/v1/'}),
  tagTypes: ['users'],
  endpoints: build => ({
    signin: build.mutation({
      query: body => ({
        url: `users/signi`,
        method: 'POST',
        body,
      }),
      transformResponse: (response, meta, arg) => response,
      invalidatesTags: ['users'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        {dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry},
      ) {},
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        },
      ) {},
    }),
  }),
});

export const {useSigninMutation} = authApi;
