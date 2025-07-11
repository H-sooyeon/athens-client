'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import ErrorFallback from '@/app/_components/templates/ErrorFallback';
import { AgoraTabStatus, SearchParams } from '@/app/model/Agora';
import Loading from '@/app/_components/atoms/loading';
import { useSearchStore } from '@/store/search';
import { useShallow } from 'zustand/react/shallow';
import { useAlertKickedUser } from '@/hooks/useAlertKickedUser';
import LivelyAgoraList from './LivelyAgoraList';
import CategoryAgoraNowTitle from '../atoms/CategoryAgoraNowTitle';
import Borderline from '../../user-info/_component/atoms/Borderline';

const KeywordAgoraList = dynamic(() => import('./KeywordAgoraList'), {
  loading: () => (
    <Loading w="25" h="25" className="m-5 flex justify-center items-center" />
  ),
});

const CategoryAgoraList = dynamic(() => import('./CategoryAgoraList'), {
  loading: () => (
    <Loading w="25" h="25" className="m-5 flex justify-center items-center" />
  ),
});

type Props = {
  searchParams: SearchParams;
};

const errorFallbackProps = {
  headerLabel: '아고라 목록을 불러오던 중 오류가 발생했습니다.',
  btnLabel: '다시 불러오기',
};

function FallbackComponent(props: FallbackProps) {
  return <ErrorFallback {...props} {...errorFallbackProps} />;
}
export default function AgoraListDecider({ searchParams }: Props) {
  const { q } = searchParams;
  const { search, setSearch, tabStatus } = useSearchStore(
    useShallow((state) => ({
      search: state.search,
      setSearch: state.setSearch,
      tabStatus: state.tabStatus,
    })),
  );

  useEffect(() => {
    if (q) {
      setSearch(q);
    }
  }, [q, setSearch]);

  useAlertKickedUser();

  if (search) {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <KeywordAgoraList searchParams={searchParams} />
      </ErrorBoundary>
    );
  }

  return (
    <>
      {tabStatus === AgoraTabStatus.ACTIVE && (
        <>
          <ErrorBoundary FallbackComponent={FallbackComponent}>
            <LivelyAgoraList />
          </ErrorBoundary>
          <Borderline className="mb-16 mx-10" />
        </>
      )}
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <CategoryAgoraNowTitle searchParams={searchParams} />
        <CategoryAgoraList searchParams={searchParams} />
      </ErrorBoundary>
    </>
  );
}
