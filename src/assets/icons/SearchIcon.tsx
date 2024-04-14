type Props = {
  className?: string;
};

const SearchIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden
    >
      <rect
        width="13"
        height="13"
        fill="url(#pattern0_172_1290)"
        fill-opacity="0.6"
      />
      <defs>
        <pattern
          id="pattern0_172_1290"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_172_1290" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_172_1290"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default SearchIcon;