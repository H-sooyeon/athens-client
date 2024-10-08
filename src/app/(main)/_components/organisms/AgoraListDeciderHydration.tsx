import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';
import { SearchParams } from '@/app/model/Agora';
import { getAgoraCategorySearch } from '../../_lib/getAgoraCategorySearch';
import AgoraListDecider from '../molecules/AgoraListDecider';
import { getAgoraKeywordSearch } from '../../_lib/getAgoraKeywordSearch';
import { getLivelyAgora } from '../../_lib/getLivelyAgora';

type Props = {
  searchParams: SearchParams;
};

export default async function AgoraListDeciderHydration({
  searchParams,
}: Props) {
  const queryClient = new QueryClient();
  const isSearch = searchParams.q;

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      'agoras',
      'search',
      isSearch ? 'keyword' : 'category',
      searchParams,
    ],
    queryFn: isSearch ? getAgoraKeywordSearch : getAgoraCategorySearch,
    initialPageParam: { nextCursor: null },
  });

  await queryClient.prefetchQuery({
    queryKey: ['agoras', 'lively'],
    queryFn: getLivelyAgora,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AgoraListDecider searchParams={searchParams} />
    </HydrationBoundary>
  );
}
