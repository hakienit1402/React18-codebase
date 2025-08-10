import React from "react";

const ErrorFilledIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_9641_10097)">
        <rect x="4" y="4" width="16" height="16" fill="black" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V6ZM13.5 17.5C13.5 18.3284 12.8284 19 12 19C11.1716 19 10.5 18.3284 10.5 17.5C10.5 16.6718 11.1713 16.0003 11.9994 16C12.8284 16 13.5 16.6716 13.5 17.5Z"
          fill="#D16161"
        />
      </g>
      <defs>
        <clipPath id="clip0_9641_10097">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ErrorFilledIcon;
