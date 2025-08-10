import React from "react";

const SuccessIconNoti = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="48" height="48" rx="24" fill="#303A32" />
      <g clipPath="url(#clip0_12178_8985)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 8C32.835 8 40 15.165 40 24C40 32.835 32.835 40 24 40C15.165 40 8 32.835 8 24C8 15.165 15.165 8 24 8ZM20.6774 29.1969L16.7602 25.2765C16.0929 24.6087 16.0927 23.5198 16.7602 22.8522C17.4278 22.1847 18.5216 22.1889 19.1844 22.8522L21.946 25.616L28.8159 18.746C29.4835 18.0784 30.5725 18.0784 31.24 18.746C31.9077 19.4135 31.9067 20.5035 31.24 21.1702L23.1561 29.2542C22.4894 29.9208 21.3994 29.9218 20.7319 29.2542C20.7132 29.2354 20.6951 29.2164 20.6774 29.1969Z"
          fill="#5BB46C"
        />
      </g>
      <defs>
        <clipPath id="clip0_12178_8985">
          <rect width="32" height="32" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SuccessIconNoti;
