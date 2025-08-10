import React from "react";

const InfoFilledIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_9641_9865)">
        <rect x="4" y="4" width="16" height="16" fill="black" />
        <path
          d="M0.5 12C0.5 5.64881 5.64858 0.500143 11.9997 0.5C18.3483 0.507015 23.4931 5.65191 23.5 12.0005C23.4997 18.3516 18.3511 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12ZM14.25 6.5C14.25 5.39543 13.3546 4.5 12.25 4.5C11.1454 4.5 10.25 5.39543 10.25 6.5C10.25 7.60457 11.1454 8.5 12.25 8.5C13.3546 8.5 14.25 7.60457 14.25 6.5ZM10.5 19H14.5C15.3284 19 16 18.3284 16 17.5C16 16.6716 15.3284 16 14.5 16H14V11.5C14 10.1193 12.8807 9 11.5 9H10.5C9.67157 9 9 9.67157 9 10.5C9 11.3284 9.67157 12 10.5 12H11V16H10.5C9.67157 16 9 16.6716 9 17.5C9 18.3284 9.67157 19 10.5 19Z"
          fill="#5498D3"
          stroke="#5498D3"
        />
      </g>
      <defs>
        <clipPath id="clip0_9641_9865">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfoFilledIcon;
