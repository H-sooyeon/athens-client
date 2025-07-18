import { AgoraTitle } from '@/app/model/Agora';
import React from 'react';

type Props = {
  title: AgoraTitle;
  children: React.ReactNode;
};

export default function ChatSideModule({ title, children }: Props) {
  return (
    <section className="flex flex-col pb-2rem w-full">
      <h2 className="pb-1rem foldable:text-base text-sm font-semibold dark:text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}
