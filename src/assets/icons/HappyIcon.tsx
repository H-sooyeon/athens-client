'use client';

import React from 'react';

type Props = {
  className?: string;
};

export default function HappyIcon({ className }: Props) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none">
      <path fill="#1F1F1F" d="M7 10h34v13H7z" />
      <path fill="#7F2C0F" d="M7 23h36v16H7z" />
      <ellipse cx="25" cy="37.5" fill="#F85820" rx="12" ry="4.5" />
      <path
        fill="#FFD885"
        d="M24.937 41.103c5.407 0 7.143-1.003 9.148-2.507 2.005-1.503 1.517-1.127 3.07-3.007.94-1.504 2.319-4.135 2.444-7.018.046-1.064 0-1.065-4.65-1.065H16.825c-.564 0-5.596.017-5.86.502-.265.484-.126 3.57 1.88 6.579 0 0 2.292 3.672 6.704 5.45 2.37.956 3.067 1.066 5.388 1.066Zm-8.095-22.105 1.71 1.71c.311.311.675.47 1.091.479.417.008.789-.151 1.116-.478.327-.328.484-.695.47-1.104-.013-.408-.17-.776-.47-1.103l-2.252-2.292c-.472-.476-1.033-.714-1.683-.714-.65 0-1.212.238-1.687.714l-2.293 2.292c-.31.31-.47.674-.478 1.09-.008.417.153.792.485 1.124.296.295.654.45 1.076.463.422.014.796-.13 1.124-.43l1.791-1.751Zm16.316 0 1.791 1.75c.31.284.675.43 1.091.439.417.008.789-.151 1.116-.478.327-.328.49-.695.49-1.104 0-.408-.163-.776-.49-1.103l-2.293-2.292c-.472-.476-1.033-.714-1.682-.714-.65 0-1.212.238-1.688.714L29.2 18.502a1.62 1.62 0 0 0-.439 1.09c-.008.417.152.79.479 1.117.327.327.695.49 1.103.49.408 0 .776-.163 1.103-.49l1.71-1.711ZM25.005 50c-3.458 0-6.708-.656-9.751-1.968-3.043-1.313-5.69-3.094-7.94-5.343-2.25-2.25-4.032-4.895-5.345-7.936C.656 31.71 0 28.463 0 25.005c0-3.458.656-6.708 1.968-9.751 1.313-3.043 3.094-5.69 5.343-7.94 2.25-2.25 4.895-4.032 7.936-5.345C18.29.656 21.537 0 24.995 0c3.458 0 6.708.656 9.751 1.968 3.043 1.313 5.69 3.094 7.94 5.343 2.25 2.25 4.032 4.895 5.345 7.936C49.344 18.29 50 21.537 50 24.995c0 3.458-.656 6.708-1.968 9.751-1.313 3.043-3.094 5.69-5.343 7.94-2.25 2.25-4.895 4.032-7.936 5.345C31.71 49.344 28.463 50 25.005 50Z"
      />
      <ellipse
        cx="14.593"
        cy="17.798"
        fill="#1F1F1F"
        rx="2.761"
        ry="1.121"
        transform="rotate(-44.185 14.593 17.798)"
      />
      <ellipse
        cx="31.285"
        cy="17.794"
        fill="#1F1F1F"
        rx="3.148"
        ry="1.222"
        transform="rotate(-41.997 31.285 17.794)"
      />
      <ellipse
        cx="35.164"
        cy="18.105"
        fill="#1F1F1F"
        rx="3.202"
        ry="1.41"
        transform="rotate(45.894 35.164 18.105)"
      />
      <ellipse
        cx="18.947"
        cy="17.826"
        fill="#1F1F1F"
        rx="2.936"
        ry="1.151"
        transform="rotate(-134.011 18.947 17.826)"
      />
      <circle cx="16.75" cy="17.25" r="1.75" fill="#1F1F1F" />
      <circle cx="33.25" cy="17.25" r="1.75" fill="#1F1F1F" />
      <ellipse cx="17" cy="18.6" fill="#1F1F1F" rx="1" ry=".6" />
      <ellipse cx="33" cy="18.6" fill="#1F1F1F" rx="1" ry=".6" />
    </svg>
  );
}
