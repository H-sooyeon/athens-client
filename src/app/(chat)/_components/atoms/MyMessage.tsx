import { Message } from '@/app/model/Message';
import React from 'react';
import PROFLELIST from '@/constants/userProfileImage';
import UserImage from '../../../_components/atoms/UserImage';

type Props = {
  message: Message;
  isSameUser: boolean;
};

export default function MyMessage({ message, isSameUser }: Props) {
  return (
    <article className={`flex justify-end items-start p-0.5rem ${isSameUser && 'pt-0'} pr-12 pb-0 h-full`}>
      <div className="flex justify-end items-end">
        <div className="flex flex-col justify-end items-end h-full">
          <time className="text-xxs mb-8 dark:text-dark-line">{new Date(message.createdAt).toLocaleTimeString().slice(0, -3)}</time>
        </div>
        <div className={`p-0.5rem ${isSameUser && 'pt-0'} flex flex-col justify-center items-end`}>
          {!isSameUser && (
          <div role="region" aria-label="사용자 이름" className="text-xs pb-5 dark:text-white">
            {message.user.nickname}
          </div>
          )}
          <div className={`max-w-[60vw] whitespace-pre-line bg-red-200 rounded-tl-lg ${isSameUser && 'rounded-tr-lg'} rounded-bl-lg rounded-br-lg p-0.5rem  pl-10 pr-10 text-sm under-mobile:text-xs`}>
            {message.content}
          </div>
        </div>
      </div>
      {!isSameUser ? (
        <div aria-hidden className="border-1 border-gray-300 w-fit rounded-3xl dark:bg-white">
          <UserImage
            name={message.user.nickname}
            file={PROFLELIST[message.user.photoNumber].file}
            className="w-60 h-60 under-mobile:w-50 under-mobile:h-50 flex rounded-3xl"
            w={60}
            h={60}
          />
        </div>
      ) : (
        <div className="w-60 under-mobile:w-50" />
      )}
    </article>
  );
}
