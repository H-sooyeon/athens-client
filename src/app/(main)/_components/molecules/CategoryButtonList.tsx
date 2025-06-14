'use client';

import React, { useCallback, useEffect } from 'react';
import Swiper from 'swiper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchStore } from '@/store/search';
import { useCreateAgora } from '@/store/create';
import { useShallow } from 'zustand/react/shallow';
import { homeSegmentKey } from '@/constants/segmentKey';

// import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import { isValidCategoryKey } from '@/utils/validation/validateCategoryKey';
import { AGORACATEGORY } from '@/constants/consts';
import isNull from '@/utils/validation/validateIsNull';
import CategoryButton from '../atoms/CategoryButton';

export default function CategoryButtonList() {
  const { reset } = useSearchStore(
    useShallow((state) => ({
      reset: state.reset,
    })),
  );

  const searchParams = useSearchParams();
  const getCategorySearchParams = (): keyof typeof AGORACATEGORY => {
    const categorySearchParams = searchParams.get('category');

    if (isNull(categorySearchParams)) return '1';

    if (categorySearchParams in AGORACATEGORY) {
      return categorySearchParams as keyof typeof AGORACATEGORY;
    }

    return '1';
  };

  const pathname = usePathname();
  const router = useRouter();
  const { setCategory, category: selectedCategory } = useCreateAgora(
    useShallow((state) => ({
      setCategory: state.setCategory,
      category: state.category,
    })),
  );

  useEffect(() => {
    setCategory(getCategorySearchParams());

    return () => {
      setCategory('1');
    };
  }, []);

  const changeCategoryParams = useCallback(
    (id: string) => {
      if (pathname !== homeSegmentKey) return;

      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set('category', isValidCategoryKey(id) ? id : '1');
      newSearchParams.delete('q');
      reset();

      const newUrl = `${homeSegmentKey}?${newSearchParams.toString()}`;
      window.history.pushState(
        { ...window.history.state, as: newUrl, url: newUrl },
        '',
        newUrl,
      );
    },
    [router, searchParams, pathname, selectedCategory],
  );

  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: false,
      centeredSlides: false,
      touchRatio: 1,
      freeMode: true,
      grabCursor: true,
      slidesPerView: 'auto',
      spaceBetween: 0,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  useEffect(() => {
    changeCategoryParams(selectedCategory);
  }, [selectedCategory, changeCategoryParams]);

  return (
    <div className="w-full mt-10 mb-0 pb-0 pl-0.5rem pr-0.5rem flex text-nowrap overflow-hidden ml-5">
      <div className="swiper pr-1rem w-full">
        <div className="swiper-wrapper pr-1rem">
          {Object.values(AGORACATEGORY).map((category) => (
            <button
              type="button"
              aria-label={`${category.innerText} 카테고리`}
              onClick={() => setCategory(category.value)}
              className="swiper-slide"
              key={category.innerText}
            >
              <CategoryButton
                innerText={category.innerText}
                isActive={category.value === selectedCategory}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
