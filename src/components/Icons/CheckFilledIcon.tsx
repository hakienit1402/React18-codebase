import React from "react";

const CheckFilledIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_9641_10109)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 0C18.6263 0 24 5.37375 24 12C24 18.6263 18.6263 24 12 24C5.37375 24 0 18.6263 0 12C0 5.37375 5.37375 0 12 0ZM9.50805 15.8977L6.57016 12.9574C6.06964 12.4566 6.06954 11.6399 6.57016 11.1392C7.07088 10.6385 7.89119 10.6417 8.38827 11.1392L10.4595 13.212L15.6119 8.05954C16.1126 7.55881 16.9294 7.55881 17.43 8.05954C17.9307 8.56015 17.93 9.37764 17.43 9.87765L11.3671 15.9406C10.8671 16.4406 10.0496 16.4413 9.54894 15.9406C9.53488 15.9266 9.52131 15.9123 9.50805 15.8977Z"
          fill="#5BB46C"
        />
      </g>
      <defs>
        <clipPath id="clip0_9641_10109">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckFilledIcon;
