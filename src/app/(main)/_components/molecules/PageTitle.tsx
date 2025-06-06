import React from 'react';
import { getThemeValue } from '@/serverActions/theme';
import { THEME } from '@/constants/theme';
import ThemeSwitcher from '../atoms/ThemeSwitcher';

type Props = {
  title: string;
  desc: string;
  children?: React.ReactNode;
};

async function PageTitle({ title, desc, children = null }: Props) {
  const theme = await getThemeValue();
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-lg lg:text-xl font-bold w-full flex justify-start items-center dark:text-white">
          {title}
        </h1>
        <ThemeSwitcher theme={theme || THEME.LIGHT} />
      </div>
      <div className="flex justify-between items-center break-words">
        <p className="under-mobile:mt-0.5rem under-mobile:mb-0 mt-1rem text-xs lg:text-sm text-gray-700 mb-1rem break-keep dark:text-white dark:text-opacity-85">
          {desc}
        </p>
        {children}
      </div>
    </>
  );
}

export default React.memo(PageTitle);
