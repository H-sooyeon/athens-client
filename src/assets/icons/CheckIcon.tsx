import React from 'react';

type Props = {
  className: string;
};

export default function CheckIcon({ className }: Props) {
  return (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={className}
      fill="#e8eaed"
    >
      <path
        fill="var(--icon-color-check)"
        d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
      />
    </svg>
  );
}
