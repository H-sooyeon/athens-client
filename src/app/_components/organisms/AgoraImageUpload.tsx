import CameraIcon from '@/assets/icons/CameraIcon';
import ImageIcon from '@/assets/icons/ImageIcon';
import Image from 'next/image';
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import isNull from '@/utils/validation/validateIsNull';
import { useUploadImage } from '@/store/uploadImage';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'next/navigation';
import { uploadImageSegmentKey } from '@/constants/segmentKey';

type Props = {
  image?: string;
  page?: string;
  color?: string;
};

type CropedPreview = {
  dataUrl: string;
  file: File;
};

const initialCropedPreview: CropedPreview = {
  dataUrl: '',
  file: new File([], 'image'),
};

export default function AgoraImageUpload({ image = '', page, color }: Props) {
  const { uploadImage, setUploadImage, setCropedPreview, cropedPreview } =
    useUploadImage(
      useShallow((state) => ({
        uploadImage: state.uploadImage,
        setUploadImage: state.setUploadImage,
        setCropedPreview: state.setCropedPreview,
        cropedPreview: state.cropedPreview,
      })),
    );

  const [viewPopup, setViewPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState('top');
  const imageRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (image) {
      setUploadImage({ dataUrl: image, file: new File([image], 'image') });
    }
  }, [image, setUploadImage]);

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadImage({
            dataUrl: reader.result as string,
            file,
          });
          if (file.type !== 'image/gif') {
            if (page) {
              router.push(`${page}${uploadImageSegmentKey}`);
              return;
            }
            router.push(uploadImageSegmentKey);
          }
        };
        reader.readAsDataURL(file);
      });
      e.target.value = '';
    }
  };

  const clickFileInput = () => {
    imageRef.current?.click();
    setViewPopup(false);
  };

  const removeImage = () => {
    setUploadImage(initialCropedPreview);
    setCropedPreview(initialCropedPreview);
    setViewPopup(false);
  };

  const calculatePopupPosition = () => {
    if (popupRef.current) {
      const popupTop = popupRef.current.getBoundingClientRect().top;
      const popupBottom =
        window.innerHeight - popupRef.current.getBoundingClientRect().bottom;

      if (popupTop < popupBottom) {
        setPopupPosition('bottom');
      } else {
        setPopupPosition('top');
      }
    }
  };

  const viewPopupHandler = () => {
    calculatePopupPosition();
    setViewPopup(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setViewPopup(false);
    }
  };

  const handlleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setViewPopup(false);
    }
  };

  useEffect(() => {
    if (viewPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handlleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handlleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handlleKeyDown);
    };
  }, [viewPopup]);

  const handleKeyDownPopupHandler: KeyboardEventHandler<HTMLDivElement> = (
    e,
  ) => {
    if (e.key === 'Enter') {
      viewPopupHandler();
    }
  };

  const renderMedia = (file: { dataUrl: string; file: File }) => {
    if (file.file.type === 'image/gif') {
      return (
        <img
          src={file.dataUrl}
          alt="얍프로필"
          className="object-cover h-full rounded-3xl under-mobile:rounded-2xl"
        />
      );
    }

    return (
      <Image
        alt="아고라 프로필"
        layout="fill"
        objectFit="cover"
        className="rounded-3xl under-mobile:rounded-2xl"
        src={file.dataUrl}
      />
    );
  };

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        aria-label="클릭하여 아고라 프로필 설정"
        ref={popupRef}
        className="relative w-60 h-60 rounded-3xl under-mobile:rounded-2xl cursor-pointer"
        onClick={viewPopupHandler}
        onKeyDown={handleKeyDownPopupHandler}
      >
        {!isNull(cropedPreview.dataUrl) || !isNull(uploadImage.dataUrl) ? (
          renderMedia(cropedPreview.dataUrl ? cropedPreview : uploadImage)
        ) : (
          <div
            aria-hidden
            className={`flex justify-center items-center h-full w-full ${color || 'dark:bg-dark-light-500 bg-gray-200'} rounded-3xl under-mobile:rounded-2xl`}
          >
            <ImageIcon className="w-22 h-22" />
          </div>
        )}
        <input
          type="file"
          accept="image/*, jpg"
          ref={imageRef}
          onChange={onUpload}
          hidden
        />
        <div
          aria-hidden
          className="flex justify-center items-center absolute top-40 left-40 w-22 h-22 rounded-full bg-dark-line-semilight"
        >
          <CameraIcon className="w-14 h-14" fill="#fffff" />
        </div>
      </div>
      <div
        role="menu"
        aria-label="이미지 선택 및 제거 선택 팝업메뉴"
        ref={popupRef}
        className={`transform transition-opacity duration-300 ease-out ${viewPopup ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'} cursor-pointer rounded-md gap-20 flex flex-col absolute ${popupPosition === 'top' ? 'bottom-10' : 'top-1/2'} left-50 p-10 dark:bg-dark-light-200 bg-dark-light-500 text-white text-xs`}
      >
        <button
          role="menuitem"
          type="button"
          className="break-keep"
          onClick={clickFileInput}
        >
          이미지 선택
        </button>
        <button
          role="menuitem"
          type="button"
          className="break-keep"
          onClick={removeImage}
        >
          이미지 제거
        </button>
      </div>
    </div>
  );
}